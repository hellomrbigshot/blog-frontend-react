import { fromJS } from 'immutable'
import { INIT_TAG_LIST, INIT_TAG_DETAIL, INIT_ARTICLE_LIST } from './actionTypes'

const initialState = fromJS({
    total: 0,
    tagList: [],
    tagDetail: {
        total: 0,
        articleList: [],
        detail: {}
    }
})

export default (state = initialState, action) => {
    switch (action.type) {
        case INIT_TAG_LIST:
            const { list, total } = action
            return state.merge({
                tagList: fromJS(list),
                total
            })
        case INIT_TAG_DETAIL:
            const { data } = action
            return state.setIn(['tagDetail', 'detail'], fromJS(data))
        case INIT_ARTICLE_LIST:
            return state.mergeIn(['tagDetail'], {
                total: action.total,
                articleList: fromJS(action.list)
            })
        default:
            return state
    }
}
