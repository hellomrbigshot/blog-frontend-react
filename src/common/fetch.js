import axios from 'axios'
import qs from 'qs'
import Cookies from 'js-cookie'

let loadingArr = [],
    timer = null
// 添加 loading
axios.interceptors.request.use(
  config => {
    if (!loadingArr.length) {
      timer = setTimeout(() => {
        // 添加延时函数，如果接口请求很快就不出现 loading
        
      }, 300)
    }
    loadingArr.length++
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// axios 拦截器 未登录则跳转到登录页
axios.interceptors.response.use(
  res => {
    loadingArr.pop()
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    // console.log(loadingArr.length)
    if (!loadingArr.length) {
      // 隐藏 loading
    }

    if (res.data.code === 'OK') {
      return res
    } else {
      // 提示报错信息
      return Promise.reject(res.data)
    }
  },
  error => {
    loadingArr.pop()
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    // console.log(loadingArr.length)
    if (!loadingArr.length) {
      // 隐藏 loading
    }
    if (error.response) {
      switch (error.response.status) {
        case 401:
          Cookies.remove('username')
          break
          // 跳到登录页
        default:
          break
      }
    }
    console.log(error)
    return Promise.reject(error.response.data)
  }
)

export const post = (url, data, header = {}) => {
  return axios({
    url, 
    header,
    method: 'post',
    data: qs.stringify(data)
  })
} 

export const get = (url, data, header = {}) => {
  return axios({
    url, 
    header,
    method: 'get',
    data: data
  })
}
