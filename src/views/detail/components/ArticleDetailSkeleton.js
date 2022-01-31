import React from 'react'
import { SkeletonHeader, SkeletonDescWrapper, SkeletonDesc, SkeletonContent } from '../styled'
function ArticleDetailSkeleton () {
  return (
    <div>
      <div className='w-3/5 h-7 bg-gradient-to-r from-gray-100 to-gray-200 rounded-sm mx-auto'></div>
      {/* <div className='flex items-center justify-center mt-4'>
        {
          [1, 2, 3, 4].map(_ => (
            <div key={_} className='w-24 mr-5 rounded h-5 bg-gradient-to-r from-gray-100 to-gray-200'/>
          ))
        }
      </div> */}
      {
        [5, 6, 7, 8, 9, 10].map(_ => (
          <div key={_} className='mt-4 h-4 w-full bg-gradient-to-r from-gray-100 to-gray-200 rounded-sm'/>
        ))
      }
    </div>
  )
}

export default ArticleDetailSkeleton
