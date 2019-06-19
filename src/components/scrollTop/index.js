import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class ScrollToTop extends Component {
  render() {
    return null
  }
  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0)
    }
  }
}

export default withRouter(ScrollToTop)