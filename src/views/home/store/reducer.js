import { INIT_ARTICLE_LIST, TOGGLE_BACK_TOP, RESET_ARTICLE_LIST } from './actionTypes'
import { fromJS } from 'immutable'
const initialState = fromJS({
  articleList: [],
  total: 0,
  showBackTop: false,
  page: 0,
  keywords: ''
})
export default (state = initialState, action) => {
  switch (action.type) {
    case INIT_ARTICLE_LIST:
      const { list, total, page, keywords } = action
      return state.merge({
        articleList: fromJS(list),
        total,
        page,
        keywords
      })
    case RESET_ARTICLE_LIST:
      return state.merge({
        articleList: fromJS([])
      })
    case TOGGLE_BACK_TOP:
      const { show } = action
      return state.set('showBackTop', show)
    default:
      return state
  }
}
