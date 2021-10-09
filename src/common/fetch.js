/**
 * 401 为 token 过期，调用 /api/sign/refreshToken 刷新 token
 * 402 为 refreshToken 过期，直接跳转到登录页
 */
import axios from 'axios'
import qs from 'qs'
import Cookies from 'js-cookie'
import store from '../store'
import { message } from 'antd'
import { createBrowserHistory } from 'history'
import { actionCreators } from '../views/user/store'
import { deleteFetch, addFetch } from '../store/app/actionCreators'

const service = axios.create({
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

service.interceptors.request.use(
  (config) => {
    store.dispatch(addFetch())
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// axios 拦截器 未登录则跳转到登录页
service.interceptors.response.use(
  (res) => {
    store.dispatch(deleteFetch())
    const { data: { data, code } } = res
    if (code === 'OK') {
      return res
    } else {
      // 提示报错信息
      message.error(data, 10)
      return Promise.reject(res)
    }
  },
  (error) => {
    store.dispatch(deleteFetch())
    if (error.response) {
      switch (error.response.status) {
        case 402:
          const history = createBrowserHistory()
          const { pathname } = history.location
          // 登录超时 跳转登录页
          store.dispatch(actionCreators.logoutSuccess())
          window.location.href=`/login?redirect=${encodeURIComponent(pathname)}`
          break
        default:
          break
      }
    }
    return Promise.reject(error)
  }
)

const fetchRefreshToken = () => {
  const token = Cookies.get('refreshToken')
  return service({
    url: '/api/signin/refreshToken',
    headers: { Authorization: `Beare ${token}` },
    method: 'get',
  })
}

export const post = async (url, formData, headers = {}, restArgs = { onlyData: false }) => {
  const token = Cookies.get('token')
  const { onlyData } = restArgs
  headers = Object.assign({}, headers, { Authorization: `Beare ${token}` })
  try {
    const res = await service({
      url,
      headers,
      method: 'post',
      data: qs.stringify(formData),
    })
    return onlyData ? res.data.data : res
  } catch ({ response: { status } }) {
    if (status === 401) {
      // token 超时，访问刷新 token 接口
      const { data: { token, refresh_token: refreshToken } } = await fetchRefreshToken()
      Cookies.set('token', token)
      Cookies.set('refreshToken', refreshToken)
      return post(url, formData, headers, restArgs) // 重新调用这个接口
    }
  }
}

export const get = async (url, formData, headers = {}, restArgs = { onlyData: false }) => {
  const token = Cookies.get('token')
  const { onlyData } = restArgs
  headers = Object.assign({}, headers, { Authorization: `Beare ${token}` })
  try {
    const res = await service({
      url,
      headers,
      method: 'get',
      data: formData,
    })
    return onlyData ? res.data.data : res
  } catch ({ response: { status } }) {
    if (status === 401) {
      // token 超时，访问刷新 token 接口
      const { data: { token, refresh_token: refreshToken } } = await fetchRefreshToken()
      Cookies.set('token', token)
      Cookies.set('refreshToken', refreshToken)
      return get(url, formData, headers, restArgs) // 重新调用这个接口
    }
  }
}
