import React from "react";
import UserList from "./components/user-list/user-list";
import RestartServerButton from "./components/restart/restart-server-button";
import "./admin-page.scss";

export default function AdminPage() {
    return (
        <div className="c-admin-page">
            <UserList/>
            <RestartServerButton/>
        </div>
    )
}