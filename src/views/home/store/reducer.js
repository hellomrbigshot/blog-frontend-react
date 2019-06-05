import { INIT_ARTICLE_LIST } from './actionTypes'
import { fromJS } from 'immutable'
const defaultState = fromJS({
  articleList: [],
  total: 0
})
export default (state = defaultState, action) => {
  switch(action.type) {
    case INIT_ARTICLE_LIST:
      const { list, total } = action
      return state.merge({
        articleList: state.get('articleList').concat(fromJS(list)),
        total
      })
    default:
      return state
  }
}