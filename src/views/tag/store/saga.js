import { takeLatest, put } from 'redux-saga/effects'
import { GET_TAG_LIST } from './actionTypes'
import { initTagList } from './actionCreators'
import { fetch } from '../../../common'

export function* getTagList() {
  yield takeLatest(GET_TAG_LIST, axiosGetTagList)
}

function* axiosGetTagList(action) {
  const res = yield fetch.post('/api/tag/taglist', { page: action.page, pageSize: 10 })
  yield put(initTagList(res.data.data.result, res.data.data.total))
}