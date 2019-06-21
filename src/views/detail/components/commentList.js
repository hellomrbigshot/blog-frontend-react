import React from 'react'
import { Link } from 'react-router-dom'
import { CommentWrapper, CommentItem, CommentAvatar, CommentFloor, CommentContent, CommentInfo, ReplyContent } from '../styled'
import { Comment, Avatar } from 'antd'
import { formatTime } from '../../../common'

function commentList(commentList) {
  return (
    <CommentWrapper>
      <h2>留言板：</h2>
      {
        commentList.map((comment, i) => (
          <CommentItem key={comment.get('_id')}>
            <CommentAvatar>
              <Link to="">
                <Avatar 
                  // size="large"
                  src={`/api/file/avatar/user?username=${comment.get('create_user')}`}
                  alt={comment.create_user}
                />
              </Link>
              <CommentFloor>{commentList.size - i}楼</CommentFloor>
            </CommentAvatar>
            <CommentContent>
              <CommentInfo>
                <Link to="">{comment.get('create_user')}</Link>
                <div>{formatTime(comment.get('create_time'))}</div>
              </CommentInfo>
              {
                comment.get('reply_user') ? 
                (
                  <ReplyContent>
                    <Link to="">{comment.get('reply_user')}</Link>：
                    {comment.get('reply_content')}
                  </ReplyContent>
                ) : null
              }
              <div>{comment.get('content')}</div>
            </CommentContent>
          </CommentItem>
        ))
      }
    </CommentWrapper>
  )
}

export default commentList
