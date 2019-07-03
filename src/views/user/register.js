import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { Form, Input, Icon, Button } from 'antd'
import { LoginWrapper, LoginBox, LoginInfo, Logo } from './styled'
import { actionCreators } from './store'

class RegisterForm extends Component {
  render() {
    const { user, form: { getFieldDecorator }} = this.props
    const redirectUrl = this.props.location.query ? this.props.location.query.redirect : null
    return user ? 
      <Redirect to={redirectUrl?redirectUrl:'/'} /> : (
      <LoginWrapper>
        <Link to="/">
          <Logo/>
        </Link>
        <LoginBox>
          <LoginInfo>
            <Link to="/login">登录</Link>
            <b>·</b>
            <Link to="/register" className="active">注册</Link>
          </LoginInfo>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  size="large" 
                  placeholder="请输入账号"
                  autocomplete="new-password"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input.Password
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  size="large"
                  placeholder="请输入密码"
                  autocomplete="new-password"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('repassword', {
                rules: [
                  {
                    required: true,
                    message: 'Please confirm your password!',
                  },
                  {
                    validator: this.compareToFirstPassword,
                  },
                ]
              })(
                <Input.Password
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  size="large"
                  placeholder="请确认密码"
                  autocomplete="new-password"
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button 
                shape="round" 
                style={{background: '#3db922', color: '#fff'}} 
                htmlType="submit" 
                block 
                size="large" 
                onClick={this.handleSubmit}
              >注册</Button>
            </Form.Item>
          </Form>
        </LoginBox>
      </LoginWrapper>
    )
  }
  compareToFirstPassword = (rule, value, callback) => { // 比较两次密码
    const { form } = this.props
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!')
    } else {
      callback()
    }
  }
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatchRegister(values)
      }
    })
  }
}

const WrappedNormalRegisterForm = Form.create({ name: 'normal_register' })(RegisterForm)

const mapStateToProps = (state) => {
  return {
    user: state.getIn(['user', 'user'])
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchRegister(user) {
      dispatch(actionCreators.register(user))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(WrappedNormalRegisterForm)