import React, { Fragment } from 'react'
import { ArticleItem, Header, Info, Article, Header2 } from './styled'
import { Link } from 'react-router-dom'
import { marked, formatTime } from '../../common'

function articleItem({ article }) {
  const showMore = article.get('showMore')

    return (
        <ArticleItem>
            <Link to={`/detail/${article.get('_id')}`}>
                <Header title={article.get('title')}>{article.get('title')}</Header>
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
            {
              showMore ? (
                <Link to={`/detail/${article.get('_id')}`}>
                  <Header2>阅读全文 »</Header2>
                </Link>
              ) : null
            }
        </ArticleItem>
    )
}

function showTags(tags) {
    if (!tags) return null
    return tags.map((tag, i) => {
        return (
          <Fragment key={i}>
            <Link to={`/tag/detail/${tag}`}>{tag}</Link>
            {
              i === tags.size - 1 ? null : <Fragment> ,</Fragment>
            }
          </Fragment>
        )
    })
}

export default articleItem
