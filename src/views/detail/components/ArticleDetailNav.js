import React, { useState, Fragment, useEffect } from 'react'
import { useSelector } from 'react-redux'
import classnames from 'classnames'
function ArticleDetailNav (props) {
  const navList = useSelector(state => state.getIn(['detail', 'navInfo', 'navList']))
  const [showSideNav, setShowSideNav] = useState(true)
  const { activeNavId } = props
  const rootLevel = Math.min(...navList.map(item => item.level))
  useEffect(() => {
    if (activeNavId) {
      const navEle = document.getElementById(activeNavId)
      navEle && navEle.scrollIntoView({
        // behavior: 'smooth',
        block: 'center'
      })
    }
  }, [activeNavId])
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
            <i
              title="点击显示标题导航栏"
              className="iconfont icon-mulu text-2xl fixed top-1/2  right-5 -mt-4 cursor-pointer hover:text-blue-400"
              onClick={() => setShowSideNav(true)}
            />
          )}
          <div className={classnames({ 'w-60 opacity-100': showSideNav }, 'fixed z-10 rounded top-1/2 -mt-40 h-80 w-0 right-4 shadow-sm opacity-0 bg-white flex flex-col overflow-hidden transition-all')}>
            <div className='text-base font-medium flex mb-3 items-center shadow-sm px-2.5 pt-2.5'>
              <h3 className='flex-1'>目录</h3>
              <i className="iconfont icon-arrow-right text-xl cursor-pointer rounded hover:text-blue-400" onClick={() => setShowSideNav(false)}/>
            </div>
            <div className='flex-1 overflow-y-scroll'>
              {
                navList.map((item) => (
                  <div
                    title={item.text}
                    key={`h${item.level}-${item.no}`}
                    id={`linkToh${item.level}${item.no}`}
                    className={classnames({ 'w-full py-1 box-border rounded-sm text-sm overflow-hidden font-medium cursor-pointer px-2.5 hover:bg-gray-100': true,  'text-blue-400': activeNavId === `linkToh${item.level}${item.no}` })}
                    onClick={() => toHeader(`h${item.level}-${item.no}`)}
                  >
                    <pre className='overflow-ellipsis'>
                    { `${('  ').repeat(item.level - rootLevel) + item.text.replaceAll(/<([a-z]*)?\/?([a-z]*)?>/g, '')}` }
                    </pre>
                  </div>
                ))
              }
            </div>
          </div>
        </Fragment>
      )
    : null
}

export default ArticleDetailNav
