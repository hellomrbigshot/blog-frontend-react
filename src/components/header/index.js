import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import classnames from 'classnames'
import { HeaderWrapper, Logo, SearchWrapper, Nav, NavSearch, NavItem, Addition, Button, AvatarWrapper, AvatarContent, DropdownWrapper, DrapdownItem } from './style'
import { actionCreators } from './store'
import { actionCreators as loginCreator } from '../../views/login/store'


class Header extends Component {
  render() {
    const { inputFocus, inputBlur, focused, location: { pathname }, user, mouseIn, handleMouseEnter, handleMouseLeave } = this.props
    const hideHeaderPath = ['/login', '/register', '/404']
    const hideHeader = hideHeaderPath.includes(pathname.trim())
    return hideHeader ? null : (
      <HeaderWrapper>
        <Link to="/">
          <Logo/>
        </Link>
        <Nav>
          <SearchWrapper>
            <CSSTransition 
              in={focused} 
              timeout={400}
              classNames="slide">
              <NavSearch 
                placeholder="搜索" 
                onFocus={inputFocus} 
                onBlur={inputBlur}
                className={focused ? 'focused' : ''}
                ref={input => {this.keywords = input}}
                onKeyDown={(event) => this.handleKeyDown(event, this.keywords)}
              />
            </CSSTransition>
            <i onClick={() => this.handleSearch(this.keywords)} className={classnames('iconfont', 'icon-fangdajing', {focused: focused})} />
          </SearchWrapper>
          <NavItem className="first-nav">
            <Link to="/tag/list">标签</Link>
          </NavItem>
          <NavItem>留言</NavItem>
          <NavItem>待办</NavItem>
          <NavItem>实验室</NavItem>
        </Nav>
        <Addition>
          <Link to="/write">
            <Button className="write">
              <i className={classnames('iconfont', 'icon-yumaobi')} />
              写文章
            </Button>
          </Link>
          {
            user ? 
            <AvatarWrapper 
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <AvatarContent src={`/api/file/avatar/user/?username=${user}`}/>
              {
                mouseIn ? this.getDropDown() : null
              }
            </AvatarWrapper> :
            (
              <Fragment>
                <Link to="/register">
                  <Button className="reg">注册</Button>
                </Link>
                <Link to="/login">
                  <Button className="login">登录</Button>
                </Link>
              </Fragment>
            )
          }
        </Addition>
      </HeaderWrapper>
    )
  }
  getDropDown() {
    const { logout } = this.props
    return (
      <DropdownWrapper>
        <DrapdownItem style={{marginTop: '5px'}}>
          <Link to="">
            <i className="iconfont icon-UserSettings" />
            <span>我的主页</span>
          </Link>
        </DrapdownItem>
        <DrapdownItem>
          <Link to="">
            <i className="iconfont icon-blogs" />
            <span>我的文章</span>
          </Link>
        </DrapdownItem>
        <DrapdownItem>
          <Link to="">
            <i className="iconfont icon-draft" />
            <span>我的草稿</span>
          </Link>
        </DrapdownItem>
        <DrapdownItem>
          <Link to="">
            <i className="iconfont icon-comment" />
            <span>我的评论</span>
          </Link>
        </DrapdownItem>
        <DrapdownItem>
          <Link to="">
            <i className="iconfont icon-todo" />
            <span>我的待办</span>
          </Link>
        </DrapdownItem>
        <DrapdownItem>
          <a href="#" onClick={logout}>
            <i className="iconfont icon-signout_detail_toil" />
            <span>退出</span>
          </a>
        </DrapdownItem>
      </DropdownWrapper>
    )
  }
  handleKeyDown(event, keywords) {
    const KEYCODE = event.keyCode
    const KEYWORDS = keywords.value
    if (KEYCODE === 13 && KEYWORDS) { // enter 触发搜索
      // this.props.history.push({ pathname: `/home?keywords=${encodeURIComponent(KEYWORDS)}` })
      this.props.history.push({ pathname: `/home`, query: { keywords: KEYWORDS }})
    }
  }
  handleSearch(keywords) {
    if (keywords) {

    }
  }
}

const mapStateToProps = (state) => {
  return {
    focused: state.getIn(['header', 'focused']),
    user: state.getIn(['user', 'user']),
    mouseIn: state.getIn(['header', 'mouseIn'])
  }
}
const mapDispatchToProps = (dispatch) => {
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))