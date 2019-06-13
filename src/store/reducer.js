import { combineReducers } from 'redux-immutable'
import { reducer as headerReducer } from '../components/header/store'
import { reducer as homeReducer } from '../views/home/store'
import { reducer as detailReducer } from '../views/detail/store'
import { reducer as appReducer } from './app'
import { reducer as userReducer } from '../views/login/store'

export default combineReducers({
  header: headerReducer,
  home: homeReducer,
  detail: detailReducer,
  app: appReducer,
  user: userReducer
})