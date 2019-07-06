import { fromJS } from 'immutable'
import { INIT_TAG_LIST } from './actionTypes'
const initialState = fromJS({
  tagList: [],
  articleDetail: {
    content: '',
    tags: [],
    title: ''
  }
})

export default (state = initialState, action) => {
  switch(action.type) {
    case INIT_TAG_LIST:
      return state.set('tagList', action.list)
    default:
      return state
  }
}
