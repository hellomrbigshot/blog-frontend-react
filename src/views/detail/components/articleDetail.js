import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Header, Info, Content } from '../styled'
import { Link } from 'react-router-dom'
import { marked, formatTime } from '../../../common'

class articleDetail extends Component {
    render() {
        const { article } = this.props
        const tags = article.get('tags')
        return (
            <div>
                <Header>{article.get('title')}</Header>
                <Info>
                    <span>更新于 {formatTime(article.get('update_time'))}</span>
                    <span> | 创建于 {formatTime(article.get('create_time'))}</span>
                    <span>
                        {' '}
                        | 作者 <Link to="">{article.get('create_user')}</Link>
                    </span>
                    <span> | 标签 {showTags(tags)}</span>
                </Info>
                <Content className="m-editor-preview" dangerouslySetInnerHTML={{ __html: marked(article.get('content')) }} />
            </div>
        )
    }
}

function showTags(tags) {
    if (!tags) return ''
    tags = tags.toJS()
    return tags.map((tag, i) => (
        <Link key={i} to={`/tag/detail/${tag}`}>
            {tag}
            {i === tags.length - 1 ? '' : ','}
        </Link>
    ))
}

const mapStateToProps = state => {
    return {
        article: state.getIn(['detail', 'detail'])
    }
}

export default connect(mapStateToProps)(articleDetail)
