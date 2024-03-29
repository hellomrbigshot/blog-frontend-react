import { takeLatest, put, select } from 'redux-saga/effects'
import { GET_COMMENT_LIST } from './actionTypes'
import { fetch } from '../../../common/index'
import { initCommentList } from './actionCreators'

export function* getCommentList() {
  yield takeLatest(GET_COMMENT_LIST, axiosCommentList)
}

function* axiosCommentList(action) {
  const user = yield select((state) => state.getIn(['user', 'user']))

  try {
    const formData = {
      type: action.commentType,
      page: action.page,
      pageSize: 10,
      create_user: user,
      to_user: user,
    }
    const { result, total } = yield fetch.post('/api/comment/getusercommentlist', formData, {}, { onlyData: true })
    yield put(initCommentList(result, total))
    if (action.commentType === 'to_user') {
      yield updateCommentStatus(result)
    }
  } catch (e) {
    console.log(e.message)
  }
}

function* updateCommentStatus (list) {
  const ids = list.filter(comment => !comment.is_read).map(comment => comment._id)
  if (!ids.length) return false
  try {
    yield fetch.post('/api/comment/updatecommentstatus', { ids }, {}, { onlyData: true })
  } catch (e) {
    console.log(e)
  }
}
