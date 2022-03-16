import React from 'react'
export default function () {
  const Arr = Array(10).fill('')
  return (
    <div className='mt-10'>
      {Arr.map((_, i) => (
        <div key={i} className='rounded w-full mt-4 mb-2.5 h-7 skeleton'/>
      ))}
    </div>
  )
}
