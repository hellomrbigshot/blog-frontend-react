import React, { useRef, useEffect } from 'react'
import { Modal } from 'antd'
function bioEditModal ({ visible, onCancel, onOk, placeholder }) {
  const textareaRef = useRef(null)
  useEffect(() => {
    if (textareaRef.current) textareaRef.current.value = placeholder
  }, [visible])
  const handleOk = () => {
    onOk(textareaRef.current.value)
    if (textareaRef.current) textareaRef.current.value = ''
  }
  return (
    <Modal
      title='编辑个人介绍'
      visible={visible}
      cancelText='取消'
      okText='确认'
      placeholder='请输入你新的简介哦'
      onCancel={onCancel}
      onOk={handleOk}
    >
      <textarea
        rows='4'
        ref={textareaRef}
        className='w-full rounded px-2 py-2 resize-none text-sm border-gray-400 outline-none focus:border-blue-400'
      />
    </Modal>

  )
}

export default bioEditModal
