import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actionCreators} from './store'
import { HomeWrapper } from './styled'
import ArticleItem from '../../components/articleItem'

class Home extends Component {
  render() {
    const { articleList } = this.props
    return (
      <HomeWrapper>
        {
          articleList.map((article, i) => {
            return <ArticleItem article={article} key={i} />
          })
        }
      </HomeWrapper>
    )
  }
  componentDidMount() {
    this.props.getArticleList()
  }
}

const mapStateToProps = (state) => {
  return {
    articleList: state.getIn(['home', 'articleList']),
    total: state.getIn(['home', 'total'])
  }
}

const mapDispatchToProps = (dispatch) => {
  return {  
    getArticleList() {
      dispatch(actionCreators.getArticleList())
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)