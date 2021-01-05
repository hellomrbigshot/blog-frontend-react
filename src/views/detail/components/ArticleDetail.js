import React, { Fragment, useState, useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import {} from '../store'
import { Header, Info, Content } from '../styled'
import { Link } from 'react-router-dom'
import { marked, formatTime } from '../../../common'
import { resetNavInfo } from '../store/actionCreators'
import ArticleDetailNav from './ArticleDetailNav'

function ArticleDetail({ article, user }) {
  const tags = article.get('tags')
  const dispatch = useDispatch()
  const [renderNav, setRenderNav] = useState(false)
  const [content, setContent] = useState('')
  const activeNav = useCallback((ele) => {
    const navId = ele.dataset.link
    const navEle = document.getElementById(navId)
    navEle && navEle.scrollIntoView({
      // behavior: 'smooth',
      block: 'center'
    })
    document.querySelectorAll('.blog-nav-header').forEach(ele => {
      ele.classList.remove('active')
    })
    navEle && navEle.classList.add('active')
  }, [])
  const scrollObserve = useCallback(() => {
    const navObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
            activeNav(entry.target)
          }
      })
    })
    document.querySelectorAll('.blog-detail-header').forEach(ele => {
      navObserver.observe(ele)
    })
  }, [activeNav])
  useEffect(() => {
    dispatch(resetNavInfo())
    setContent(marked(article.get('content')))
    setRenderNav(true)
    setTimeout(() => {
      scrollObserve()
    })
  }, [article, dispatch, scrollObserve])
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
      <Content className="m-editor-preview" dangerouslySetInnerHTML={{ __html: content }} />
      {
        renderNav ? <ArticleDetailNav/> : null
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

export default ArticleDetail
