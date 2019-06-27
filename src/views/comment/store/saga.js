import { takeLatest, put, select } from 'redux-saga/effects'
import { GET_COMMENT_LIST } from './actionTypes'
import { fetch } from '../../../common/index'
import qs from 'qs'
import { initCommentList } from './actionCreators'

export function* getCommentList() {
  yield takeLatest(GET_COMMENT_LIST, axiosCommentList)
}

function* axiosCommentList(action) {
  const user = yield select(state => state.getIn(['user', 'user']))
  
  try {
    const formData = {
      type: action.commentType,
      page: action.page,
      pageSize: 10,
      create_user: user,
      to_user: user
    }
    const {data: { data: { result, total }}} = yield fetch.post('/api/comment/getusercommentlist', formData)
    yield put(initCommentList(result, total))
  } catch (e) {
    console.log(e.error)
  }
}
