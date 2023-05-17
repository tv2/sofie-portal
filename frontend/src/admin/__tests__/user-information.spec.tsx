import { render, screen } from '@testing-library/react'
import UserInformation from '../components/user-information/user-information'
import { describe, it } from '@jest/globals'
import '@testing-library/jest-dom'
import {User} from '../models/user'

describe('UserInformation', () => {
  function createUser(): User {
    return {
      id: 'test-johnDoe',
      name: 'John Doe',
      emberTarget: '/john-doe',
      accessRightGroups: [
        {
          name: 'sofie',
          accessRights: [
            {
              machineId: 'test',
              label: 'test',
              path: '/test',
              anonymous: true
            }
          ]
        }
      ]
    }
  }

  it('renders without crashing', () => {
    const user = createUser()
    render(<UserInformation user={user} />)
    expect(screen.getByText('User information')).toBeInTheDocument()
  })

  it('displays the correct user information', () => {
    const user = createUser()
    render(<UserInformation user={user} />)
    expect(screen.getByLabelText('ID:')).toHaveValue('test-johnDoe')
    expect(screen.getByLabelText('Label:')).toHaveValue('John Doe')
    expect(screen.getByLabelText('Ember Target:')).toHaveValue('/john-doe')
  })
})

