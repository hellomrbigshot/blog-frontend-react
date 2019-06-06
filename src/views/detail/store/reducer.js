import { fromJS } from 'immutable'
import { INIT_ARTICLE_DETAIL, INIT_COMMENT_LIST } from './actionTypes';
const defaultState = fromJS({
  detail: {},
  commentList: []
})
export default (state = defaultState, action) => {
  switch(action.type) {
    case INIT_ARTICLE_DETAIL:
      return state.set('detail', action.detail)
    case INIT_COMMENT_LIST:
      return state.set('commentList', action.list)
    default:
      return state
  }
}