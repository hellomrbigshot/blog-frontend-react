import {
  INIT_ARTICLE_DETAIL,
  GET_ARTICLE_DETAIL,
  GET_COMMENT_LIST,
  INIT_COMMENT_LIST,
  SHOW_REPLY_INPUT,
  HANDLE_SUBMIT_COMMENT,
  HANDLE_CONCAT_COMMENT,
  HANDLE_COMMENT_CHANGE,
  RESET_ARTICLE_DETAIL,
  RESET_COMMENT_LIST,
  ADD_NAV_INDEX,
  RESET_NAV_INFO,
  ADD_NAV_LIST
} from './actionTypes'

export const getArticleDetail = (id) => {
  // 获取文章详情
  return {
    type: GET_ARTICLE_DETAIL,
    id,
  }
}

export const initArticleDetail = (detail) => {
  // 初始化文章详情
  return {
    type: INIT_ARTICLE_DETAIL,
    detail,
  }
}

export const getCommentList = (id) => {
  // 获取评论列表
  return {
    type: GET_COMMENT_LIST,
    id,
  }
}

export const initCommentList = (list) => {
  // 初始化评论列表
  return {
    type: INIT_COMMENT_LIST,
    list,
  }
}

export const showReplyInput = (index) => {
  // 显示回复框
  return {
    type: SHOW_REPLY_INPUT,
    index,
  }
}

export const handleCommentChange = (data) => {
  // 评论输入框改变
  return {
    type: HANDLE_COMMENT_CHANGE,
    data,
  }
}

export const handleSubmitComment = (data, index) => {
  // 提交评论
  return {
    type: HANDLE_SUBMIT_COMMENT,
    data,
    index,
  }
}

export const handleConcatComment = (data, index) => {
  // 视图上新增一条评论
  return {
    type: HANDLE_CONCAT_COMMENT,
    data,
    index,
  }
}

export const resetArticleDetail = () => {
  // 清空详情
  return {
    type: RESET_ARTICLE_DETAIL
  }
}

export const resetCommentList = () => {
  // 清空评论
  return {
    type: RESET_COMMENT_LIST
  }
}

export const addNavList = (level, text) => {
  return {
    type: ADD_NAV_LIST,
    level,
    text
  }
}

export const addNavIndex = (data) => {
  return {
    type: ADD_NAV_INDEX,
    data
  }
}

export const resetNavInfo = () => {
  return {
    type: RESET_NAV_INFO
  }
}
