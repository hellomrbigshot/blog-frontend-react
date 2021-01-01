/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useEffect, useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import classnames from 'classnames'
import io from 'socket.io-client'
import Cookies from 'js-cookie'
import throttle from 'lodash/throttle'
// import { Switch } from 'antd'
// import { BulbTwoTone } from '@ant-design/icons'
// import toggleAntdTheme from '../../common/theme'
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
  DropdownItem,
  IconBell
} from './style'
import { actionCreators } from './store'
import { actionCreators as loginCreator } from '../../views/user/store'

function Header () {
  const [showHeader, setShowHeader] = useState(true)
  const [beforeScrollTop, setBeforeScrollTop] = useState(0)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const contentScroll = useCallback(throttle(() => {
    const root = document.documentElement
    const scrollTop = root.scrollTop
    if (scrollTop > beforeScrollTop) { // 向下滚动
      showHeader && scrollTop - 500 > 0 && setShowHeader(false)
    } else { // 向上滚动
      !showHeader && setShowHeader(true)
    }
    setBeforeScrollTop(scrollTop)
  }, 300, { leading: false }), [showHeader, beforeScrollTop, setShowHeader, setBeforeScrollTop])
  const dispatch = useDispatch()
  const history = useHistory()
  const { pathname } = useLocation()
  const focused = useSelector(state => state.getIn(['header', 'focused']))
  const user = useSelector(state => state.getIn(['user', 'user']))
  const mouseIn = useSelector(state => state.getIn(['header', 'mouseIn']))
  const socket = useSelector(state => state.getIn(['header', 'socket']))
  const message = useSelector(state => state.getIn(['header', 'message']))
  
  // useEffect(() => {
  //   window.addEventListener('scroll', contentScroll)
  //   return () => {
  //     window.removeEventListener('scroll', contentScroll)
  //   }
  // }, [contentScroll])
  let keywords = ''
  useEffect(() => {
    if (user && !socket) {
      let newSocket = io.connect(`${process.env.NODE_ENV === 'development' ? 'http://localhost:8082' : 'https://hellomrbigbigshot.xyz'}`, {
        reconnection: false, // 禁止自动重连
        query: `token=${Cookies.get('token')}`
      })
      newSocket.on('unread-comment', data => {
        dispatch(actionCreators.messageChange(data))
      })
      newSocket.on('connect_error', (error) => {
        console.log(error)
      })
      dispatch(actionCreators.socketInit(newSocket))
      newSocket.connect()
    } else {
      if (socket && !user) {
        console.log('disconnect')
        socket.disconnect()
        dispatch(actionCreators.socketInit(null))
      }
    }
    window.addEventListener('scroll', contentScroll)
    return () => {
      window.removeEventListener('scroll', contentScroll)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, socket, message, contentScroll])
  const getDropDown = () => {
    return (
      <DropdownWrapper
        className={mouseIn ? 'mouse-in' : ''}
        onMouseEnter={() => dispatch(actionCreators.mouseIn())}
        onMouseLeave={() => dispatch(actionCreators.mouseLeave())}
      >
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
          <a onClick={() => dispatch(loginCreator.logout())}>
            <i className="iconfont icon-signout_detail_toil" />
            <span>退出</span>
          </a>
        </DropdownItem>
      </DropdownWrapper>
    )
  }
  const handleKeyDown = (event, keywords) => {
    const KEYCODE = event.keyCode
    const KEYWORDS = keywords.value
    if (KEYCODE === 13 && KEYWORDS) {
      // enter 触发搜索
      history.push(`/home/${KEYWORDS}`)
    }
  }
  const handleSearch = keywords => {
    if (keywords) {
      history.push(`/home/${keywords.value}`)
    }
  }
  // const handleSwitch = val => {
  //   toggleAntdTheme(val ? 'light' : 'dark')
  //   dispatch(actionCreators.themeSwitch(val ? 'light' : 'dark'))
  // }
  const hideHeaderPath = ['/login', '/register', '/404']
  const hideHeader = hideHeaderPath.includes(pathname.trim())
  const vueIcon = `<use xlink:href='#icon-vue' />`
  return hideHeader ? null : (
    <HeaderWrapper className={classnames({ 'hide-header': !showHeader })}>
      <Link to="/">
        <Logo />
      </Link>
      <Nav>
        <SearchWrapper>
          <CSSTransition in={focused} timeout={400} classNames="slide">
            <NavSearch
              placeholder="搜索"
              onFocus={() => dispatch(actionCreators.searchFocus())}
              onBlur={() => dispatch(actionCreators.searchBlur())}
              className={focused ? 'focused' : ''}
              ref={input => {
                keywords = input
              }}
              onKeyDown={event => handleKeyDown(event, keywords)}
            />
          </CSSTransition>
          <i
            className={classnames('iconfont', 'icon-fangdajing', { focused: focused })}
            onClick={() => handleSearch(keywords)}
          />
        </SearchWrapper>
        <NavItem className="first-nav">
          <Link to="/tag/list">标签</Link>
        </NavItem>
        <NavItem>
          <Link to="/comment/list">留言</Link>
        </NavItem>
        <NavItem>
          <Link to="/lab/list">实验室</Link>
        </NavItem>
        <NavItem>
          <Link to="/changelog">更新日志</Link>
        </NavItem>
        <NavItem>
          <a href="https://vue.hellomrbigbigshot.xyz">
            <svg
              className="icon"
              style={{ fontSize: '16px' }}
              aria-hidden="true"
              dangerouslySetInnerHTML={{ __html: vueIcon }}
            />
            版本
          </a>
        </NavItem>
        {/* <NavItem>
          <Switch
            defaultChecked
            checkedChildren={<BulbTwoTone twoToneColor="#fff" />}
            unCheckedChildren={<BulbTwoTone twoToneColor="#fcee80" />}
            onChange={handleSwitch}
          />
        </NavItem> */}
      </Nav>
      <Addition>
        {user ? (
          <Fragment>
            <Link to="/comment/list">
              <IconBell
                className={classnames('iconfont', 'icon-bell1', { 'icon-red': message > 0 })}
                number={message}
              />
            </Link>
            <AvatarWrapper
              onMouseEnter={() => dispatch(actionCreators.mouseIn())}
              onMouseLeave={() => dispatch(actionCreators.mouseLeave())}
            >
              <AvatarContent src={`/api/file/avatar/user/?username=${user}`} />
              <CSSTransition in={mouseIn} timeout={400} classNames="fade">
                {getDropDown()}
              </CSSTransition>
            </AvatarWrapper>
          </Fragment>
        ) : (
          <Fragment>
            <Link to={`/login?redirect=${encodeURIComponent(pathname)}`}>
              <Button className="login">登录</Button>
            </Link>
            <Link to={`/register?redirect=${encodeURIComponent(pathname)}`}>
              <Button className="reg">注册</Button>
            </Link>
          </Fragment>
        )}
        <Link to="/write">
          <Button className="write">
            <i className={classnames('iconfont', 'icon-yumaobi')} />
            写文章
          </Button>
        </Link>
      </Addition>
    </HeaderWrapper>
  )
}
export default Header
