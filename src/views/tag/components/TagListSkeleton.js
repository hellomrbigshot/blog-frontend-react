import React from 'react'
import { TagItemWrapper, TagItemHeader, TagItemDesc, TagItemFooter } from './styled'
export default function () {
  return (
    <div>
      {
        Array(5).fill('').map((_, i) => (
          <TagItemWrapper key={i}>
            <TagItemHeader/>
            {
              Array(3).fill('').map((_, j) => (
                <TagItemDesc key={j}/>
              ))
            }
            <TagItemFooter/>
          </TagItemWrapper>
        ))
      }
    </div>
    
  )
}
