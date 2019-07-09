import { fromJS } from 'immutable'
import { INIT_COMMENT_LIST } from './actionTypes'

const initialState = fromJS({
    commentList: [],
    total: 0
})

export default (state = initialState, action) => {
    switch (action.type) {
        case INIT_COMMENT_LIST:
            window.scroll(0, 0)
            return state.set('commentList', fromJS(action.list)).set('total', fromJS(action.total))
        default:
            return state
    }
}
