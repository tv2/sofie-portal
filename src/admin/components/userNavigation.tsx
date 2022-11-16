import '../styles/AdminStyling.css'

import React, { useState, useEffect } from 'react'
//@ts-ignore
import Files from 'react-files'
import { io } from 'socket.io-client'

const userUrlId = new URLSearchParams(window.location.search).get('username') || ''
// @ts-ignore
const socket = io({ extraHeaders: { userurl: userUrlId } })

import { IMachine } from '../../model/settingsInterface'
import { IUser, IUserAccessRights } from '../../model/usersInterface'
import * as IO from '../../model/socketConstants'
import { loadUserFile } from '../utils/localStorage'
import { Button } from 'reactstrap'

const UserNavigation = () => {
    return (
        <div className={'usernavigation-container'}>
            <div className='header-container'>
                <h2>Users</h2>
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                        <g id="Group_71" data-name="Group 71" transform="translate(-448 -83)">
                            <g id="Ellipse_1" data-name="Ellipse 1" transform="translate(448 83)" fill="none" stroke="#fff" stroke-width="1">
                                <circle cx="16" cy="16" r="16" stroke="none"/>
                                <circle cx="16" cy="16" r="15" fill="none"/>
                            </g>
                            <g id="Group_70" data-name="Group 70">
                                <circle id="Ellipse_2" data-name="Ellipse 2" cx="2.5" cy="2.5" r="2.5" transform="translate(454 97)" fill="#fff"/>
                                <circle id="Ellipse_3" data-name="Ellipse 3" cx="2.5" cy="2.5" r="2.5" transform="translate(462 97)" fill="#fff"/>
                                <circle id="Ellipse_4" data-name="Ellipse 4" cx="2.5" cy="2.5" r="2.5" transform="translate(470 97)" fill="#fff"/>
                            </g>
                        </g>
                    </svg>
                </button>
            </div>
            <div className='button-container'>
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
            </div>
        </div>
    )
}

export default UserNavigation
