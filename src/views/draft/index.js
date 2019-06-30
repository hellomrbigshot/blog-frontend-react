import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import { actionCreators } from './store'
import { DraftWrapper, DraftList, DraftItem } from './styled'
import { formatTime } from '../../common'


class Draft extends Component {
  render() {
    const { user, draftList } = this.props
    return (
      !user ? 
      <Redirect to={{ pathname: '/login', query: { redirect: '/draft' }}} /> :
      <DraftWrapper>
        <h2>草稿箱</h2>
        <DraftList>
          {
            draftList.map(draft => (
              <DraftItem key={draft.get('_id')}>
                <div className="draft-title">
                  <Link to="">{draft.get('title')}</Link>
                </div>
                <div className="draft-time">更新于 {formatTime(draft.get('update_time'))}</div>
              </DraftItem>
            ))
          }
        </DraftList>
      </DraftWrapper>
    )
  }
  componentDidMount() {
    this.props.getDraftList()
  }
}

const mapStateToProps = (state) => {
  return {
    draftList: state.getIn(['draft', 'draftList']),
    user: state.getIn(['user', 'user'])
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
