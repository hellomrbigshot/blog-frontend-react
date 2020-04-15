import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import createSagaMiddleware from 'redux-saga'
import reducer from './reducer'
import rootSaga from './saga'
const sagaMiddleWare = createSagaMiddleware()
const store = createStore(reducer, composeWithDevTools(applyMiddleware(sagaMiddleWare)))
sagaMiddleWare.run(rootSaga)

export default store
