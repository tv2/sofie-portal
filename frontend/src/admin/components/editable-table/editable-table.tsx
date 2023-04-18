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

  const newAccessRightGroup = [...accessRightGroups]

  function addNewAccessRight(groupId: number) {
    const newAccessRight = {
      machineId: '',
      label: '',
      anonymous: false,
      path: '',
    }
    newAccessRightGroup[groupId].accessRights.push(newAccessRight)
    setSelectedRow({groupId, accessRightId: newAccessRightGroup[groupId].accessRights.length - 1})
    setEditMode(true)
  }

  function handleAccessRightFieldChange(
    groupId: number,
    accessRightId: number,
    field: keyof AccessRight | string,
    value: string | boolean,
  ) {
    setSelectedRow({ groupId, accessRightId })
    const accessRight = newAccessRightGroup[groupId].accessRights[accessRightId]
    accessRight[field] = value
  }

  function deleteAccessRight(groupId: number, accessRightId: number) {
    newAccessRightGroup[groupId].accessRights.splice(accessRightId, 1)
    setSelectedRow({groupId, accessRightId: newAccessRightGroup[groupId].accessRights.length - 1})
  }

  function editAccessRight(groupId: number, accessRightId: number) {
    setSelectedRow({ groupId, accessRightId })
    setEditMode(true)
  }

  function cancelAccessRightChange() {
    setSelectedRow(null)
    setEditMode(false)
  }

  function saveAccessRightChange() {
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
                <button onClick={() => addNewAccessRight(groupId)}>Add machine</button>
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
                        name="machineId"
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
                        name="label"
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
                        name="anonymous"
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
                      editMode ? accessRight.anonymous.toString() : accessRight.anonymous ? 'true' : 'false'
                    )}
                </td>
                <td>
                  {selectedRow?.groupId === groupId &&
                      selectedRow?.accessRightId === accessRightId ? (
                      <input
                        name="path"
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
                      <button onClick={saveAccessRightChange}>
                        <SaveEditIcon />
                      </button>
                      <button onClick={cancelAccessRightChange}>
                        <CancelEditIcon />
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => deleteAccessRight(groupId, accessRightId)} aria-label="Delete access right">
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
