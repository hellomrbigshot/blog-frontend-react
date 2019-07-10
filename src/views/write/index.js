import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Form, Select, Input, Switch, Modal } from 'antd'
import { Redirect } from 'react-router-dom'
import CreateTag from './components/createTag'
import { actionCreators } from './store'
import { cancelAddTag, changeTag } from './store/actionCreators'

const { Option } = Select

const WriteForm = Form.create({
    name: 'global_state',
    onFieldsChange(props, changedFields) {
        props.onChange(changedFields)
    },
    mapPropsToFields(props) {
        console.log(props)
        return {
            title: Form.createFormField({
                tags: props.articleDetail.get('title')
            }),
            tags: Form.createFormField({
                value: props.articleDetail.get('tags').toJS()
            }),
            content: Form.createFormField({
                value: props.articleDetail.get('content')
            })
        }
    }
})(props => {
    const { getFieldDecorator } = props.form
    return (
        <Form>
            <Form.Item>
                {getFieldDecorator('title', {
                    rules: [{ required: true, message: '请输入文章标题' }]
                })(<Input size="large" placeholder="请输入标题" />)}
            </Form.Item>
            <Form.Item>
                {getFieldDecorator('tags', {
                    rules: [{ required: true, message: '请选择标签' }]
                })(
                    <Select
                        size="large"
                        placeholder="请选择标签"
                        filterable
                        allowClear
                        autoClearSearchValue
                        mode="tags"
                        filterOption
                        onSelect={props.tagSelect}
                        onChange={props.tagChange}
                    >
                        {props.tagList.map(tag => (
                            <Option key={tag} value={tag}>
                                {tag}
                            </Option>
                        ))}
                    </Select>
                )}
            </Form.Item>
        </Form>
    )
})

class Write extends Component {
    state = {
        visible: false,
        tagInfo: {
            name: '',
            description: ''
        }
    }
    constructor() {
        super()
    }
    render() {
        const { user, tagList, handleTagSubmit, articleDetail, tagChange } = this.props
        const fields = this.props
        const { visible, tagInfo } = this.state
        return !user ? (
            <Redirect to={{ pathname: '/login', query: { redirect: '/write' } }} />
        ) : (
            <Fragment>
                <WriteForm {...fields} tagSelect={this.tagSelect} onChange={this.formChange} />
                <CreateTag visible={visible} tagInfo={tagInfo} cancel={this.handleTagCancel} submit={handleTagSubmit} />
            </Fragment>
        )
    }
    componentDidMount() {
        this.props.getTagList()
    }
    tagSelect = tag => {
        const tagList = this.props.tagList
        if (tagList.indexOf(tag) === -1) {
            // 添加一个新的 tag
            this.setState({
                visible: true,
                tagInfo: {
                    name: tag,
                    description: ''
                }
            })
        }
    }
    formChange = value => {
        console.log(value)
    }
    handleTagCancel = () => {
        const { cancelAddTag, articleDetail } = this.props
        cancelAddTag(this.state.tagInfo)
        this.setState({
            visible: false,
            tagInfo: {
                name: '',
                description: ''
            }
        })
    }
}

const mapStateToProps = state => {
    return {
        user: state.getIn(['user', 'user']),
        tagList: state.getIn(['write', 'tagList']),
        articleDetail: state.getIn(['write', 'articleDetail'])
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        getTagList() {
            dispatch(actionCreators.getTagList())
        },
        handleTagSubmit(tagInfo) {
            dispatch()
        },
        cancelAddTag(tagInfo) {
            // 删除新增的标签
            dispatch(cancelAddTag(tagInfo))
        },
        tagChange(tags) {
            dispatch(changeTag(tags))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Write)
