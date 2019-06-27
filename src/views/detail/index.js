import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Input, Button } from 'antd'
import { actionCreators } from './store'
import { DetailWrapper } from './styled'
import ArticleDetail from './components/articleDetail'
import CommentList from './components/commentList'

class Detail extends Component {
  render() {
    const { detail, commentList, handleSubmitComment, comment } = this.props
    const { TextArea } = Input
    return (
      <DetailWrapper>
        {
          detail.get('content') ?
          <ArticleDetail/> : null
        }
        {
          commentList.size > 0 ? <CommentList/> : null
        }
        <div>
          <h2 style={{fontSize: '20px', fontWeight: 'normal', marginBottom: '10px'}}>留言：</h2>
          <TextArea
            value={comment}
            rows={5}
            onChange={input=>this.handleInputChange(input.target.value)} 
            onFocus={this.handleFocus.bind(this)}
            onPressEnter={()=>handleSubmitComment(comment)}
          />
          <div style={{overflow: 'hidden'}}>
            <Button 
              style={{marginTop: '10px', float: 'right'}} 
              size="small"
              onClick={()=>handleSubmitComment(comment)}
            >提交</Button>
          </div>
        </div>
      </DetailWrapper>
    )
  }
  handleFocus() {
    if (!this.props.user) {
      const path = {
        pathname: '/login',
        query: {
          redirect: this.props.location.pathname
        }
      }
      this.props.history.push(path)
    }
  }
  handleInputChange(comment) {
    this.commentContent = comment
    this.props.handleCommentChange(comment)
  }
  componentDidMount() {
    this.props.getArticleDetail(this.props.match.params.id)
    this.props.getCommentList(this.props.match.params.id)
  }
}

const mapStateToProps = (state) => {
  return {
    detail: state.getIn(['detail', 'detail']),
    commentList: state.getIn(['detail', 'commentList']),
    user: state.getIn(['user', 'user']),
    comment: state.getIn(['detail', 'comment'])
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    getArticleDetail(id) {
      dispatch(actionCreators.getArticleDetail(id))
    },
    getCommentList(id) {
      dispatch(actionCreators.getCommentList(id))
    },
    handleCommentChange(comment) {
      dispatch(actionCreators.handleCommentChange(comment))
    },
    handleSubmitComment(comment) {
      if (!comment.trim()) {
        return false
      }
      const formData = {
        content: comment,
        reply_user: '',
        reply_content: ''
      }
      dispatch(actionCreators.handleSubmitComment(formData))
      document.querySelector('#commentList').scrollIntoView()
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)