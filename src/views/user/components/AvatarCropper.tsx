import React, { useRef } from 'react'
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'
import { Modal } from 'antd'
import { debounce } from '../../../common'

function AvatarCropperModal({ visible, img, cropImgData, onCropper, onCancel, onOk }) {
  const cropperEl = useRef(null)
  const _crop = () => {
    const imgData = cropperEl.current.getCroppedCanvas().toDataURL()
    onCropper(imgData)
  }
  const handleCrop = debounce(_crop, 200)

  return (
    <Modal
      title="修改头像"
      visible={visible}
      okText="确认"
      cancelText="取消"
      onCancel={() => onCancel(cropImgData)}
      onOk={() => onOk(cropImgData)}
    >
      <div style={{ display: 'flex' }}>
        <Cropper
          ref={cropperEl}
          src={img}
          style={{ height: 200, width: 200 }}
          aspectRatio={1 / 1}
          guides={false} crop={handleCrop}
        />
        <div style={{ marginLeft: '50px' }}>
          {cropImgData ? <img width="150" height="150" style={{ borderRadius: '50%' }} src={cropImgData} alt="预览头像" /> : null}
        </div>
      </div>
    </Modal>
  )
}

export default AvatarCropperModal
