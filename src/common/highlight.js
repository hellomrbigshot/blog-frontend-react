import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import java from 'highlight.js/lib/languages/java'
import css from 'highlight.js/lib/languages/css'
import less from 'highlight.js/lib/languages/less'
import json from 'highlight.js/lib/languages/json'
import go from 'highlight.js/lib/languages/go'
import markdown from 'highlight.js/lib/languages/markdown'
import php from 'highlight.js/lib/languages/php'
import python from 'highlight.js/lib/languages/python'
import ruby from 'highlight.js/lib/languages/ruby'
import rust from 'highlight.js/lib/languages/rust'
import stylus from 'highlight.js/lib/languages/stylus'
import typescript from 'highlight.js/lib/languages/typescript'
import xml from 'highlight.js/lib/languages/xml'

const languageMapping = {javascript, java, css, less, json, markdown, go, php, python, ruby, rust, stylus, typescript, xml}
Object.keys(languageMapping).forEach(language => {
    hljs.registerLanguage(language, languageMapping[language])
})

export default hljs
