import {useState} from "react";
import {User} from "../../models/user";
import DropdownMenu from "../dropdown-menu/dropdown-menu";
import UserListItem from "../user-list-item/user-list-item";
import "./user-list.scss";

interface UserListProps {
    users: User[],
    onClick: (user: User) => (void),
}

export default function UserList({ users, onClick }: UserListProps) {
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    function downloadUser() {
        alert("Download");
    }
    function updateUser() {
        alert("Update");
    }

    function addUser() {
        alert("Add");
    }

    return (
        <section className="c-user-list">
            <div className="c-user-list__header">
                <h2>Users</h2>
                <DropdownMenu>
                    <button onClick={downloadUser}>Download user</button>
                    <button onClick={updateUser}>Update user</button>
                    <button onClick={addUser}>Add user</button>
                </DropdownMenu>
            </div>
            <div className="c-user-list__items">
                {users.map((user: User) => (
                    <UserListItem
                        key={user.id}
                        user={user}
                        onClick={() => {
                            setSelectedUser(user);
                            onClick(user);
                        }}
                        isSelected={user === selectedUser}
                    />
                ))}
            </div>
        </section>
    )
}