import marked from 'marked'
import hljs from './highlight'
import store from '../store'
import { actionCreators } from '../views/detail/store'

const renderer = new marked.Renderer()
renderer.heading = (text, level) => {
  if (window.location.href.includes('/detail/')) { // 详情页提取标题栏
    store.dispatch(actionCreators.addNavIndex(level))
    store.dispatch(actionCreators.addNavList(level, text))
    const index = store.getState().getIn(['detail', 'navInfo', 'navIndexObj', level]).length + 1
    return `
      <h${level} id="h${level}-${index}" class="blog-detail-header" data-link="linkToh${level}${index}">${text}</h${level}>
    `
  } else {
    return `
      <h${level}>${text}</h${level}>
      `
  }
  
}

// hljs.initHighlightingOnLoad()
marked.setOptions({
  renderer,
  highlight: (code) => {
    return hljs.highlightAuto(code).value
  },
  pedantic: false,
  gfm: true,
  tables: true,
  breaks: true,
  headerIds: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false
})

export default marked
