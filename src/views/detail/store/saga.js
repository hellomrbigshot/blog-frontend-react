import { takeLatest, put, select } from 'redux-saga/effects'
import { GET_ARTICLE_DETAIL, GET_COMMENT_LIST, HANDLE_SUBMIT_COMMENT } from './actionTypes'
import { initArticleDetail, initCommentList, handleConcatComment } from './actionCreators'
import { fetch } from '../../../common'

export function* getArticleDetail () {
  yield takeLatest(GET_ARTICLE_DETAIL, fetchArticleDetail)
}

function* fetchArticleDetail (action) {
  try {
    const data = yield fetch.post('/api/page/detail', { id: action.id }, {}, { onlyData: true })
    yield put(initArticleDetail(data))
  } catch (e) {
    console.log(e)
  }
}

export function* getCommentList () {
  yield takeLatest(GET_COMMENT_LIST, fetchCommentList)
}

function* fetchCommentList (action) {
  try {
    const data = yield fetch.post('/api/comment/getpagecommentlist', { page_id: action.id }, {}, { onlyData: true })
    const list = data.map((item) => {
      item.showReplyInput = false
      return item
    })
    yield put(initCommentList(list))
  } catch (e) {
    console.log(e)
  }
}

export function* submitComment () {
  yield takeLatest(HANDLE_SUBMIT_COMMENT, fetchSubmitComment)
}

function* fetchSubmitComment (action) {
  const user = yield select((state) => state.getIn(['user', 'user']))
  const articleDetail = yield select((state) => state.getIn(['detail', 'detail']))
  const data = JSON.parse(JSON.stringify(action.data))
  const sendData = Object.assign(data, {
    create_user: user,
    to_user: articleDetail.get('create_user'),
    page_id: articleDetail.get('_id'),
    page_title: articleDetail.get('title'),
  })
  try {
    const data = yield fetch.post('/api/comment/create', sendData, {}, { onlyData: true })
    yield put(handleConcatComment(data, action.index))
  } catch (e) {
    console.log(e)
  }
}
