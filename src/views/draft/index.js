import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actionCreators } from './store'


class Draft extends Component {
  render() {
    return (
      <div>draft</div>
    )
  }
  componentDidMount() {
    this.props.getDraftList()
  }
}

const mapStateToProps = (state) => {
  return {
    draftList: state.getIn(['draft', 'draftList'])
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getDraftList() {
      dispatch(actionCreators.getDraftList())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Draft) 
