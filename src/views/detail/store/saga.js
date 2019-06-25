import { takeLatest, put, select } from 'redux-saga/effects'
import { GET_ARTICLE_DETAIL, GET_COMMENT_LIST, HANDLE_SUBMIT_COMMENT } from './actionTypes'
import axios from 'axios'
import { initArticleDetail, initCommentList, handleConcatComment } from './actionCreators'
import qs from 'qs'

export function* getArticleDetail() {
  yield takeLatest(GET_ARTICLE_DETAIL, fetchArticleDetail)
}

function* fetchArticleDetail(action) {
  const res = yield axios.post('/api/page/detail', qs.stringify({ id: action.id }))
  if (res.data.code === 'OK') {
    const detail = res.data.data
    yield put(initArticleDetail(detail))
  }
}

export function* getCommentList() {
  yield takeLatest(GET_COMMENT_LIST, fetchCommentList)
}

function* fetchCommentList(action) {
  const res = yield axios.post('/api/comment/getpagecommentlist', qs.stringify({ page_id: action.id }))
  if (res.data.code === 'OK') {
    const list = res.data.data.map(item => { 
      item.showReplyInput = false
      return item
    })
    yield put(initCommentList(list))
  }
}

export function* submitComment() {
  yield takeLatest(HANDLE_SUBMIT_COMMENT, fetchSubmitComment)
}

function* fetchSubmitComment(action) {
  const user = yield select(state => state.getIn(['user', 'user']))
  const data = JSON.parse(JSON.stringify(action.data))
  data.create_user = user
  const res = yield axios.post('/api/comment/create', qs.stringify(data))
  if (res.data.code === 'OK') {
    yield put(handleConcatComment(res.data.data, action.index))
  }
}

