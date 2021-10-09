import { takeLatest, put } from 'redux-saga/effects'
import { GET_TAG_LIST, GET_TAG_DETAIL, GET_ARTICLE_LIST } from './actionTypes'
import { initTagList, initTagDetail, initArticleList } from './actionCreators'
import { fetch } from '../../../common'

export function* getTagList () {
  yield takeLatest(GET_TAG_LIST, axiosGetTagList)
}

function* axiosGetTagList ({ page }) {
  // 获取 tag 列表
  const { result, total } = yield fetch.post('/api/tag/taglist', { page, pageSize: 10 }, {}, { onlyData: true })
  yield put(initTagList(result, page, total))
}

export function* getTagDetail () {
  yield takeLatest(GET_TAG_DETAIL, axiosGetTagDetail)
}

function* axiosGetTagDetail ({ tag }) {
  // 获取 tag 详情
  const data = yield fetch.post('/api/tag/tagdetail', { name: tag }, {}, { onlyData: true })
  yield put(initTagDetail(data))
}

export function* getArticleList () {
  yield takeLatest(GET_ARTICLE_LIST, axiosGetArticleList)
}

function* axiosGetArticleList ({ tag, page }) {
  // 获取 tag 相关文章列表
  const { result, total } = yield fetch.post('/api/page/pagelist', {
    type: 'tag',
    content: tag,
    page: page,
    pageSize: 10,
    status: 'normal',
    secret: false,
  }, {}, { onlyData: true })
  yield put(initArticleList(result, page, total))
  window.scrollTo(0, 0)
}
