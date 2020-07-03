import { INIT_TAG_LIST, GET_TAG_LIST, GET_TAG_DETAIL, INIT_TAG_DETAIL, GET_ARTICLE_LIST, INIT_ARTICLE_LIST } from './actionTypes'

export const getTagList = (page: number = 1) => {
  return {
    type: GET_TAG_LIST,
    page
  }
}

export const initTagList = (list: any[], total: number) => {
  return {
    type: INIT_TAG_LIST,
    list,
    total
  }
}

export const getTagDetail = (tag: string) => {
  return {
    type: GET_TAG_DETAIL,
    tag
  }
}

export const initTagDetail = (data: object) => {
  return {
    type: INIT_TAG_DETAIL,
    data
  }
}

export const getArticleList = (tag: string, page: number = 1) => {
  return {
    type: GET_ARTICLE_LIST,
    page,
    tag
  }
}

export const initArticleList = (list: object[], total: number) => {
  return {
    type: INIT_ARTICLE_LIST,
    list,
    total
  }
}
