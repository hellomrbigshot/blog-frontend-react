import React, { Component } from 'react'
import { Modal, Form, Input } from 'antd'

const { TextArea } = Input

class CreateTag extends Component {
    state = {
        ModalText: 'Content of the modal',
        confirmLoading: false
    }
    constructor() {
        super()
    }
    render() {
        const { visible, confirmLoading, tagInfo, form: { getFieldDecorator }} = this.props
        return (
            <Modal
                title="添加标签"
                visible={visible}
                onOk={this.handleOk}
                confirmLoading={confirmLoading}
                onCancel={this.handleCancel}
            >
                <Form labelCol={{ span: 3 }} wrapperCol={{ span: 20 }} onSubmit={this.handleOk}>
                    <Form.Item label="标签">
                        {getFieldDecorator('name', {
                            initialValue: tagInfo.name,
                            rules: [
                                {
                                    required: true,
                                    message: '请输入标签名',
                                }
                            ]
                        })(<Input disabled={true} placeholder="请输入标签名"/>)}
                    </Form.Item>
                    <Form.Item label="描述">
                        {getFieldDecorator('description', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入标签描述',
                                }
                            ]
                        })(<TextArea rows={4} placeholder="请输入标签描述"/>)}
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
    handleOk = e => {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.handleTagSubmit(values)
            }
        })
    }
    handleCancel = () => {
        this.props.cancel()
    }
}

const WrappedCreateTag = Form.create({ name: 'create_tag' })(CreateTag)

export default WrappedCreateTag
