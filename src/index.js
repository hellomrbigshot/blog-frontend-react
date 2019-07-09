import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { GlobalStyle } from './style'

ReactDOM.render(
    <Fragment>
        <GlobalStyle />
        <App />
    </Fragment>,
    document.getElementById('root')
)
