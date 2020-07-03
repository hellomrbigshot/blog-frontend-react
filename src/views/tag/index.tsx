import React, { useEffect, useCallback } from 'react'
import { TagWrapper, Header, ListWrapper, TagItem, TagHeader, TagDesc, TagBottom } from './styled'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Pagination } from 'antd'
import { actionCreators } from './store'

interface IState {
  tag: {
    tagList: any[],
    total: number
  }
}
function TagList() {
  const dispatch = useDispatch()
  const tagList = useSelector((state: IState) => state.tag.tagList)
  const total = useSelector((state: IState) => state.tag.total)
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
        {tagList.length === 0
          ? null
          : tagList.map(tag => (
              <TagItem key={tag._id}>
                <TagHeader>
                  <Link to={`/tag/detail/${tag.name}`}>{tag.name}</Link>
                </TagHeader>
                <TagDesc>{tag.description}</TagDesc>
                <TagBottom>
                  共有 <Link to={`/tag/detail/${tag.name}`}>{tag.page_num}</Link> 篇文章
                </TagBottom>
              </TagItem>
            ))}
      </ListWrapper>
      {tagList.length === 0 ? null : <Pagination total={total} onChange={pageChange} />}
    </TagWrapper>
  )
}

export default TagList
