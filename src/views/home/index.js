import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actionCreators } from './store'
import { HomeWrapper } from './styled'
import ArticleItem from '../../components/articleItem'
import { toggleBackTop } from './store/actionCreators'
import { debounce } from '../../common/index'
import { Pagination, BackTop } from 'antd'

class Home extends Component {
    constructor(props) {
        super(props)
        this.debounceChangeBackTop = debounce(this.props.changeBackTop, 100)
    }
    render() {
        const { articleList, showBackTop, handleBackTop, total, pageChange } = this.props
        return (
            <HomeWrapper>
                {articleList.map((article, i) => {
                    return <ArticleItem article={article} key={i} />
                })}
                <BackTop />
                {total > 10 ? <Pagination onChange={pageChange} total={total} /> : null}
            </HomeWrapper>
        )
    }
    componentDidMount() {
        if (this.props.location.query && this.props.location.query.keywords) {
            // 搜索页
            console.log(this.props.location.query.keywords)
        } else {
            this.props.getArticleList()
        }
        // this.bindEvents()
    }
    // componentWillUnmount() {
    //   window.removeEventListener('scroll', this.debounceChangeBackTop)
    // }
    // bindEvents() {
    //   window.addEventListener('scroll', this.debounceChangeBackTop)
    // }
}

const mapStateToProps = state => {
    return {
        articleList: state.getIn(['home', 'articleList']),
        total: state.getIn(['home', 'total'])
        // showBackTop: state.getIn(['home', 'showBackTop'])
    }
}

const mapDispatchToProps = dispatch => {
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
            let timer = setInterval(() => {
                let oTop = document.body.scrollTop || document.documentElement.scrollTop
                let speed = Math.floor(-oTop / 4)
                document.documentElement.scrollTop = oTop + speed
                if (oTop === 0) {
                    clearInterval(timer)
                }
            }, 30)
        },
        pageChange(page) {
            dispatch(actionCreators.getArticleList(page))
        }
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)
