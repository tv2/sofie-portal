import ReactDOM from 'react-dom'
import React from 'react'
import UserNavigation from './components/userNavigation'
import UserDetails from './components/userDetails'
import UserAccessRights from './components/userAccessRights'

ReactDOM.render(
    <React.StrictMode>
        <UserNavigation />
        <section className='user-container'>
            <UserDetails />
            <UserAccessRights />
        </section>
    </React.StrictMode>,
    document.getElementById('root')
)
