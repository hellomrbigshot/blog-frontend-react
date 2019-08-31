import React, { Fragment } from 'react'
import { ArticleItem, Header, Info, Article } from './styled'
import { Link } from 'react-router-dom'
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
                    | 作者<Link to={`/user/info/${article.get('create_user')}`}>{article.get('create_user')}</Link>
                </span>
                <span> | 标签{showTags(article.get('tags'))}</span>
            </Info>
            <Article className="m-editor-preview" dangerouslySetInnerHTML={{ __html: marked(article.get('content')) }} />
        </ArticleItem>
    )
}

function showTags(tags) {
    if (!tags) return null
    return tags.map((tag, i) => {
        return (
          <Fragment>
            <Link key={i} to={`/tag/detail/${tag}`}>{tag}</Link>
            {
              i === tags.size - 1 ? null : <Fragment> ,</Fragment>
            }
          </Fragment>
        )
    })
}

export default articleItem
