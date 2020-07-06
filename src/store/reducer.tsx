import { combineReducers } from 'redux-immer'
import produce from 'immer'
import { reducer as headerReducer } from '../components/Header/store'
import { reducer as homeReducer } from '../views/home/store'
import { reducer as detailReducer } from '../views/detail/store'
import { reducer as appReducer } from './app'
import { reducer as userReducer } from '../views/user/store/index'
import { reducer as tagReducer } from '../views/tag/store'
// import { reducer as commentReducer } from '../views/comment/store'
const rootReducer = combineReducers(produce, {
  header: headerReducer,
  home: homeReducer,
  detail: detailReducer,
  app: appReducer,
  user: userReducer,
  tag: tagReducer,
  // comment: commentReducer,
})
export default rootReducer
export type RootState = ReturnType<typeof rootReducer>
