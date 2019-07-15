import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import classnames from 'classnames'
import {
    HeaderWrapper,
    Logo,
    SearchWrapper,
    Nav,
    NavSearch,
    NavItem,
    Addition,
    Button,
    AvatarWrapper,
    AvatarContent,
    DropdownWrapper,
    DropdownItem
} from './style'
import { actionCreators } from './store'
import { actionCreators as loginCreator } from '../../views/user/store'

class Header extends Component {
    render() {
        const {
            inputFocus,
            inputBlur,
            focused,
            location: { pathname },
            user,
            mouseIn,
            handleMouseEnter,
            handleMouseLeave
        } = this.props
        const hideHeaderPath = ['/login', '/register', '/404']
        const hideHeader = hideHeaderPath.includes(pathname.trim())
        return hideHeader ? null : (
            <HeaderWrapper>
                <Link to="/">
                    <Logo />
                </Link>
                <Nav>
                    <SearchWrapper>
                        <CSSTransition in={focused} timeout={400} classNames="slide">
                            <NavSearch
                                placeholder="搜索"
                                onFocus={inputFocus}
                                onBlur={inputBlur}
                                className={focused ? 'focused' : ''}
                                ref={input => {
                                    this.keywords = input
                                }}
                                onKeyDown={event => this.handleKeyDown(event, this.keywords)}
                            />
                        </CSSTransition>
                        <i
                            onClick={() => this.handleSearch(this.keywords)}
                            className={classnames('iconfont', 'icon-fangdajing', { focused: focused })}
                        />
                    </SearchWrapper>
                    <NavItem className="first-nav">
                        <Link to="/tag/list">标签</Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/comment/list">留言</Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/">待办</Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/">实验室</Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/">关于</Link>
                    </NavItem>
                </Nav>
                <Addition>
                    <Link to="/write">
                        <Button className="write">
                            <i className={classnames('iconfont', 'icon-yumaobi')} />
                            写文章
                        </Button>
                    </Link>
                    {user ? (
                        <AvatarWrapper onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                            <AvatarContent src={`/api/file/avatar/user/?username=${user}`} />
                            {mouseIn ? this.getDropDown() : null}
                        </AvatarWrapper>
                    ) : (
                        <Fragment>
                            <Link to="/register">
                                <Button className="reg">注册</Button>
                            </Link>
                            <Link to="/login">
                                <Button className="login">登录</Button>
                            </Link>
                        </Fragment>
                    )}
                </Addition>
            </HeaderWrapper>
        )
    }
    getDropDown() {
        const { logout, user } = this.props
        return (
            <DropdownWrapper>
                <DropdownItem style={{ marginTop: '5px' }}>
                    <Link to={`/user/info/${user}`}>
                        <i className="iconfont icon-UserSettings" />
                        <span>我的主页</span>
                    </Link>
                </DropdownItem>
                <DropdownItem>
                    <Link to="/user/list">
                        <i className="iconfont icon-blogs" />
                        <span>我的文章</span>
                    </Link>
                </DropdownItem>
                <DropdownItem>
                    <Link to="/user/draft">
                        <i className="iconfont icon-draft" />
                        <span>我的草稿</span>
                    </Link>
                </DropdownItem>
                <DropdownItem>
                    <Link to="/comment/list">
                        <i className="iconfont icon-comment" />
                        <span>我的评论</span>
                    </Link>
                </DropdownItem>
                <DropdownItem>
                    <Link to="/">
                        <i className="iconfont icon-todo" />
                        <span>我的待办</span>
                    </Link>
                </DropdownItem>
                <DropdownItem>
                    <div onClick={logout}>
                        <i className="iconfont icon-signout_detail_toil" />
                        <span>退出</span>
                    </div>
                </DropdownItem>
            </DropdownWrapper>
        )
    }
    handleKeyDown(event, keywords) {
        const KEYCODE = event.keyCode
        const KEYWORDS = keywords.value
        if (KEYCODE === 13 && KEYWORDS) {
            // enter 触发搜索
            this.props.history.push(`/home/${KEYWORDS}`)
        }
    }
    handleSearch(keywords) {
        if (keywords) {
            this.props.history.push(`/home/${keywords}`)
        }
    }
}

const mapStateToProps = state => {
    return {
        focused: state.getIn(['header', 'focused']),
        user: state.getIn(['user', 'user']),
        mouseIn: state.getIn(['header', 'mouseIn'])
    }
}
const mapDispatchToProps = dispatch => {
    return {
        inputFocus() {
            dispatch(actionCreators.searchFocus())
        },
        inputBlur() {
            dispatch(actionCreators.searchBlur())
        },
        logout() {
            dispatch(loginCreator.logout())
        },
        handleMouseEnter() {
            dispatch(actionCreators.mouseIn())
        },
        handleMouseLeave() {
            dispatch(actionCreators.mouseLeave())
        }
    }
}
// export default connect(mapStateToProps, mapDispatchToProps)(Header)
export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Header)
)
