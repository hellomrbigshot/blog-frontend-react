import { takeEvery, put } from 'redux-saga/effects'
import axios from 'axios'
import { initArticleList } from './actionCreators'
import { GET_ARTICLE_LIST } from './actionTypes'

export function* getArticleList() {
  yield takeEvery(GET_ARTICLE_LIST, fetchArticleList)
}

function* fetchArticleList() {
  let res = yield axios.post('/api/page/pagelist', { 
    type: '',	
    status: 'normal',
    content: '',	
    pageSize: 10,
    page: 1,
    secret: false,
    sort: 'update_time' })
  if (res.data.code === 'OK') {
    const { result, total } = res.data.data
    yield put(initArticleList(result, total))
  }
}