import React, { useEffect, useCallback } from 'react'
import { TagWrapper, Header, ListWrapper, TagItem, TagHeader, TagDesc, TagBottom } from './styled'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Pagination } from 'antd'
import { actionCreators } from './store'

function TagList() {
  const dispatch = useDispatch()
  const tagList = useSelector(state => state.getIn(['tag', 'tagList']))
  const total = useSelector(state => state.getIn(['tag', 'total']))
  useEffect(() => {
    dispatch(actionCreators.getTagList())
  }, [dispatch])
  const pageChange = useCallback(page => {
    dispatch(actionCreators.getTagList(page))
    window.scroll(0, 0)
  }, [dispatch])
  return (
    <TagWrapper>
      <Header>
        当前总共 <span>{total}</span> 个标签
      </Header>
      <ListWrapper>
        {tagList.size === 0
          ? null
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
      {tagList.size === 0 ? null : <Pagination total={total} onChange={pageChange} />}
    </TagWrapper>
  )
}

export default TagList
