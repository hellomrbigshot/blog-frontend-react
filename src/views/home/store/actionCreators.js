import { GET_ARTICLE_LIST, INIT_ARTICLE_LIST, TOGGLE_BACK_TOP, RESET_ARTICLE_LIST } from './actionTypes'

export const getArticleList = (page, keywords) => {
  return {
    type: GET_ARTICLE_LIST,
    page,
    keywords,
  }
}

export const initArticleList = (list, page, total, keywords) => {
  return {
    type: INIT_ARTICLE_LIST,
    list,
    total,
    page,
    keywords
  }
}

export const toggleBackTop = (show) => {
  return {
    type: TOGGLE_BACK_TOP,
    show,
  }
}

export const resetArticleList = () => {
  return {
    type: RESET_ARTICLE_LIST
  }
}
