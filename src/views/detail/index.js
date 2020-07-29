import React, { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Input, Button } from 'antd'
import { useParams, useHistory, useLocation } from 'react-router-dom'
import { handleCommentChange, getArticleDetail, resetArticleDetail, resetCommentList, getCommentList, handleSubmitComment as submitComment } from './store/actionCreators'
import { DetailWrapper } from './styled'
import ArticleDetail from './components/ArticleDetail'
import CommentList from './components/CommentList'
import ArticleDetailSkeleton from './components/ArticleDetailSkeleton'
function Detail() {
  const dispatch = useDispatch()
  const { pathname } = useLocation()
  const { id } = useParams()
  const history = useHistory()
  let detail = useSelector(state => state.getIn(['detail', 'detail']))
  const _id = useSelector(state => state.getIn(['detail', 'detail', '_id']))
  const commentList = useSelector(state => state.getIn(['detail', 'commentList']))
  const comment = useSelector(state => state.getIn(['detail', 'comment']))
  const user = useSelector(state => state.getIn(['user', 'user']))
  useEffect(() => {
    if (_id !== id) {
      dispatch(resetArticleDetail())
      dispatch(resetCommentList())
      dispatch(getArticleDetail(id))
      dispatch(getCommentList(id))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, dispatch])
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
      history.push(`/login?redirect=${redirectUrl}`)
    }
  }, [user, history, pathname])
  const handleInputChange = useCallback(
    comment => {
      dispatch(handleCommentChange(comment))
    },
    [dispatch]
  )
  const { TextArea } = Input
  return (
    <DetailWrapper>
      {detail.get('content') ? <ArticleDetail article={detail} user={user} /> : <ArticleDetailSkeleton />}
      { commentList && commentList.size > 0 ? <CommentList article={detail} user={user} commentList={commentList} /> : null}
      {detail.get('content')
        ? <div>
            <h2 style={{ fontSize: '20px', fontWeight: 'normal', marginBottom: '10px' }}>留言：</h2>
            <TextArea
              value={comment}
              rows={5}
              onChange={input => handleInputChange(input.target.value)}
              onFocus={handleFocus}
              onPressEnter={handleSubmitComment}
            />
            <div style={{ display: 'flex', marginTop: '10px', flexDirection: 'row-reverse' }}>
              <Button size="small" onClick={handleSubmitComment}>
                提交
              </Button>
            </div>
          </div>
        : null}
    </DetailWrapper>
  )
}

export default Detail
