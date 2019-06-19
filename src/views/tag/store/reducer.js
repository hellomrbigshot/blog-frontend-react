import { fromJS } from 'immutable'
import { INIT_TAG_LIST } from './actionTypes'

const initialState = fromJS({
  total: 0,
  tagList: []
})

export default (state = initialState, action) => {
  switch (action.type) {
    case INIT_TAG_LIST:
      const { list, total } = action
      return state.merge({
        tagList: fromJS(list),
        total
      })
    default:
      return state
  }
}