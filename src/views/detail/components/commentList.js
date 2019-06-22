import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { CommentWrapper, CommentItem, CommentAvatar, CommentFloor, CommentContent, CommentInfo, ReplyContent, CommentAction } from '../styled'
import { Avatar } from 'antd'
import { formatTime } from '../../../common'

class CommentList extends Component {
  render() {
    const { commentList, handleReplyComment } = this.props
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
                  <div onClick={handleReplyComment}>回复</div>
                </CommentAction>
              </CommentContent>
            </CommentItem>
          ))
        }
      </CommentWrapper>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    commentList: state.getIn(['detail', 'commentList'])
  }
}

const mapDispatchToProps = (dispatch, action) => {
  return {
    handleReplyComment() {

    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentList)
