import React, { Component } from 'react'
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'
import { Modal } from 'antd'
import { debounce } from '../../../common' 

class AvatarCropperModal extends Component {
  _crop = () => {
    const imgData = this.refs.cropper.getCroppedCanvas().toDataURL()
    this.props.onCropper(imgData)
  }
  handleCrop = debounce(this._crop, 200)
  render() {
    const { visible, img, cropImgData, onCancel, onOk } = this.props
    const { handleCrop } = this
    return (
      <Modal
        title='修改头像'
        visible={visible}
        okText='确认'
        cancelText='取消'
        onCancel={() => onCancel(cropImgData)}
        onOk={() => onOk(cropImgData)}
      >
        <div style={{display: 'flex'}}>
          <Cropper
            ref='cropper'
            src={img}
            style={{height: 200, width: 200}}
            aspectRatio={1 / 1}
            guides={false}
            crop={handleCrop} 
          />
          <div style={{marginLeft: '50px'}}>
            {
              cropImgData ? <img width="150" height="150" style={{borderRadius: '50%'}} src={cropImgData} alt="预览头像"/> : null
            }
          </div>
        </div>
      </Modal>
    )
  }
  // componentDidMount () {
  //   this.imgData = this.props.img
  // }
}

export default AvatarCropperModal
