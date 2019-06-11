import { fromJS } from 'immutable'
import { SEARCH_FOCUS, SEARCH_BLUR } from './actionTypes'

const initialState = fromJS({
  focused: false
})

export default (state = initialState, action) => {
  switch(action.type) {
    case SEARCH_FOCUS:
      return state.set('focused', true)
    case SEARCH_BLUR:
      return state.set('focused', false)
    default:
      return state
  }
}