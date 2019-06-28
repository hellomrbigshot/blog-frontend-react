import { GET_DRAFT_LIST, INIT_DRAFT_LIST } from "./actionTypes"

export const getDraftList = () => {
  return {
    type: GET_DRAFT_LIST
  }
}

export const initDraftList = (data) => {
  return {
    type: INIT_DRAFT_LIST,
    data
  }
}
