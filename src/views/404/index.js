import React, { Component } from 'react'
import { Container, Box } from './styled'
import { Link } from 'react-router-dom'
class NoMatch extends Component {
  constructor(props) {
    super(props)
    this.goBack = this.goBack.bind(this)
  }
  render() {
    return (
    <Container>
      <Box>
        <h1>404</h1>
        <h2>无法获取此页面</h2>
        <hr/>
        <p>您查找的页面可能已经被删除</p>
        <p>请尝试以下方法：</p>
        <ul>
          <li>如果在地址栏中输入页面地址，请确保拼写正确。</li>
          <li>单击“<Link to="" onClick={this.goBack}>上一步</Link>”按钮返回先前访问过的页面</li>
          <li>单击“<Link to="/">首页</Link>”按钮返回首页</li>
          <li>如果您是通过点击链接进入此界面，请与管理员联系并让他们了解此问题。</li>
        </ul>
      </Box>
    </Container>
    )
  }
  goBack() {
    this.props.history.goBack()
  }
}

export default NoMatch