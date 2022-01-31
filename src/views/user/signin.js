import React from 'react'
import { useDispatch } from 'react-redux'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Input, Button, Form } from 'antd'
import { actionCreators } from './store'
import SignWrapper from './components/SignWrapper'

const SignInForm = () => {
  const dispatch = useDispatch()
  const handleSubmit = (values) => {
    dispatch(actionCreators.login(values))
  }
  return (
    <SignWrapper type="SIGNIN">
      <Form className='mt-10' onFinish={handleSubmit}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: '请输入账号!' }]}
        >
          <Input
            prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
            size="large"
            placeholder="请输入账号"
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
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block size="large">
            登录
          </Button>
        </Form.Item>
      </Form>
    </SignWrapper>
  )
}

export default SignInForm
