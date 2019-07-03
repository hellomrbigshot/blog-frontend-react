import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { Form, Input, Icon, Button } from 'antd'
import { LoginWrapper, LoginBox, LoginInfo, Logo } from './styled'

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
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  size="large"
                  placeholder="请输入密码"
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button shape="round" type="primary" htmlType="submit" block size="large" onClick={this.handleSubmit}>注册</Button>
            </Form.Item>
          </Form>
        </LoginBox>
      </LoginWrapper>
    )
  }
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatchLogin(values)
      }
    })
  }
}

const WrappedNormalRegisterForm = Form.create({ name: 'normal_register' })(RegisterForm)

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(WrappedNormalRegisterForm)