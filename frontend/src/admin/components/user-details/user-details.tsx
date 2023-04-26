import {User} from '../../models/user'
import CloneUserAccess from '../clone-user-access/clone-user-access'
import UserInformation from '../user-information/user-information'
import AccessRights from '../access-rights/access-rights'
import {useState} from 'react'
import './user-details.scss'

interface UserDetailsProps {
    selectedUser: User;
}

export default function UserDetails({ selectedUser }: UserDetailsProps) {
    const [state, setState] = useState({
        isEditMode: false,
        editedUser: selectedUser,
    });

    const toggleEditMode = () => {
        setState((prevState) => ({
            ...prevState,
            isEditMode: !prevState.isEditMode,
            editedUser: selectedUser,
        }));
    };

    const handleUserChange = (key: keyof User, value: string) => {
        setState((prevState) => ({
            ...prevState,
            editedUser: {
                ...prevState.editedUser,
                [key]: value,
            },
        }));
    };

    const handleSave = () => {
        console.log('Saving changes:', state.editedUser);
        setState((prevState) => ({
            ...prevState,
            isEditMode: false,
        }));
    };

  return (
    <section className="c-user-details">
      <div className="c-user-details__header">
        <h2>User details</h2>
        <div className="c-user-details__header-edit">
          <button onClick={toggleEditMode}>
            {state.isEditMode ? 'Cancel' : 'Edit user'}
          </button>
          {state.isEditMode && (
            <>
              <button className="c-user-details__header-edit--save" onClick={handleSave}>Save</button>
            </>
          )}
        </div>
        <CloneUserAccess />
      </div>
      <div>
          <UserInformation
              user={state.isEditMode ? state.editedUser : selectedUser}
              isEditMode={state.isEditMode}
              onUserChange={handleUserChange}
              disabled={!state.isEditMode}
          />
          <AccessRights selectedUser={selectedUser} disabled={!state.isEditMode} />
      </div>
    </section>
  )
}
