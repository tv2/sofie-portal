import React from "react";
import {Action} from "../../../models/action";

interface DropDownProps {
    action: Action
}

export default function DropdownItem(props: DropDownProps) {
    return (
        <p>
            {props.action.name}
        </p>
    )
}