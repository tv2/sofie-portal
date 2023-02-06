import React from "react";
import "./dropdown-menu-item.scss";

interface DropdownMenuProps {
    id: string,
    name: string
}

export default function DropdownMenuItem(props: DropdownMenuProps) {
    return (
        <p key={props.id}>
            {props.name}
        </p>
    )
}