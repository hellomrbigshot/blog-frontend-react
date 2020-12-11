import React, { useEffect, useState, useCallback } from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './views/home'
import Detail from './views/detail'
import Login from './views/user/login'
import Register from './views/user/register'
import NoMatch from './views/404'
import ScrollToTop from './components/ScrollTop'
import TagList from './views/tag'
import TagDetail from './views/tag/detail'
import CommentList from './views/comment'
import Draft from './views/user/draft'
import LimitList from './views/user/article'
import UserInfo from './views/user'
import Write from './views/write'
import Lab from './views/lab'
import Cup from './views/lab/cup'
import ChangeLog from './views/ChangeLog'
import { AppWrapper } from './style'
import { ThemeProvider } from 'styled-components'
import { useSelector } from 'react-redux'
import themeInfo from './theme'
import throttle from 'lodash/throttle'

function ThemeApp () {
  const theme = useSelector(state => state.getIn(['header', 'theme']))
  const [showHeader, setShowHeader] = useState(true)
  const [beforeScrollTop, setBeforeScrollTop] = useState(0)
  const handleInitDetail = (nextState, replace) => {
    // console.log(nextState)
    replace({ path: '/tag/list' })
  }
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
  useEffect(() => {
    window.addEventListener('scroll', contentScroll)
    return () => {
      window.removeEventListener('scroll', contentScroll)
    }
  }, [contentScroll])
  return (
    <ThemeProvider theme={themeInfo[theme]}>
      <Router>
        <ScrollToTop />
        <Header scrollShowHeader={showHeader}/>
        <div style={{ background: themeInfo[theme].mainBg, overflow: 'auto' }}>
          <AppWrapper>
            <Switch>
              <Redirect exact from="/" to="/home" />
              <Route path="/home/:keywords?" component={Home} />
              <Route
                path="/detail/:id/:refresh?"
                exact
                component={Detail}
                onEnter={handleInitDetail}
              />
              <Route path="/login" exact component={Login} />
              <Route path="/register" exact component={Register} />
              <Route path="/tag/list" exact component={TagList} />
              <Route path="/user/draft" exact component={Draft} />
              <Route path="/user/list" exact component={LimitList} />
              <Route path="/user/info/:name" exact component={UserInfo} />
              <Route path="/tag/detail/:tag" component={TagDetail} />
              <Route path="/comment/list" component={CommentList} />
              <Route path="/write" component={Write} />
              <Route path="/edit/:id" component={Write} />
              <Route path="/lab/list" component={Lab} />
              <Route path="/lab/cup" component={Cup} />
              <Route path="/404" exact component={NoMatch} />
              <Route path="/changelog" component={ChangeLog}/>
              <Redirect from="*" to="/404" />
            </Switch>
          </AppWrapper>
        </div>
        <Footer />
      </Router>
    </ThemeProvider>
  )
}

export default ThemeApp
