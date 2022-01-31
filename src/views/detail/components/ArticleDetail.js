import React, { Fragment, useState, useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import {} from '../store'
import { Content } from '../styled'
import { Link } from 'react-router-dom'
import { formatTime, marked } from '../../../common'
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
    <div className='mb-24'>
      <div className='text-3xl font-semibold text-center text-gray-600 pb-3'>{article.get('title')}</div>
      <div className='text-xs text-gray-500 flex justify-center'>
        <span>更新于 {formatTime(article.get('update_time'))}&nbsp;</span>
        <span>| 创建于 {formatTime(article.get('create_time'))}&nbsp;</span>
        <span>| 作者 <Link className='border-b border-gray-500 border-solid hover:text-gray-700 hover:border-gray-700' to={`/user/info/${article.get('create_user')}`}>{article.get('create_user')}&nbsp;</Link>
        </span>
        <span>| 标签 {showTags(tags)}&nbsp;</span>
        {user && user === article.get('create_user') ? (
          <span>| <Link className='border-b border-gray-500 border-solid hover:text-gray-700 hover:border-gray-700' to={`/edit/${article.get('_id')}`}>编辑</Link></span>
        ) : null}
      </div>
      <div className="m-editor-preview mt-5" dangerouslySetInnerHTML={{ __html: content }} />
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
      <Link className='border-b border-gray-500 border-solid hover:text-gray-700 hover:border-gray-700' to={`/tag/detail/${tag}`}>{tag}</Link>
      {i === tags.size - 1 ? null : <Fragment> ,</Fragment>}
    </Fragment>
  ))
}

export default ArticleDetail
