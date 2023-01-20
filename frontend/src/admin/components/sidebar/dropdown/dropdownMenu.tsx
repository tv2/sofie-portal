import React, {useState} from "react";
import MenuIcon from "./menuIcon";
import './dropdownMenu.scss';
import Dropdown from "./dropdown";

export default function DropdownMenu() {
    const [showDropDown, setShowDropDown] = useState<boolean>(false);
    const actions = () => {
        return ["Download user", "Upload user", "Add user"];
    };

    const toggleDropDown = () => {
        setShowDropDown(!showDropDown);
    };

    const dismissHandler = (event: React.FocusEvent<HTMLButtonElement>): void => {
        if (event.currentTarget === event.target) {
            setShowDropDown(false);
        }
    };

    return (
        <div className={'c-menu'}>
            <button
                className={showDropDown ?"c-menu__item--active" : 'c-menu__item'}
                onClick={(): void => toggleDropDown()}
                onBlur={(e: React.FocusEvent<HTMLButtonElement>): void => dismissHandler(e)}
            >
                <MenuIcon/>
                {showDropDown && (
                    <Dropdown
                        actions={actions()}
                        showDropDown={false}
                        toggleDropDown={(): void => toggleDropDown()}
                    />
                )}
            </button>
        </div>
    )
}