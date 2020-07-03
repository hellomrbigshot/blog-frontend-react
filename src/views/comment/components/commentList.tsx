import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Avatar } from 'antd'
import { CommentWrapper, CommentAvatar, CommentRight, CommentHeader, Time, CommentContent, ReplyContent, CommentHeaderUser } from '../styled'
import { formatTime } from '../../../common/index'

export default (commentList: any, push: Function, type = 'to_user') => {
  return (
    <Fragment>
      {commentList.map((comment: any) => (
        <CommentWrapper key={comment._id}>
          <CommentAvatar>
            <Link to="/">
              <Avatar size="large" src={`/api/file/avatar/user/?username=${comment.create_user}`} alt="头像" />
            </Link>
          </CommentAvatar>
          <CommentRight>
            <CommentHeader>
              <Time>{formatTime(comment.create_time)}</Time>
              <CommentHeaderUser>
                {type === 'to_user' ? (
                  <Fragment>
                    <Link to={`/user/info/${comment.create_user}`}>{comment.create_user} </Link>
                                      回复我说：
                  </Fragment>
                ) : (
                    <Fragment>{comment.reply_user ? '回复：' : '发布评论：'}</Fragment>
                  )}
              </CommentHeaderUser>
            </CommentHeader>
            <CommentContent>{comment.content}</CommentContent>
            <ReplyContent onClick={() => handleToDetail(comment.page_id)}>
              {comment.reply_user ? (
                <Fragment>
                  <Link to={`/user/info/${comment.reply_user}`}>{comment.reply_user}: </Link>
                  {comment.reply_content}
                </Fragment>
              ) : (
                  <div className="reply-article">{comment.page_title}</div>
                )}
            </ReplyContent>
          </CommentRight>
        </CommentWrapper>
      ))}
    </Fragment>
  )
  function handleToDetail(id: string) {
    push(`/detail/${id}`)
  }
}
