import React, { Component } from 'react'
import { connect } from 'react-redux'

class Detail extends Component {
  render() {
    console.log(this.props.match.params.id)
    return (
      <div>详情页</div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)