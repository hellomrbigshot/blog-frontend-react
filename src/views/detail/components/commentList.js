import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { 
  CommentWrapper, 
  CommentItem, 
  CommentAvatar, 
  CommentFloor, 
  CommentContent, 
  CommentInfo, 
  ReplyContent, 
  CommentAction,
  CommentReply
} from '../styled'
import { Avatar, Button, Input } from 'antd'
import { formatTime } from '../../../common'
import { showReplyInput, handleSubmitComment } from '../store/actionCreators';

class CommentList extends Component {
  render() {
    const { commentList, articleDetail, handleReplyComment, handleSubmitReply } = this.props
    return (
      <CommentWrapper>
        <h2>留言板：</h2>
        {
          commentList.map((comment, i) => (
            <CommentItem key={comment.get('_id')}>
              <CommentAvatar>
                <Link to="">
                  <Avatar 
                    // size="large"
                    src={`/api/file/avatar/user?username=${comment.get('create_user')}`}
                    alt={comment.create_user}
                  />
                </Link>
                <CommentFloor>{commentList.size - i}楼</CommentFloor>
              </CommentAvatar>
              <CommentContent>
                <CommentInfo>
                  <Link to="">{comment.get('create_user')}</Link>
                  <div>{formatTime(comment.get('create_time'))}</div>
                </CommentInfo>
                {
                  comment.get('reply_user') ? 
                  (
                    <ReplyContent>
                      <Link to="">{comment.get('reply_user')}</Link>：
                      {comment.get('reply_content')}
                    </ReplyContent>
                  ) : null
                }
                <div>{comment.get('content')}</div>
                <CommentAction>
                  <div onClick={()=>handleReplyComment(i)}>回复</div>
                </CommentAction>
                {
                  comment.get('showReplyInput') ? (<CommentReply>
                    <Input 
                      size="small"
                      // ref={input=>this.replyContent=input}  
                      placeholder={`回复${comment.get('create_user')}:`} 
                      onChange={this.handleInputChange.bind(this)}
                      onPressEnter={()=>handleSubmitReply(comment, i, this.replyContent, articleDetail)}
                    />
                    <div style={{marginTop: '5px', overflow: 'hidden'}}>
                      <Button 
                        style={{float: 'right'}} 
                        type="primary" 
                        size="small" 
                        onClick={()=>handleSubmitReply(comment, i, this.replyContent, articleDetail)}
                      >提交</Button>
                    </div>
                  </CommentReply>) : null
                }
              </CommentContent>
            </CommentItem>
          ))
        }
      </CommentWrapper>
    )
  }
  handleInputChange(input) { // 获取 input 的值
    this.replyContent = input.target.value
  }
}

const mapStateToProps = (state) => {
  return {
    commentList: state.getIn(['detail', 'commentList']),
    articleDetail: state.getIn(['detail', 'detail']),
    user: state.getIn(['user', 'user'])
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleReplyComment(i) {
      dispatch(showReplyInput(i))
    },
    handleSubmitReply(comment, i, replyContent, articleDetail) {
      const formData = {
        content: replyContent,
        reply_user: comment.get('create_user'),
        reply_content: comment.get('content'),
        to_user: articleDetail.get('create_user'),
        page_title: articleDetail.get('title'),
        page_id: articleDetail.get('_id')
      }
      dispatch(handleSubmitComment(formData, i))
    },
    handleSubmitComment(commentContent, articleDetail) {
      const formData = {
        content: commentContent,
        reply_user: '',
        reply_content: '',
        to_user: articleDetail.get('create_user'),
        page_title: articleDetail.get('title'),
        page_id: articleDetail.get('_id')
      }
      dispatch(handleSubmitComment(formData))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentList)
