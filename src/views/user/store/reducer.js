import { fromJS } from 'immutable'
import Cookies from 'js-cookie'
import { LOGIN_SUCCESS, LOGOUT_SUCCESS, INIT_DRAFT_LIST, INIT_ARTICLE_LIST, INIT_USER_INFO, INIT_LIMIT_ARTICLE_LIST } from './actionTypes'

const initialState = fromJS({
  user: Cookies.get('user') || '',
  draftList: [],
  article: {
    articleList: [],
    total: 0
  },
  userInfo: {
    articleList: [],
    total: 0,
    info: {}
  }
})
export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      // 登录成功
      Cookies.set('user', action.user)
      Cookies.set('token', action.token)
      Cookies.set('refreshToken', action.refreshToken)
      return state.set('user', action.user)
    case LOGOUT_SUCCESS:
      // 退出成功
      Cookies.remove('user')
      Cookies.remove('token')
      Cookies.remove('refreshToken')
      return state.set('user', '')
    case INIT_DRAFT_LIST:
      return state.set('draftList', fromJS(action.data))
    case INIT_ARTICLE_LIST:
      return state.setIn(['article', 'articleList'], fromJS(action.list)).setIn(['article', 'total'], action.total)
    case INIT_USER_INFO:
      return state.setIn(['userInfo', 'info'], fromJS(action.detail))
    case INIT_LIMIT_ARTICLE_LIST:
      return state.setIn(['userInfo', 'articleList'], fromJS(action.list)).setIn(['userInfo', 'total'], action.total)
    default:
      return state
  }
}
