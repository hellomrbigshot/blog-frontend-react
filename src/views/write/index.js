import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Form, Select, Input, Switch, Button } from 'antd'
import { Redirect } from 'react-router-dom'
import CreateTag from './components/createTag'
import { fetch } from '../../common'

const { Option } = Select
const { TextArea } = Input

const WriteForm = Form.create({
    name: 'write',
    onFieldsChange(props, changedFields, allFields) {
        // props.onChange(changedFields, allFields)
    },
    mapPropsToFields(props) {
        return {
            title: Form.createFormField({
                value: props.articleDetail.title
            }),
            tags: Form.createFormField({
                value: props.articleDetail.tags
            }),
            content: Form.createFormField({
                value: props.articleDetail.content
            }),
            secret: Form.createFormField({
                value: props.articleDetail.secret
            })
        }
    }
})(props => {
    const { getFieldDecorator } = props.form
    const submit = (type) => {
        props.form.validateFields((error, values) => {
            if (!error) {
                props.submit({ ...values, status: type === 'draft' ? 'draft' : 'normal' })
            }
        })
    }
    return (
        <Form>
            <Form.Item>
                {getFieldDecorator('title', {
                    rules: [{ required: true, message: '请输入文章标题' }]
                })(<Input size="large" onChange={props.titleChange} placeholder="请输入标题" />)}
            </Form.Item>
            <Form.Item>
                {getFieldDecorator('tags', {
                    rules: [{ required: true, type: 'array', message: '请选择标签' }]
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
            <Form.Item>
                {getFieldDecorator('content', {
                    rules: [{ required: true, message: '请输入文章内容' }]
                })(<TextArea onChange={props.contentChange} rows={14} />)}
            </Form.Item>
            <Form.Item label="是否私密：" labelCol={{span: 3}} wrapperCol={{span: 3}}>
                {getFieldDecorator('secret', {
                    rules: [{ required: true, message: '请选择是否私密' }]
                })(<Switch onChange={props.secretChange} />)}
            </Form.Item>
            <Form.Item>
                <Button size="large" onClick={()=>submit('draft')}>保存草稿</Button>
                <Button type="primary" size="large" style={{marginLeft: '10px'}} onClick={submit}>发布</Button>
            </Form.Item>
        </Form>
    )
})

class Write extends Component {
    state = {
        tagInfo: {
            name: '',
            description: ''
        },
        tagList: [],
        visible: false,
        id: '',
        articleDetail: {
            status: '',
            secret: false,
            title: '',
            content: '',
            tags: []
        }
    }
    constructor() {
        super()
    }
    render() {
        const { user } = this.props
        const fields = this.state
        const { tagInfo, visible } = this.state
        return !user ? (
            <Redirect to={{ pathname: '/login', query: { redirect: '/write' } }} />
        ) : (
            <Fragment>
                <WriteForm 
                    {...fields} 
                    tagSelect={this.tagSelect} 
                    tagChange={this.tagChange}
                    titleChange={this.titleChange}
                    contentChange={this.contentChange}
                    secretChange={this.secretChange}
                    submit={this.submit} 
                />
                <CreateTag 
                    visible={visible} 
                    tagInfo={tagInfo} 
                    cancel={this.handleTagCancel} 
                    submit={this.handleTagSubmit} 
                />
            </Fragment>
        )
    }
    componentDidMount() {
        const id = this.props.match.params ? this.props.match.params.id : null
        this.setState({
            id
        })
        this.getTagList()
        if (id) {
            this.getArticleDetail(id)
        }
    }
    getArticleDetail(id) {
        fetch.post('/api/page/detail', { id }).then(res => {
            this.setState({
                articleDetail: res.data.data
            })
        }).catch(e => {
            console.log(e.message)
        })
    }
    tagSelect = tag => {
        const tagList = this.state.tagList
        if (tagList.indexOf(tag) === -1) {
            // 添加一个新的 tag
            this.setState({
                tagInfo: {
                    name: tag,
                    description: ''
                },
                visible: true
            })
        }
    }
    tagChange = tags => {
        const detail = JSON.parse(JSON.stringify(this.state.articleDetail))
        detail.tags = tags
        this.setState({
            articleDetail: detail
        })
    }
    titleChange = e => {
        console.log('trigger')
        const detail = JSON.parse(JSON.stringify(this.state.articleDetail))
        detail.title = e.target.value
        this.setState({
            articleDetail: detail
        })
    }
    contentChange = e => {
        const detail = JSON.parse(JSON.stringify(this.state.articleDetail))
        detail.content = e.target.value
        this.setState({
            articleDetail: detail
        })
    }
    secretChange = value => {
        const detail = JSON.parse(JSON.stringify(this.state.articleDetail))
        detail.secret = value
        this.setState({
            articleDetail: detail
        })
    }
    handleTagCancel = () => { // 删除添加的 tag
        const { articleDetail, tagInfo } = this.state
        const detail = JSON.parse(JSON.stringify(articleDetail))
        detail.tags = detail.tags.remove(tagInfo.name)
        this.setState({
            articleDetail: detail,
            tagInfo: {
                name: '',
                description: ''
            },
            visible: false
        })
    }
    getTagList = () => { // 获取 tag 列表
        fetch.post('/api/tag/alltags').then(res => {
            this.setState({
                tagList: res.data.data
            })
        }).catch(e => {
            console.log(e)
        })
    }
    handleTagSubmit = (values) => { // 新建 tag
        fetch.post('/api/tag/create', values).then(res => {
            this.setState({
                tagInfo: {
                    name: '',
                    description: ''
                },
                visible: false
            })
            this.getTagList()
        }).catch(e => {
            console.log(e)
        })
    }
    submit = (values) => { // 提交新建表单
        const sendData = Object.assign(this.state.articleDetail, values)
        let url = null
        if (sendData._id) {
            url = '/api/page/edit'
            sendData.id = sendData.id
        } else {
            url = '/api/page/new'
        }
        fetch.post(url, sendData).then(res => {
            if (sendData.status === 'normal') {
                this.props.history.push({ pathname: `/detail/${res.data.data.id}` })
            } else {
                this.props.history.push('/user/draft')
            }
        }).catch(e => {
            console.log(e.message)
        })
    }
}

const mapStateToProps = state => {
    return {
        user: state.getIn(['user', 'user']),
    }
}

export default connect(
    mapStateToProps
)(Write)
