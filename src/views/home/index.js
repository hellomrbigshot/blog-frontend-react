import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actionCreators} from './store'

class Home extends Component {
  render() {
    return (
      <div>home</div>
    )
  }
  componentDidMount() {
    this.props.getArticleList()
  }
}

const mapStateToProps = (state) => {
  return {
    articleList: state.getIn(['home', 'articleList']),
    total: state.getIn(['home', 'total'])
  }
}

const mapDispatchToProps = (dispatch) => {
  return {  
    getArticleList() {
      dispatch(actionCreators.getArticleList())
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)