import React, { Fragment } from 'react'
import { Header, Info, Content } from '../styled'
import { Link } from 'react-router-dom'
import { marked, formatTime } from '../../../common'
import ArticleDetailNav from './ArticleDetailNav'
const nav = new ArticleDetailNav()
const renderer = new marked.Renderer()
renderer.heading = function (text, level) {
  nav.add(text, level)
  return `
    <h${level} id="h${level}-${nav.navIndexObj[level].length + 1}">${text}</h${level}>
    `
}
marked.setOptions({ renderer })

function articleDetail({ article, user }) {
  const tags = article.get('tags')
  // const contentMd = article.get('content')
  // const regHeader = /(#{1,5})\s.*\n/g
  // const headerArr = contentMd.match(regHeader)
  // const showSideNav = headerArr && headerArr.length
  nav.reset()
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
      {
        nav.render()
      }
      
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
