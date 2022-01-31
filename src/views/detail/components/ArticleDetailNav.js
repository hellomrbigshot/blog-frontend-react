import React, { useState, Fragment } from 'react'
import { useSelector } from 'react-redux'
import { NavWrapper, NavItem, NavHeader, NavIcon } from '../styled'
import classnames from 'classnames'
function ArticleDetailNav () {
  const navList = useSelector(state => state.getIn(['detail', 'navInfo', 'navList']))
  const [showSideNav, setShowSideNav] = useState(true)
  const rootLevel = Math.min(...navList.map(item => item.level))
  const toHeader = (id) => {
    document.getElementById(id).scrollIntoView({
      // behavior: 'smooth',
      block: 'end'
    })
  }
  return !!navList.size
    ? (
        <Fragment>
          {showSideNav ? null : (
              <NavIcon
                title="点击显示标题导航栏"
                className="iconfont icon-mulu"
                onClick={() => setShowSideNav(true)}
              />
          )}
          <div className={classnames({ 'fixed z-10 rounded p-4 top-28 h-80 w-60 right-4 shadow-inner bg-white overflow-y-auto': true, 'show-nav-list': showSideNav })}>
            <div className='text-base font-medium flex mb-3 items-center'>
              <h3 className='flex-1'>目录</h3>
              <i className="iconfont icon-arrow-right text-xl" onClick={() => setShowSideNav(false)}/>
            </div>
            {
              navList.map((item) => (
                <div
                  title={item.text}
                  key={`h${item.level}-${item.no}`}
                  id={`linkToh${item.level}${item.no}`}
                  className='w-full p-2 box-border rounded-sm text-sm overflow-hidden font-medium cursor-pointer hover:bg-gray-100'
                  onClick={() => toHeader(`h${item.level}-${item.no}`)}
                >
                  <pre className='overflow-ellipsis'>
                  { `${('  ').repeat(item.level - rootLevel) + item.text.replaceAll(/<([a-z]*)?\/?([a-z]*)?>/g, '')}` }
                  </pre>
                </div>
              ))
            }
          </div>
        </Fragment>
      )
    : null
}

export default ArticleDetailNav
