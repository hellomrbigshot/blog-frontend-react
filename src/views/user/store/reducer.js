import { LOGIN_SUCCESS, REGISTER_SUCCESS, LOGOUT_SUCCESS, INIT_DRAFT_LIST } from './actionTypes'
import { fromJS } from 'immutable'
import Cookies from 'js-cookie'

const initialState = fromJS({
  user: Cookies.get('user') || '',
  draftList: []
})
export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      Cookies.set('user', action.user)
      return state.set('user', action.user)
    case REGISTER_SUCCESS:
      Cookies.set('user', action.user)
      return state.set('user', action.user)
    case LOGOUT_SUCCESS:
      Cookies.remove('user')
      return state.set('user', '')
    case INIT_DRAFT_LIST:
        return state.set('draftList', fromJS(action.data))
    default:
      return state
  }
}
