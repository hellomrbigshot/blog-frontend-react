import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actionCreators} from './store'
import { HomeWrapper, BackTop } from './styled'
import ArticleItem from '../../components/articleItem'
import { toggleBackTop } from './store/actionCreators'
import { debounce } from '../../common/index'

class Home extends Component {
  constructor(props) {
    super(props)
    this.debounceChangeBackTop = debounce(this.props.changeBackTop, 100)
  }
  render() {
    const { articleList, showBackTop, handleBackTop } = this.props
    return (
      <HomeWrapper>
        {
          articleList.map((article, i) => {
            return <ArticleItem article={article} key={i} />
          })
        }
        {
          showBackTop ? <BackTop onClick={handleBackTop}><i className="iconfont icon-arrow-up" /></BackTop> : null
        }
      </HomeWrapper>
    )
  }
  componentDidMount() {
    this.props.getArticleList()
    this.bindEvents()
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.debounceChangeBackTop)
  }
  bindEvents() {
    window.addEventListener('scroll', this.debounceChangeBackTop)
  }
}

const mapStateToProps = (state) => {
  return {
    articleList: state.getIn(['home', 'articleList']),
    total: state.getIn(['home', 'total']),
    showBackTop: state.getIn(['home', 'showBackTop'])
  }
}

const mapDispatchToProps = (dispatch) => {
  
  return {  
    getArticleList() {
      dispatch(actionCreators.getArticleList())
    },
    changeBackTop() {
      if (document.documentElement.scrollTop > 100) {
        dispatch(toggleBackTop(true))
      } else {
        dispatch(toggleBackTop(false))
      }
    },
    handleBackTop() {
      window.scrollTo(0, 0)
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)