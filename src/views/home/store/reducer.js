import { INIT_ARTICLE_LIST, TOGGLE_BACK_TOP } from './actionTypes'
import { fromJS } from 'immutable'
const initialState = fromJS({
  articleList: [],
  total: 0,
  showBackTop: false,
  page: 0,
})
export default (state = initialState, action) => {
  switch (action.type) {
    case INIT_ARTICLE_LIST:
      const { list, total, page } = action
      return state.merge({
        articleList: fromJS(list),
        total,
        page
      })
    case TOGGLE_BACK_TOP:
      const { show } = action
      return state.set('showBackTop', show)
    default:
      return state
  }
}
