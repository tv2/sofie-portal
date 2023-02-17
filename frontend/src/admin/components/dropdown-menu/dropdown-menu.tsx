import React, {useState} from "react";
import DropdownMenuIcon from "../dropdown-menu-icon/dropdown-menu-icon";
import "./dropdown-menu.scss";

interface DropdownMenuProps{
    items: string[]
    onClick: (value: string) => void
}

export default function DropdownMenu( {items, onClick}: DropdownMenuProps) {

    const [showDropdown, setShowDropdown] = useState<boolean>(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const hideDropdown = (event: React.FocusEvent<HTMLButtonElement>): void => {
        if (event.currentTarget === event.target) {
            setShowDropdown(false);
        }
    };

    return (
        <div className={showDropdown ?"c-dropdown-menu--active" : "c-dropdown-menu"}>
            <button
                onClick={() => toggleDropdown()}
                onBlur={(e: React.FocusEvent<HTMLButtonElement>): void => hideDropdown(e)}
            >
                <DropdownMenuIcon/>
            </button>
            <div className="c-dropdown-menu-items">
                {items.map((item, index) => {
                    return(
                        <span key={index} onClick={() => onClick(item)}>{item}</span>
                    )
                })}
            </div>
        </div>
    )
}