import React, { useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Pagination } from 'antd'
import { getTagDetail, getArticleList } from './store/actionCreators'
import { TagDetailWrapper, ArticleListWrapper } from './styled'

function TagDetail({ match: { params: { tag } } }) {
  const dispatch = useDispatch()
  const detail = useSelector(state => state.getIn(['tag', 'tagDetail', 'detail']))
  const articleList = useSelector(state => state.getIn(['tag', 'tagDetail', 'articleList']))
  const total = useSelector(state => state.getIn(['tag', 'tagDetail', 'total']))
  useEffect(() => {
    dispatch(getTagDetail(tag))
    dispatch(getArticleList(tag))
  }, [dispatch, tag])
  const pageChange = useCallback(
    page => {
      dispatch(getArticleList(tag, page))
    },
    [dispatch, tag]
  )
  return (
    <div>
      <TagDetailWrapper>
        <h2>
          {detail.get('name')} <small>标签</small>
        </h2>
        <div>{detail.get('description')}</div>
      </TagDetailWrapper>
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
      {total > 10 ? <Pagination total={total} onChange={pageChange} /> : null}
    </div>
  )
}

export default TagDetail
