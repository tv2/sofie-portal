import React, {useState} from 'react'
import DropdownMenuIcon from '../dropdown-menu-icon/dropdown-menu-icon'
import './dropdown-menu.scss'

interface DropdownMenuProps {
    children: React.ReactNode
}

export default function DropdownMenu( {children}: DropdownMenuProps) {
  const [showDropdown, setShowDropdown] = useState(false)

  function toggleDropdown() {
    setShowDropdown(!showDropdown)
  }

  function hideDropdown(event: React.FocusEvent<HTMLButtonElement>): void {
    if (event.currentTarget === event.target) {
      setShowDropdown(false)
    }
  }

  return (
    <div className={showDropdown
      ? 'c-dropdown-menu--active'
      : 'c-dropdown-menu'}>
      <button
        onClick={toggleDropdown}
        onBlur={(e: React.FocusEvent<HTMLButtonElement>): void => hideDropdown(e)}
      >
        <DropdownMenuIcon/>
      </button>
      <div className="c-dropdown-menu-items">
        {children}
      </div>
    </div>
  )
}