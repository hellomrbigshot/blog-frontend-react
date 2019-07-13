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
        const { articleList, total, getArticleList } = this.props
        return (
            <HomeWrapper>
                {articleList.map((article, i) => {
                    return <ArticleItem article={article} key={i} />
                })}
                <BackTop />
                {total > 10 ? <Pagination onChange={getArticleList} total={total} /> : null}
            </HomeWrapper>
        )
    }
    componentDidMount() {
        if (this.props.match.params && this.props.match.params.keywords) {
            // 搜索
            const KEYWORDS = this.props.match.params.keywords.trim()
            this.props.getArticleList(1, KEYWORDS)
            this.keywords = KEYWORDS
        } else {
            this.props.getArticleList(1)
        }
    }
    componentDidUpdate() {
        if (this.props.match.params && this.props.match.params.keywords) {
            // 搜索
            const KEYWORDS = this.props.match.params.keywords.trim()
            if (this.keywords !== KEYWORDS) {
                this.props.getArticleList(1, KEYWORDS)
                this.keywords = KEYWORDS
            }
        }
    }
}

const mapStateToProps = state => {
    return {
        articleList: state.getIn(['home', 'articleList']),
        total: state.getIn(['home', 'total'])
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getArticleList(page, keywords) {
            dispatch(actionCreators.getArticleList(page, keywords))
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
        }
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)
