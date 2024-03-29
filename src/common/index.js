import marked from './marked'
import * as fetch from './fetch'
import { useLocation } from 'react-router-dom'

/**
 * 
 * @param {date} time 
 * @param {string} type 
 */

const formatTime = (time, type = '3') => {
    if (!time) return null
    let str = ''
    switch (type) {
        // yyyy-mm-dd hh:MM:ss
        case '1':
            time = new Date(time)
            str = `${time.getFullYear()}-${padStart2(time.getMonth() + 1)}-${padStart2(time.getDate())} ${padStart2(time.getHours())}:${padStart2(
                time.getMinutes()
            )}:${padStart2(time.getSeconds())}`
            break
        // yyyy-mm-dd
        case '2':
            str = `${time.getFullYear()}-${padStart2(time.getMonth() + 1)}-${padStart2(time.getDate())}`
            break
        // 倒计时
        case '3':
            str = timeType3(time)
            break
        default:
            str = ''
    }
    return str
}

const timeType3 = (t) => {
    let nowTime = new Date().getTime(),
        time = new Date(t).getTime()
    if (nowTime - time < 60 * 1000) {
        // return  `${Math.floor((nowTime-time)/(1000))} 秒钟前`
        return '刚刚'
    } else if (nowTime - time < 60 * 60 * 1000) {
        return `${Math.floor((nowTime - time) / (60 * 1000))} 分钟前`
    } else if (nowTime - time < 24 * 60 * 60 * 1000) {
        return `${Math.floor((nowTime - time) / (60 * 60 * 1000))} 小时前`
    } else if (nowTime - time < 7 * 24 * 60 * 60 * 1000) {
        return `${Math.floor((nowTime - time) / (24 * 60 * 60 * 1000))} 天前`
    } else if (new Date().getFullYear() === new Date(t).getFullYear()) {
        return `${padStart2(new Date(t).getMonth() + 1)}月${padStart2(new Date(t).getDate())}日`
    } else {
        return `${new Date(t).getFullYear()}-${padStart2(new Date(t).getMonth() + 1)}-${padStart2(new Date(t).getDate())}`
    }
}

/**
 * @description 位数不足自动补全两位
 * @param {string | number} num 
 */
const padStart2 = (num = 0) => {
    num = typeof num === 'string' ? num : String(num)
    return num.padStart(2, '0')
}

// 防抖函数
const debounce = (fun, wait = 100, immediate = false) => {
    let time
    return function() {
        const args = arguments
        if (time) clearTimeout(time) // 清除上一次定时器，这里用到了闭包
        if (immediate) {
            // 如果是立即执行
            // 如果已经执行过，不再执行
            let callNow = !time
            time = setTimeout(() => {
                // wait 毫秒后清除 time，清除 time 后函数才会执行
                time = null
            }, wait)
            if (callNow) fun.apply(this, args)
        } else {
            time = setTimeout(() => {
                fun.apply(this, args)
            }, wait)
        }
    }
}

const throttle = (fun, wait) => {
    let previous = 0
    return function() {
        let now = +new Date()
        if (now - previous > wait) {
            // 当前事件与上次执行时间间隔大于 awit 毫秒才执行
            fun.apply(this, arguments)
            previous = now
        }
    }
} 

const useQuery = (key) => {
  const location = useLocation()
  const query = new URLSearchParams(location.search)
  return query.get(key)
}

const isMac = /macintosh|mac os x/i.test(navigator.userAgent)

export { marked, formatTime, fetch, debounce, throttle, useQuery, isMac }
