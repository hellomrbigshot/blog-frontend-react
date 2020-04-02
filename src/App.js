import React from 'react'
import { Provider } from 'react-redux'
import store from './store'
import ThemeApp from './ThemeApp'
function App () {
  return (
    <Provider store={store}>
      <ThemeApp />
    </Provider>
  )
}
export default App
