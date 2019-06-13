import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import classnames from 'classnames'
import { HeaderWrapper, Logo, SearchWrapper, Nav, NavSearch, NavItem, Addition, Button, AvatarWrapper, AvatarContent } from './style'
import { actionCreators } from './store'


class Header extends Component {
  render() {
    const { inputFocus, inputBlur, focused, location: { pathname }, user } = this.props
    const hideHeaderPath = ['/login', '/register']
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
              />
            </CSSTransition>
            <i className={classnames('iconfont', 'icon-fangdajing', {focused: focused})} />
          </SearchWrapper>
          <NavItem className="first-nav">标签</NavItem>
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
            <AvatarWrapper>
              <AvatarContent src={`/api/file/avatar/user/?username=${user}`}/>
            </AvatarWrapper> :
            (
              <Fragment>
                <Link to="register">
                  <Button className="reg">注册</Button>
                </Link>
                <Link to="login">
                  <Button className="login">登录</Button>
                </Link>
              </Fragment>
            )
          }
        </Addition>
      </HeaderWrapper>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    focused: state.getIn(['header', 'focused']),
    user: state.getIn(['user', 'user'])
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    inputFocus() {
      dispatch(actionCreators.searchFocus())
    },
    inputBlur() {
      dispatch(actionCreators.searchBlur())
    }
  }
}
// export default connect(mapStateToProps, mapDispatchToProps)(Header)
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))