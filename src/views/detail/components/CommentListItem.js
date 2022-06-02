import React, { useState, useRef } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { formatTime } from '../../../common'
import { handleSubmitComment } from '../store/actionCreators'
import CommentTextarea from './CommentTextarea'
export default ({ comment, article, user, articleUser, isMac }) => {
  const { pathname } = useLocation()
  const commentTextareaRef = useRef(null)
  const history = useHistory()
  const [showInput, setShowInput] = useState(false)
  let replyContent = null
  const dispatch = useDispatch()
  const handleInputChange = input => {
    // 获取 input 的值
    replyContent = input.target.value
  }
  const redirectUrl = encodeURIComponent(pathname)
  const toggleSetShowInput = () => {
    !user && history.push(`/signin?redirect=${redirectUrl}`)
    setShowInput(!showInput)
    setTimeout(() => {
      if (commentTextareaRef.current) {
        commentTextareaRef.current.focus()
      }
    })
  }
  const handleSubmitReply = (comment, replyContent) => {
    if (!replyContent.trim()) return false
    const formData = {
      content: replyContent,
      reply_user: comment.get('create_user'),
      reply_content: comment.get('content')
    }
    dispatch(handleSubmitComment(formData))
    commentTextareaRef.current.value = ''
    setShowInput(false)
    document.querySelector('#commentList').scrollIntoView()
  }
  return (
    <div className='flex px-3.5 py-1.5 mt-5' key={comment.get('_id')}>
      <Link className='mr-4' to={`/user/info/${comment.get('create_user')}`}>
        <img className='w-10 h-10 rounded-full overflow-hidden' src={`/api/file/avatar/user?username=${comment.get('create_user')}`} alt={comment.get('create_user')} />
      </Link>
      <div className='flex-1'>
        <div className='flex items-center'>
          <Link className='text-sm text-gray-600 font-medium flex-1 hover:text-blue-600' to={`/user/info/${comment.get('create_user')}`}>{comment.get('create_user')}
          {
            comment.get('create_user') === articleUser
              ? <span className='text-sm text-gray-400 ml-1'>（作者）</span>
              : null
          }
          </Link>
          <div className='text-sm text-gray-400'>{formatTime(comment.get('create_time'))}</div>
        </div>
        {comment.get('reply_user') ? (
          <div className='p-4 shadow rounded mt-2.5 text-sm text-gray-600'>
            <Link to={`/user/info/${comment.get('reply_user')}`} className='text-gray-600 hover:text-blue-600 font-medium'>
              {comment.get('reply_user')}
              {
                comment.get('reply_user') === articleUser
                  ? <span className='text-sm text-gray-400'>（作者）</span>
                  : null
              }
            </Link>：{comment.get('reply_content')}
          </div>
        ) : null}
        <div className='mt-2.5 text-sm text-gray-500'>{comment.get('content')}</div>
        {
          showInput
            ? (<div className='mt-2.5 text-sm cursor-pointer text-blue-600' onClick={toggleSetShowInput}><i className='iconfont icon-comment text-sm mr-0.5'></i>取消回复</div>)
            : (<div className='mt-2.5 text-sm cursor-pointer text-gray-400 hover:text-blue-600' onClick={toggleSetShowInput}><i className='iconfont icon-comment text-sm mr-0.5'></i>回复</div>)
        }
        {showInput ? (
          <div className='mt-2.5'>
            <CommentTextarea
              innerRef={commentTextareaRef}
              isMac={isMac}
              placeholder={`输入评论（Enter换行，${isMac && '⌘' || 'ctrl'} + Enter发送）`}
              onChange={handleInputChange}
              onEnter={() => handleSubmitReply(comment, replyContent)}
            />
            <div className='mt-2.5 flex flex-row-reverse'>
              <div className='rounded py-1 cursor-pointer text-xs text-white font-500 bg-blue-500 overflow-hidden leading-6 hover:bg-blue-600 hover:text-white transition-all px-3' onClick={() => handleSubmitReply(comment, replyContent)}>提交</div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
