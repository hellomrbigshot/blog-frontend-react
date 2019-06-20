import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import Header from './components/header'
import Home from './views/home'
import Detail from './views/detail'
import Login from './views/login'
import Register from './views/login/register'
import NoMatch from './views/404'
import ScrollToTop from './components/scrollTop'
import TagList from './views/tag'
import TagDetail from './views/tag/detail'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <ScrollToTop />
          <Header />
          <div style={{paddingTop: '57px', width: '800px', margin: '100px auto'}}>
            <Switch>
              <Redirect exact from="/" to="/home" />
              <Route path="/home" component={Home}/>
              <Route path="/detail/:id" exact component={Detail}/>
              <Route path="/login" exact component={Login}/>
              <Route path="/register" exact component={Register}/>
              <Route path="/tags/list" exact component={TagList}/>
              <Route path="/tags/detail/:tag" component={TagDetail}/>
              <Route path="/404" exact component={NoMatch}/>
              <Redirect from="*" to="/404"/>
            </Switch>
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App
