import { fromJS } from 'immutable'
import { INIT_TAG_LIST, CANCEL_ADD_TAG, CHANGE_TAG } from './actionTypes'
const initialState = fromJS({
    tagList: [],
    articleDetail: {
        content: '',
        tags: [],
        title: ''
    }
})

export default (state = initialState, action) => {
    switch (action.type) {
        case INIT_TAG_LIST:
            return state.set('tagList', action.list)
        case CHANGE_TAG:
            return state.setIn(['articleDetail', 'tags'], fromJS(action.tags))
        case CANCEL_ADD_TAG:
            return state.setIn(['articleDetail', 'tags'], fromJS(state.getIn(['articleDetail', 'tags']).toJS().remove(action.tag.name)))
        default:
            return state
    }
}
