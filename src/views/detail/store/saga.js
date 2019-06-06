import { takeEvery, put } from 'redux-saga/effects'
import { GET_ARTICLE_DETAIL, GET_COMMENT_LIST } from './actionTypes'
import axios from 'axios'
import { initArticleDetail, initCommentList } from './actionCreators'
import qs from 'qs'

export function* getArticleDetail() {
  yield takeEvery(GET_ARTICLE_DETAIL, fetchArticleDetail)
}

function* fetchArticleDetail(action) {
  const res = yield axios.post('/api/page/detail', qs.stringify({ id: action.id }))
  if (res.data.code === 'OK') {
    const detail = res.data.data
    yield put(initArticleDetail(detail))
  }
}

export function* getCommentList() {
  yield takeEvery(GET_COMMENT_LIST, fetchCommentList)
}

function* fetchCommentList(action) {
  const res = yield axios.post('/api/comment/getpagecommentlist', qs.stringity({ page_id: action.id }))
  if (res.data.code === 'OK') {
    const list = res.data.data
    yield put(initCommentList(list))
  }
}