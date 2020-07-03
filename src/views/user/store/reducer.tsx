import { fromJS } from 'immutable'
import Cookies from 'js-cookie'
import { LOGIN_SUCCESS, LOGOUT_SUCCESS, INIT_DRAFT_LIST, INIT_ARTICLE_LIST, INIT_USER_INFO, INIT_LIMIT_ARTICLE_LIST } from './actionTypes'

interface IState {
  user: string,
  draftList: any[],
  article: {
    articleList: any[],
    total: number
  },
  userInfo: {
    articleList: any[],
    total: number,
    info: any
  }
}
interface IAction {
  type: string,
  user: string,
  token: string,
  refreshToken: string,
  data: any,
  list: any[],
  total: number,
  detail: any
}
const initialState: IState = {
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
}
export default (state = initialState, action: IAction) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      // 登录成功
      Cookies.set('user', action.user)
      Cookies.set('token', action.token)
      Cookies.set('refreshToken', action.refreshToken)
      state.user = action.user
      return state
    case LOGOUT_SUCCESS:
      // 退出成功
      Cookies.remove('user')
      Cookies.remove('token')
      Cookies.remove('refreshToken')
      state.user = ''
      return state
    case INIT_DRAFT_LIST:
      state.draftList = action.data
      return state
    case INIT_ARTICLE_LIST:
      state.article.articleList = action.list
      state.article.total = action.total
      return state
    case INIT_USER_INFO:
      state.userInfo.info = action.detail
      return state
    case INIT_LIMIT_ARTICLE_LIST:
      state.userInfo.articleList = action.list
      state.userInfo.total = action.total
      return state
    default:
      return state
  }
}
