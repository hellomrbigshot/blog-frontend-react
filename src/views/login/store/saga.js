import { takeLatest, put } from 'redux-saga/effects'
import { LOGIN, REGISTER, LOGOUT } from './actionTypes'
import { fetch } from '../../../common'
import { loginSuccess, registerSuccess, logoutSuccess } from './actionCreators'

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
    yield put(registerSuccess(userInfo.data.data.username))
  }
}

export function* logout() {
  yield takeLatest(LOGOUT, axiosLogout)
}

export function* axiosLogout() { // 登出
  let res = yield fetch.post('/api/signout')
  if (res.data.code === 'OK') {
    yield put(logoutSuccess())
  }
}