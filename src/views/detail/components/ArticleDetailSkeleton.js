import React from 'react'
function ArticleDetailSkeleton () {
  return (
    <div>
      <div className='w-3/5 h-7 bg-gradient-to-r from-gray-100 to-gray-200 rounded-sm mx-auto'></div>
      {
        [5, 6, 7, 8, 9, 10].map(_ => (
          <div key={_} className='mt-4 h-4 w-full bg-gradient-to-r from-gray-100 to-gray-200 rounded-sm'/>
        ))
      }
    </div>
  )
}

export default ArticleDetailSkeleton
