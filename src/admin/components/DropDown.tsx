import React, { useEffect, useState } from 'react';

type DropDownProps = {
    actions: string[];
    showDropDown: boolean;
    toggleDropDown: Function;
    actionSelection: Function;
};

const DropDown: React.FC<DropDownProps> = ({
                                               actions,
                                               actionSelection,
                                           }: DropDownProps): JSX.Element => {
    const [showDropDown, setShowDropDown] = useState<boolean>(false);

    const onClickHandler = (action: string): void => {
        actionSelection(action);
    };

    useEffect(() => {
        setShowDropDown(showDropDown);
    }, [showDropDown]);

    return (
        <>
            <div className={showDropDown ? 'dropdown' : 'dropdown active'}>
                {actions.map(
                    (action: string, index: number): JSX.Element => {
                        return (
                            <p
                                key={index}
                                onClick={(): void => {
                                    onClickHandler(action);
                                }}
                            >
                                {action}
                            </p>
                        );
                    }
                )}
            </div>
        </>
    );
};

export default DropDown;
