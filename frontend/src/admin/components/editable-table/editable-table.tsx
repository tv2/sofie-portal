import {useState} from 'react'
import DeleteRowIcon from '../delete-row-icon/delete-row-icon'
import {AccessRight} from '../../models/access-right'
import {AccessRightGroup} from '../../models/access-right-group'
import './editable-table.scss'

export default function EditableTable({ accessRightGroups, disabled }: { accessRightGroups: AccessRightGroup[], disabled:boolean }) {

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
  }

  function handleAccessRightFieldChange(
    groupId: number,
    accessRightId: number,
    field: keyof AccessRight | string,
    value: string | boolean
  ) {
    if (!disabled) {
      setSelectedRow({ groupId, accessRightId })
      const accessRight = newAccessRightGroup[groupId].accessRights[accessRightId]
      accessRight[field] = value
    }
  }

  function deleteAccessRight(groupId: number, accessRightId: number) {
    if (!disabled) {
      newAccessRightGroup[groupId].accessRights.splice(accessRightId, 1)
      setSelectedRow({ groupId, accessRightId: newAccessRightGroup[groupId].accessRights.length - 1 })
    }
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
                <button disabled={disabled} onClick={() => addNewAccessRight(groupId)}>Add machine</button>
              </th>
            </tr>
          </thead>
          <tbody>
            {group.accessRights.map((accessRight, accessRightId) => (
              <tr key={accessRightId}>
                <td>
                  <input
                    disabled={disabled}
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
                </td>
                <td>
                  <input
                    disabled={disabled}
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
                </td>
                <td>
                  <input
                    disabled={disabled}
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
                </td>
                <td>
                  <input
                    disabled={disabled}
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
                </td>
                <td>
                  <button disabled={disabled} onClick={() => deleteAccessRight(groupId, accessRightId)} aria-label="Delete access right">
                    <DeleteRowIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ))}
    </div>
  )
}
