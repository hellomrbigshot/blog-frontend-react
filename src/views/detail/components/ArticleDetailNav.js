import React from 'react'
import { useSelector } from 'react-redux'
import { NavWrapper, NavItem, NavHeader } from '../styled'
function ArticleDetailNav () {
  const navList = useSelector(state => state.getIn(['detail', 'navInfo', 'navList']))
  const showSideNav = !!navList.size
  const rootLevel = Math.min(...navList.map(item => item.level))
  const toHeader = (id) => {
    document.getElementById(id).scrollIntoView({
      // behavior: 'smooth',
      block: 'end'
    })
  }
  return showSideNav ? (
    <NavWrapper>
      <NavHeader>
        <h3>目录</h3>
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
            { `${('  ').repeat(item.level - rootLevel) + item.text}` }
            </pre>
          </NavItem>
        ))
      }
    </NavWrapper>
  ) : null
}

export default ArticleDetailNav
