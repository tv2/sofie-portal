import {useState} from "react";
import {User} from "../../models/user";
import DropdownMenu from "../sidebar/dropdown/dropdown-menu";
import UserListItem from "./user-list-item";


export default function UserList() {
    const [selectedUser, setSelectedUser] = useState<User>();
    return (
        <section className="c-user-list">
            <div className="c-user-list__header">
                <h2>Users</h2>
                <DropdownMenu/>
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