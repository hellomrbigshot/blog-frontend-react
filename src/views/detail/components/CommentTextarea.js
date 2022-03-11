import react, { useCallback } from 'react'
export default ({ placeholder, onChange, onFocus, onEnter, isMac, innerRef }) => {
  const handleKeyDown = useCallback((e) => {
    if ((isMac && e.metaKey && e.keyCode === 13) || (!isMac && e.ctrlKey && e.keyCode === 13)) { // mac command+enter windows ctrl+enter 提交
      onEnter()
    }
  })
  return (
    <textarea
      ref={innerRef}
      className='rounded-md outline-none border bg-gray-200 border-gray-200 w-full px-3 py-2 text-sm resize-none focus:border-blue-500 focus:bg-white'
      rows='3'
      placeholder={placeholder}
      onChange={onChange}
      onFocus={onFocus}
      onKeyDown={handleKeyDown}
    />
  )
}