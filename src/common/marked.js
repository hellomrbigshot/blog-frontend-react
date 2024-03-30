import { Marked } from 'marked'
import hljs from './highlight'
import { markedHighlight } from 'marked-highlight'
import store from '../store'
import { actionCreators } from '../views/detail/store'

const renderer = {
  heading (text, level) {
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
}

// hljs.initHighlightingOnLoad()
// console.log(Marked, 'marked')
const marked = new Marked(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight (code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'typescript'
      return hljs.highlight(code, { language }).value
    }
  }),
  {
    pedantic: false,
    gfm: true,
    breaks: true,
    renderer,
  }
)

const betterMarked = (str) => marked.parse(str).replace(/<code( class="language-[A-Za-z]*")?>/g, '<code class="hljs">') // replace <code> tags to <code class="hljs">

export default betterMarked
