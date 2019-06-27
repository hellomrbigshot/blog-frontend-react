import { fromJS } from 'immutable'
import { INIT_TAG_DETAIL } from '../../tag/store/actionTypes';

const initialState = fromJS({
  commentList: [],
  total: 0
})

export default (state = initialState, action) => {
  switch(action.type) {
    case INIT_TAG_DETAIL:
      return state.set('commentList', fromJS(action.list)).set('total', fromJS(action.total))
    default:
      return state
  }
} 
