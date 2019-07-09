import { GET_ARTICLE_LIST, INIT_ARTICLE_LIST, TOGGLE_BACK_TOP } from './actionTypes'

export const getArticleList = (page = 1) => {
    return {
        type: GET_ARTICLE_LIST,
        page
    }
}

export const initArticleList = (list, total) => {
    return {
        type: INIT_ARTICLE_LIST,
        list,
        total
    }
}

export const toggleBackTop = show => {
    return {
        type: TOGGLE_BACK_TOP,
        show
    }
}
