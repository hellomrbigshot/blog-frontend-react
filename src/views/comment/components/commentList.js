import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Avatar } from 'antd'
import { CommentWrapper, CommentAvatar, CommentRight, CommentHeader, Time, CommentContent, ReplyContent, CommentHeaderUser } from '../styled'
import { formatTime } from '../../../common/index'
import classnames from 'classnames'

export default (commentList, push, type = 'to_user') => {
  return (
    <Fragment>
      {commentList.map((comment) => (
        <CommentWrapper  key={comment.get('_id')} className={classnames({ 'unread-comment': type === 'to_user' && !comment.get('is_read') })}>
          <CommentAvatar>
            <Link to="/">
              <Avatar size="large" src={`/api/file/avatar/user/?username=${comment.get('create_user')}`} alt="头像" />
            </Link>
          </CommentAvatar>
          <CommentRight>
            <CommentHeader>
              <Time>{formatTime(comment.get('create_time'))}</Time>
              <CommentHeaderUser>
                {type === 'to_user' ? (
                  <Fragment>
                    <Link to={`/user/info/${comment.get('create_user')}`}>{comment.get('create_user')} </Link>
                    回复我说：
                  </Fragment>
                ) : (
                  <Fragment>{comment.get('reply_user') ? '回复：' : '发布评论：'}</Fragment>
                )}
              </CommentHeaderUser>
            </CommentHeader>
            <CommentContent>{comment.get('content')}</CommentContent>
            <ReplyContent onClick={() => handleToDetail(comment.get('page_id'))}>
              {comment.get('reply_user') ? (
                <Fragment>
                  <Link to={`/user/info/${comment.get('reply_user')}`}>{comment.get('reply_user')}: </Link>
                  {comment.get('reply_content')}
                </Fragment>
              ) : (
                <div className="reply-article">{comment.get('page_title')}</div>
              )}
            </ReplyContent>
          </CommentRight>
        </CommentWrapper>
      ))}
    </Fragment>
  )
  function handleToDetail(id) {
    push(`/detail/${id}`)
  }
}
