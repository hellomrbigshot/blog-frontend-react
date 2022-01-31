import React from 'react'
export default function () {
  return (
    <div className='mb-24'>
      <div className='w-3/5 h-7 bg-gradient-to-r from-gray-100 to-gray-200 rounded-sm'></div>
      {/* <div className='flex mt-4'>
        {
          [1, 2, 3].map(_ => (
            <div className='w-20 h-5 bg-gradient-to-r from-gray-100 to-gray-200 rounded mr-5' key={_} />
          ))
        }
      </div> */}
      {
        [4, 5, 6, 7].map(_ => (
          <div className='mt-3 h-4 w-full bg-gradient-to-r from-gray-100 to-gray-300 rounded-sm' key={_}/>
        ))
      }
    </div>
  )
}
