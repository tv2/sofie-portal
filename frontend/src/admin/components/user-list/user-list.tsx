import {useState} from "react";
import {User} from "../../models/user";
import DropdownMenu from "../dropdown-menu/dropdown-menu";
import UserListItem from "../user-list-item/user-list-item";
import "./user-list.scss";

interface UserListProps {
    users: User[]
}

export default function UserList(props: UserListProps) {
    const [selectedUser, setSelectedUser] = useState<User>();
    return (
        <section className="c-user-list">
            <div className="c-user-list__header">
                <h2>Users</h2>
                <DropdownMenu
                    items={["Download user", "Upload user", "Add user"]}
                    onClick={(item: string) => {
                        console.log(item);
                    }}
                />
            </div>
            <div className="c-user-list__items">
                {props.users.map((user: User) => (
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