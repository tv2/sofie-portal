import React from "react";
import Actions from "../../../actions.json";
import DropdownItem from "./dropdownItem";

export default function Dropdown() {
    return (
        <div className="c-dropdown">
            {Actions.actions.map((action) => (
                <DropdownItem
                    action={action}
                    key={action.id}
                />
            ))}
        </div>
    );
}