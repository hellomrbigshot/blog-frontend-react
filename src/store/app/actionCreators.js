import { START_FETCH, FINISH_FETCH } from './actionTypes'

export const startFetch = () => {
  return {
    type: START_FETCH
  }
}

export const finishFetch = () => {
  return {
    type: FINISH_FETCH
  }
}
