import React from 'react'
import { Link } from 'react-router-dom'
function NoMatch({ history }) {
  return (
    <div className='p-5 rounded shadow flex flex-col items-center w-4/5 max-w-lg mx-auto'>
      <div className='text-5xl text-gray-600 font-bold'>404</div>
      <div className='text-2xl text-gray-600 mt-2'>无法获取此页面</div>
      <div className='w-full border-b border-dashed border-gray-300 my-2'/>
      <div className='w-full text-sm'>
        <div>您查找的页面可能已经被删除</div>
        <div>请尝试以下方法：</div>
        <div>如果在地址栏中输入页面地址，请确保拼写正确。</div>
        <div>
          单击“
          <Link to="" onClick={() => history.goBack()}>
            上一步
          </Link>
          ”按钮返回先前访问过的页面
        </div>
        <div>
          单击“<Link to="/">首页</Link>”按钮返回首页
        </div>
        <div>如果您是通过点击链接进入此界面，请与管理员联系并让他们了解此问题。</div>
      </div>
    </div>
  )
}

export default NoMatch
