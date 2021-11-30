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
          <NavWrapper className={classnames({ 'show-nav-list': showSideNav })}>
            <NavHeader>
              <h3>目录</h3>
              <i className="iconfont icon-arrow-right" onClick={() => setShowSideNav(false)}/>
            </NavHeader>
            {
              navList.map((item) => (
                <NavItem
                  title={item.text}
                  key={`h${item.level}-${item.no}`}
                  id={`linkToh${item.level}${item.no}`}
                  className='blog-nav-header'
                  onClick={() => toHeader(`h${item.level}-${item.no}`)}
                >
                  <pre>
                  { `${('  ').repeat(item.level - rootLevel) + item.text.replaceAll(/<([a-z]*)?\/?([a-z]*)?>/g, '')}` }
                  </pre>
                </NavItem>
              ))
            }
          </NavWrapper>
        </Fragment>
      )
    : null
}

export default ArticleDetailNav
