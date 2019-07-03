import { takeLatest, put, select } from 'redux-saga/effects'
import { LOGIN, REGISTER, LOGOUT, GET_DRAFT_LIST, GET_ARTICLE_LIST, GET_USER_INFO, GET_LIMIT_ARTICLE_LIST } from './actionTypes'
import { fetch } from '../../../common'
import { loginSuccess, registerSuccess, logoutSuccess, initDraftList, initArticleList, initUserInfo, initLimitArticleList } from './actionCreators'

export function* login() {
  yield takeLatest(LOGIN, axiosLogin)
}

function* axiosLogin(action) { // 登录
  try {
    let loginRes = yield fetch.post('/api/signin', { ...action.user })
    if (loginRes.data.code === 'OK') {
      let userInfo = yield fetch.post('/api/signin/getUserInfo', { username: action.user.username })
      yield put(loginSuccess(userInfo.data.data.username))
    }
  } catch(e) {
    console.log(e)
  }
}

export function* register() {
  yield takeLatest(REGISTER, axiosRegister)
}

export function* axiosRegister(action) { // 注册
  let registerRes = yield fetch.post('/api/signup', { ...action.user })
  if (registerRes.data.code === 'OK') {
    let userInfo = yield fetch.post('/api/signin/getUserInfo', { username: action.user.username })
    yield put(loginSuccess(userInfo.data.data.username))
  }
}

export function* logout() {
  yield takeLatest(LOGOUT, axiosLogout)
}

export function* axiosLogout() { // 登出
  try {
    let res = yield fetch.post('/api/signout')
    if (res.data.code === 'OK') {
      yield put(logoutSuccess())
    }
  } catch(e) {
    console.log(e)
  }
  
}

export function* getDraftList() {
  yield takeLatest(GET_DRAFT_LIST, axiosGetDraftList)
}

function* axiosGetDraftList() {
  const user = yield select(state => state.getIn(['user', 'user']))
  const formData = {
    type: 'creator',
    content: user,
    status: 'draft',
    page: 1,
    pageSize: 999
  }
  try {
    const res = yield fetch.post('/api/page/limitpagelist', formData)
    if (res.data.code === 'OK') {
      yield put(initDraftList(res.data.data.result))
    }
  } catch(e) {
    console.log(e.error)
  }
}

export function* getArticleList() {
  yield takeLatest(GET_ARTICLE_LIST, axiosGetArticleList)
}

function* axiosGetArticleList(action) {
  const user = yield select(state => state.getIn(['user', 'user']))
  const formData = {
    type: 'create_user',
    content: user,
    status: 'normal',
    page: action.page,
    pageSize: 10
  }
  try {
    const res = yield fetch.post('/api/page/limitpagelist', formData)
    const data = res.data.data
    yield put(initArticleList(data.result, data.total))
    window.scrollTo(0, 0)
  } catch(e) {
    console.log(e)
  }
}

export function* getUserInfo() {
  yield takeLatest(GET_USER_INFO, axiosGetUserInfo)
}

function* axiosGetUserInfo(action) {
  try {
    const res = yield fetch.post('/api/signin/getUserInfo', { username: action.user })
    yield put(initUserInfo(res.data.data))
  } catch(e) {
    console.log(e)
  }
}

export function* getLimitArticleList() {
  yield takeLatest(GET_LIMIT_ARTICLE_LIST, axiosGetLimitArticleList)
}

function* axiosGetLimitArticleList(action) {
  const formData = {
    type: 'create_user',
    status: 'normal',
    content: action.user,
    pageSize: 10,
    page: action.page,
    secret: false
  }
  try {
    const res = yield fetch.post('/api/page/pagelist', formData)
    yield put(initLimitArticleList(res.data.data.result, res.data.data.total))
    window.scrollTo(0, 0)
  } catch(e) {
    console.log(e)
  }
}
