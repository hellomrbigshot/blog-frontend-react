import React, { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar } from 'antd'
import { useParams, useHistory, useLocation } from 'react-router-dom'
import { handleCommentChange, getArticleDetail, resetArticleDetail, resetCommentList, getCommentList, handleSubmitComment as submitComment } from './store/actionCreators'
import ArticleDetail from './components/ArticleDetail'
import CommentList from './components/CommentList'
import ArticleDetailSkeleton from './components/ArticleDetailSkeleton'
import CommentTextarea from './components/CommentTextarea'
import 'react-m-editor/dist/index.min.css'
import { isMac } from '../../common'

function Detail () {
  const dispatch = useDispatch()
  const { pathname } = useLocation()
  const { id, refresh } = useParams()
  const history = useHistory()
  let detail = useSelector(state => state.getIn(['detail', 'detail']))
  const _id = useSelector(state => state.getIn(['detail', 'detail', '_id']))
  const commentList = useSelector(state => state.getIn(['detail', 'commentList']))
  const comment = useSelector(state => state.getIn(['detail', 'comment']))
  const user = useSelector(state => state.getIn(['user', 'user']))
  useEffect(() => {
    if (_id !== id || refresh) {
      dispatch(resetArticleDetail())
      dispatch(resetCommentList())
      dispatch(getArticleDetail(id))
      dispatch(getCommentList(id))
    }
  }, [id, dispatch])
  const handleKeyDown = useCallback(e => {
    if ((isMac && e.metaKey && e.keyCode === 13) || (!isMac && e.ctrlKey && e.keyCode === 13)) { // mac command+enter windows ctrl+enter 提交
      handleSubmitComment()
    }
  })
  const handleSubmitComment = useCallback(() => {
    if (!comment.trim()) {
      return false
    }
    const formData = {
      content: comment,
      reply_user: '',
      reply_content: ''
    }
    dispatch(submitComment(formData))
    document.querySelector('#commentList') && document.querySelector('#commentList').scrollIntoView()
  }, [dispatch, comment])
  const handleFocus = useCallback(() => {
    if (!user) {
      const redirectUrl = encodeURIComponent(pathname)
      history.push(`/signin?redirect=${redirectUrl}`)
    }
  }, [user, history, pathname])
  const handleInputChange = useCallback(
    comment => {
      console.log(comment)
      dispatch(handleCommentChange(comment))
    },
    [dispatch]
  )
  return (
    <div>
      { detail.get('content')
        ? <ArticleDetail article={detail} user={user} />
        : <ArticleDetailSkeleton /> }
      { detail.get('content') && user
          ? <div>
              <h2 className='text-lg font-semibold mb-6'>评论</h2>
              <div className='flex'>
                <Avatar className='mr-4' size={40} src={`/api/file/avatar/user?username=${user}`} alt={user} />
                <CommentTextarea
                  placeholder={`输入评论（Enter换行，${isMac && '⌘' || 'ctrl'} + Enter发送）`}
                  isMac={isMac}
                  onChange={e => handleInputChange(e.target.value)}
                  onFocus={handleFocus}
                  onEnter={handleSubmitComment}
                />
              </div>
              <div className='flex flex-row-reverse mt-2'>
                <button className='py-2 px-4 text-sm cursor-pointer border-none rounded text-white font-500 bg-blue-500 hover:bg-blue-600' onClick={handleSubmitComment}>发表评论</button>
              </div>
            </div>
          : null }
      { commentList && commentList.size > 0
          ? <CommentList
              article={detail}
              user={user}
              commentList={commentList}
              isMac={isMac}
              articleUser={detail.get('create_user')}
            />
          : null }
    </div>
  )
}

export default Detail
