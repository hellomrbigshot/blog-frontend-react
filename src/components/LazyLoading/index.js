import { useState, useEffect, useRef } from 'react'
import { LoadingOutlined } from '@ant-design/icons'
export default () => {
  const [show, setShow] = useState(false)
  const timeoutRef = useRef()
  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setShow(true)
    }, 300)
    return () => {
      clearTimeout(timeoutRef.current)
    }
  }, [])
  return (
    show
      ? (
        <div className='flex flex-col items-center fixed top-1/2 left-1/2 transform -translate-x-1/2'>
          <LoadingOutlined className='text-4xl text-blue-500' />
          <div className='text-center mt-3 text-sm text-blue-500'>数据加载中…</div>
        </div>
      )
      : null
  )
}
