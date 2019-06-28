import { takeLatest, put, select } from 'redux-saga/effects'
import { GET_DRAFT_LIST } from './actionTypes'
import { fetch } from '../../../common'
import { initDraftList } from './actionCreators'

export function* getDraftList() {
  yield takeLatest(GET_DRAFT_LIST, axiosGetDraftList)
}

function* axiosGetDraftList() {
  const user = yield select(state => state.getIn(['user', 'user']))
  const formData = {
    type: 'creator',
    content: user,
    status: 'draft',
    page: 1,
    pageSize: 999
  }
  try {
    const res = yield fetch.post('/api/page/limitpagelist', formData)
    if (res.data.code === 'OK') {
      yield put(initDraftList(res.data.data.result))
    }
  } catch(e) {
    console.log(e.error)
  }
}
