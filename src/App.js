import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import Header from './components/header'
import Home from './views/home'
import Detail from './views/detail'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Header />
          <div style={{paddingTop: '57px'}}>
            <Route path="/" exact component={Home}/>
            <Route path="/detail/:id" exact component={Detail}/>
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App
