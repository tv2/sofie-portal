import { useState } from 'react'
import EditableTable from '../editable-table/editable-table'
import './access-rights.scss'
import {User} from '../../models/user'

interface AccessRightsProps {
  selectedUser: User;
  disabled: boolean;
}

export default function AccessRights({ selectedUser, disabled }: AccessRightsProps) {
  const [accessRightGroups, setAccessRightGroups] = useState(selectedUser.accessRightGroups || [])

  const [showModal, setShowModal] = useState(false)

  const handleCreateGroup = () => {
    setShowModal(true)
  }

  return (
    <div className="c-access-rights">
      <div className="c-access-rights__header">
        <h3>Access rights</h3>
        <button disabled={disabled} onClick={handleCreateGroup}>Create group</button>
      </div>
      {selectedUser && (
        <EditableTable accessRightGroups={selectedUser.accessRightGroups} disabled={disabled} />
      )}
      {showModal && (
        <div className="c-access-rights__modal">
          <div className="c-access-rights__modal-content">
            <h4>Create new group</h4>
            <form>
              <label htmlFor="groupName">Group name:</label>
              <input type="text" id="groupName" name="groupName" />
              <div className="form__buttons">
                <button onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
