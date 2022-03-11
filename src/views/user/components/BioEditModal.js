import React from 'react'
import { Modal } from 'antd'
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
        <textarea
          rows='4'
          className='w-full rounded px-2 py-2 resize-none text-sm border-gray-400 outline-none focus:border-blue-400'
          onChange={e => bio = e.target.value}
        />
    </Modal>
  )
}

export default bioEditModal
