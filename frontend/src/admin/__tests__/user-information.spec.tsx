import { render, screen } from '@testing-library/react'
import UserInformation from '../components/user-information/user-information'
import { describe, it } from '@jest/globals'
import '@testing-library/jest-dom'

describe('UserInformation', () => {
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
    render(<UserInformation user={user} />)
  })
  it('displays the correct user information', () => {
    render(<UserInformation user={user} />)
    expect(screen.getByLabelText('ID:')).toHaveValue('test-johnDoe')
    expect(screen.getByLabelText('Label:')).toHaveValue('John Doe')
    expect(screen.getByLabelText('Ember Target:')).toHaveValue('/john-doe')
  })
})