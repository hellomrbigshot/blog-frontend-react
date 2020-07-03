import { fromJS } from 'immutable'
import { INIT_TAG_LIST, INIT_TAG_DETAIL, INIT_ARTICLE_LIST } from './actionTypes'

interface IState {
  total: number,
  tagList: any[],
  tagDetail: {
    total: number,
    articleList: any[],
    detail: any
  }
}
interface IAction {
  type: string,
  list: any[],
  total: number,
  data: any

}
const initialState: IState = {
  total: 0,
  tagList: [],
  tagDetail: {
    total: 0,
    articleList: [],
    detail: {}
  }
}

export default (state = initialState, action: IAction) => {
  switch (action.type) {
    case INIT_TAG_LIST:
      const { list, total } = action
      state = Object.assign({
        tagList: fromJS(list),
        total
      })
      return state
    case INIT_TAG_DETAIL:
      const { data } = action
      return state.tagDetail.detail = data
    case INIT_ARTICLE_LIST:
      state.tagDetail = Object.assign(state.tagDetail, {
        total: action.total,
        articleList: fromJS(action.list)
      })
      return state
    default:
      return state
  }
}
