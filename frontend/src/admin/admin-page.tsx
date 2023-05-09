import React from "react";
import UserList from "./components/user-list/user-list";
import Users from './users.json'
import RestartServerButton from "./components/restart-server-button/restart-server-button";
import "./admin-page.scss";

export default function AdminPage() {
    return (
        <div className="c-admin-page">
            <UserList users={Users.users}/>
            <RestartServerButton/>
        </div>
    )
}