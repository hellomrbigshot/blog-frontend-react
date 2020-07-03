import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import { getDraftList } from './store/actionCreators'
import { DraftWrapper, DraftList, DraftItem } from './styled'
import { formatTime } from '../../common'
interface IState {
  user: {
    user: string,
    draftList: any[]
  }
}
function Draft () {
  const user = useSelector((state: IState) => state.user.user)
  const draftList = useSelector((state: IState) => state.user.draftList)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getDraftList())
  }, [dispatch])

  return !user ? (
    <Redirect to={{ pathname: '/login', state: { redirect: '/draft' } }} />
  ) : (
    <DraftWrapper>
      <h2>草稿箱</h2>
      <DraftList>
        {draftList.map(draft => (
          <DraftItem key={draft._id}>
            <div className="draft-time">更新于 {formatTime(draft.update_time)}</div>
            <div className="draft-title">
              <Link to={`/edit/${draft._id}`}>{draft.title}</Link>
            </div>
          </DraftItem>
        ))}
      </DraftList>
    </DraftWrapper>
  )
}

export default Draft
