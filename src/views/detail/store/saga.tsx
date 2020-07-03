import { takeLatest, put, select } from 'redux-saga/effects'
import { Action } from 'redux'
import { GET_ARTICLE_DETAIL, GET_COMMENT_LIST, HANDLE_SUBMIT_COMMENT } from './actionTypes'
import { initArticleDetail, initCommentList, handleConcatComment } from './actionCreators'
import { fetch } from '../../../common'

interface IAction1 extends Action {
  id: string
}
interface IAction2 extends Action {
  data: any,
  index?: number
}
interface IState {
  user: {
    user: string
  },
  detail: {
    detail: any
  }
}

function* fetchArticleDetail(action: IAction1) {
    try {
        const res = yield fetch.post('/api/page/detail', { id: action.id })
        if (res.data.code === 'OK') {
            const detail = res.data.data
            yield put(initArticleDetail(detail))
        }
    } catch (e) {
        console.log(e)
    }
}
function* fetchCommentList(action: IAction1) {
    try {
        const res = yield fetch.post('/api/comment/getpagecommentlist', { page_id: action.id })
        if (res.data.code === 'OK') {
            const list = res.data.data.map((item: any) => {
                item.showReplyInput = false
                return item
            })
            yield put(initCommentList(list))
        }
    } catch (e) {
        console.log(e)
    }
}

function* fetchSubmitComment(action: IAction2) {
    const user = yield select((state: IState) => state.user.user)
    const articleDetail = yield select((state: IState) => state.detail.detail)
    const data = JSON.parse(JSON.stringify(action.data))
    const sendData = Object.assign(data, {
        create_user: user,
        to_user: articleDetail.create_user,
        page_id: articleDetail._id,
        page_title: articleDetail.title
    })
    try {
        const res = yield fetch.post('/api/comment/create', sendData)
        if (res.data.code === 'OK') {
            yield put(handleConcatComment(res.data.data, action.index))
        }
    } catch (e) {
        console.log(e)
    }
}
export function* getCommentList() {
  yield takeLatest(GET_COMMENT_LIST, fetchCommentList)
}

export function* submitComment() {
  yield takeLatest(HANDLE_SUBMIT_COMMENT, fetchSubmitComment)
}

export function* getArticleDetail() {
  yield takeLatest(GET_ARTICLE_DETAIL, fetchArticleDetail)
}
