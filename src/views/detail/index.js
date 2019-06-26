import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Input, Button } from 'antd'
import { getArticleDetail, getCommentList } from './store/actionCreators'
import { DetailWrapper } from './styled'
import ArticleDetail from './components/articleDetail'
import CommentList from './components/commentList'

class Detail extends Component {
  render() {
    const { detail, commentList, handleSubmitComment, user, history: { push }, location: { pathname }} = this.props
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
          <h2 style={{fontSize: '20px', fontWeight: 'normal'}}>留言：</h2>
          <TextArea 
            rows={5}
            onChange={input=>this.commentContent=input.target.value} 
            onFocus={this.handleFocus.bind(this)}
            onPressEnter={()=>handleSubmitComment(this.commentContent)}
          />
          <div style={{overflow: 'hidden'}}>
            <Button 
              style={{marginTop: '10px', float: 'right'}} 
              size="small"
              onClick={()=>handleSubmitComment(this.commentContent)}
            >提交</Button>
          </div>
        </div>
      </DetailWrapper>
    )
  }
  handleFocus() {
    if (!this.props.user) {
      console.log('to login')
      const path = {
        pathname: '/login',
        query: {
          redirect: this.props.location.pathname
        }
      }
      this.props.history.push(path)
    }
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
    user: state.getIn(['user', 'user'])
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    getArticleDetail(id) {
      dispatch(getArticleDetail(id))
    },
    getCommentList(id) {
      dispatch(getCommentList(id))
    },
    handleSubmitComment(comment) {
      if (!comment.trim()) {
        return false
      }
    
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)