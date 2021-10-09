import React, { useEffect } from 'react'
import { Modal, Input, Form } from 'antd'

const { TextArea } = Input

const CreateTagModal = ({ visible, tagModalLoading, tagInfo, cancel, submit }) => {
  const [form] = Form.useForm()
  useEffect(() => {
    if (visible) {
      form.setFieldsValue(tagInfo)
    }
  }, [visible])
  const handleOk = async (e) => {
    try {
      const values = await form.validateFields()
      submit(values)
    } catch (e) {}
  }
  const handleCancel = () => {
    cancel()
  }
  return (
    <Modal
      title="添加标签"
      visible={visible}
      forceRender
      tagModalLoading={tagModalLoading}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="确定"
      cancelText="取消"
    >
      <Form
        form={form}
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 20 }}
      >
        <Form.Item
          label="标签"
          name="name"
          rules={[{ required: true, message: '请输入标签名' }]}
        >
          <Input disabled={true} placeholder="请输入标签名" />
        </Form.Item>
        <Form.Item
          label="描述"
          name="description"
          rules={[{ required: true, message: '请输入标签描述' }]}
        >
          <TextArea rows={4} placeholder="请输入标签描述" />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CreateTagModal
