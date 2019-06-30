import { 
  LOGIN, 
  LOGIN_SUCCESS, 
  LOGOUT, 
  REGISTER, 
  REGISTER_SUCCESS, 
  LOGOUT_SUCCESS,
  GET_DRAFT_LIST,
  INIT_DRAFT_LIST
} from './actionTypes'

export const login = (user) => {
  return {
    type: LOGIN,
    user
  }
}

export const loginSuccess = (user) => {
  return {
    type: LOGIN_SUCCESS,
    user
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

export const register = (user) => {
  return {
    type: REGISTER,
    user
  }
}

export const registerSuccess = (user) => {
  return {
    type: REGISTER_SUCCESS,
    user
  }
}

export const getDraftList = () => {
  return {
    type: GET_DRAFT_LIST
  }
}

export const initDraftList = (data) => {
  return {
    type: INIT_DRAFT_LIST,
    data
  }
}

