import { useState } from 'react'
import EditableTable from '../editable-table/editable-table'
import './access-rights.scss'
import {User} from "../../models/user";

interface AccessRightsProps {
  selectedUser: User;
}

export default function AccessRights({ selectedUser }: AccessRightsProps) {
  const [accessRightGroups, setAccessRightGroups] = useState(selectedUser.accessRightGroups || [])

  const handleCreateGroup = () => {
    const newGroup = {
      name: 'New Group',
      accessRights: []
    }
    setAccessRightGroups([...accessRightGroups, newGroup])
    console.log(newGroup)
  }

  return (
      <div className="c-access-rights">
        <div className="c-access-rights__header">
          <h3>Access rights</h3>
          <button onClick={handleCreateGroup}>Create group</button>
        </div>
        {selectedUser && (
            <EditableTable accessRightGroups={selectedUser.accessRightGroups} />
        )}
      </div>
  )
}
