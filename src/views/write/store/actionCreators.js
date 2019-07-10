import { GET_TAG_LIST, INIT_TAG_LIST, ADD_TAG, ADD_TAG_SUCCESS, CANCEL_ADD_TAG, CHANGE_TAG } from './actionTypes'

export const getTagList = () => {
    return {
        type: GET_TAG_LIST
    }
}

export const initTagList = list => {
    return {
        type: INIT_TAG_LIST,
        list
    }
}

export const changeTag = tags => {
    return {
        type: CHANGE_TAG,
        tags
    }
}

export const addTag = tag => {
    return {
        type: ADD_TAG,
        tag
    }
}

export const addTagSuccess = () => {
    return {
        type: ADD_TAG_SUCCESS
    }
}

export const cancelAddTag = tag => {
    return {
        type: CANCEL_ADD_TAG,
        tag
    }
}
