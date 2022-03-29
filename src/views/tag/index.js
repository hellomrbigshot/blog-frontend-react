import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import Page from '../../components/Pagination'
import { actionCreators } from './store'
import { useQuery } from '../../common'
import TagListSkeleton from './components/TagListSkeleton'

function TagList() {
  const dispatch = useDispatch()
  let _page = useQuery('page')
  _page = _page ? _page - 0 : 1
  const history = useHistory()
  const tagList = useSelector(state => state.getIn(['tag', 'tagList']))
  const total = useSelector(state => state.getIn(['tag', 'total']))
  const page = useSelector(state => state.getIn(['tag', 'page']))
  useEffect(() => {
    if (_page !== page) {
      dispatch(actionCreators.resetTagList())
      dispatch(actionCreators.getTagList(_page))
    }
  }, [dispatch, _page])
  const pageChange = (page) => {
    history.push(`?page=${page}`)
  }
  return (
    <div>
      <div className='text-lg mb-5'>
        当前总共 <span className='text-3xl font-bold italic'>{total}</span> 个标签
      </div>
      <div className='mt-2 mb-10'>
        {!tagList.size
          ? <TagListSkeleton/>
          : tagList.map(tag => (
            <div key={tag.get('_id')} className='p-5 rounded-md shadow w-11/12 ml-1 mt-6'>
              <Link to={`/tag/detail/${tag.get('name')}`} className='py-3 pl-1 text-lg font-medium block w-full border-b border-solid border-gray-100 text-blue-500 hover:text-blue-600'>{tag.get('name')}</Link>
              <div className='text-xs text-gray-500 py-3 pl-1 border-b border-solid border-gray-100'>{tag.get('description')}</div>
              <div className='text-sm py-3 pl-1'>
                共有 <Link to={`/tag/detail/${tag.get('name')}`} className='text-blue-500 font-medium hover:text-blue-600'>{tag.get('page_num')}</Link> 篇文章
              </div>
            </div>
          ))}
      </div>
      {tagList.size === 0 ? null : <Page current={page} total={total} onChange={pageChange} />}
    </div>
  )
}

export default TagList
