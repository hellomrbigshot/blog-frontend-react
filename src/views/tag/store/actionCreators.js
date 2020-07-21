import { INIT_TAG_LIST, GET_TAG_LIST, GET_TAG_DETAIL, INIT_TAG_DETAIL, GET_ARTICLE_LIST, INIT_ARTICLE_LIST, RESET_ARTICLE_LIST, RESET_TAG_DETAIL, RESET_TAG_LIST } from './actionTypes'

export const getTagList = (page = 1) => {
  return {
    type: GET_TAG_LIST,
    page
  }
}

export const initTagList = (list, page, total) => {
  return {
    type: INIT_TAG_LIST,
    list,
    page,
    total
  }
}

export const getTagDetail = (tag) => {
  return {
    type: GET_TAG_DETAIL,
    tag
  }
}

export const initTagDetail = (data) => {
  return {
    type: INIT_TAG_DETAIL,
    data
  }
}

export const getArticleList = (tag, page = 1) => {
  return {
    type: GET_ARTICLE_LIST,
    page,
    tag
  }
}

export const initArticleList = (list, page, total) => {
  return {
    type: INIT_ARTICLE_LIST,
    list,
    page,
    total
  }
}

export const resetArticleList = () => {
  return {
    type: RESET_ARTICLE_LIST
  }
}

export const resetTagDetail = () => {
  return {
    type: RESET_TAG_DETAIL
  }
}

export const resetTagList = () => {
  return {
    type: RESET_TAG_LIST
  }
}
