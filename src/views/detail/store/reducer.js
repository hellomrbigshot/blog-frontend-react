import { fromJS } from 'immutable'
import { INIT_ARTICLE_DETAIL, INIT_COMMENT_LIST } from './actionTypes';
const initialState = fromJS({
  detail: {},
  commentList: []
})
export default (state = initialState, action) => {
  switch(action.type) {
    case INIT_ARTICLE_DETAIL:
      return state.set('detail', fromJS(action.detail))
    case INIT_COMMENT_LIST:
      return state.set('commentList', fromJS(action.list))
    default:
      return state
  }
}