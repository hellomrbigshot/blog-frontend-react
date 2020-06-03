import React from 'react'
import { Form } from '@ant-design/compatible'
import '@ant-design/compatible/assets/index.css'
import { Modal, Input } from 'antd';

const { TextArea } = Input

function CreateTag({ visible, tagModalLoading, tagInfo, form: { getFieldDecorator, validateFields }, cancel, submit }) {
  const handleOk = e => {
    e.preventDefault()
    validateFields((err, values) => {
      if (!err) {
        submit(values)
      }
    })
  }
  const handleCancel = () => {
    cancel()
  }
  return (
    <Modal
      title="添加标签"
      visible={visible}
      tagModalLoading={tagModalLoading}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form labelCol={{ span: 3 }} wrapperCol={{ span: 20 }} onSubmit={handleOk}>
        <Form.Item label="标签">
          {getFieldDecorator('name', {
            initialValue: tagInfo.name,
            rules: [
              {
                required: true,
                message: '请输入标签名'
              }
            ]
          })(<Input disabled={true} placeholder="请输入标签名" />)}
        </Form.Item>
        <Form.Item label="描述">
          {getFieldDecorator('description', {
            rules: [
              {
                required: true,
                message: '请输入标签描述'
              }
            ]
          })(<TextArea rows={4} placeholder="请输入标签描述" />)}
        </Form.Item>
      </Form>
    </Modal>
  )
}

const WrappedCreateTag = Form.create({ name: 'create_tag' })(CreateTag)

export default WrappedCreateTag
