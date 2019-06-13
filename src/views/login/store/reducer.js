import { LOGIN_SUCCESS, REGISTER_SUCCESS, LOGOUT } from './actionTypes'
import { fromJS } from 'immutable'
import Cookies from 'js-cookie'

const initialState = fromJS({
  user: Cookies.get('user') || ''
})
export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      Cookies.set('user', action.user)
      return state.set('user', action.user)
    case REGISTER_SUCCESS:
      Cookies.set('user', action.user)
      return state.set('user', action.user)
    case LOGOUT:
      return state.set('user', '')
    default:
      return state
  }
}
