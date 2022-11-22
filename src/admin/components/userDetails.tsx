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

const UserDetails = () => {
    return (
        <section className={'userdetails-container'}>
            <section className='header-container'>
                <h2>User details</h2>
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" width="19.262" height="22.303" viewBox="0 0 19.262 22.303">
                        <path id="Icon_material-content-copy" data-name="Icon material-content-copy" d="M8.069,1.5H20.234a2.034,2.034,0,0,1,2.028,2.028V17.72H20.234V3.528H8.069ZM5.028,5.555H16.179a2.034,2.034,0,0,1,2.028,2.028V21.775A2.034,2.034,0,0,1,16.179,23.8H5.028A2.034,2.034,0,0,1,3,21.775V7.583A2.034,2.034,0,0,1,5.028,5.555Zm0,16.22H16.179V7.583H5.028Z" transform="translate(-3 -1.5)" fill="#fff"/>
                    </svg>
                    Clone user access
                </button>
            </section>
            <section className='user-information'>
                <h3>User Information</h3>
                <div className='information-container'>
                    <div className='id-container'>
                        <label>User ID:</label>
                        <input type={'text'}/>
                    </div>
                    <div className='label-container'>
                        <label>User label:</label>
                        <input type={'text'}/>
                    </div>
                    <div className='target-container'>
                        <label>Ember target:</label>
                        <input type={'text'}/>
                    </div>
                </div>
            </section>
        </section>
    )

}

export default UserDetails
