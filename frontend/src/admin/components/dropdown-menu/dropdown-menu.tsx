import React, {useState} from "react";
import DropdownMenuIcon from "../dropdown-menu-icon/dropdown-menu-icon";
import "./dropdown-menu.scss";

interface DropdownMenuProps {
    children: React.ReactNode
}

export default function DropdownMenu( {children}: DropdownMenuProps) {
    const [showDropdown, setShowDropdown] = useState(false);

    function toggleDropdown() {
        setShowDropdown(!showDropdown);
    }

    function isTargetButton(event: React.FocusEvent<HTMLButtonElement>): boolean {
        return event.currentTarget === event.target
    }

    function hideDropdown(event: React.FocusEvent<HTMLButtonElement>): void {
        if (isTargetButton(event)) {
            setShowDropdown(false);
        }
    }

    return (
        <div className={`c-dropdown-menu${showDropdown ? ' c-dropdown-menu--active' : ''}`}>
            <button onClick={toggleDropdown} onBlur={hideDropdown}>
                <DropdownMenuIcon />
            </button>
            <div className="c-dropdown-menu-items">{children}</div>
        </div>
    )
}