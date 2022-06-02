import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Avatar } from 'antd'
import { formatTime } from '../../../common/index'
import classnames from 'classnames'

export default (commentList, push, type = 'to_user') => {
  return (
    <div className='mb-8'>
      {commentList.map((comment) => (
        <div key={comment.get('_id')} className='mt-4 flex pl-4 py-2'>
          <div>
            <Link className='cursor-pointer' to={`/user/info/${comment.get('create_user')}`}>
              <Avatar size="large" src={`/api/file/avatar/user/?username=${comment.get('create_user')}`} alt="头像" />
            </Link>
          </div>
          <div className='flex-1 ml-4'>
            <div className='flex'>
              <div className='flex-1 flex items-baseline'>
                {type === 'to_user' ? (
                  <Fragment>
                    <Link className='cursor-pointer text-gray-600 hover:text-blue-600' to={`/user/info/${comment.get('create_user')}`}>{comment.get('create_user')} </Link>
                    <div className='text-gray-400 text-xs ml-1'>回复我说：</div>
                  </Fragment>
                ) : (
                  <div className='text-xs text-gray-400'>{comment.get('reply_user') ? '回复：' : '发布评论：'}</div>
                )}
              </div>
              <div className='text-gray-400 text-xs'>{formatTime(comment.get('create_time'))}</div>
            </div>
            <div className='text-gray-600 mt-1.5'>{comment.get('content')}</div>
            <div className='mb-2.5 mt-1.5 p-2.5 rounded shadow-md text-gray-500 cursor-pointer' onClick={() => push(`/detail/${comment.get('page_id')}`)}>
              {comment.get('reply_user') ? (
                <Fragment>
                  <Link
                    className='cursor-pointer text-gray-600 hover:text-blue-600'
                    to={`/user/info/${comment.get('reply_user')}`}
                    onClick={(e) => e.stopPropagation()}
                  >{comment.get('reply_user')}: </Link>
                  {comment.get('reply_content')}
                </Fragment>
              ) : (
                <div className="text-base font-medium text-gray-600 cursor-pointer hover:text-blue-600">{comment.get('page_title')}</div>
              )}
            </div>
          </div>
          <div className={classnames({ 'invisible': !(type === 'to_user' && !comment.get('is_read')) }, 'w-2 h-2 rounded-full bg-red-500 ml-1.5')}></div>
        </div>
      ))}
    </div>
  )
}
