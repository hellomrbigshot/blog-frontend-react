import { INIT_ARTICLE_DETAIL, INIT_COMMENT_LIST, SHOW_REPLY_INPUT, HANDLE_CONCAT_COMMENT, HANDLE_COMMENT_CHANGE } from './actionTypes'
interface IState {
  detail: any,
  commentList: any[],
  comment: string
}
interface IAction {
  type: string,
  data?: any,
  detail?: any,
  list?: any[],
  index?: number
}
const initialState: IState = {
  detail: {},
  commentList: [],
  comment: ''
}
export default (state = initialState, action1: IAction) => {
  const action = Object.assign({
    type: '',
    data: '',
    detail: '',
    list: [],
    index: 0
  }, action1)
  switch (action.type) {
    case HANDLE_COMMENT_CHANGE:
      state.comment = action.data
      return state
    case INIT_ARTICLE_DETAIL:
      state.detail = action.detail
      return state
    case INIT_COMMENT_LIST:
      // if (action.list) {
        state.commentList = action.list
      // }
      return state
    case SHOW_REPLY_INPUT:
      if (action.index === undefined) return
      state.commentList[action.index].showReplyInput = !state.commentList[action.index].showReplyInput
      return state
    case HANDLE_CONCAT_COMMENT:
      if (action.index !== undefined) {
        state.comment = ''
        state.commentList[action.index].showReplyInput = false
        state.commentList = action.data.concat(state.commentList)
      } else {
        state.comment = ''
        state.commentList = action.data.concat(state.commentList)
      }
      return state
    default:
      return state
  }
}
