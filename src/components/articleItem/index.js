import React from 'react'
import marked from 'marked'
import { ArticleItem, Header, Info, Article } from './styled'
import { Link } from 'react-router-dom'
import 'highlight.js/styles/solarized-light.css'
import hljs from 'highlight.js'

marked.setOptions({ 
  renderer: new marked.Renderer(),
  highlight: function(code) {
      return hljs.highlightAuto(code).value;
  },
  pedantic: false,
  gfm: true,
  tables: true,
  breaks: true,
  headerIds: true,
  headerPrefix: 'react',
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false
})

function articleItem(props) {
  const { article } = props
  return (
    <ArticleItem>
      <Link to={`/detail/${article.get('_id')}`}><Header>{article.get('title')}</Header></Link>
      <Info>
        <span>创建于2天前</span>
        <span>| 作者<Link to="">{article.get('create_user')}</Link></span>
        <span>| 标签{showTags(article.get('tags'))}</span>
      </Info>
      <Article className="m-editor-preview" dangerouslySetInnerHTML={{ __html: marked(article.get('content'))}} />
    </ArticleItem>
  )
}

function showTags(tags) {
  tags = tags.toJS()
  return tags.map((tag, i) => {
    return <Link key={i} to="">{tag}{ i === tags.length - 1 ? '' : ','}</Link>
  })
}

export default articleItem