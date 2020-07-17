import { takeLatest, put } from 'redux-saga/effects'
import { initArticleList } from './actionCreators'
import { GET_ARTICLE_LIST } from './actionTypes'
import { fetch } from '../../../common'

export function* getArticleList() {
    yield takeLatest(GET_ARTICLE_LIST, fetchArticleList)
}

function* fetchArticleList(action) {
    try {
        const URL = !action.keywords ? '/api/page/pagelist' : '/api/page/searchpage'
        let formData = !action.keywords
            ? {
                  type: '',
                  status: 'normal',
                  content: '',
                  pageSize: 10,
                  page: action.page,
                  secret: false,
                  sort: 'update_time'
              }
            : {
                  keywords: action.keywords
              }
        let res = yield fetch.post(URL, formData)
        const { result, total } = res.data.data
        yield put(initArticleList(result, action.page, total))
        window.scrollTo(0, 0)
    } catch (e) {
        console.log(e.message)
    }
}
