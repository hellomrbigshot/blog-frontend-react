import React from 'react'
import { SkeletonHeader, SkeletonDescWrapper, SkeletonDesc, SkeletonContent } from '../styled'
function ArticleDetailSkeleton () {
  return (
    <div>
      <div>
        <SkeletonHeader/>
      </div>
      <SkeletonDescWrapper>
        {
          [1, 2, 3, 4].map(_ => (
            <SkeletonDesc key={_}/>
          ))
        }
      </SkeletonDescWrapper>
      {
        [5, 6, 7, 8, 9, 10].map(_ => (
          <SkeletonContent key={_}/>
        ))
      }
    </div>
  )
}

export default ArticleDetailSkeleton
