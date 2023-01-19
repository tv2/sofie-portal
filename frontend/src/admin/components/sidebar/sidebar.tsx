import React from "react";
import UserList from "./userList/userList";
import Restart from "./restart/restart";
import './sidebar.scss';

export default function Sidebar() {
    return (
        <section>
            <UserList/>
            <Restart/>
        </section>
    )
}