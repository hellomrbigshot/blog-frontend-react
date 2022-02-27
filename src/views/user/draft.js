import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import { getDraftList } from './store/actionCreators'
import { formatTime } from '../../common'

function Draft () {
  const user = useSelector(state => state.getIn(['user', 'draftList']))
  const draftList = useSelector(state => state.getIn(['user', 'draftList']))
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getDraftList())
  }, [dispatch])
  const redirectUrl = encodeURIComponent('/draft')
  return !user ? (
    <Redirect to={`/signin?redirect=${redirectUrl}`} />
  ) : (
    <div>
      <h2 className='mb-8'>草稿箱</h2>
      {draftList.map(draft => (
        <div className='flex py-3 border-b border-solid border-gray-200 hover:border-gray-300' key={draft.get('_id')}>
          <Link className='flex-1 text-gray-500 hover:text-gray-500' to={`/edit/${draft.get('_id')}`}>{draft.get('title')}</Link>
          <div className="text-xs text-gray-400">更新于 {formatTime(draft.get('update_time'))}</div>
        </div>
      ))}
    </div>
  )
}

export default Draft
