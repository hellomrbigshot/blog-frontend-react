import { takeLatest, put } from 'redux-saga/effects'
import { LOGIN, REGISTER } from './actionTypes'
import { fetch } from '../../../common'
import { loginSuccess, registerSuccess } from './actionCreators'

export function* login() {
  yield takeLatest(LOGIN, axiosLogin)
}

function* axiosLogin(action) {
  let loginRes = yield fetch.post('/api/signin', { ...action.user })
  if (loginRes.data.code === 'OK') {
    let userInfo = yield fetch.post('/api/signin/getUserInfo', { username: action.user.username })
    yield put(loginSuccess(userInfo.data.data))
  }
}

export function* register() {
  yield takeLatest(REGISTER, axiosRegister)
}

export function* axiosRegister(action) {
  let registerRes = yield fetch.post('/api/signup', { ...action.user })
  if (registerRes.data.code === 'OK') {
    let userInfo = yield fetch.post('/api/signin/getUserInfo', { username: action.user.username })
    yield put(registerSuccess(userInfo.data.data))
  }
}