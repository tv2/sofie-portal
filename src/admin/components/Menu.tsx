import React, { useState } from "react";
import DropDown from "./DropDown";

const Menu: React.FC = (): JSX.Element => {
    const [showDropDown, setShowDropDown] = useState<boolean>(false);
    const [selectAction, setSelectAction] = useState<string>("");
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

    const actionSelection = (action: string): void => {
        setSelectAction(action);
    };

    return (
        <>
            <button
                className={showDropDown ? "active" : undefined}
                onClick={(): void => toggleDropDown()}
                onBlur={(e: React.FocusEvent<HTMLButtonElement>): void =>
                    dismissHandler(e)
                }
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                    <g id="Group_71" data-name="Group 71" transform="translate(-448 -83)">
                        <g id="Ellipse_1" data-name="Ellipse 1" transform="translate(448 83)" fill="none" stroke="#fff" stroke-width="1">
                            <circle cx="16" cy="16" r="16" stroke="none"/>
                            <circle cx="16" cy="16" r="15" fill="none"/>
                        </g>
                        <g id="Group_70" data-name="Group 70">
                            <circle id="Ellipse_2" data-name="Ellipse 2" cx="2.5" cy="2.5" r="2.5" transform="translate(454 97)" fill="#fff"/>
                            <circle id="Ellipse_3" data-name="Ellipse 3" cx="2.5" cy="2.5" r="2.5" transform="translate(462 97)" fill="#fff"/>
                            <circle id="Ellipse_4" data-name="Ellipse 4" cx="2.5" cy="2.5" r="2.5" transform="translate(470 97)" fill="#fff"/>
                        </g>
                    </g>
                </svg>

                {showDropDown && (
                    <DropDown
                        actions={actions()}
                        showDropDown={false}
                        toggleDropDown={(): void => toggleDropDown()}
                        actionSelection={actionSelection}
                    />
                )}
            </button>
        </>
    );
};

export default Menu;
