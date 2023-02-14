import React, {useState} from "react";
import DropdownMenuIcon from "../dropdown-menu-icon/dropdown-menu-icon";
import DropdownMenuItem from "../dropdown-menu-item/dropdown-menu-item";
import "./dropdown-menu.scss";

export default function DropdownMenu() {
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
                <DropdownMenuItem id="download" name="Download user"/>
                <DropdownMenuItem id="upload" name="Upload user"/>
                <DropdownMenuItem id="add" name="Add user"/>
            </div>
        </div>
    )
}