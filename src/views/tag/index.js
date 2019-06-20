import React, { Component } from 'react'
import { TagWrapper, Header, ListWrapper, TagItem, TagHeader, TagDesc, TagBottom } from './styled'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Pagination } from 'antd'
import { actionCreators } from './store'


class TagList extends Component {
  render() {
    const { total, tagList, pageChange } = this.props
    return (
      <TagWrapper>
        <Header>当前总共 {total} 个标签</Header>
        <ListWrapper>
          {
            tagList.size === 0 ? null : 
            tagList.map((tag, i) => (
              <TagItem key={tag.get('_id')}>
                <TagHeader>
                  <Link to={`/tags/detail/${tag.get('name')}`}>{tag.get('name')}</Link>
                </TagHeader>
                <TagDesc>{tag.get('description')}</TagDesc>
                <TagBottom>共有 {tag.get('page_num')} 篇文章</TagBottom>
              </TagItem>
            ))
          }
        </ListWrapper>
        {
          tagList.size === 0 ? null : <Pagination total={total} onChange={pageChange} />
        }
      </TagWrapper>
    )
  }
  componentDidMount() {
    this.props.getTagList()
  }
}
const mapStateToProps = (state) => {
  return {
    tagList: state.getIn(['tag', 'tagList']),
    total: state.getIn(['tag', 'total'])
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getTagList() {
      dispatch(actionCreators.getTagList())
    },
    pageChange(page) {
      dispatch(actionCreators.getTagList(page))
      window.scroll(0, 0)
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TagList)