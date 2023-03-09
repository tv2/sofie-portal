import EditableTable from '../editable-table/editable-table'
import './access-rights.scss'

export default function AccessRights({ selectedUser }) {
  return (
    <div className="c-access-rights">
      <div className="c-access-rights__header">
        <h3>Access rights</h3>
        <button>Create group</button>
      </div>
      {selectedUser && (
          <EditableTable accessRightGroups={selectedUser.accessRightGroups} />
      )}
    </div>
  )
}
