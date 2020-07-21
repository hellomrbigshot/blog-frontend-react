import React from 'react'
import { TagWrapper, TagHeader, TagDesc } from './styled'
export default function () {
  return (
    <TagWrapper>
      <TagHeader/>
      {
        [1, 2].map(_ => (
          <TagDesc key={_}/>
        ))
      }
    </TagWrapper>
  )
}
