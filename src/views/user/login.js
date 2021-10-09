import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Input, Button, Form } from 'antd'
import { LoginWrapper, LoginBox, LoginInfo, Logo } from './styled'
import { actionCreators } from './store'
import { useQuery } from '../../common'

const LoginForm = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.getIn(['user', 'user']))
  const queryRedirect = useQuery('redirect')
  const redirectUrl = queryRedirect ? decodeURIComponent(queryRedirect) : null
  const registerPath = queryRedirect ? `/register?redirect=${encodeURIComponent(redirectUrl)}` : '/register'
  const handleSubmit = (values) => {
    dispatch(actionCreators.login(values))
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
          <Link className="active" to="/login">
            登录
          </Link>
          <b>·</b>
          <Link to={registerPath}>注册</Link>
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
            <Button shape="round" type="primary" htmlType="submit" block size="large">
              登录
            </Button>
          </Form.Item>
        </Form>
      </LoginBox>
    </LoginWrapper>
  )
}

export default LoginForm
