import { takeLatest, put } from 'redux-saga/effects'
import { initArticleList } from './actionCreators'
import { GET_ARTICLE_LIST } from './actionTypes'
import { fetch } from '../../../common'

export function* getArticleList () {
  yield takeLatest(GET_ARTICLE_LIST, fetchArticleList)
}

function* fetchArticleList ({ page, keywords }) {
  try {
    const URL = !keywords ? '/api/page/pagelist' : '/api/page/searchpage'
    let formData = !keywords
      ? {
          type: '',
          status: 'normal',
          content: '',
          pageSize: 10,
          page,
          secret: false,
          sort: 'create_time',
        }
      : {
          keywords,
          page,
          pageSize: 10
        }
    const { result, total } = yield fetch.post(URL, formData, {}, { onlyData: true })
    yield put(initArticleList(result, page, total, keywords))
    window.scrollTo(0, 0)
  } catch (e) {
    console.log(e.message)
  }
}
