import React, { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Input, Button } from 'antd'
import { handleCommentChange, getArticleDetail, getCommentList, handleSubmitComment as submitComment } from './store/actionCreators'
import { DetailWrapper } from './styled'
import ArticleDetail from './components/ArticleDetail'
import CommentList from './components/CommentList'
function Detail({
  match: {
    params: { id },
    location,
    history
  }
}) {
  const dispatch = useDispatch()
  const detail = useSelector(state => state.getIn(['detail', 'detail']))
  const commentList = useSelector(state => state.getIn(['detail', 'commentList']))
  const comment = useSelector(state => state.getIn(['detail', 'comment']))
  const user = useSelector(state => state.getIn(['user', 'user']))
  useEffect(() => {
    dispatch(getArticleDetail(id))
    dispatch(getCommentList(id))
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
    document.querySelector('#commentList').scrollIntoView()
  }, [dispatch, comment])
  const handleFocus = useCallback(() => {
    console.log('trigger')
    if (!user) {
      const path = {
        pathname: '/login',
        query: {
          redirect: location.pathname
        }
      }
      history.push(path)
    }
  }, [user, history, location])
  const handleInputChange = useCallback(
    comment => {
      dispatch(handleCommentChange(comment))
    },
    [dispatch]
  )
  const { TextArea } = Input
  return (
    <DetailWrapper>
      {detail.get('content') ? <ArticleDetail article={detail} user={user} /> : null}
      {commentList.size > 0 ? <CommentList article={detail} user={user} commentList={commentList} /> : null}
      <div>
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
    </DetailWrapper>
  )
}

export default Detail
