import React, { useEffect, useState } from 'react';

interface DropDownProps {
    actions: string[],
    showDropDown: boolean,
    toggleDropDown: Function
}

export default function Dropdown(props: DropDownProps) {
    const [showDropDown, setShowDropDown] = useState<boolean>(false);

    const onClickHandler = () => {
        //Needs action
    };

    useEffect(() => {
        setShowDropDown(showDropDown);
    }, [showDropDown]);

    return (
        <div>
            {props.actions.map(
                (action: string, index: number) => {
                    return (
                        <p
                            key={index}
                            onClick={onClickHandler}
                        >
                            {action}
                        </p>
                    );
                }
            )}
        </div>
    );
}