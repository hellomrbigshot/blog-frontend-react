import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { formatTime } from '../../common'
import { marked } from 'react-m-editor'

function articleItem({ article }) {
  const showMore = article.get('showMore')
    return (
        <div className='mb-24'>
            <Link
              title={article.get('title')}
              to={`/detail/${article.get('_id')}`}
              className='text-3xl font-semibold text-gray-600 hover:text-gray-700 pb-3 block whitespace-nowrap overflow-hidden overflow-ellipsis'
            >{article.get('title')}</Link>
            <div className='text-xs mb-3 text-gray-500'>
                <span>更新于 {formatTime(article.get('update_time'))}</span>
                <span>
                    {' '}
                    | 作者<Link to={`/user/info/${article.get('create_user')}`} className='ml-1 border-b border-solid border-gray-500 hover:text-gray-700 hover:border-gray-700'>{article.get('create_user')}</Link>
                </span>
                <span> | 标签{showTags(article.get('tags'))}</span>
            </div>
            <div className="m-editor-preview" dangerouslySetInnerHTML={{ __html: marked(article.get('content')) }} />
            {
              showMore ? (
                <Link to={`/detail/${article.get('_id')}`} className='text-sm text-gray-500 mt-4 border-b-2 border-solid border-gray-500 inline-block pb-2 hover:text-gray-700 hover:border-gray-700'>阅读全文 »</Link>
              ) : null
            }
        </div>
    )
}

function showTags(tags) {
    if (!tags) return null
    return tags.map((tag, i) => {
        return (
          <Fragment key={i}>
            <Link className='ml-1 border-b border-solid border-gray-500 hover:text-gray-700 hover:border-gray-700' to={`/tag/detail/${tag}`}>{tag}</Link>
            {
              i === tags.size - 1 ? null : <Fragment> ,</Fragment>
            }
          </Fragment>
        )
    })
}

export default articleItem
