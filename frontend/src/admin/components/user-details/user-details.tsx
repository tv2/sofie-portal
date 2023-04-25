import {User} from '../../models/user'
import CloneUserAccess from '../clone-user-access/clone-user-access'
import UserInformation from '../user-information/user-information'
import AccessRights from '../access-rights/access-rights'
import {useState} from 'react'
import './user-details.scss'

interface UserDetailsProps {
    selectedUser: User;
    users: User[];
}

export default function UserDetails({ users, selectedUser }: UserDetailsProps) {
  const [isEditMode, setIsEditMode] = useState(false)
  const [editedUser, setEditedUser] = useState(selectedUser)

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode)
    setEditedUser(selectedUser)
  }

  const handleSave = () => {
    console.log('Saving changes:', editedUser)
    setIsEditMode(false)
  }

  const user = users.find(user => user.id === selectedUser.id)

  return (
    <section className="c-user-details">
      <div className="c-user-details__header">
        <h2>User details</h2>
        <div className="c-user-details__header-edit">
          <button onClick={toggleEditMode}>
            {isEditMode ? 'Cancel' : 'Edit user'}
          </button>
          {isEditMode && (
            <>
              <button className="c-user-details__header-edit--save" onClick={handleSave}>Save</button>
            </>
          )}
        </div>
        <CloneUserAccess />
      </div>
      <div>
        {user &&
                <>
                  <UserInformation
                    user={isEditMode ? editedUser : user}
                    isEditMode={isEditMode}
                    setEditedUser={setEditedUser}
                    disabled={!isEditMode}
                  />
                  <AccessRights selectedUser={selectedUser} disabled={!isEditMode} />
                </>
        }
      </div>
    </section>
  )
}
