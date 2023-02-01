import React from "react";
import UserList from "./userList/userList";
import RestartServerButton from "./restart/restartServerButton";
import "./sidebar.scss";

export default function Sidebar() {
    return (
        <section className={"c-sidebar"}>
            <UserList/>
            <RestartServerButton/>
        </section>
    )
}