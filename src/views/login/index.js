import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { LoginWrapper, LoginBox, Input, Button, LoginInfo, Logo } from './styled'

class Login extends Component {
  render() {
    return (
      <LoginWrapper>
        <Link to="/">
          <Logo/>
        </Link>
        <LoginBox>
          <LoginInfo>
            <Link className="active" to="/login">登录</Link>
            <b>·</b>
            <Link to="/register">注册</Link>
          </LoginInfo>
          <Input placeholder="请输入账号" />
          <Input placeholder="请输入密码" />
          <Button className="primary">登录</Button>
        </LoginBox>
      </LoginWrapper>
    )
  }
}

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)