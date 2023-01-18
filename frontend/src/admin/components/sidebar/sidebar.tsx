import React from "react";
import UserList from "./userList/userList";
import ResetButton from "./resetButton/resetButton";
import './sidebar.scss'

export default function Sidebar() {
    return (
        <section>
            <UserList/>
            <ResetButton/>
        </section>
    )
}