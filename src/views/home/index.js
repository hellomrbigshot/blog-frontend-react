import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actionCreators } from './store'
import { HomeWrapper } from './styled'
import ArticleItem from '../../components/ArticleItem'
import { Pagination, BackTop } from 'antd'
import { useParams, useHistory } from 'react-router-dom'
import { useQuery } from '../../common/index'

function Home () {
  let _page = useQuery('page')
  _page = _page ? _page - 0 : 1
  const history = useHistory()
  const { keywords } = useParams()
  const dispatch = useDispatch()
  const articleList = useSelector(state => state.getIn(['home', 'articleList']))
  const total = useSelector(state => state.getIn(['home', 'total']))
  const page = useSelector(state => state.getIn(['home', 'page']))
  useEffect(() => {
    if (_page !== page) {
      dispatch(actionCreators.getArticleList(_page || 1, keywords))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, keywords, _page])
  const changePage = (page) => {
    history.push(`/home?page=${page}`)
  }
  return (
    <HomeWrapper>
      {articleList.map((article, i) => {
        return <ArticleItem article={article} key={article._id} />
      })}
      <BackTop />
      {total > 10 ? <Pagination current={page} onChange={changePage} total={total} /> : null}
    </HomeWrapper>
  )
}

export default Home
