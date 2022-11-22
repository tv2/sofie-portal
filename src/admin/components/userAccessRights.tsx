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

const UserAccessRights = () => {

    const [showGroup, setShowGroup] = useState<boolean>(false);

    const createGroup = () => {
        setShowGroup(!showGroup);
        console.log('ny gruppe');
    };

    return (
        <section className={'useraccessrights-container'}>
            <section className='header-container'>
                <h3>Access rights</h3>
                <button
                    className={showGroup ? "active" : undefined}
                    onClick={(): void => createGroup()}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                        <g id="Group_73" data-name="Group 73" transform="translate(1 1)">
                            <path id="Path_7" data-name="Path 7" d="M0,0V16" transform="translate(8)" fill="#171717" stroke="#171717" stroke-linecap="round" stroke-width="2"/>
                            <path id="Path_8" data-name="Path 8" d="M0,0V16" transform="translate(16 8) rotate(90)" fill="#171717" stroke="#171717" stroke-linecap="round" stroke-width="2"/>
                        </g>
                    </svg>
                    Create group
                </button>
            </section>
            <table>
                <tr>
                    <th>
                        <div className='group-name'>
                            <h4>Group:</h4>
                            <input type={'text'} />
                        </div>
                    </th>
                    <th><h4>Label</h4></th>
                    <th><h4>Anonymous</h4></th>
                    <th><h4>Path and Args</h4></th>
                    <th>
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10">
                                <g id="Group_73" data-name="Group 73" transform="translate(1 1)">
                                    <path id="Path_7" data-name="Path 7" d="M0,0V8" transform="translate(4)" fill="#fff" stroke="#fff" stroke-linecap="round" stroke-width="2"/>
                                    <path id="Path_8" data-name="Path 8" d="M0,0V8" transform="translate(8 4) rotate(90)" fill="#fff" stroke="#fff" stroke-linecap="round" stroke-width="2"/>
                                </g>
                            </svg>
                            Add machine
                        </button>
                    </th>
                </tr>
                <tr>
                    <td>
                        <select name="machine" id="machine">
                            <option value="01">01</option>
                            <option value="02">02</option>
                            <option value="03">03</option>
                            <option value="04">04</option>
                        </select>
                    </td>
                    <td><input type={'text'} /></td>
                    <td><input type={'radio'} /></td>
                    <td><input type={'text'} /></td>
                    <td></td>
                </tr>
            </table>
        </section>
    )

}

export default UserAccessRights
