import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Tabs } from 'antd'
import Page from '../../components/Pagination'
import { Redirect } from 'react-router-dom'
import showCommentList from './components/commentList'
import { actionCreators } from './store'

const { TabPane } = Tabs

function Comment({ history }) {
  const dispatch = useDispatch()
  const user = useSelector(state => state.getIn(['user', 'user']))
  const commentList = useSelector(state => state.getIn(['comment', 'commentList']))
  const total = useSelector(state => state.getIn(['comment', 'total']))
  const getCommentList = (type, page) => {
    dispatch(actionCreators.getCommentList(type, page))
  }
  useEffect(() => {
    getCommentList('to_user', 1)
  }, [dispatch])
  
  const redirectUrl = encodeURIComponent('/comment/list')
  return !user ? (
    <Redirect to={`/signin?redirect=${redirectUrl}`} />
  ) : (
    <Tabs defaultActiveKey="to_user" onChange={key => getCommentList(key, 1)}>
      <TabPane tab="我收到的" key="to_user">
        {showCommentList(commentList, history.push, 'to_user')}
        {total > 10
          ? <Page className='mt-8' total={total} onChange={page => getCommentList('to_user', page)} /> : null}
      </TabPane>
      <TabPane tab="我发起的" key="create_user">
        {showCommentList(commentList, history.push, 'create_user')}
        {total > 10
          ? <Page className='mt-8' total={total} onChange={page => getCommentList('create_user', page)} />
          : null}
      </TabPane>
    </Tabs>
  )
}

export default Comment
