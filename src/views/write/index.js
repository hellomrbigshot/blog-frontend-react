import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Form, Select, Input, Switch, Modal } from 'antd'
import { Redirect } from 'react-router-dom'
import { actionCreators } from './store'

const { Option } = Select

class Write extends Component {
    state = {
        ModalText: 'Content of the modal',
        visible: false,
        confirmLoading: false
    }
    constructor() {
        super()
    }
    render() {
        const { user, tagList } = this.props
        const { visible, confirmLoading } = this.state
        return !user ? (
            <Redirect to={{ pathname: '/login', query: { redirect: '/write' } }} />
        ) : (
            <Fragment>
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
                            mode="tags"
                            filterOption
                            onSelect={this.tagSelect}
                        >
                            {tagList.map(tag => (
                                <Option key={tag} value={tag}>
                                    {tag}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
                <Modal
                    title="添加标签"
                    visible={visible}
                    onOk={this.handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancel}
                >
                    <p>新增标签</p>
                </Modal>
            </Fragment>
        )
    }
    tagSelect = tag => {
        const tagList = this.props.tagList
        if (tagList.indexOf(tag) === -1) {
            // 添加一个新的 tag
            this.setState({
                visible: true
            })
        }
    }
    handleOk() {}
    handleCancel() {}
    componentDidMount() {
        this.props.getTagList()
    }
}

const mapStateToProps = state => {
    return {
        user: state.getIn(['user', 'user']),
        tagList: state.getIn(['write', 'tagList'])
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getTagList() {
            dispatch(actionCreators.getTagList())
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Write)
