import ReactDOM from 'react-dom'
import React from 'react'
import UserNavigation from './components/userNavigation'
import UserDetails from './components/userDetails'

ReactDOM.render(
    <React.StrictMode>
        <UserNavigation />
        <UserDetails />
    </React.StrictMode>,
    document.getElementById('root')
)
