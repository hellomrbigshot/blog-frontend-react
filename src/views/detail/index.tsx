import React, { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Input, Button } from 'antd'
import { RouteComponentProps } from 'react-router-dom'
import { handleCommentChange, getArticleDetail, getCommentList, handleSubmitComment as submitComment } from './store/actionCreators'
import { DetailWrapper } from './styled'
import ArticleDetail from './components/ArticleDetail'
import CommentList from './components/CommentList'
interface IState {
  detail: {
    detail: any,
    commentList: object[],
    comment: string
  },
  user: {
    user: string
  }
}
interface IRoute {
  match: {
    params: {
      id: string
    },
    location: {
      pathname: string
    },
    history: {
      push: Function
    }
  }
}
function Detail ({ match: { params: { id }, location, history } }: RouteComponentProps & IRoute) {
  const dispatch = useDispatch()
  let detail = useSelector((state: IState) => state.detail.detail)
  const commentList = useSelector((state: IState) => state.detail.commentList)
  const comment = useSelector((state: IState) => state.detail.comment)
  const user = useSelector((state: IState) => state.user.user)
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
    document.querySelector('#commentList') && (document.querySelector('#commentList') as Element).scrollIntoView()
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
      {detail.content ? <ArticleDetail article={detail} user={user} /> : null}
      {commentList.length > 0 ? <CommentList article={detail} user={user} commentList={commentList} /> : null}
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
