import { fromJS } from 'immutable'
import { SEARCH_FOCUS, SEARCH_BLUR, MOUSE_IN, MOUSE_LEAVE, THEME_SWITCH, SOCKET_INIT, MESSAGE_CHANGE } from './actionTypes'

const initialState = fromJS({
  focused: false,
  mouseIn: false,
  theme: 'light',
  socket: null,
  message: 0
})

export default (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_FOCUS:
      return state.set('focused', true)
    case SEARCH_BLUR:
      return state.set('focused', false)
    case MOUSE_IN:
      return state.set('mouseIn', true)
    case MOUSE_LEAVE:
      return state.set('mouseIn', false)
    case THEME_SWITCH:
      return state.set('theme', action.data)
    case SOCKET_INIT:
      return state.set('socket', action.data)
    case MESSAGE_CHANGE:
      if (action.data !== state.get('message')) {
        return state.set('message', action.data)
      } else {
        return state
      }
    default:
      return state
  }
}
