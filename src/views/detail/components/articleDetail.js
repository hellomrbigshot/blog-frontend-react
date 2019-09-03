import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Header, Info, Content } from '../styled'
import { Link } from 'react-router-dom'
import { marked, formatTime } from '../../../common'

class articleDetail extends Component {
    render() {
        const { article, user } = this.props
        const tags = article.get('tags')
        return (
            <div>
                <Header>{article.get('title')}</Header>
                <Info>
                    <span>更新于 {formatTime(article.get('update_time'))}</span>
                    <span> | 创建于 {formatTime(article.get('create_time'))}</span>
                    <span>
                        {' '}
                        | 作者 <Link to={`/user/info/${article.get('create_user')}`}>{article.get('create_user')}</Link>
                    </span>
                    <span> | 标签 {showTags(tags)}</span>
                    {user && user === article.get('create_user') ? (
                        <span>
                            {' '}
                            | <Link to={`/edit/${article.get('_id')}`}>编辑</Link>
                        </span>
                    ) : null}
                </Info>
                <Content className="m-editor-preview" dangerouslySetInnerHTML={{ __html: marked(article.get('content')) }} />
            </div>
        )
    }
}

function showTags(tags) {
    if (!tags) return ''

    return tags.map((tag, i) => (
      <Fragment key={i}>
        <Link to={`/tag/detail/${tag}`}>{tag}</Link>
        {
          i === tags.size - 1 ? null : <Fragment> ,</Fragment>
        }
      </Fragment>
    ))
}

const mapStateToProps = state => {
    return {
        article: state.getIn(['detail', 'detail']),
        user: state.getIn(['user', 'user'])
    }
}

export default connect(mapStateToProps)(articleDetail)
