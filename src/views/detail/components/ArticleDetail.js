import React, { Fragment } from 'react'
import { Header, Info, Content } from '../styled'
import { Link } from 'react-router-dom'
import { marked, formatTime } from '../../../common'

function articleDetail({ article, user }) {
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

const showTags = (tags) => {
  if (!tags) return ''

  return tags.map((tag, i) => (
    <Fragment key={i}>
      <Link to={`/tag/detail/${tag}`}>{tag}</Link>
      {i === tags.size - 1 ? null : <Fragment> ,</Fragment>}
    </Fragment>
  ))
}

export default articleDetail
