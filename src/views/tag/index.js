import React, { useEffect } from 'react'
import { TagWrapper, Header, ListWrapper, TagItem, TagHeader, TagDesc, TagBottom } from './styled'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import { Pagination } from 'antd'
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, _page])
  const pageChange = (page) => {
    history.push(`?page=${page}`)
  }
  return (
    <TagWrapper>
      <Header>
        当前总共 <span>{total}</span> 个标签
      </Header>
      <ListWrapper>
        {tagList.size === 0
          ? <TagListSkeleton/>
          : tagList.map(tag => (
            <TagItem key={tag.get('_id')}>
              <TagHeader>
                <Link to={`/tag/detail/${tag.get('name')}`}>{tag.get('name')}</Link>
              </TagHeader>
              <TagDesc>{tag.get('description')}</TagDesc>
              <TagBottom>
                共有 <Link to={`/tag/detail/${tag.get('name')}`}>{tag.get('page_num')}</Link> 篇文章
              </TagBottom>
            </TagItem>
          ))}
      </ListWrapper>
      {tagList.size === 0 ? null : <Pagination current={page} total={total} onChange={pageChange} />}
    </TagWrapper>
  )
}

export default TagList
