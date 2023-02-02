import React from "react";
import "./user-list-item.scss";

interface UserListItemProps {
    label: string,
    onClick: () => void,
    isSelected: boolean
}

export default function UserListItem(props: UserListItemProps) {
    return (
        <button
            className={`c-user-list-item ${ props.isSelected ? "selected" : ""}`}
            onClick={() => props.onClick()}
        >
            {props.label}
        </button>
    )
}