import React from 'react'
import CommentListItem from './CommentListItem'

function CommentList({ commentList, article, user, articleUser, isMac }) {
  return (
    <div id="commentList">
      <h2 className='text-lg font-semibold mb-2 mt-8'>全部评论</h2>
      {commentList.map((comment, i) => (
        <CommentListItem
          comment={comment}
          key={i}
          article={article}
          user={user}
          articleUser={articleUser}
          isMac={isMac}
        />
      ))}
    </div>
  )
}

export default CommentList
