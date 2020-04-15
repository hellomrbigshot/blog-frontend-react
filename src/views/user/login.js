import React, { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Form } from '@ant-design/compatible'
import '@ant-design/compatible/assets/index.css'
import { Input, Button } from 'antd'
import { LoginWrapper, LoginBox, LoginInfo, Logo } from './styled'
import { actionCreators } from './store'

function LoginForm({ location: { query }, form }) {
  const dispatch = useDispatch()
  const user = useSelector(state => state.getIn(['user', 'user']))
  const redirectUrl = query ? query.redirect : null
  const { getFieldDecorator } = form
  const registerPath = redirectUrl ? { pathname: '/register', query: { redirect: redirectUrl } } : '/register'
  const handleSubmit = useCallback(e => {
    e.preventDefault()
    form.validateFields((err, values) => {
      if (!err) {
        dispatch(actionCreators.login(values))
      }
    })
  }, [dispatch, form])
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
        <Form onSubmit={handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!' }]
            })(<Input prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} size="large" placeholder="请输入账号" />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }]
            })(<Input.Password prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} size="large" placeholder="请输入密码" />)}
          </Form.Item>
          <Form.Item>
            <Button shape="round" type="primary" htmlType="submit" block size="large" onClick={handleSubmit}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </LoginBox>
    </LoginWrapper>
  )
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(LoginForm)

export default WrappedNormalLoginForm
