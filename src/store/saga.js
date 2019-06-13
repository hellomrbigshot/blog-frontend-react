import { fork } from 'redux-saga/effects'
import { saga as homeSaga } from '../views/home/store'
import { saga as detailSaga } from '../views/detail/store'
import { saga as userSaga } from '../views/login/store'

export default function* rootSaga() {
  yield fork(homeSaga.getArticleList)
  yield fork(detailSaga.getArticleDetail)
  yield fork(detailSaga.getCommentList)
  yield fork(userSaga.login)
  yield fork(userSaga.register)
}