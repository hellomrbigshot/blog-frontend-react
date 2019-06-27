import { INIT_COMMENT_LIST, GET_COMMENT_LIST } from "./actionTypes"

export const getCommentList = (type, page) => {
  console.log(type)
  return {
    type: GET_COMMENT_LIST,
    page,
    commentType: type
  }
}

export const initCommentList = (list, total) => {
  return {
    type: INIT_COMMENT_LIST,
    list,
    total
  }
}
