import React, { Fragment, useEffect, useState, useCallback, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useHistory, useLocation } from 'react-router-dom'
import classnames from 'classnames'
import io from 'socket.io-client'
import Cookies from 'js-cookie'
import throttle from 'lodash/throttle'
import blackLogo from '../../statics/image/logo_black_transparent.png'
import { actionCreators } from './store'
import { actionCreators as loginCreator } from '../../views/user/store'

const navList = {
  '/tag/list': '标签',
  '/comment/list': '留言',
  '/lab/list': '实验室',
  '/changelog': '更新日志'
}

function Header () {
  const [showHeader, setShowHeader] = useState(true)
  const [beforeScrollTop, setBeforeScrollTop] = useState(0)
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
  const dropdownTimer = useRef()
  
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
  }, [user, socket, message, contentScroll])
  const getDropDown = () => {
    return (
      <div
        className={classnames('absolute right-0 top-12 w-36 shadow z-10 bg-white flex flex-col overflow-hidden box-border transition-all', { 'h-0 p-0': !mouseIn, 'py-3': mouseIn })}
        onMouseEnter={handleMouseIn}
        onMouseLeave={handleMouseLeave}
      >
        <div className='py-2 px-4 hover:bg-gray-200'>
          <Link className='text-sm text-gray-600 hover:text-gray-600' to={`/user/info/${user}`}>
            <i className="iconfont icon-UserSettings" />
            <span className='ml-2'>我的主页</span>
          </Link>
        </div>
        <div className='py-2 px-4 hover:bg-gray-200'>
          <Link className='text-sm text-gray-600 hover:text-gray-600' to="/user/list">
            <i className="iconfont icon-blogs" />
            <span className='ml-2'>我的文章</span>
          </Link>
        </div>
        <div className='py-2 px-4 hover:bg-gray-200'>
          <Link className='text-sm text-gray-600 hover:text-gray-600' to="/user/draft">
            <i className="iconfont icon-draft" />
            <span className='ml-2'>我的草稿</span>
          </Link>
        </div>
        <div className='py-2 px-4 hover:bg-gray-200'>
          <Link className='text-sm text-gray-600 hover:text-gray-600' to="/comment/list">
            <i className="iconfont icon-comment" />
            <span className='ml-2'>我的评论</span>
          </Link>
        </div>
        <div className='py-2 px-4 hover:bg-gray-200'>
          <a className='text-sm text-gray-600 hover:text-gray-600' onClick={() => dispatch(loginCreator.logout())}>
            <i className="iconfont icon-signout_detail_toil" />
            <span className='ml-2'>退出</span>
          </a>
        </div>
      </div>
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
  const handleMouseLeave = useCallback(() => {
    dropdownTimer.current = setTimeout(() => {
      dispatch(actionCreators.mouseLeave())
      dropdownTimer.current = undefined
    }, 300)
  })
  const handleMouseIn = useCallback(() => {
    if (dropdownTimer.current) {
      clearTimeout(dropdownTimer.current)
      console.log('dropdownTimeout', dropdownTimer.current)
    } else {
      dispatch(actionCreators.mouseIn())
    }
  })
  // const handleSwitch = val => {
  //   toggleAntdTheme(val ? 'light' : 'dark')
  //   dispatch(actionCreators.themeSwitch(val ? 'light' : 'dark'))
  // }
  const hideHeaderPath = ['/login', '/register', '/404']
  const hideHeader = hideHeaderPath.includes(pathname.trim())
  const vueIcon = `<use xlink:href='#icon-vue' />`
  return hideHeader ? null : (
    <div id="blogHeader" className={classnames('flex', 'items-center', 'h-15', 'shadow-sm', 'fixed', 'top-0', 'left-0', 'right-0', 'z-10', 'bg-white', 'transform', 'transition-transform', { '-translate-y-full': !showHeader })}>
      <Link to="/">
        <img src={blackLogo} alt="logo" className='w-36 px-4 mx-2 box-content' />
      </Link>
      <div className='flex-1 flex h-full'>
        {
          Object.keys(navList).map((key) => (
            <div className="text-base mx-5 h-full" key={key}>
              <Link
                to={key}
                className='box-border text-gray-600 border-b-3 border-solid border-transparent h-full flex items-center hover:text-gray-900 hover:border-blue-500'
              >{ navList[key] }</Link>
            </div>
          ))
        }
        <div className="text-base mx-5">
          <a href="https://vue.hellomrbigbigshot.xyz" className='box-border text-gray-600 border-b-3 border-solid border-transparent h-full flex items-center hover:text-gray-900 hover:border-blue-500'>
            <svg
              className="icon"
              style={{ fontSize: '22px' }}
              aria-hidden="true"
              dangerouslySetInnerHTML={{ __html: vueIcon }}
            />
            版本
          </a>
        </div>
        {/* <div>
          <Switch
            defaultChecked
            checkedChildren={<BulbTwoTone twoToneColor="#fff" />}
            unCheckedChildren={<BulbTwoTone twoToneColor="#fcee80" />}
            onChange={handleSwitch}
          />
        </div> */}
      </div>
      <div className='flex items-center'>
        <div className='flex w-72'>
          <div className={classnames('flex flex-1 items-center rounded overflow-hidden pr-2 border border-solid', {'border-blue-500 bg-white': focused, 'bg-gray-200 border-white': !focused})}>
            <input
              placeholder="搜索"
              onFocus={() => dispatch(actionCreators.searchFocus())}
              onBlur={() => dispatch(actionCreators.searchBlur())}
              className={classnames('text-xs', 'pl-3', 'py-2', 'bg-gray-200', 'outline-none', 'flex-1', 'h-8', 'focus:bg-white')}
              ref={input => {
                keywords = input
              }}
              onKeyDown={event => handleKeyDown(event, keywords)}
            />
            <i
              className={classnames('iconfont', 'icon-fangdajing', 'cursor-pointer', 'text-gray-400', { 'focused': focused })}
              onClick={() => handleSearch(keywords)}
            />
          </div>
          <Link
            className={classnames('rounded py-1 text-sm text-white font-500 h-8 bg-blue-500 overflow-hidden leading-6 hover:bg-blue-600 hover:text-white transition-all', { 'ml-4 px-5': !focused, 'w-0 px-0': focused })}
            to="/write"
          >写文章</Link>
        </div>
        {user ? (
          <Fragment>
            <Link to="/comment/list">
              <i
                className={classnames('iconfont icon-bell1 text-xl text-gray-500 ml-4', { 'icon-red': message > 0 })}
                number={message}
              />
            </Link>
            <div
              className='ml-4 mr-4 cursor-pointer relative'
              onMouseEnter={handleMouseIn}
              onMouseLeave={handleMouseLeave}
            >
              <img className='w-8 h-8 rounded-full' src={`/api/file/avatar/user/?username=${user}`} />
              {getDropDown()}
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <Link className='rounded border border-blue-500 px-5 py-0.75 text-sm text-blue-500 border-solid font-500 h-8 ml-4 mr-8 leading-6' to={`/login?redirect=${encodeURIComponent(pathname)}`}>登录</Link>
          </Fragment>
        )}
      </div>
    </div>
  )
}
export default Header
