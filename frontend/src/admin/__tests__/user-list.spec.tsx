import {fireEvent, render} from '@testing-library/react'
import UserList from '../components/user-list/user-list'
import { User } from '../models/user'
import { describe, it } from '@jest/globals'
import '@testing-library/jest-dom'

describe('UserListItem', () => {
  const users: User[] = [
    {
      id: 'test-johnDoe',
      name: 'John Doe',
      emberTarget: '/john-doe',
      accessRightGroups: [{
        name: 'sofie',
        accessRights: [{
          machineId: 'test',
          label: 'test',
          path: '/test',
          anonymous: true
        }]
      }]
    },
    {
      id: 'test-janeDoe',
      name: 'Jane Doe',
      emberTarget: '/jaen-doe',
      accessRightGroups: [{
        name: 'Qbox',
        accessRights: [{
          machineId: 'test',
          label: 'test',
          path: '/test',
          anonymous: true
        }]
      }]
    }
  ]

  it('renders user list correctly', () => {
    const {getByText} = render(<UserList users={users} onClick={() => {
    }}/>)
    expect(getByText('Users')).toBeInTheDocument()
    expect(getByText('John Doe')).toBeInTheDocument()
    expect(getByText('Jane Doe')).toBeInTheDocument()
  })

  it('clicking "Download user" button calls downloadUser function', () => {
    const downloadUserMock = window.alert = jest.fn()
    const { getByText } = render(<UserList users={users} onClick={downloadUserMock} />)
    fireEvent.click(getByText('Download user'))
    expect(downloadUserMock).toHaveBeenCalled()
  })

  it('clicking "Update user" button calls updateUser function', () => {
    const updateUserMock = window.alert = jest.fn()
    const { getByText } = render(<UserList users={users} onClick={updateUserMock} />)
    fireEvent.click(getByText('Update user'))
    expect(updateUserMock).toHaveBeenCalled()
  })

  it('clicking "Add user" button calls addUser function', () => {
    const addUserMock = window.alert = jest.fn()
    const { getByText } = render(<UserList users={users} onClick={addUserMock} />)
    fireEvent.click(getByText('Add user'))
    expect(addUserMock).toHaveBeenCalled()
  })

  it('calls onClick handler when a user is clicked', () => {
    const handleClick = jest.fn()
    const { getByText } = render(<UserList users={users} onClick={handleClick} />)
    fireEvent.click(getByText('John Doe'))
    expect(handleClick).toHaveBeenCalledWith(users[0])
  })
})
