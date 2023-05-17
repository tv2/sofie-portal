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
    if (event.currentTarget !== event.target) {
      return
    }
    setShowDropdown(false)
  }

  return (
    <div className={`c-dropdown-menu${showDropdown ? '--active' : ''}`}>
      <button
        onClick={toggleDropdown}
        onBlur={(e: React.FocusEvent<HTMLButtonElement>): void => hideDropdown(e)}
        tabIndex={0}
      >
        <DropdownMenuIcon/>
      </button>
      <div className="c-dropdown-menu-items">
        {children}
      </div>
    </div>
  )
}