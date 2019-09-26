import React, { Component } from 'react'
import { connect } from 'react-redux'
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

class UserInfo extends Component {
    constructor (props) {
      super(props)
      this.state = {
        avatarModalVisible: false,
        bioModalVisible: false,
        img: '',
        cropImgData: ''
      }
    }
    handleFileChange = (file) => {
      if (file) {
        const URL = window.URL || window.webkitURL
        this.setState(() => ({
          avatarModalVisible: true,
          img: URL.createObjectURL(file)
        }))
      } else {
        return false
      } 
    }
    handleCropperChange = (imgData) => {
      if (imgData) {
        this.setState(() => ({
          cropImgData: imgData
        }))
      }
    }
    handleCropperCancel = (imgData) => {
      this.setState(() => ({
        img: '',
        cropImgData: '',
        avatarModalVisible: false
      }))
    }
    handleCropperOk = async (imgData) => {
      const { loginUser } = this.props
      await post('/api/file/uploadAvatar', { imgData, username: loginUser })
      window.location.reload()
    }
    handleBioOk = async (bio) => {
      if (!bio.trim()) {
        Message.error('描述不能为空')
        return false
      }
      const username = this.props.loginUser
      await post('/api/user/updatebio', { username, bio })
      this.setState(() => ({
        bioModalVisible: false
      }))
      this.props.getUserInfo()
    }
    render() {
        const { total, userInfo, articleList, loginUser, getLimitArticleList } = this.props
        const { avatarModalVisible, bioModalVisible, img, cropImgData } = this.state
        const { name: user } = this.props.match.params
        const canEdit = loginUser === user
        return (
            <div>
                <UserInfoWrapper>
                    <UserAvatarWrapper>
                        <Avatar size={150} src={`/api/file/avatar/user/?username=${user}`} />
                        {
                          canEdit ? (
                            <AvatarSelectButton className="avatar-select">更换头像
                              <input type="file" onChange={(e) => this.handleFileChange(e.target.files[0])} />
                            </AvatarSelectButton>
                          ) : null
                        }
                    </UserAvatarWrapper>
                    <UserInfoDetailWrapper>
                        <h2>{user}</h2>
                        <BioWrapper>
                          {userInfo.get('bio') || '暂时没有个人简介(lll￢ω￢)'}
                          {
                            canEdit ? 
                              <Icon
                                className='editIcon'
                                type='edit'
                                onClick={() => this.setState(() => ({ bioModalVisible: true }))}
                              /> : null
                          }
                          
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
                {total > 10 ? <Pagination total={total} onChange={getLimitArticleList} /> : null}
                <AvatarCropper
                    visible={avatarModalVisible}
                    img={img}
                    cropImgData={cropImgData}
                    onCropper={imgData => this.handleCropperChange(imgData)}
                    onCancel={imgData => this.handleCropperCancel(imgData)}
                    onOk={imgData => this.handleCropperOk(imgData)}
                />
                {
                  userInfo.get('username') ?
                    <BioEditModal
                      visible={bioModalVisible}
                      onCancel={() => this.setState(() => ({ bioModalVisible: false }))}
                      onOk={(input) => this.handleBioOk(input)}
                    />
                    : null
                }
            </div>
        )
    }
    componentDidMount() {
        const user = this.props.match.params.name
        this.props.getUserInfo(user)
        this.props.getLimitArticleList()
    }
}

const mapStateToProps = state => {
    return {
        articleList: state.getIn(['user', 'userInfo', 'articleList']),
        userInfo: state.getIn(['user', 'userInfo', 'info']),
        total: state.getIn(['user', 'userInfo', 'total']),
        loginUser: state.getIn(['user', 'user'])
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        getUserInfo() {
            const name = props.match.params.name
            dispatch(getUserInfo(name))
        },
        getLimitArticleList(page = 1) {
            const { name } = props.match.params
            dispatch(getLimitArticleList(name, page))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserInfo)
