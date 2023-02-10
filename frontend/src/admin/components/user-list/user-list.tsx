import React, {useState} from "react";
import Users from "../../users.json";
import {User} from "../../models/user";
import UserListItem from "./user-list-item";
import IconButton from "./icon-button";
import "./user-list.scss";

export default function UserList() {
    const [selectedUser, setSelectedUser] = useState<User>();
    return (
        <section className="c-user-list">
            <div className="c-user-list__header">
                <h2>Users</h2>
                <IconButton/>
            </div>
            <div className="c-user-list__items">
                {Users.users.map((user) => (
                    <UserListItem
                        key={user.id}
                        user={user}
                        onClick={() => setSelectedUser(user)}
                        isSelected={user === selectedUser}
                    />
                ))}
            </div>
        </section>
    )
}