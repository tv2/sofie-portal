import EditRowIcon from "../edit-row-icon/edit-row-icon";
import DeleteRowIcon from "../delete-row-icon/delete-row-icon";
import {AccessRight} from "../../models/access-right";
import {AccessRightGroup} from "../../models/access-right-group";
import './editable-table.scss'

export default function EditableTable({ accessRights }: { accessRights: AccessRightGroup[] }) {
  function handleAddRow() {
    accessRights.forEach((group) => {
      group.accessRights.push({
        machineId: '',
        label: '',
        anonymous: false,
        path: '',
      })
    })
  }

  function handleDeleteRow(groupId: number, accessRightId: number) {
    const newAccessRights = [...accessRights]
    newAccessRights[groupId].accessRights.splice(accessRightId, 1)
  }

  function handleInputChange(
      groupId: number,
      accessRightId: number,
      field: keyof AccessRight,
      value: string | boolean
  ) {
    const newAccessRights = [...accessRights]
    newAccessRights[groupId].accessRights[accessRightId][field] = value
  }

  return (
      <div className="c-editable-table">
        {accessRights.map((group, groupId) => (
            <table key={groupId}>
              <thead>
              <tr>
                <th>Group: {group.name}</th>
                <th>Label</th>
                <th>Anonymous</th>
                <th>Path and Args</th>
                <th>
                  <button onClick={handleAddRow}>Add machine</button>
                </th>
              </tr>
              </thead>
              <tbody>
              {group.accessRights.map((accessRight, accessRightId) => (
                  <tr key={accessRightId}>
                    <td>
                      <input
                          type="text"
                          value={accessRight.machineId}
                          onChange={(e) =>
                              handleInputChange(groupId, accessRightId, 'machineId', e.target.value)
                          }
                      />
                    </td>
                    <td>
                      <input
                          type="text"
                          value={accessRight.label}
                          onChange={(e) =>
                              handleInputChange(groupId, accessRightId, 'label', e.target.value)
                          }
                      />
                    </td>
                    <td>
                      <input
                          type="checkbox"
                          checked={accessRight.anonymous}
                          onChange={(e) =>
                              handleInputChange(groupId, accessRightId, 'anonymous', e.target.checked)
                          }
                      />
                    </td>
                    <td>
                      <input
                          type="text"
                          value={accessRight.path}
                          onChange={(e) =>
                              handleInputChange(groupId, accessRightId, 'path', e.target.value)
                          }
                      />
                    </td>
                    <td>
                      <button onClick={() => handleDeleteRow(groupId, accessRightId)}>
                        <DeleteRowIcon />
                      </button>
                      <button>
                        <EditRowIcon />
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
