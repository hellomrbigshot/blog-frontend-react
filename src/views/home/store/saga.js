import { takeEvery, put } from 'redux-saga/effects'
import { initArticleList } from './actionCreators'
import { GET_ARTICLE_LIST } from './actionTypes'
import { fetch } from '../../../common'

export function* getArticleList() {
  yield takeEvery(GET_ARTICLE_LIST, fetchArticleList)
}

function* fetchArticleList() {
  let res = yield fetch.post(
    '/api/page/pagelist', 
    { 
      type: '',	
      status: 'normal',
      content: '',	
      pageSize: 10,
      page: 1,
      secret: false,
      sort: 'update_time' 
    }
  )
    const { result, total } = res.data.data
    yield put(initArticleList(result, total))
}