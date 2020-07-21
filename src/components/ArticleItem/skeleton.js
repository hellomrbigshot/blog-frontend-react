import React from 'react'
import { SkeletonWrapper, SkeletonHeader, SkeletonDescWrapper, SkeletonDesc, SkeletonContent } from './styled'
export default function () {
  return (
    <SkeletonWrapper>
      <SkeletonHeader/>
      <SkeletonDescWrapper>
        {
          [1, 2, 3].map(_ => (
            <SkeletonDesc key={_} />
          ))
        }
      </SkeletonDescWrapper>
      {
        [4, 5, 6].map(_ => (
          <SkeletonContent key={_}/>
        ))
      }
    </SkeletonWrapper>
  )
}
