import React from 'react'
import { NavWrapper, NavItem } from '../styled'
export default class ArticleDetailNav {
  navIndexObj = {}
  navList = []
  constructor() {
    this.navIndexObj = {}
    this.navList = []
  }
  add (text, level) {
    if (this.navIndexObj[level]) {
      this.navIndexObj[level].length++
    } else {
      this.navIndexObj[level] = []
    }
    this.navList.push({
      level,
      no: this.navIndexObj[level].length + 1,
      text
    })
  }
  reset () {
    this.navIndexObj = {}
    this.navList = []
  }
  toHeader (content) {
    document.querySelector(`#${content}`).scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
  render () {
    const showSideNav = !!this.navList.length
    const rootLevel = Math.min(...this.navList.map(item => item.level))
    return showSideNav
      ? (
        <NavWrapper>
          {
            this.navList.map((item, index) => (
              <NavItem
                title={item.text}
                key={`h${item.level}-${item.no}`}
                onClick={() => this.toHeader(`h${item.level}-${item.no}`)}
              >
                <pre>
                { `${('  ').repeat(item.level - rootLevel) + item.text}` }
                </pre>
              </NavItem>
            ))
          }
        </NavWrapper>
      )
      : null
  }
}
