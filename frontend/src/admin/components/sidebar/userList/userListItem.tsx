import React from "react";
import {User} from "../../../models/user";

interface UserListItemProps {
    user: User,
    onClick: () => void,
    isSelected: boolean
}

export default function UserListItem(props: UserListItemProps) {
    return (
        <button
            className={`${props.isSelected  && 'selected'}`}
            onClick={() => props.onClick()}
        >
            {props.user.name}
        </button>
    )
}