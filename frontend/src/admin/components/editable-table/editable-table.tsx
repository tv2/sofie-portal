import {useState} from 'react'
import EditRowIcon from '../edit-row-icon/edit-row-icon'
import DeleteRowIcon from '../delete-row-icon/delete-row-icon'
import SaveEditIcon from '../save-edit-icon/save-edit-icon'
import CancelEditIcon from '../cancel-edit-icon/cancel-edit-icon'
import {AccessRight} from '../../models/access-right'
import {AccessRightGroup} from '../../models/access-right-group'
import './editable-table.scss'

export default function EditableTable({ accessRightGroups }: { accessRightGroups: AccessRightGroup[] }) {
  const [editMode, setEditMode] = useState(false)
  const [selectedRow, setSelectedRow] = useState<{
    groupId: number;
    accessRightId: number;
  } | null>(null)

  function addNewAccessRight() {
    accessRightGroups.forEach((group) => {
      group.accessRights.push({
        machineId: '',
        label: '',
        anonymous: false,
        path: '',
      })
    })
  }

  function deleteAccessRight(groupId: number, accessRightId: number) {
    const newAccessRights = [...accessRightGroups]
    newAccessRights[groupId].accessRights.splice(accessRightId, 1)
  }

  function handleAccessRightFieldChange(
    groupId: number,
    accessRightId: number,
    field: keyof AccessRight,
    value: string | boolean
  ) {
    setSelectedRow({ groupId, accessRightId })
  }

  function cancelAccessRightChanges() {
    setSelectedRow(null)
    setEditMode(false)
  }

  function editAccessRight(groupId: number, accessRightId: number) {
    setSelectedRow({ groupId, accessRightId })
    setEditMode(true)
  }

  function saveAccessRightChanges(groupId: number, accessRightId: number) {
    const newAccessRights = [...accessRightGroups]
    const accessRight = newAccessRights[groupId].accessRights[accessRightId]
    setSelectedRow(null)
    setEditMode(false)
  }

  return (
    <div className="c-editable-table">
      {accessRightGroups.map((group, groupId) => (
        <table key={groupId}>
          <thead>
            <tr>
              <th>Group: {group.name}</th>
              <th>Label</th>
              <th>Anonymous</th>
              <th>Path and Args</th>
              <th>
                <button onClick={addNewAccessRight}>Add machine</button>
              </th>
            </tr>
          </thead>
          <tbody>
            {group.accessRights.map((accessRight, accessRightId) => (
              <tr key={accessRightId}>
                <td>
                  {selectedRow?.groupId === groupId &&
                      selectedRow?.accessRightId === accessRightId ? (
                      <input
                        type="text"
                        value={accessRight.machineId}
                        onChange={(e) =>
                          handleAccessRightFieldChange(
                            groupId,
                            accessRightId,
                            'machineId',
                            e.target.value
                          )
                        }
                      />
                    ) : (
                      accessRight.machineId
                    )}
                </td>
                <td>
                  {selectedRow?.groupId === groupId &&
                      selectedRow?.accessRightId === accessRightId ? (
                      <input
                        type="text"
                        value={accessRight.label}
                        onChange={(e) =>
                          handleAccessRightFieldChange(
                            groupId,
                            accessRightId,
                            'label',
                            e.target.value
                          )
                        }
                      />
                    ) : (
                      accessRight.label
                    )}
                </td>
                <td>
                  {selectedRow?.groupId === groupId &&
                      selectedRow?.accessRightId === accessRightId ? (
                      <input
                        type="checkbox"
                        checked={accessRight.anonymous}
                        onChange={(e) =>
                          handleAccessRightFieldChange(
                            groupId,
                            accessRightId,
                            'anonymous',
                            e.target.checked
                          )
                        }
                      />
                    ) : (
                      editMode ? accessRight.anonymous.toString() : accessRight.anonymous ? 'True' : 'False'
                    )}
                </td>
                <td>
                  {selectedRow?.groupId === groupId &&
                      selectedRow?.accessRightId === accessRightId ? (
                      <input
                        type="text"
                        value={accessRight.path}
                        onChange={(e) =>
                          handleAccessRightFieldChange(
                            groupId,
                            accessRightId,
                            'path',
                            e.target.value
                          )
                        }
                      />
                    ) : (
                      accessRight.path
                    )}
                </td>
                <td>
                  {editMode && selectedRow?.groupId === groupId && selectedRow?.accessRightId === accessRightId ? (
                    <>
                      <button onClick={() => saveAccessRightChanges(groupId, accessRightId)}>
                        <SaveEditIcon />
                      </button>
                      <button onClick={cancelAccessRightChanges}>
                        <CancelEditIcon />
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => deleteAccessRight(groupId, accessRightId)}>
                        <DeleteRowIcon />
                      </button>
                      <button onClick={() => editAccessRight(groupId, accessRightId)}>
                        <EditRowIcon />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ))}
    </div>
  )
}
