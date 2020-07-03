import { SEARCH_FOCUS, SEARCH_BLUR, MOUSE_IN, MOUSE_LEAVE, THEME_SWITCH } from './actionTypes'

type IState = {
  /** 搜索框聚焦 */
  focused: boolean,
  /** 鼠标移入 */
  mouseIn: boolean,
  /** 主体 */
  theme: 'light' | 'dark'
}
const initialState: IState = {
  focused: false,
  mouseIn: false,
  theme: 'light'
}
interface IAction {
  type: string,
  data: 'light' | 'dark'
}

export default (state = initialState, action: IAction) => {
  switch (action.type) {
    case SEARCH_FOCUS:
      state.focused = true
      return state
    case SEARCH_BLUR:
      state.focused = false
      return state
    case MOUSE_IN:
      state.mouseIn = true
      return state
    case MOUSE_LEAVE:
      state.mouseIn = false
      return state
    case THEME_SWITCH:
      state.theme = action.data
      return state
    default:
      return state
  }
}
