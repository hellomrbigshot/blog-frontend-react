import { START_FETCH, FINISH_FETCH } from './actionTypes'
interface IState {
  /** 是否加载中 */ 
  isFetch: boolean,
  // 错误信息
  error: string
}

const initialState: IState = {
  isFetch: false,
  error: ''
}
interface IAction {
  type: string
}
export default (state = initialState, action: IAction) => {
  switch (action.type) {
    case START_FETCH:
      state.isFetch = true
      return state
    case FINISH_FETCH:
      state.isFetch = false
      return state
    default:
      return state
  }
}
