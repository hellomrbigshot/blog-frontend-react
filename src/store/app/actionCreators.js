import { START_FETCH, FINISH_FETCH, ADD_FETCH, DELETE_FETCH } from './actionTypes'

export const startFetch = () => {
  return {
    type: START_FETCH,
  }
}

export const finishFetch = () => {
  return {
    type: FINISH_FETCH,
  }
}

export const addFetch = () => {
  return {
    type: ADD_FETCH,
  }
}

export const deleteFetch = () => {
  return {
    type: DELETE_FETCH
  }
}
