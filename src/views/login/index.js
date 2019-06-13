import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { LoginWrapper, LoginBox, Input, Button, LoginInfo, Logo } from './styled'
import { actionCreators } from './store'

class Login extends Component {
  render() {
    const { user } = this.props
    return user ? 
      <Redirect to="/" /> : 
      (
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
          <Input placeholder="请输入账号" ref={(input) => {this.account = input}}/>
          <Input placeholder="请输入密码" ref={(input) => {this.password = input}}/>
          <Button className="primary" onClick={() => this.props.loginSubmit(this.account, this.password)}>登录</Button>
        </LoginBox>
      </LoginWrapper>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.getIn(['user', 'user'])
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginSubmit(accountEle, passwordEle) {
      const username = accountEle.value.trim()
      const password = passwordEle.value.trim()
      if (username && password) {
        dispatch(actionCreators.login({ username, password }))
      } else {
        console.log('账号密码不能为空')
      }
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)