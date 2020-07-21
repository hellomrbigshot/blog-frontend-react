import React from 'react'
import { ArticleWrapper, ArticleItem } from './styled'
export default function () {
  const Arr = Array(10).fill('')
  return (
    <ArticleWrapper>
      {Arr.map((_, i) => (
        <ArticleItem key={i}/>
      ))}
    </ArticleWrapper>
  )
}
