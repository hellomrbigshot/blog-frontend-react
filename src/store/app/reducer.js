import { START_FETCH, FINISH_FETCH } from './actionTypes'
import { fromJS } from 'immutable'

const initialState = fromJS({
    isFetch: false,
    error: ''
})
export default (state = initialState, action) => {
    switch (action.type) {
        case START_FETCH:
            return state.set('isFetch', true)
        case FINISH_FETCH:
            return state.set('isFetch', false)
        default:
            return state
    }
}
