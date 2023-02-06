import React, {useState} from "react";
import MenuIcon from "./menu-icon";
import DropdownMenuItem from "./dropdown-menu-item";
import "./dropdown-menu.scss";

export default function DropdownMenu() {
    const [showDropdown, setShowDropdown] = useState<boolean>(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const dismissHandler = (event: React.FocusEvent<HTMLButtonElement>): void => {
        if (event.currentTarget === event.target) {
            setShowDropdown(false);
        }
    };

    return (
        <div className="c-dropdown-menu">
            <button
                className={showDropdown ?"c-dropdown-menu__button--active" : "c-dropdown-menu__button"}
                onClick={() => toggleDropdown()}
                onBlur={(e: React.FocusEvent<HTMLButtonElement>): void => dismissHandler(e)}
            >
                <MenuIcon/>
                <div className="c-dropdown-menu-items">
                    <DropdownMenuItem id="download" name="Download user"/>
                    <DropdownMenuItem id="upload" name="Upload user"/>
                    <DropdownMenuItem id="add" name="Add user"/>
                </div>
            </button>
        </div>
    )
}