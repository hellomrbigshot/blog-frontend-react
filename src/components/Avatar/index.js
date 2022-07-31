import { useState } from 'react'
import classNames from 'classnames'
import defaultAvatar from '../../statics/image/avatar.png'

export default ({ size = 32, src, className = '', alt }) => {
  const [show, setShow] = useState(false)
  const [showSkeleton, setShowSkeleton] = useState(true)
  const handleImgError = () => {
    setShowSkeleton(false)
    setShow(false)
  }
  const handleImgLoad = () => {
    setShowSkeleton(false)
    setShow(true)
  }
  return (
    <div style={{ width: `${size}px`, height: `${size}px`, borderRadius: '9999px' }} className={classNames(['skeleton rounded-full overflow-hidden', className])}>
      <img style={{ width: `${size}px`, height: `${size}px` }} src={src} alt={alt || '头像'} className={classNames([!show && 'hidden'])} onError={handleImgError} onLoad={handleImgLoad} />
      <img className={classNames([(showSkeleton || show) && 'hidden'])} style={{ width: `${size}px`, height: `${size}px` }} src={defaultAvatar} />
    </div>
  )
}
