import { LOGIN_SUCCESS, REGISTER_SUCCESS, LOGOUT } from './actionTypes'
import { fromJS } from 'immutable'
import Cookies from 'js-cookie'

const initialState = fromJS({
  user: {
    username: Cookies.get('username') || '',
    avatar: '',
    _id: ''
  }
})
export default (state = initialState, action) => {
  let username = '',
      _id = ''
  if (action.user) {
    username = action.user.username
    _id = action.user._id
  }
  switch (action.type) {
    case LOGIN_SUCCESS:
      Cookies.set('username', username)
      return state.merge({ username, _id })
    case REGISTER_SUCCESS:
      Cookies.set('username', username)
      return state.merge({ username, _id })
    case LOGOUT:
      return state.merge({ username: '', avatar: '', _id: '' })
    default:
      return state
  }
}
