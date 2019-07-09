import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Tabs, Pagination } from 'antd'
import { Redirect } from 'react-router-dom'
import showCommentList from './components/commentList'
import { actionCreators } from './store'

const { TabPane } = Tabs

class Comment extends Component {
    render() {
        const { user, getCommentList, total, commentList } = this.props
        return !user ? (
            <Redirect to={{ pathname: '/login', query: { redirect: '/comment/list' } }} />
        ) : (
            <Tabs defaultActiveKey="to_user" onChange={key => getCommentList(key, 1)}>
                <TabPane tab="我收到的" key="to_user">
                    {showCommentList(commentList, this.props.history.push, 'to_user')}
                    {total > 10 ? (
                        <Pagination style={{ marginTop: '20px' }} total={total} onChange={page => getCommentList('to_user', page)} />
                    ) : null}
                </TabPane>
                <TabPane tab="我发起的" key="create_user">
                    {showCommentList(commentList, this.props.history.push, 'create_user')}
                    {total > 10 ? (
                        <Pagination style={{ marginTop: '20px' }} total={total} onChange={page => getCommentList('create_user', page)} />
                    ) : null}
                </TabPane>
            </Tabs>
        )
    }
    componentDidMount() {
        this.props.getCommentList('to_user', 1)
    }
}

const mapStateToProps = state => {
    return {
        user: state.getIn(['user', 'user']),
        commentList: state.getIn(['comment', 'commentList']),
        total: state.getIn(['comment', 'total'])
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getCommentList(type, page) {
            dispatch(actionCreators.getCommentList(type, page))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Comment)
