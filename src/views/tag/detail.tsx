import React, { useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Pagination } from 'antd'
import { getTagDetail, getArticleList } from './store/actionCreators'
import { TagDetailWrapper, ArticleListWrapper } from './styled'

interface IState {
  tag: {
    tagDetail: {
      detail: IDetail,
      articleList: IArticle[]
      total: number
    }
  }
}
interface IDetail {
  description: string,
  name: string
}
interface IArticle {
  _id: string,
  create_time: string,
  title: string
}
interface IRoute {
  match: {
    params: {
      tag: string
    }
  }
}
function TagDetail({ match: { params: { tag } } }: IRoute) {
  const dispatch = useDispatch()
  const detail = useSelector((state: IState) => state.tag.tagDetail.detail)
  const articleList = useSelector((state: IState) => state.tag.tagDetail.articleList)
  const total = useSelector((state: IState) => state.tag.tagDetail.total)
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
          {detail.name} <small>标签</small>
        </h2>
        <div>{detail.description}</div>
      </TagDetailWrapper>
      <ArticleListWrapper>
        {articleList.map(article => (
          <article key={article._id}>
            <Link to={`/detail/${article._id}`}>
              <span>{article.create_time.substring(5, 10)}</span>
              <h2>{article.title}</h2>
            </Link>
          </article>
        ))}
      </ArticleListWrapper>
      {total > 10 ? <Pagination total={total} onChange={pageChange} /> : null}
    </div>
  )
}

export default TagDetail
