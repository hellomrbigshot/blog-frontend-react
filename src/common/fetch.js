/**
 * 401 为 token 过期，调用 /api/sign/refreshToken 刷新 token
 * 402 为 refreshToken 过期，直接跳转到登录页
 */
import axios from 'axios'
import qs from 'qs'
import Cookies from 'js-cookie'
import store from '../store'
import { message } from 'antd'
import { actionCreators } from '../views/user/store'
import { deleteFetch, addFetch } from '../store/app/actionCreators'

axios.interceptors.request.use(
  (config) => {
    store.dispatch(addFetch())
    return config
  },
  (error) => {
    store.dispatch(deleteFetch())
    return Promise.reject(error)
  }
)

// axios 拦截器 未登录则跳转到登录页
axios.interceptors.response.use(
  (res) => {
    store.dispatch(deleteFetch())
    if (res.data.code === 'OK') {
      return res
    } else {
      // 提示报错信息
      message.error(res.data.data, 10)
      return Promise.reject(res)
    }
  },
  (error) => {
    store.dispatch(deleteFetch())
    if (error.response) {
      switch (error.response.status) {
        case 402:
          // 登录超时 跳转登录页
          store.dispatch(actionCreators.logoutSuccess())
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
  return axios({
    url: '/api/signin/refreshToken',
    headers: { Authorization: `Beare ${token}` },
    method: 'get',
  })
}

export const post = (url, formData, headers = {}) => {
  const token = Cookies.get('token')
  headers = Object.assign({}, headers, { Authorization: `Beare ${token}` })
  return axios({
    url,
    headers,
    method: 'post',
    data: qs.stringify(formData),
  })
    .then((res) => {
      return res
    })
    .catch((e) => {
      if (e.response.status === 401) {
        // token 超时，访问刷新 token 接口
        return fetchRefreshToken().then((res) => {
          const { data } = res.data
          const { token, refresh_token: refreshToken } = data
          Cookies.set('token', token)
          Cookies.set('refreshToken', refreshToken)
          return post(url, formData, headers) // 重新调用这个接口
        })
      }
    })
}

export const get = (url, formData, headers = {}) => {
  const token = Cookies.get('token')
  headers = Object.assign({}, headers, { Authorization: `Beare ${token}` })
  return axios({
    url,
    headers,
    method: 'get',
    data: formData,
  })
    .then((res) => {
      return res
    })
    .catch((e) => {
      if (e.response.status === 401) {
        // token 超时，访问刷新 token 接口
        fetchRefreshToken().then((res) => {
          const { data } = res.data
          const { token, refresh_token: refreshToken } = data
          Cookies.set('token', token)
          Cookies.set('refreshToken', refreshToken)
          return get(url, formData, headers) // 重新调用这个接口
        })
      }
    })
}
