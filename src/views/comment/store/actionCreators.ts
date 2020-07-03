import { INIT_COMMENT_LIST, GET_COMMENT_LIST } from './actionTypes'

export const getCommentList = (type: string, page: number | string) => {
    return {
        type: GET_COMMENT_LIST,
        page,
        commentType: type
    }
}

export const initCommentList = (list: object[], total: number | string) => {
    return {
        type: INIT_COMMENT_LIST,
        list,
        total
    }
}
