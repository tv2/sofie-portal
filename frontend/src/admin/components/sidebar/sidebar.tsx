import React from "react";
import UserList from "./user-list/user-list";
import RestartServerButton from "./restart/restart-server-button";
import "./sidebar.scss";

export default function Sidebar() {
    return (
        <section className="c-sidebar">
            <UserList/>
            <RestartServerButton/>
        </section>
    )
}