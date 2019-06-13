import marked from 'marked'
import hljs from 'highlight.js'
import * as fetch from './fetch'

marked.setOptions({ 
  renderer: new marked.Renderer(),
  highlight: function(code) {
      return hljs.highlightAuto(code).value;
  },
  pedantic: false,
  gfm: true,
  tables: true,
  breaks: true,
  headerIds: true,
  headerPrefix: 'react',
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false
})

const formatTime = (time, type = '3') => {
  if(!time) return null
  let str = ''
  switch (type) {
    // yyyy-mm-dd hh:MM:ss
    case '1':
      time = new Date(time)
      str = `${time.getFullYear()}-${padStart2(time.getMonth() + 1)}-${padStart2(time.getDate())} ${padStart2(time.getHours())}:${padStart2(time.getMinutes())}:${padStart2(time.getSeconds())}`
      break
    // yyyy-mm-dd
    case '2':
      let date = new Date(time)
      str = `${time.getFullYear()}-${padStart2(time.getMonth() + 1)}-${padStart2(time.getDate())}`
      break
    // 倒计时
    case '3':
      str = timeType3(time)
      break
  }
  return str
}

function timeType3(t) {
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

function padStart2(num = 0) {
  num = typeof num === 'string' ? num : String(num)
  return num.padStart(2, '0')
}

export {
  marked,
  formatTime,
  fetch
}
