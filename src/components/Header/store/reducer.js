import { fromJS } from 'immutable'
import { SEARCH_FOCUS, SEARCH_BLUR, MOUSE_IN, MOUSE_LEAVE } from './actionTypes'

const initialState = fromJS({
    focused: false,
    mouseIn: false
})

export default (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_FOCUS:
            return state.set('focused', true)
        case SEARCH_BLUR:
            return state.set('focused', false)
        case MOUSE_IN:
            return state.set('mouseIn', true)
        case MOUSE_LEAVE:
            return state.set('mouseIn', false)
        default:
            return state
    }
}
