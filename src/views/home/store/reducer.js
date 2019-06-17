import { INIT_ARTICLE_LIST, TOGGLE_BACK_TOP } from './actionTypes'
import { fromJS } from 'immutable'
const initialState = fromJS({
  articleList: [],
  total: 0,
  showBackTop: false
})
export default (state = initialState, action) => {
  switch(action.type) {
    case INIT_ARTICLE_LIST:
      const { list, total } = action
      return state.merge({
        articleList: state.get('articleList').concat(fromJS(list)),
        total
      })
    case TOGGLE_BACK_TOP:
      const { show } = action
      return state.set('showBackTop', show)
    default:
      return state
  }
}