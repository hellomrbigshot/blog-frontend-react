import { fromJS } from 'immutable'
import { INIT_DRAFT_LIST } from './actionTypes'

const initialState = fromJS({
  draftList: []
})

export default (state = initialState, action) => {
  switch(action.type) {
    case INIT_DRAFT_LIST:
      return state.set('draftList', fromJS(action.data))
    default:
      return state 
  }
}
