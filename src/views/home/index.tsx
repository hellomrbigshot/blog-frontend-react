import React, { useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actionCreators } from './store'
import { HomeWrapper } from './styled'
import ArticleItem from '../../components/ArticleItem'
import { Pagination, BackTop } from 'antd'

function Home({
  match: {
    params: { keywords = '' }
  }
}) {
  const dispatch = useDispatch()
  const articleList = useSelector(state => state.getIn(['home', 'articleList']))
  const total = useSelector(state => state.getIn(['home', 'total']))
  useEffect(() => {
    dispatch(actionCreators.getArticleList(1, keywords))
  }, [dispatch, keywords])
  const getArticleList = useCallback(
    page => {
      dispatch(actionCreators.getArticleList(page, keywords))
    },
    [dispatch, keywords]
  )

  return (
    <HomeWrapper>
      {articleList.map((article, i) => {
        return <ArticleItem article={article} key={i} />
      })}
      <BackTop />
      {total > 10 ? <Pagination onChange={getArticleList} total={total} /> : null}
    </HomeWrapper>
  )
}

export default Home
