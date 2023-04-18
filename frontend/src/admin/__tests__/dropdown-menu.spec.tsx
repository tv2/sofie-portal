import {it} from '@jest/globals'
import DropdownMenu from '../components/dropdown-menu/dropdown-menu'
import {fireEvent, render, RenderResult, waitFor} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import {act} from "react-dom/test-utils";

describe('DropdownMenu', () => {
  let wrapper: RenderResult

  beforeEach(() => {
    wrapper = render(<DropdownMenu>Mock Children</DropdownMenu>)
  })

  it('should render without crashing', () => {
    expect(wrapper.container).toBeInTheDocument()
  })

  it('should show/hide dropdown when button is clicked', async() => {
    const button = wrapper.getByRole('button')
    act(() => {
      button.click()
    })
    await waitFor(() => {
      expect(wrapper.container.querySelector('.c-dropdown-menu--active')).toBeInTheDocument()
    })
    act(() => {
      button.click()
    })
    await waitFor(() => {
      expect(wrapper.container.querySelector('.c-dropdown-menu')).toBeInTheDocument()
    })
  })

  it('should hide dropdown when focus is lost', async () => {
    const button = wrapper.getByRole('button');
    act(() => {
      button.click()
    })
    await waitFor(() => {
      expect(wrapper.container.querySelector('.c-dropdown-menu--active')).toBeInTheDocument();
    })
    act(() => {
      fireEvent.blur(button)
    })
    await waitFor(() => {
      expect(wrapper.container.querySelector('.c-dropdown-menu')).toBeInTheDocument();
    })
  })

  it('should render children', async () => {
    await waitFor(() => {
      expect(wrapper.getByText('Mock Children')).toBeInTheDocument()
    })
  })

  it('should render DropdownMenuIcon component', () => {
    expect(wrapper.container.querySelector('svg')).toBeInTheDocument()
  })
})