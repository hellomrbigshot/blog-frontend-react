import React from 'react'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Avatar, Input } from 'antd'
import { formatTime } from '../../../common'
import { toggleReplyInput, handleSubmitComment } from '../store/actionCreators'

function CommentList({ commentList, article, user, history, location, articleUser }) {
  let replyContent = null
  const dispatch = useDispatch()
  const handleInputChange = input => {
    // 获取 input 的值
    replyContent = input.target.value
  }
  const redirectUrl = encodeURIComponent(location.pathname)
  const toggleReplyComment = (i, user) => {
    !user && history.push(`/signin?redirect=${redirectUrl}`)
    dispatch(toggleReplyInput(i))
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
    <div id="commentList">
      <h2 className='text-lg font-semibold mb-2 mt-8'>全部评论</h2>
      {commentList.map((comment, i) => (
        <div className='flex px-3.5 py-1.5 mt-5' key={comment.get('_id')}>
          <Link className='mr-4' to={`/user/info/${comment.get('create_user')}`}>
            <Avatar size={40} src={`/api/file/avatar/user?username=${comment.get('create_user')}`} alt={comment.create_user} />
          </Link>
          <div className='flex-1'>
            <div className='flex items-center'>
              <Link className='text-base font-medium flex-1' to={`/user/info/${comment.get('create_user')}`}>{comment.get('create_user')}
              {
                comment.get('create_user') === articleUser
                  ? <span className='text-sm text-gray-400 ml-2.5'>（作者）</span>
                  : null
              }
              </Link>
              <div className='text-sm text-gray-400'>{formatTime(comment.get('create_time'))}</div>
            </div>
            {comment.get('reply_user') ? (
              <div className='p-4 shadow rounded mt-2.5 text-sm text-gray-600'>
                <Link to={`/user/info/${comment.get('reply_user')}`}>
                  {comment.get('reply_user')}
                  {
                    comment.get('reply_user') === articleUser
                      ? <span className='text-sm text-gray-400'>（作者）</span>
                      : null
                  }
                </Link>：{comment.get('reply_content')}
              </div>
            ) : null}
            <div className='mt-2.5 text-sm text-gray-600'>{comment.get('content')}</div>
            {
              comment.get('showReplyInput')
                ? (<div className='mt-2.5 text-sm cursor-pointer text-blue-600' onClick={() => toggleReplyComment(i, user)}><i className='iconfont icon-comment text-sm mr-0.5'></i>取消回复</div>)
                : (<div className='mt-2.5 text-sm cursor-pointer text-gray-500 hover:text-blue-600' onClick={() => toggleReplyComment(i, user)}><i className='iconfont icon-comment text-sm mr-0.5'></i>回复</div>)
            }
            {comment.get('showReplyInput') ? (
              <div className='mt-2.5'>
                <Input size="small" onChange={handleInputChange} onPressEnter={() => handleSubmitReply(comment, i, replyContent, article)} />
                <div className='mt-2.5 flex flex-row-reverse'>
                  <div className='rounded py-1 cursor-pointer text-xs text-white font-500 bg-blue-500 overflow-hidden leading-6 hover:bg-blue-600 hover:text-white transition-all px-3' onClick={() => handleSubmitReply(comment, i, replyContent, article)}>提交</div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  )
}

export default withRouter(CommentList)
