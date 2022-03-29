import React, { useState, useEffect } from 'react'
import { PaginationWrapper, PaginationItem } from './styled'
import classnames from 'classnames'
function Pagination ({ current = 1, total, pageSize = 10, onChange }) {
  const [page, setPage] = useState(current)
  const pageNum = Math.ceil(total / pageSize)
  useEffect(() => {
    setPage(current)
  }, [current])
  const handlePageChange = (_page) => {
    setPage(_page)
    onChange && onChange(_page)
  }
  const leftMiss = page >= 5 // 显示左边省略号
  const rightMiss = pageNum - page > 3 // 显示右边省略号
  return (
    <div className='text-sm list-none tabular-nums flex items-center'>
      <PaginationItem
        className={classnames({ disabled: page === 1 })}
        onClick={() => handlePageChange(page - 1)}
      >
        <i className="iconfont icon-arrow-left" />
      </PaginationItem>
      <PaginationItem
        className={classnames({ active: page === 1 })}
        onClick={() => handlePageChange(1)}
      >{ 1 }</PaginationItem>
      {
        leftMiss
          ? (<>
              <PaginationItem
                className='show-more'
                onClick={() => handlePageChange(page - 3)}
              >•••</PaginationItem>
              <PaginationItem
                onClick={() => handlePageChange(page - 2)}
              >{ page - 2 }</PaginationItem>
              <PaginationItem
                onClick={() => handlePageChange(page - 1)}
              >{ page - 1 }</PaginationItem>
            </>)
          : (Array.from({ length: page -  2 }).map((_, i) => ( // 从第二页开始
            <PaginationItem
              key={i + 2}
              onClick={() => handlePageChange(i + 2)}
            >{ i + 2 }</PaginationItem>
          )))
      }
      {
        page !== 1 && page !== pageNum
          ? (<PaginationItem className='active'>{ page }</PaginationItem>)
          : null
      }
      {
        rightMiss
          ? (
            <>
              <PaginationItem
                onClick={() => handlePageChange(page + 1)}
              >{ page + 1 }</PaginationItem>
              <PaginationItem
                onClick={() => handlePageChange(page + 2)}
              >{ page + 2 }</PaginationItem>
              <PaginationItem
                className='show-more'
                onClick={() => handlePageChange(page + 3)}
              >•••</PaginationItem>
            </>
          )
          : Array.from({ length: (pageNum - 1 - page) }).map((_, i) => ( // 算到倒数第二页
            <PaginationItem
              key={page + i + 1}
              onClick={() => handlePageChange(page + i + 1)}
            >{ page + i + 1 }</PaginationItem>
          ))
      }
      <PaginationItem
        className={classnames({ active: page === pageNum })}
        onClick={() => handlePageChange(pageNum)}
      >{ pageNum }</PaginationItem>
      <PaginationItem
        className={classnames({ disabled: page === pageNum })}
        onClick={() => handlePageChange(page + 1)}
      >
        <i className="iconfont icon-arrow-right" />
      </PaginationItem>
    </div>
  )
}

export default Pagination
