import { fork } from 'redux-saga/effects'
import { saga as homeSaga } from '../views/home/store'
import { saga as detailSaga } from '../views/detail/store'
import { saga as userSaga } from '../views/login/store'
import { saga as tagSaga } from '../views/tag/store'
import { saga as commentSaga } from '../views/comment/store'
import { saga as draftSaga } from '../views/draft/store'

export default function* rootSaga() {
  yield fork(homeSaga.getArticleList)
  yield fork(detailSaga.getArticleDetail)
  yield fork(detailSaga.getCommentList)
  yield fork(detailSaga.submitComment)
  yield fork(userSaga.login)
  yield fork(userSaga.register)
  yield fork(userSaga.logout)
  yield fork(tagSaga.getTagList)
  yield fork(tagSaga.getTagDetail)
  yield fork(tagSaga.getArticleList)
  yield fork(commentSaga.getCommentList)
  yield fork(draftSaga.getDraftList)
}