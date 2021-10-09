import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Page from '../../components/Pagination'
import { getTagDetail, getArticleList, resetArticleList, resetTagDetail } from './store/actionCreators'
import { TagDetailWrapper, ArticleListWrapper } from './styled'
import { useParams, useHistory } from 'react-router-dom'
import { useQuery } from '../../common'
import ArticleListSkeleton from './components/ArticleListSkeleton'
import TagDetailSkeleton from './components//TagDetailSkeleton'

function TagDetail() {
  const { tag } = useParams()
  const history = useHistory()
  const dispatch = useDispatch()
  let _page = useQuery('page')
  _page = _page ? _page - 0 : 1
  const detail = useSelector(state => state.getIn(['tag', 'tagDetail', 'detail']))
  const tagName = detail.get('name')
  const page = useSelector(state => state.getIn(['tag', 'tagDetail', 'page']))
  const articleList = useSelector(state => state.getIn(['tag', 'tagDetail', 'articleList']))
  const total = useSelector(state => state.getIn(['tag', 'tagDetail', 'total']))
  const fetchArray = useSelector(state => state.getIn(['app', 'fetchArray']))
  useEffect(() => {
    if (tag !== tagName) {
      dispatch(resetTagDetail())
      dispatch(resetArticleList())
      dispatch(getTagDetail(tag))
      dispatch(getArticleList(tag, _page)) 
    } else if (_page !== page) {
      dispatch(resetArticleList())
      dispatch(getArticleList(tag, _page))
    }
  }, [dispatch, tag, _page])
  const pageChange = (page) => {
    history.push(`?page=${page}`)
  }
  return (
    <div>
      {
        detail.get('name')
          ? (
              <TagDetailWrapper>
                <h2>
                  {detail.get('name')} <small>标签</small>
                </h2>
                <div>{detail.get('description')}</div>
              </TagDetailWrapper>
            )
          : (<TagDetailSkeleton/>)
      }
      {
        !fetchArray.size
          ? (
              <ArticleListWrapper>
                {articleList.map(article => (
                  <article key={article.get('_id')}>
                    <Link to={`/detail/${article.get('_id')}`}>
                      <span>{article.get('create_time').substring(5, 10)}</span>
                      <h2>{article.get('title')}</h2>
                    </Link>
                  </article>
                ))}
              </ArticleListWrapper>
            )
          : <ArticleListSkeleton/>
      }
      
      {total > 10 ? <Page current={page} total={total} onChange={pageChange} /> : null}
    </div>
  )
}

export default TagDetail
