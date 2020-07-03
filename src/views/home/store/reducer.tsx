import { INIT_ARTICLE_LIST, TOGGLE_BACK_TOP } from './actionTypes'
interface IState {
  articleList: object[],
  total: number,
  showBackTop: boolean | undefined
}
interface IAction {
  type: string,
  list?: object[],
  total?: number,
  show?: boolean
}
const initialState: IState = {
  articleList: [],
  total: 0,
  showBackTop: false
}
export default (state = initialState, action: IAction) => {
  switch (action.type) {
    case INIT_ARTICLE_LIST:
      const { list, total } = action
      state = Object.assign(state, {
        articleList: list,
        total
      })
      return state
    case TOGGLE_BACK_TOP:
      const { show } = action
      state.showBackTop = show
      return state
    default:
      return state
  }
}
