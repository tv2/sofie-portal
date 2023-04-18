import {fireEvent, render, waitFor} from '@testing-library/react'
import UserListItem from '../components/user-list-item/user-list-item'
import { describe, it } from '@jest/globals'
import '@testing-library/jest-dom'

describe('UserListItem', () => {
  const user = {
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
    }]}
  it('renders without crashing', () => {
    const onClick = jest.fn()
    render(<UserListItem user={user} onClick={onClick} isSelected={false} />)
  })
  it('should call onClick when the button is clicked', async () => {
    const onClickMock = jest.fn() // create a mock function
    const { getByText } = render(<UserListItem user={user} onClick={onClickMock} isSelected={false} />)

    await waitFor(() => {
      const button = getByText(user.name)
      fireEvent.click(button)
      expect(onClickMock).toHaveBeenCalled()
    })
  })
  it('should have selected class when isSelected is true', () => {
    const { getByRole } = render(<UserListItem user={user} onClick={() => {}} isSelected={true} />)
    const buttonElement = getByRole('button')
    expect(buttonElement).toHaveClass('selected')
  })
  it('should display the user name', () => {
    const { getByText } = render(<UserListItem user={user} onClick={() => {}} isSelected={false} />)
    expect(getByText(user.name)).toBeInTheDocument()
  })
})
