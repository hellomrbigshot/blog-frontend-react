import { takeLatest, put } from 'redux-saga/effects'
import { GET_TAG_LIST, GET_TAG_DETAIL, GET_ARTICLE_LIST } from './actionTypes'
import { initTagList, initTagDetail, initArticleList } from './actionCreators'
import { fetch } from '../../../common'

export function* getTagList () {
  yield takeLatest(GET_TAG_LIST, axiosGetTagList)
}

function* axiosGetTagList ({ page }) {
  // 获取 tag 列表
  const {
    data: {
      data: { result, total },
    },
  } = yield fetch.post('/api/tag/taglist', { page, pageSize: 10 })
  yield put(initTagList(result, page, total))
}

export function* getTagDetail () {
  yield takeLatest(GET_TAG_DETAIL, axiosGetTagDetail)
}

function* axiosGetTagDetail ({ tag }) {
  // 获取 tag 详情
  const res = yield fetch.post('/api/tag/tagdetail', { name: tag })
  yield put(initTagDetail(res.data.data))
}

export function* getArticleList () {
  yield takeLatest(GET_ARTICLE_LIST, axiosGetArticleList)
}

function* axiosGetArticleList ({ tag, page }) {
  // 获取 tag 相关文章列表
  const { data: { data: { result, total } } } = yield fetch.post('/api/page/pagelist', {
    type: 'tag',
    content: tag,
    page: page,
    pageSize: 10,
    status: 'normal',
    secret: false,
  })
  yield put(initArticleList(result, page, total))
  window.scrollTo(0, 0)
}
