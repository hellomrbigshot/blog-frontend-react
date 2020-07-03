import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Tabs, Pagination } from 'antd'
import { Redirect } from 'react-router-dom'
import showCommentList from './components/commentList'
import { actionCreators } from './store'

const { TabPane } = Tabs
interface IProp {
  history: {
    push: Function
  }
}
interface IState {
  user: {
    user: string,
  }
  comment: {
    commentList: object[],
    total: number
  }
}
function Comment({ history }: IProp) {
  const dispatch = useDispatch()
  const user = useSelector((state: IState) => state.user.user)
  const commentList = useSelector((state: IState) => state.comment.commentList)
  const total = useSelector((state: IState) => state.comment.total)
  useEffect(() => {
    dispatch(actionCreators.getCommentList('to_user', 1))
  }, [dispatch])
  const getCommentList = (type: string, page: number | string) => {
    dispatch(actionCreators.getCommentList(type, page))
  }
  return !user ? (
    <Redirect to={{ pathname: '/login', state: { redirect: '/comment/list' } }} />
  ) : (
    <Tabs defaultActiveKey="to_user" onChange={key => getCommentList(key, 1)}>
      <TabPane tab="我收到的" key="to_user">
        {showCommentList(commentList, history.push, 'to_user')}
        {total > 10 ? <Pagination style={{ marginTop: '20px' }} total={total} onChange={page => getCommentList('to_user', page)} /> : null}
      </TabPane>
      <TabPane tab="我发起的" key="create_user">
        {showCommentList(commentList, history.push, 'create_user')}
        {total > 10 ? <Pagination style={{ marginTop: '20px' }} total={total} onChange={page => getCommentList('create_user', page)} /> : null}
      </TabPane>
    </Tabs>
  )
}

export default Comment
