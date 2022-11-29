import '../styles/AdminStyling.scss'
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
        <section className={'usernavigation'}>
            <section className='usernavigation__header'>
                <h2>Users</h2>
                <Menu />
            </section>
            <section className='usernavigation__buttons'>
                <div className='usernavigation__userbuttons'>
                    <button
                        className={'usernavigation__button'}
                    >
                    name on user
                    </button>
                </div>
                <button
                    className={'usernavigation__button--restart'}
                >
                    Restart server
                </button>
            </section>
        </section>
    )
}

export default UserNavigation
