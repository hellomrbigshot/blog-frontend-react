import { takeLatest, put } from 'redux-saga/effects'
import { GET_TAG_LIST, GET_TAG_DETAIL, GET_ARTICLE_LIST } from './actionTypes'
import { initTagList, initTagDetail, initArticleList } from './actionCreators'
import { fetch } from '../../../common'

export function* getTagList() {
    yield takeLatest(GET_TAG_LIST, axiosGetTagList)
}

function* axiosGetTagList(action) {
    // 获取 tag 列表
    const res = yield fetch.post('/api/tag/taglist', { page: action.page, pageSize: 10 })
    yield put(initTagList(res.data.data.result, res.data.data.total))
}

export function* getTagDetail() {
    yield takeLatest(GET_TAG_DETAIL, axiosGetTagDetail)
}

function* axiosGetTagDetail(action) {
    // 获取 tag 详情
    const res = yield fetch.post('/api/tag/tagdetail', { name: action.tag })
    yield put(initTagDetail(res.data.data))
}

export function* getArticleList() {
    yield takeLatest(GET_ARTICLE_LIST, axiosGetArticleList)
}

function* axiosGetArticleList(action) {
    // 获取 tag 相关文章列表
    const res = yield fetch.post('/api/page/pagelist', {
        type: 'tag',
        content: action.tag,
        page: action.page,
        pageSize: 10,
        status: 'normal',
        secret: false
    })
    yield put(initArticleList(res.data.data.result, res.data.data.total))
    window.scrollTo(0, 0)
}
