import React, { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Form } from '@ant-design/compatible'
import '@ant-design/compatible/assets/index.css'
import { Input, Button } from 'antd'
import { LoginWrapper, LoginBox, LoginInfo, Logo } from './styled'
import { actionCreators } from './store'
import { useQuery } from '../../common'

function RegisterForm({ form }) {
  const dispatch = useDispatch()
  const user = useSelector(state => state.getIn(['user', 'user']))
  const queryRedirect = useQuery('redirect')
  const redirectUrl = queryRedirect ? decodeURIComponent(queryRedirect) : null
  const loginPath = queryRedirect ? `/login?redirect=${encodeURIComponent(redirectUrl)}` : '/register'
  const { getFieldDecorator } = form
  const compareToFirstPassword = useCallback(
    (rule, value, callback) => {
      // 比较两次密码
      if (value && value !== form.getFieldValue('password')) {
        callback('Two passwords that you enter is inconsistent!')
      } else {
        callback()
      }
    },
    [form]
  )
  const handleSubmit = useCallback(
    e => {
      e.preventDefault()
      form.validateFields((err, values) => {
        if (!err) {
          dispatch(actionCreators.register(values))
        }
      })
    },
    [dispatch, form]
  )
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
        <Form onSubmit={handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [
                {
                  required: true,
                  message: 'Please input your username!'
                }
              ]
            })(
              <Input
                prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                size="large"
                placeholder="请输入账号"
                autoComplete="new-password"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: 'Please input your Password!'
                }
              ]
            })(
              <Input.Password
                prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                size="large"
                placeholder="请输入密码"
                autoComplete="new-password"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('repassword', {
              rules: [
                {
                  required: true,
                  message: 'Please confirm your password!'
                },
                {
                  validator: compareToFirstPassword
                }
              ]
            })(
              <Input.Password
                prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                size="large"
                placeholder="请确认密码"
                autoComplete="new-password"
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button
              shape="round"
              style={{ background: '#3db922', color: '#fff' }}
              htmlType="submit"
              block
              size="large"
              onClick={handleSubmit}
            >
              注册
            </Button>
          </Form.Item>
        </Form>
      </LoginBox>
    </LoginWrapper>
  )
}

const WrappedNormalRegisterForm = Form.create({ name: 'normal_register' })(RegisterForm)

export default WrappedNormalRegisterForm
