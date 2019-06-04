import { fork } from 'redux-saga/effects'
import { saga as homeSaga } from '../views/home/store'

export default function* rootSaga() {
  yield fork(homeSaga.getArticleList)
}