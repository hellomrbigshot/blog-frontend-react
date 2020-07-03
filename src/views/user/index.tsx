import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { EditOutlined } from '@ant-design/icons'
import { Pagination, Avatar, message } from 'antd'
import { Link, RouteComponentProps } from 'react-router-dom'
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

interface IState {
  user: {
    user: string,
    userInfo: {
      articleList: any[],
      info: any,
      total: number
    }
  }
}
interface IRoute {
  match: {
    params: {
      name: string
    }
  }
}
function UserInfo ({ match: { params } }: RouteComponentProps & IRoute) {
  const user = params.name
  const dispatch = useDispatch()
  const [avatarModalVisible, setAvatarModalVisible] = useState(false)
  const [bioModalVisible, setBioModalVisible] = useState(false)
  const [img, setImg] = useState('')
  const [cropImgData, setCropImgData] = useState('')
  const articleList = useSelector((state: IState) => state.user.userInfo.articleList)
  const userInfo = useSelector(((state: IState) => state.user.userInfo.info), shallowEqual)
  const total = useSelector((state: IState) => state.user.userInfo.total)
  const loginUser = useSelector((state: IState) => state.user.user)
  useEffect(() => {
    dispatch(getUserInfo(user))
    dispatch(getLimitArticleList(user, 1))
  }, [dispatch, user])
  const handleFileChange = (file: any) => {
    if (file) {
      const URL = window.URL || window.webkitURL
      setAvatarModalVisible(true)
      setImg(URL.createObjectURL(file))
    } else {
      return false
    }
  }
  const handleCropperChange = (imgData: any) => {
    if (imgData) {
      setCropImgData(imgData)
    }
  }
  const handleCropperCancel = () => {
    setImg('')
    setCropImgData('')
    setAvatarModalVisible(false)
  }
  const handleCropperOk = async (imgData: any) => {
    await post('/api/file/uploadAvatar', { imgData, username: loginUser })
    window.location.reload()
  }
  const handleBioOk = async (bio: string) => {
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
            {canEdit ? <EditOutlined className="editIcon" onClick={() => setBioModalVisible(true)} /> : null}
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
        onCropper={(imgData: any) => handleCropperChange(imgData)}
        onCancel={(imgData: any) => handleCropperCancel()}
        onOk={(imgData: any) => handleCropperOk(imgData)}
      />
      {userInfo.get('username') ? (
        <BioEditModal
          visible={bioModalVisible}
          onCancel={() => setBioModalVisible(false)}
          onOk={(input: string) => handleBioOk(input)}
        />
      ) : null}
    </div>
  )
}

export default UserInfo
