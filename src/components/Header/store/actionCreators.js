import { SEARCH_FOCUS, SEARCH_BLUR, MOUSE_IN, MOUSE_LEAVE, THEME_SWITCH } from './actionTypes'

export const searchFocus = () => ({
  type: SEARCH_FOCUS
})

export const searchBlur = () => ({
  type: SEARCH_BLUR
})

export const mouseIn = () => ({
  type: MOUSE_IN
})

export const mouseLeave = () => ({
  type: MOUSE_LEAVE
})

export const themeSwitch = (data) => ({
  type: THEME_SWITCH,
  data
})
