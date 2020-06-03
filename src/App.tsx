import React from 'react'
import { Provider } from 'react-redux'
import store from './store'
import ThemeApp from './ThemeApp'
const App: React.SFC = () => {
  return (
    <Provider store={store}>
      <ThemeApp />
    </Provider>
  )
}
export default App
