import React, { Component } from 'react'
import { TagWrapper } from './styled'
import { connect } from 'react-redux'
import { actionCreators } from './store'

class TagList extends Component {
  render() {
    return (
      <TagWrapper>
        
      </TagWrapper>
    )
  }
  componentDidMount() {
    this.props.getTagList()
  }
}
const mapStateToProps = (state) => {
  return {
    tagList: state.getIn(['tag', 'tagList']),
    total: state.getIn(['tag', 'total'])
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getTagList() {
      dispatch(actionCreators.getTagList())
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TagList)