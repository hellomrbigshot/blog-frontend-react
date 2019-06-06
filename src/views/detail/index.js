import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getArticleDetail, getCommentList } from './store/actionCreators'

class Detail extends Component {
  render() {
    console.log(this.props.match.params.id)
    return (
      <div>详情页</div>
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