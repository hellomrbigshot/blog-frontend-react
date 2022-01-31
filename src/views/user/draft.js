import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import { getDraftList } from './store/actionCreators'
import { DraftWrapper, DraftList, DraftItem } from './styled'
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
    <DraftWrapper>
      <h2>草稿箱</h2>
      <DraftList>
        {draftList.map(draft => (
          <DraftItem key={draft.get('_id')}>
            <div className="draft-time">更新于 {formatTime(draft.get('update_time'))}</div>
            <div className="draft-title">
              <Link to={`/edit/${draft.get('_id')}`}>{draft.get('title')}</Link>
            </div>
          </DraftItem>
        ))}
      </DraftList>
    </DraftWrapper>
  )
}

export default Draft
