import { fromJS } from 'immutable'
import { INIT_ARTICLE_DETAIL, INIT_COMMENT_LIST, SHOW_REPLY_INPUT, HANDLE_CONCAT_COMMENT, HANDLE_COMMENT_CHANGE } from './actionTypes'
const initialState = fromJS({
  detail: {},
  commentList: [],
  comment: ''
})
export default (state = initialState, action) => {
  switch (action.type) {
    case HANDLE_COMMENT_CHANGE:
      return state.set('comment', action.data)
    case INIT_ARTICLE_DETAIL:
      return state.set('detail', fromJS(action.detail))
    case INIT_COMMENT_LIST:
      return state.set('commentList', fromJS(action.list))
    case SHOW_REPLY_INPUT:
      return state.setIn(['commentList', action.index, 'showReplyInput'], !state.getIn(['commentList', action.index, 'showReplyInput']))
    case HANDLE_CONCAT_COMMENT:
      if (action.index !== undefined)
        return state
          .set('comment', '')
          .set('commentList', fromJS([action.data]).concat(state.get('commentList').setIn([action.index, 'showReplyInput'], false)))
      else return state.set('comment', '').set('commentList', fromJS([action.data]).concat(state.get('commentList')))
    default:
      return state
  }
}
