import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Pagination, Avatar } from 'antd'
import { Link } from 'react-router-dom'
import { getUserInfo, getLimitArticleList } from './store/actionCreators'
import { UserInfoWrapper, UserAvatarWrapper, UserInfoDetailWrapper, BioWrapper, LimitArticleList, LimitArticleItem } from './styled'

class UserInfo extends Component {
    render() {
        const { total, getLimitArticleList, userInfo, articleList } = this.props
        const user = this.props.match.params.name
        return (
            <div>
                <UserInfoWrapper>
                    <UserAvatarWrapper>
                        <Avatar size={150} src={`/api/file/avatar/user/?username=${user}`} />
                    </UserAvatarWrapper>
                    <UserInfoDetailWrapper>
                        <h2>{user}</h2>
                        <BioWrapper>{userInfo.get('bio')}</BioWrapper>
                    </UserInfoDetailWrapper>
                </UserInfoWrapper>
                <LimitArticleList>
                    <h2>相关文章</h2>
                    {articleList.map(article => (
                        <LimitArticleItem key={article.get('_id')}>
                            <Link to={`/detail/${article.get('_id')}`}>
                                <div className="time">{article.get('create_time').slice(5, 10)}</div>
                                <div className="title">{article.get('title')}</div>
                            </Link>
                        </LimitArticleItem>
                    ))}
                </LimitArticleList>
                {total > 10 ? <Pagination total={total} onChange={getLimitArticleList} /> : null}
            </div>
        )
    }
    componentDidMount() {
        const user = this.props.match.params.name
        this.props.getUserInfo(user)
        this.props.getLimitArticleList()
    }
}

const mapStateToProps = state => {
    return {
        articleList: state.getIn(['user', 'userInfo', 'articleList']),
        userInfo: state.getIn(['user', 'userInfo', 'info']),
        total: state.getIn(['user', 'userInfo', 'total'])
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        getUserInfo() {
            const name = props.match.params.name
            dispatch(getUserInfo(name))
        },
        getLimitArticleList(page = 1) {
            const name = props.match.params.name
            dispatch(getLimitArticleList(name, page))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserInfo)
