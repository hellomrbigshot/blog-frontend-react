import { INIT_COMMENT_LIST } from './actionTypes'

interface IState {
  commentList: object[],
  total: number | string
}
interface IAction {
  type: string,
  list: object[],
  total: number | string
}
const initialState: IState = {
  commentList: [],
  total: 0
}

export default (state = initialState, action: IAction) => {
  switch (action.type) {
    case INIT_COMMENT_LIST:
      window.scroll(0, 0)
      state.commentList = action.list
      state.total = action.total
      return state
    default:
      return state
  }
}
