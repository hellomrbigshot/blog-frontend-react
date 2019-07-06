import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Select, Input, Switch } from 'antd'
import { Redirect } from 'react-router-dom'
import { actionCreators } from './store'

const { Option } = Select

class Write extends Component {
  render() {
    const { user, tagList } = this.props
    return !user ? <Redirect to={{pathname: '/login', query:{redirect: '/write'}}}/> : (
      <Form>
        <Form.Item>
          <Input size="large" placeholder="请输入标题" />
        </Form.Item>
        <Form.Item>
          <Select 
            size="large" 
            placeholder="请选择标签" 
            filterable
            allowClear
            autoClearSearchValue
            mode="multiple"
            filterOption
            onSelect={this.tagSelect}>
            {
              tagList.map(tag => (
                <Option key={tag} value={tag}>{tag}</Option>
              ))
            }
          </Select>
        </Form.Item>
      </Form>
    )
  }
  tagSelect = (tag) => {
    const tagList = this.props.tagList
    if (tagList.indexOf(tag) === -1) { // 添加一个新的 tag
      
    }
  }
  componentDidMount() {
    this.props.getTagList()
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.getIn(['user', 'user']),
    tagList: state.getIn(['write', 'tagList'])
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTagList() {
      dispatch(actionCreators.getTagList())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Write)
