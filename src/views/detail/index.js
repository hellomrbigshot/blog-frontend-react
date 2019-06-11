import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getArticleDetail, getCommentList } from './store/actionCreators'
import { DetailWrapper } from './styled'
import ArticleDetail from './components/articleDetail'

class Detail extends Component {
  render() {
    const { detail } = this.props
    return (
      <DetailWrapper>
        {
          detail.get('content') ?
          <ArticleDetail/> : null
        }
        
      </DetailWrapper>
    )
  }
  componentDidMount() {
    this.props.getArticleDetail(this.props.match.params.id)
    this.props.getCommentList(this.props.match.params.id)
  }
}

const mapStateToProps = (state) => {
  return {
    detail: state.getIn(['detail', 'detail']),
    commentList: state.getIn(['detail', 'commentList'])
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getArticleDetail(id) {
      dispatch(getArticleDetail(id))
    },
    getCommentList(id) {
      dispatch(getCommentList(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)