import React from "react";
import {User} from "../../models/user";
import "./user-list-item.scss";

interface UserListItemProps {
    user: User,
    onClick: () => void,
    isSelected: boolean
}

export default function UserListItem(props: UserListItemProps) {
    return (
        <button
            className={`c-user-list-item ${ props.isSelected ? "selected" : ""}`}
            onClick={() => props.onClick()}
        >
            {props.user.name}
        </button>
    )
}