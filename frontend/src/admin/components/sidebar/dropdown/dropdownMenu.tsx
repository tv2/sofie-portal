import React, {useState} from "react";
import MenuIcon from "./menuIcon";
import Dropdown from "./dropdown";
import "./dropdownMenu.scss";

export default function DropdownMenu() {
    const [showDropDown, setShowDropDown] = useState<boolean>(false);

    const toggleDropDown = () => {
        setShowDropDown(!showDropDown);
    };

    const dismissHandler = (event: React.FocusEvent<HTMLButtonElement>): void => {
        if (event.currentTarget === event.target) {
            setShowDropDown(false);
        }
    };

    return (
        <div className="c-menu">
            <button
                className={showDropDown ?"c-menu__button--active" : "c-menu__button"}
                onClick={(): void => toggleDropDown()}
                onBlur={(e: React.FocusEvent<HTMLButtonElement>): void => dismissHandler(e)}
            >
                <MenuIcon/>
                {showDropDown && (
                    <Dropdown/>
                )}
            </button>
        </div>
    )
}