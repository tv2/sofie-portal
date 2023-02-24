import React from "react";
import {User} from "../../models/user";
import "./user-list-item.scss";

interface UserListItemProps {
    user: User,
    onClick: () => void,
    isSelected: boolean
}

export default function UserListItem({user, onClick, isSelected}: UserListItemProps) {
    return (
        <button
            className={`c-user-list-item ${ isSelected ? "selected" : ""}`}
            onClick={() => onClick()}
        >
            {user.name}
        </button>
    )
}