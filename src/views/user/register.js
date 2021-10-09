import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Input, Button, Form } from 'antd'
import { LoginWrapper, LoginBox, LoginInfo, Logo } from './styled'
import { actionCreators } from './store'
import { useQuery } from '../../common'

const RegisterForm = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.getIn(['user', 'user']))
  const queryRedirect = useQuery('redirect')
  const redirectUrl = queryRedirect ? decodeURIComponent(queryRedirect) : null
  const loginPath = queryRedirect ? `/login?redirect=${encodeURIComponent(redirectUrl)}` : '/register'
  const handleSubmit = (values) => {
    dispatch(actionCreators.register(values))
  }
  return user ? (
    <Redirect to={redirectUrl ? redirectUrl : '/'} />
  ) : (
    <LoginWrapper>
      <Link to="/">
        <Logo />
      </Link>
      <LoginBox>
        <LoginInfo>
          <Link to={loginPath}>登录</Link>
          <b>·</b>
          <Link to="/register" className="active">
            注册
          </Link>
        </LoginInfo>
        <Form className="login-form" onFinish={handleSubmit}>
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
              shape="round"
              style={{ background: '#3db922', color: '#fff' }}
              htmlType="submit"
              block
              size="large"
            >
              注册
            </Button>
          </Form.Item>
        </Form>
      </LoginBox>
    </LoginWrapper>
  )
}

export default RegisterForm
