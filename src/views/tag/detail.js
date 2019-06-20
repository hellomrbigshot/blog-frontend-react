import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Pagination } from 'antd'
import { getTagDetail, getArticleList } from './store/actionCreators'
import { TagDetailWrapper, ArticleListWrapper } from './styled'

class TagDetail extends Component {
  render() {
    const { detail, articleList, total, getArticleList, match: { params: { tag }}} = this.props
    return (
      <div>
        <TagDetailWrapper>
          <h2>{detail.get('name')} <small>标签</small></h2>
          <div>{detail.get('description')}</div>
        </TagDetailWrapper>
        <ArticleListWrapper>
          {
            articleList.map(article => (
              <article key={article.get('_id')}>
                <Link to={`/detail/${article.get('_id')}`}>
                  <span>{article.get('create_time').substring(5, 10)}</span>
                  <h2>{article.get('title')}</h2>
                </Link>
              </article>
            ))
          }
        </ArticleListWrapper>
        {
          total > 10 ? <Pagination total={total} onChange={page=>getArticleList(tag, page)}/> : null
        }
        
      </div>
    )
  }
  componentDidMount() {
    const tag = this.props.match.params.tag
    this.props.getTagDetail(tag)
    this.props.getArticleList(tag)
  }
}
const mapStateToProps = (state) => {
  return {
    detail: state.getIn(['tag', 'tagDetail', 'detail']),
    articleList: state.getIn(['tag', 'tagDetail', 'articleList']),
    total: state.getIn(['tag', 'tagDetail', 'total'])
  }
}

const mapDispatchToProps = (dispatch, action) => {
  return {
    getTagDetail(tag) {
      dispatch(getTagDetail(tag))
    },
    getArticleList(tag, page = 1)  {
      dispatch(getArticleList(tag, page))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TagDetail)
