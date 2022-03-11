import { fromJS } from 'immutable'
import {
  INIT_ARTICLE_DETAIL,
  INIT_COMMENT_LIST,
  HANDLE_CONCAT_COMMENT,
  HANDLE_COMMENT_CHANGE,
  RESET_ARTICLE_DETAIL,
  RESET_COMMENT_LIST,
  RESET_NAV_INFO,
  ADD_NAV_INDEX,
  ADD_NAV_LIST
} from './actionTypes'
const initialState = fromJS({
  detail: {},
  commentList: [],
  comment: '',
  navInfo: {
    navIndexObj: {},
    navList: []
  }
})
export default (state = initialState, action) => {
  switch (action.type) {
    case HANDLE_COMMENT_CHANGE:
      return state.set('comment', action.data)
    case INIT_ARTICLE_DETAIL:
      return state.set('detail', fromJS(action.detail))
    case INIT_COMMENT_LIST:
      return state.set('commentList', fromJS(action.list))
    case HANDLE_CONCAT_COMMENT:
      return state.set('comment', '').set('commentList', fromJS([action.data]).concat(state.get('commentList')))
    case RESET_ARTICLE_DETAIL:
      return state.set('detail', fromJS({}))
    case RESET_COMMENT_LIST:
      return state.set('commentList', fromJS([]))
    case RESET_NAV_INFO:
      return state.set('navInfo', fromJS({
        navIndexObj: {},
        navList: []
      }))
    case ADD_NAV_INDEX:
      return state.updateIn(['navInfo', 'navIndexObj', action.data], item => item ? new Array(item.length + 1) : [])
    case ADD_NAV_LIST:
      return state.updateIn(['navInfo', 'navList'], item => item.push({
        level: action.level,
        no: state.getIn(['navInfo', 'navIndexObj', action.level]).length + 1,
        text: action.text }))
    default:
      return state
  }
}
