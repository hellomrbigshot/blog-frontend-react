import React, { Component } from 'react'
import { connect } from 'react-redux'

class Comment extends Component {
  render() {
    const { user } = this.props
    return (
      <div></div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.getIn(['user', 'user'])
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment)
