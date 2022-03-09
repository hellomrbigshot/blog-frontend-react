import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { EditOutlined } from '@ant-design/icons'
import { message } from 'antd'
import Page from '../../components/Pagination'
import { Link } from 'react-router-dom'
import { getUserInfo, getLimitArticleList } from './store/actionCreators'
import { post } from '../../common/fetch'
import AvatarCropper from './components/AvatarCropper'
import BioEditModal from './components/BioEditModal'

function UserInfo ({ match: { params: { name: user } } }) {
  const dispatch = useDispatch()
  const [avatarModalVisible, setAvatarModalVisible] = useState(false)
  const [bioModalVisible, setBioModalVisible] = useState(false)
  const [img, setImg] = useState('')
  const [cropImgData, setCropImgData] = useState('')
  const articleList = useSelector(state => state.getIn(['user', 'userInfo', 'articleList']))
  const userInfo = useSelector(state => state.getIn(['user', 'userInfo', 'info']), shallowEqual)
  const total = useSelector(state => state.getIn(['user', 'userInfo', 'total']))
  const loginUser = useSelector(state => state.getIn(['user', 'user']))
  useEffect(() => {
    dispatch(getUserInfo(user))
    dispatch(getLimitArticleList(user, 1))
  }, [dispatch, user])
  const handleFileChange = file => {
    if (file) {
      const URL = window.URL || window.webkitURL
      setAvatarModalVisible(true)
      setImg(URL.createObjectURL(file))
    } else {
      return false
    }
  }
  const handleCropperChange = imgData => {
    if (imgData) {
      setCropImgData(imgData)
    }
  }
  const handleCropperCancel = () => {
    setImg('')
    setCropImgData('')
    setAvatarModalVisible(false)
  }
  const handleCropperOk = async imgData => {
    await post('/api/file/uploadAvatar', { imgData, username: loginUser })
    window.location.reload()
  }
  const handleBioOk = async bio => {
    if (!bio.trim()) {
      message.error('描述不能为空')
      return false
    }
    const username = loginUser
    await post('/api/user/updatebio', { username, bio })
    setBioModalVisible(false)
    dispatch(getUserInfo())
  }
  const canEdit = loginUser === user
  const handlePageChange = useCallback(page => {
    dispatch(getLimitArticleList(user, page))
  }, [dispatch, user])
  return (
    <div>
      <div className='flex'>
        <div className='group w-36 h-36 rounded-full overflow-hidden relative'>
          <img className='w-36 h-36 rounded-full' src={`/api/file/avatar/user/?username=${user}`} alt="头像" />
          {
            canEdit ? (
              <div className='absolute left-0 right-0 bottom-0 h-0 leading-7 z-10 opacity-70 bg-white text-center text-xs overflow-hidden transition-all duration-200 ease-linear group-hover:h-7'>
                更换头像
                <input
                  type="file"
                  className='absolute left-0 right-0 bottom-0 top-0 z-20 border-none cursor-pointer outline-none opacity-0'
                  onChange={e => handleFileChange(e.target.files[0])}
                />
              </div>
            ) : null
          }
        </div>
        <div className='flex-1 flex flex-col ml-10'>
          <h2 className='text-2xl font-bold'>{user}</h2>
          <div className='pl-5 py-3 pr-8 rounded bg-gray-200 text-sm relative group flex-1 mt-3'>
            {userInfo.get('bio') || '暂时没有个人简介(lll￢ω￢)'}
            {canEdit ? <EditOutlined className="editIcon absolute top-2 right-3 hidden cursor-pointer group-hover:block" onClick={() => setBioModalVisible(true)} /> : null}
          </div>
        </div>
      </div>
      <div className='my-8'>
        <h2 className='text-2xl font-bold'>相关文章</h2>
        {articleList.map(article => (
          <div className='flex items-baseline border-b border-dashed border-gray-300 pb-2.5 hover:border-gray-400' key={article.get('_id')}>
            <div className='w-1.5 h-1.5 rounded-full bg-gray-600'></div>
            <div className="text-xs text-gray-400 ml-4">{article.get('create_time').slice(5, 10)}</div>
            <Link className='text-base ml-2 text-gray-500 leading-8 mt-5 flex-1 overflow-ellipsis whitespace-nowrap overflow-hidden hover:text-gray-600' title={article.get('title')} to={`/detail/${article.get('_id')}`}>{article.get('title')}</Link>
          </div>
        ))}
      </div>
      {
        total > 10
          ? <Page total={total} onChange={handlePageChange} />
          : null
      }
      <AvatarCropper
        visible={avatarModalVisible}
        img={img}
        cropImgData={cropImgData}
        onCropper={imgData => handleCropperChange(imgData)}
        onCancel={imgData => handleCropperCancel(imgData)}
        onOk={imgData => handleCropperOk(imgData)}
      />
      {userInfo.get('username') ? (
        <BioEditModal
          visible={bioModalVisible}
          onCancel={() => setBioModalVisible(false)}
          onOk={input => handleBioOk(input)}
        />
      ) : null}
    </div>
  )
}

export default UserInfo
