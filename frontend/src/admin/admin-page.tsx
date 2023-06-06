import {useState} from 'react'
import Users from './users.json'
import {User} from './models/user'
import UserList from './components/user-list/user-list'
import RestartServerButton from './components/restart-server-button/restart-server-button'
import UserDetails from './components/user-details/user-details'
import './admin-page.scss'

export default function AdminPage() {
  const [selectedUser, setSelectedUser] = useState<User>()

  function handleSelectedUser (user: User) {
    setSelectedUser(user)
  }

  return (
    <div className="c-admin-page">
      <UserList users={Users.users} onClick={handleSelectedUser}/>
      <RestartServerButton />
      {selectedUser &&
          <UserDetails users={Users.users} selectedUser={selectedUser} />
      }
    </div>
  )
}