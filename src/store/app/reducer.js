import { START_FETCH, FINISH_FETCH, ADD_FETCH, DELETE_FETCH } from './actionTypes'
import { fromJS } from 'immutable'

const initialState = fromJS({
  isFetch: false,
  fetchArray: [],
  error: '',
})
export default (state = initialState, action) => {
  switch (action.type) {
    case START_FETCH:
      return state.set('isFetch', true)
    case FINISH_FETCH:
      return state.set('isFetch', false)
    case ADD_FETCH:
      return state.set('fetchArray', state.get('fetchArray').push(1))
    case DELETE_FETCH:
      return state.set('fetchArray', state.get('fetchArray').pop())
    default:
      return state
  }
}
