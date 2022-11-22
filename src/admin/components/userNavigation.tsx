import '../styles/AdminStyling.css'
import Menu from "./Menu";

import React, { useState, useEffect } from 'react'
//@ts-ignore
import Files from 'react-files'
import { io } from 'socket.io-client'

const userUrlId = new URLSearchParams(window.location.search).get('username') || ''
// @ts-ignore
const socket = io({ extraHeaders: { userurl: userUrlId } })

const UserNavigation = () => {
    return (
        <section className={'usernavigation-container'}>
            <section className='header-container'>
                <h2>Users</h2>
                <Menu />
            </section>
            <section className='button-container'>
                <div className='user-buttons'>
                <button
                    key={1}
                    onClick={() => {
                        console.log("test")
                    }}
                    >
                    name on user
                </button>

                <button
                    key={1}
                    onClick={() => {
                        console.log("test")
                    }}
                >
                    name on user
                </button>

                <button
                    key={1}
                    onClick={() => {
                        console.log("test")
                    }}
                >
                    name on user
                </button>
                </div>
                <button className={'restart-button'}> Restart server</button>
            </section>
        </section>
    )
}

export default UserNavigation
