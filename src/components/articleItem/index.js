import React from 'react'
import { ArticleItem, Header, Info, Article } from './styled'
import { Link } from 'react-router-dom'
import 'highlight.js/styles/solarized-light.css'
import { marked, formatTime } from '../../common'

function articleItem(props) {
    const { article } = props
    return (
        <ArticleItem>
            <Link to={`/detail/${article.get('_id')}`}>
                <Header>{article.get('title')}</Header>
            </Link>
            <Info>
                <span>更新于 {formatTime(article.get('update_time'))}</span>
                <span>
                    {' '}
                    | 作者<Link to="">{article.get('create_user')}</Link>
                </span>
                <span> | 标签{showTags(article.get('tags'))}</span>
            </Info>
            <Article className="m-editor-preview" dangerouslySetInnerHTML={{ __html: marked(article.get('content')) }} />
        </ArticleItem>
    )
}

function showTags(tags) {
    if (!tags) return null
    tags = tags.toJS()
    return tags.map((tag, i) => {
        return (
            <Link key={i} to={`/tag/detail/${tag}`}>
                {tag}
                {i === tags.length - 1 ? '' : ','}
            </Link>
        )
    })
}

export default articleItem
