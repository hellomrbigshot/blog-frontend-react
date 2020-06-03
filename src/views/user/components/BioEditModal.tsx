import React from 'react'
import { Modal } from 'antd'
import { BioTextArea } from '../styled'
function bioEditModal(props) {
  const { visible, onCancel, onOk } = props
  let bio = ''
  return (
    <Modal
      title='编辑个人介绍'
      visible={visible}
      cancelText='取消'
      okText='确认'
      placeholder='请输入你新的简介哦'
      onCancel={onCancel}
      onOk={() => onOk(bio)}
    >
        <BioTextArea
          onChange={e => bio = e.target.value}
        />
    </Modal>
  )
}

export default bioEditModal
