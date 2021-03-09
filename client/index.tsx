import ReactDom from 'react-dom'
import React from 'react'
import MainPage from './mainPage'

ReactDom.render(
    <React.StrictMode>
        <MainPage />
    </React.StrictMode>,
    document.getElementById('root')
)
