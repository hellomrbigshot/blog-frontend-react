import { takeLatest, put, select } from 'redux-saga/effects'
import { GET_COMMENT_LIST } from './actionTypes'
import { Action } from 'redux'
import { fetch } from '../../../common/index'
import { initCommentList } from './actionCreators'

interface IAction extends Action {
  commentType: string,
  page: number | string
}

function* fetchCommentList({ commentType, page }: IAction) {
  const user = yield select((state: { user: { user: string } }) => state.user.user)

  try {
    const formData = {
      type: commentType,
      page: page,
      pageSize: 10,
      create_user: user,
      to_user: user
    }
    const {
      data: {
        data: { result, total }
      }
    } = yield fetch.post('/api/comment/getusercommentlist', formData)
    yield put(initCommentList(result, total))
  } catch (e) {
    console.log(e.message)
  }
}

export function* getCommentList() {
  yield takeLatest(GET_COMMENT_LIST, fetchCommentList)
}
