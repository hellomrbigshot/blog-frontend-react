import React from 'react'
import { useDispatch } from 'react-redux'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Input, Button, Form } from 'antd'
import { actionCreators } from './store'
import SignWrapper from './components/SignWrapper'

const RegisterForm = () => {
  const dispatch = useDispatch()
  const handleSubmit = values => dispatch(actionCreators.register(values))
  return (
    <SignWrapper type="SIGNUP">
      <Form className="mt-10" onFinish={handleSubmit}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: '请输入账号!' }]}
        >
          <Input
            prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
            size="large"
            placeholder="请输入账号"
            autoComplete="new-password"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: '请输入密码!' }]}
        >
          <Input.Password
            prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
            size="large"
            placeholder="请输入密码"
            autoComplete="new-password"
          />
        </Form.Item>
        <Form.Item
          name="repassword"
          rules= {[
            { required: true, message: '请确认密码!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('密码不一致!'));
              },
            })
          ]}
        >
          <Input.Password
            prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
            size="large"
            placeholder="请确认密码"
            autoComplete="new-password"
          />
        </Form.Item>
        <Form.Item>
          <Button
            htmlType="submit"
            block
            size="large"
            type="primary"
          >注册</Button>
        </Form.Item>
      </Form> 
    </SignWrapper>
  )
}

export default RegisterForm
