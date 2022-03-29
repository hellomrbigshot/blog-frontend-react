import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Page from '../../components/Pagination'
import { getTagDetail, getArticleList, resetArticleList, resetTagDetail } from './store/actionCreators'
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
              <div className='mb-10 relative'>
                <div className='flex items-center'>
                  <div className='w-2 h-2 rounded-full bg-gray-400'></div>
                  <div className='flex items-baseline ml-5'>
                    <div className='text-2xl text-gray-800 font-bold'>{detail.get('name')}</div>
                    <div className='text-base text-gray-400 ml-2 font-bold'>标签</div>
                  </div>
                </div>
                <div className='mt-2.5 ml-7 text-xs text-gray-800'>{detail.get('description')}</div>
              </div>
            )
          : (<TagDetailSkeleton/>)
      }
      {
        !fetchArray.size
          ? (
              <div className='mb-10'>
                {articleList.map(article => (
                  <Link
                    key={article.get('_id')}
                    to={`/detail/${article.get('_id')}`}
                    className='group flex items-center pt-6 pb-3 border-b border-dashed border-gray-200 hover:border-gray-400'
                  >
                    <div className='w-1.5 h-1.5 rounded-full bg-gray-400 group-hover:bg-gray-600'></div>
                    <div className='ml-5 text-xs text-gray-400'>{article.get('create_time').substring(5, 10)}</div>
                    <div className='ml-1.25 text-gray-500 font-bold text-base group-hover:text-gray-700'>{article.get('title')}</div>
                  </Link>
                ))}
              </div>
            )
          : <ArticleListSkeleton/>
      }
      
      {total > 10 ? <Page current={page} total={total} onChange={pageChange} /> : null}
    </div>
  )
}

export default TagDetail
