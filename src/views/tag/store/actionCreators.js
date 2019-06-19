import { INIT_TAG_LIST, GET_TAG_LIST } from './actionTypes'

export const getTagList = (page = 1) => {
  return {
    type: GET_TAG_LIST,
    page
  }
}

export const initTagList = (list, total) => {
  return {
    type: INIT_TAG_LIST,
    list,
    total
  }
}