import React, { ChangeEvent } from 'react'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import {
  CommentWrapper,
  CommentItem,
  CommentAvatar,
  CommentFloor,
  CommentContent,
  CommentContentDetail,
  CommentInfo,
  CommentInfoTime,
  ReplyContent,
  CommentAction,
  CommentReply,
  CommentReplyBtn
} from '../styled'
import { Avatar, Input } from 'antd'
import { formatTime } from '../../../common'
import { showReplyInput, handleSubmitComment } from '../store/actionCreators'

interface IComment {
  content: string,
  create_user: string,
  reply_user: string,
  create_time: Date,
  reply_content: string,
  showReplyInput?: boolean,
  _id?: string
}
interface IParams extends RouteComponentProps {
  commentList: IComment[],
  article: object,
  user: string
}
function CommentList ({ commentList, article, user, history, location }: IParams) {
  let replyContent: string = ''
  const dispatch = useDispatch()
  const handleInputChange = (input: ChangeEvent<HTMLInputElement>) => {
    // 获取 input 的值
    replyContent = input.target.value
  }
  const handleReplyComment = (i: number, user: string) => {
    !user && history.push({ pathname: '/login', state: { redirect: location.pathname } })
    dispatch(showReplyInput(i))
    
  }
  const handleSubmitReply = (comment: IComment, i: number, replyContent: string) => {
    const formData = {
      content: replyContent,
      reply_user: comment.create_user,
      reply_content: comment.content
    }
    dispatch(handleSubmitComment(formData, i))
    const listDom: Element | null = document.querySelector('#commentList')
    listDom?.scrollIntoView()
  }
  return (
    <CommentWrapper id="commentList">
      <h2>留言板：</h2>
      {commentList.map((comment: IComment, i: number) => (
        <CommentItem key={comment._id}>
          <CommentAvatar>
            <Link to={`/user/info/${comment.create_user}`}>
              <Avatar size={40} src={`/api/file/avatar/user?username=${comment.create_user}`} alt={comment.create_user} />
            </Link>
            <CommentFloor>{commentList.length - i}楼</CommentFloor>
          </CommentAvatar>
          <CommentContent>
            <CommentInfo>
              <CommentInfoTime>{formatTime(comment.create_time)}</CommentInfoTime>
              <Link to={`/user/info/${comment.create_user}`}>{comment.create_user}</Link>
            </CommentInfo>
            {comment.reply_user ? (
              <ReplyContent>
                <Link to={`/user/info/${comment.reply_user}`}>{comment.reply_user}</Link>：{comment.reply_content}
              </ReplyContent>
            ) : null}
            <CommentContentDetail>{comment.content}</CommentContentDetail>
            <CommentAction>
              <div onClick={() => handleReplyComment(i, user)}>回复</div>
            </CommentAction>
            {comment.showReplyInput ? (
              <CommentReply>
                <Input size="small" onChange={handleInputChange} onPressEnter={() => handleSubmitReply(comment, i, replyContent)} />
                <div style={{ marginTop: '5px', display: 'flex', flexDirection: 'row-reverse' }}>
                  <CommentReplyBtn onClick={() => handleSubmitReply(comment, i, replyContent)}>
                    提交
                  </CommentReplyBtn>
                </div>
              </CommentReply>
            ) : null}
          </CommentContent>
        </CommentItem>
      ))}
    </CommentWrapper>
  )
}

export default withRouter(CommentList)
