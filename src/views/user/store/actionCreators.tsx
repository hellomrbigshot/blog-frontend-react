import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER,
  REGISTER_SUCCESS,
  LOGOUT_SUCCESS,
  GET_DRAFT_LIST,
  INIT_DRAFT_LIST,
  GET_ARTICLE_LIST,
  INIT_ARTICLE_LIST,
  GET_USER_INFO,
  INIT_USER_INFO,
  GET_LIMIT_ARTICLE_LIST,
  INIT_LIMIT_ARTICLE_LIST
} from './actionTypes'

export const login = (user: string) => {
  return {
    type: LOGIN,
    user
  }
}

export const loginSuccess = (user: string, token: string, refreshToken: string) => {
  return {
    type: LOGIN_SUCCESS,
    user,
    token,
    refreshToken
  }
}

export const logout = () => {
  return {
    type: LOGOUT
  }
}

export const logoutSuccess = () => {
  return {
    type: LOGOUT_SUCCESS
  }
}

export const register = (user: string) => {
  return {
    type: REGISTER,
    user
  }
}

export const registerSuccess = (user: string, token: string, refreshToken: string) => {
  return {
    type: REGISTER_SUCCESS,
    user,
    token,
    refreshToken
  }
}

export const getDraftList = () => {
  return {
    type: GET_DRAFT_LIST
  }
}

export const initDraftList = (data: any) => {
  return {
    type: INIT_DRAFT_LIST,
    data
  }
}

export const getArticleList = (page: number) => {
  return {
    type: GET_ARTICLE_LIST,
    page
  }
}

export const initArticleList = (list: any[], total: number) => {
  return {
    type: INIT_ARTICLE_LIST,
    list,
    total
  }
}

export const getUserInfo = (user: string) => {
  return {
    type: GET_USER_INFO,
    user
  }
}

export const initUserInfo = (detail: any) => {
  return {
    type: INIT_USER_INFO,
    detail
  }
}

export const getLimitArticleList = (user: string, page: number = 1) => {
  return {
    type: GET_LIMIT_ARTICLE_LIST,
    user,
    page
  }
}

export const initLimitArticleList = (list: any[], total: number) => {
  return {
    type: INIT_LIMIT_ARTICLE_LIST,
    list,
    total
  }
}
