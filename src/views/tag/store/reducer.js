import { fromJS } from 'immutable'
import { INIT_TAG_LIST, INIT_TAG_DETAIL, INIT_ARTICLE_LIST, RESET_ARTICLE_LIST, RESET_TAG_DETAIL, RESET_TAG_LIST } from './actionTypes'

const initialState = fromJS({
  total: 0,
  page: 0,
  tagList: [],
  tagDetail: {
    total: 0,
    articleList: [],
    detail: {},
    page: 0
  },
})

export default (state = initialState, action) => {
  switch (action.type) {
    case INIT_TAG_LIST:
      const { list, total, page } = action
      return state.merge({
        tagList: fromJS(list),
        total,
        page
      })
    case INIT_TAG_DETAIL:
      const { data } = action
      return state.setIn(['tagDetail', 'detail'], fromJS(data))
    case INIT_ARTICLE_LIST:
      return state.mergeIn(['tagDetail'], {
        total: action.total,
        articleList: fromJS(action.list),
        page: action.page
      })
    case RESET_ARTICLE_LIST:
      return state.setIn(['tagDetail', 'articleList'], fromJS([]))
    case RESET_TAG_DETAIL:
      return state.setIn(['tagDetail', 'detail'], fromJS({}))
    case RESET_TAG_LIST:
      return state.set('tagList', fromJS({}))
    default:
      return state
  }
}
