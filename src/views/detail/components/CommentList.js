import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {
    CommentWrapper,
    CommentItem,
    CommentAvatar,
    CommentFloor,
    CommentContent,
    CommentContentDetail,
    CommentInfo,
    CommentInfoTime,
    ReplyContent,
    CommentAction,
    CommentReply,
    CommentReplyBtn
} from '../styled'
import { Avatar, Input } from 'antd'
import { formatTime } from '../../../common'
import { actionCreators } from '../store'

class CommentList extends Component {
    render() {
        const { commentList, articleDetail, handleReplyComment, handleSubmitReply, user } = this.props
        return (
            <CommentWrapper id="commentList">
                <h2>留言板：</h2>
                {commentList.map((comment, i) => (
                    <CommentItem key={comment.get('_id')}>
                        <CommentAvatar>
                            <Link to={`/user/info/${comment.get('create_user')}`}>
                                <Avatar
                                    size={40}
                                    src={`/api/file/avatar/user?username=${comment.get('create_user')}`}
                                    alt={comment.create_user}
                                />
                            </Link>
                            <CommentFloor>{commentList.size - i}楼</CommentFloor>
                        </CommentAvatar>
                        <CommentContent>
                            <CommentInfo>
                                <CommentInfoTime>{formatTime(comment.get('create_time'))}</CommentInfoTime>
                                <Link to={`/user/info/${comment.get('create_user')}`}>{comment.get('create_user')}</Link>
                            </CommentInfo>
                            {comment.get('reply_user') ? (
                                <ReplyContent>
                                    <Link to={`/user/info/${comment.get('reply_user')}`}>{comment.get('reply_user')}</Link>：{comment.get('reply_content')}
                                </ReplyContent>
                            ) : null}
                            <CommentContentDetail>{comment.get('content')}</CommentContentDetail>
                            <CommentAction>
                                <div onClick={() => handleReplyComment(i, user)}>回复</div>
                            </CommentAction>
                            {comment.get('showReplyInput') ? (
                                <CommentReply>
                                    <Input
                                        size="small"
                                        // ref={input=>this.replyContent=input}
                                        // placeholder={`回复${comment.get('create_user')}:`}
                                        onChange={this.handleInputChange.bind(this)}
                                        onPressEnter={() => handleSubmitReply(comment, i, this.replyContent, articleDetail)}
                                    />
                                    <div style={{ marginTop: '5px', display: 'flex', flexDirection: 'row-reverse' }}>
                                        <CommentReplyBtn
                                            type="primary"
                                            onClick={() => handleSubmitReply(comment, i, this.replyContent, articleDetail)}
                                        >
                                            提交
                                        </CommentReplyBtn>
                                    </div>
                                </CommentReply>
                            ) : null}
                        </CommentContent>
                    </CommentItem>
                ))}
            </CommentWrapper>
        )
    }
    handleInputChange(input) {
        // 获取 input 的值
        this.replyContent = input.target.value
    }
}

const mapStateToProps = state => {
    return {
        commentList: state.getIn(['detail', 'commentList']),
        articleDetail: state.getIn(['detail', 'detail']),
        user: state.getIn(['user', 'user'])
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        handleReplyComment(i, user) {
            !user && props.history.push({ pathname: '/login', query: { redirect: props.location.pathname } })
            dispatch(actionCreators.showReplyInput(i))
        },
        handleSubmitReply(comment, i, replyContent) {
            const formData = {
                content: replyContent,
                reply_user: comment.get('create_user'),
                reply_content: comment.get('content')
            }
            dispatch(actionCreators.handleSubmitComment(formData, i))
            document.querySelector('#commentList').scrollIntoView()
        }
    }
}

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(CommentList)
)
