import React from 'react'
export default function () {
  return (
    <div>
      {
        Array(5).fill('').map((_, i) => (
          <div key={i} className='p-5 rounded shadow w-11/12 ml-1 mt-6'>
            <div className='bg-gradient-to-r from-gray-100 to-gray-200 h-6 rounded w-28 mb-3'></div>
            {
              Array(3).fill('').map((_, j) => (
                <div key={j} className='bg-gradient-to-r from-gray-100 to-gray-200 h-4 rounded w-full mt-2'></div>
              ))
            }
          </div>
        ))
      }
    </div>
  )
}
