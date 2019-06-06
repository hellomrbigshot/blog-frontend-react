import { INIT_ARTICLE_DETAIL, GET_ARTICLE_DETAIL, GET_COMMENT_LIST, INIT_COMMENT_LIST } from "./actionTypes"

export const getArticleDetail = (id) => {
  return {
    type: GET_ARTICLE_DETAIL,
    id
  }
}

export const initArticleDetail = (detail) => {
  return {
    type: INIT_ARTICLE_DETAIL,
    detail
  }
}


export const getCommentList = (id) => {
  return {
    type: GET_COMMENT_LIST,
    id
  }
}

export const initCommentList = (list) => {
  return {
    type: INIT_COMMENT_LIST,
    list
  }
}