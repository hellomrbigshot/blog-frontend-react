import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
const Header = lazy(() => import('./components/Header'))
const Footer = lazy(() => import('./components/Footer'))
const Home = lazy(() => import('./views/home'))
const Detail = lazy(() => import('./views/detail'))
const SignIn = lazy(() => import('./views/user/signin'))
const SignUp = lazy(() => import('./views/user/signup'))
const NoMatch = lazy(() => import('./views/404'))
const ScrollToTop = lazy(() => import('./components/ScrollTop'))
const TagList = lazy(() => import('./views/tag'))
const TagDetail = lazy(() => import('./views/tag/detail'))
const CommentList = lazy(() => import('./views/comment'))
const Draft = lazy(() => import('./views/user/draft'))
const LimitList = lazy(() => import('./views/user/article'))
const UserInfo = lazy(() => import('./views/user'))
const Write = lazy(() => import('./views/write'))
const Lab = lazy(() => import('./views/lab'))
const Cup = lazy(() => import('./views/lab/cup'))
const ChangeLog = lazy(() => import('./views/ChangeLog'))
import themeInfo from './theme'
import { ThemeProvider } from 'styled-components'
import { useSelector } from 'react-redux'

import 'react-m-editor/dist/index.min.css'

function ThemeApp () {
  const theme = useSelector(state => state.getIn(['header', 'theme']))
  const handleInitDetail = (_, replace) => {
    replace({ path: '/tag/list' })
  }
  const style = {
    minHeight: 'calc(100vh - 129px)'
  }
  return (
    <ThemeProvider theme={themeInfo[theme]}>
       <Suspense fallback={<div>Loading...</div>}>
        <Router>
          <ScrollToTop />
          <Header/>
          <div style={{ background: themeInfo[theme].mainBg, overflow: 'auto', position: 'relative', zIndex: 1 }}>
            {/* <AppWrapper> */}
            <div className='py-9 mx-auto mt-24 w-11/12 lg:w-4/5 max-w-4xl' style={style}>
              <Switch>
                <Redirect exact from="/" to="/home" />
                <Route path="/home/:keywords?" component={Home} />
                <Route
                  path="/detail/:id/:refresh?"
                  component={Detail}
                  onEnter={handleInitDetail}
                />
                <Route path="/signin" exact component={SignIn} />
                <Route path="/signup" exact component={SignUp} />
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
            </div>
            {/* </AppWrapper> */}
          </div>
          <Footer />
        </Router>
      </Suspense>
    </ThemeProvider>
  )
}

export default ThemeApp
