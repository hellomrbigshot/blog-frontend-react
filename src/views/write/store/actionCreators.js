import { GET_TAG_LIST, INIT_TAG_LIST } from './actionTypes'

export const getTagList = () => {
  return {
    type: GET_TAG_LIST
  }
}

export const initTagList = (list) => {
  return {
    type: INIT_TAG_LIST,
    list
  }
}
