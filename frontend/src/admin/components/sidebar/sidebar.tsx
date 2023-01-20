import React from "react";
import UserList from "./userList/userList";
import RestartServer from "./restart/restartServer";
import './sidebar.scss';

export default function Sidebar() {
    return (
        <section className={'c-sidebar'}>
            <UserList/>
            <RestartServer/>
        </section>
    )
}