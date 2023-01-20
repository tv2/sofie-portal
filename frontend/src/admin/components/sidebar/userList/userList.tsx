import React, {useState} from "react";
import Users from "../../../users.json";
import {User} from "../../../models/user";
import UserListItem from "./userListItem";
import DropdownMenu from "../dropdown/dropdownMenu";
import './userlist.scss';

export default function UserList() {
    const [selectedUser, setSelectedUser] = useState<User>();
    return (
        <section className={"c-userlist"}>
            <div className="c-userlist__header">
                <h2>Users</h2>
                <DropdownMenu/>
            </div>
            <div className="c-userlist__buttons">
                {Users.users.map((user) => (
                    <UserListItem
                        user={user}
                        key={user.id}
                        onClick={() => setSelectedUser(user)}
                        isSelected={user === selectedUser}
                    />
                ))}
            </div>
        </section>
    )
}