import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { Pagination, Avatar, Icon, Message } from 'antd'
import { Link } from 'react-router-dom'
import { getUserInfo, getLimitArticleList } from './store/actionCreators'
import { post } from '../../common/fetch'
import AvatarCropper from './components/AvatarCropper'
import BioEditModal from './components/BioEditModal'
import {
  UserInfoWrapper,
  UserAvatarWrapper,
  UserInfoDetailWrapper,
  BioWrapper,
  LimitArticleList,
  LimitArticleItem,
  AvatarSelectButton
} from './styled'

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
      Message.error('描述不能为空')
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
      <UserInfoWrapper>
        <UserAvatarWrapper>
          <Avatar size={150} src={`/api/file/avatar/user/?username=${user}`} />
          {canEdit ? (
            <AvatarSelectButton className="avatar-select">
              更换头像
              <input type="file" onChange={e => handleFileChange(e.target.files[0])} />
            </AvatarSelectButton>
          ) : null}
        </UserAvatarWrapper>
        <UserInfoDetailWrapper>
          <h2>{user}</h2>
          <BioWrapper>
            {userInfo.get('bio') || '暂时没有个人简介(lll￢ω￢)'}
            {canEdit ? <Icon className="editIcon" type="edit" onClick={() => setBioModalVisible(true)} /> : null}
          </BioWrapper>
        </UserInfoDetailWrapper>
      </UserInfoWrapper>
      <LimitArticleList>
        <h2>相关文章</h2>
        {articleList.map(article => (
          <LimitArticleItem key={article.get('_id')}>
            <Link to={`/detail/${article.get('_id')}`}>
              <h1 className="title">{article.get('title')}</h1>
            </Link>
            <div className="time">{article.get('create_time').slice(5, 10)}</div>
          </LimitArticleItem>
        ))}
      </LimitArticleList>
      {total > 10 ? <Pagination total={total} onChange={handlePageChange} /> : null}
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
