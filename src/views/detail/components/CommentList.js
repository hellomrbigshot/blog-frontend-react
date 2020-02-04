import React from 'react'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
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

function CommentList({ commentList, article, user, history, location }) {
  let replyContent = null
  const dispatch = useDispatch()
  const handleInputChange = input => {
    // 获取 input 的值
    replyContent = input.target.value
  }
  const handleReplyComment = (i, user) => {
    !user && history.push({ pathname: '/login', query: { redirect: location.pathname } })
    dispatch(showReplyInput(i))
  }
  const handleSubmitReply = (comment, i, replyContent) => {
    const formData = {
      content: replyContent,
      reply_user: comment.get('create_user'),
      reply_content: comment.get('content')
    }
    dispatch(handleSubmitComment(formData, i))
    document.querySelector('#commentList').scrollIntoView()
  }
  return (
    <CommentWrapper id="commentList">
      <h2>留言板：</h2>
      {commentList.map((comment, i) => (
        <CommentItem key={comment.get('_id')}>
          <CommentAvatar>
            <Link to={`/user/info/${comment.get('create_user')}`}>
              <Avatar size={40} src={`/api/file/avatar/user?username=${comment.get('create_user')}`} alt={comment.create_user} />
            </Link>
            <CommentFloor>{commentList.size - i}楼</CommentFloor>
          </CommentAvatar>
          <CommentContent>
            <CommentInfo>
              <CommentInfoTime>{formatTime(comment.get('create_time'))}</CommentInfoTime>
              <Link to={`/user/info/${comment.get('create_user')}`}>{comment.get('create_user')}</Link>
            </CommentInfo>
            {comment.get('reply_user') ? (
              <ReplyContent>
                <Link to={`/user/info/${comment.get('reply_user')}`}>{comment.get('reply_user')}</Link>：{comment.get('reply_content')}
              </ReplyContent>
            ) : null}
            <CommentContentDetail>{comment.get('content')}</CommentContentDetail>
            <CommentAction>
              <div onClick={() => handleReplyComment(i, user)}>回复</div>
            </CommentAction>
            {comment.get('showReplyInput') ? (
              <CommentReply>
                <Input size="small" onChange={handleInputChange} onPressEnter={() => handleSubmitReply(comment, i, replyContent, article)} />
                <div style={{ marginTop: '5px', display: 'flex', flexDirection: 'row-reverse' }}>
                  <CommentReplyBtn type="primary" onClick={() => handleSubmitReply(comment, i, replyContent, article)}>
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
