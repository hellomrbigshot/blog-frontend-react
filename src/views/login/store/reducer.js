import { LOGIN, LOGIN_SUCCESS, REGISTER_SUCCESS, LOGOUT } from './actionTypes'
import { fromJS } from 'immutable'

const initialState = fromJS({
  user: {
    username: '',
    avatar: '',
    _id: ''
  }
})
export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return state.set('user', fromJS(user))
    case REGISTER_SUCCESS:
      return state.set('user', fromJS(user))
    case LOGOUT:
      return state.merge({  username: '', avatar: '', _id: '' })
    default:
      return state
  }
}