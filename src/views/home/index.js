import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actionCreators } from './store'
import { HomeWrapper } from './styled'
import ArticleItem from '../../components/ArticleItem'
import ArticleItemSkeleton from '../../components/ArticleItem/skeleton'
import { Pagination, BackTop } from 'antd'
import { useParams, useHistory } from 'react-router-dom'
import { useQuery } from '../../common/index'

function Home () {
  let _page = useQuery('page')
  _page = _page ? _page - 0 : 1
  const history = useHistory()
  const { keywords: _keywords } = useParams()
  const dispatch = useDispatch()
  const articleList = useSelector(state => state.getIn(['home', 'articleList']))
  const total = useSelector(state => state.getIn(['home', 'total']))
  const page = useSelector(state => state.getIn(['home', 'page']))
  const keywords = useSelector(state => state.getIn(['home', 'keywords']))
  const fetchArray = useSelector(state => state.getIn(['app', 'fetchArray']))
  useEffect(() => {
    if (_page !== page || keywords !== _keywords) {
      dispatch(actionCreators.resetArticleList())
      dispatch(actionCreators.getArticleList(_page || 1, _keywords))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, _keywords, _page])
  const changePage = (page) => {
    history.push(`/home${keywords ? `/${keywords}` : ''}?page=${page}`)
  }
  return (
    <HomeWrapper>
      {
        !fetchArray.size
        ? (articleList.map((article, i) => (<ArticleItem article={article} key={article.get('_id')} />)))
        : (['1', '2', '3'].map(_ => (<ArticleItemSkeleton key={_}/>)))
      }
      <BackTop />
      {total > 10 ? <Pagination current={page} onChange={changePage} total={total} /> : null}
    </HomeWrapper>
  )
}

export default Home
