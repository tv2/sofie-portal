import '../styles/MainPage.css'
import '../styles/IframeView.css'

import React, { useState, useEffect } from 'react'
import { io } from 'socket.io-client'

const userUrlId =
    new URLSearchParams(window.location.search).get('username') || ''
// @ts-ignore
const socket = io({ extraHeaders: { userurl: userUrlId } })

import { IUser, IWebPage } from '../../model/settingsInterface'
import {
    THIS_USER,
    WEBPAGES,
    USERS_IN_ROOM,
    JOIN_ROOM,
} from '../../model/socketConstants'

const MainPage = () => {
    const [usersInRoom, setUsersInRoom] = useState<Array<string>>([])
    const [thisUser, setThisUser] = useState<IUser>()
    const [activeRoom, setRoom] = useState<number>()
    const [webpages, setWebpages] = useState<IWebPage[]>()

    useEffect(() => {
        if (socket) {
            const room = 1

            socket.on(THIS_USER, (payload: any) => {
                setThisUser(JSON.parse(payload))
            })

            socket.on(USERS_IN_ROOM, (socketPayload: any) => {
                setUsersInRoom(JSON.parse(socketPayload))
            })
            socket.on(WEBPAGES, (socketPayload: any) => {
                handleChangeRoom(room)
                setWebpages(JSON.parse(socketPayload))
            })
        }
    }, [socket])

    const handleChangeRoom = (room: number) => {
        setRoom(room)
        socket.emit(JOIN_ROOM, room.toString())
    }

    const findWebpage = (id: number) => {
        return webpages?.find((webpage) => {
            return webpage.id === id
        })
    }

    return (
        <div className={'container'}>
            {thisUser?.accessRights[0] !== -1 ? (
                <div className={'main'}>
                    <div className={'grid'}>
                        {webpages?.map((webpage, index) => {
                            return (
                                <button
                                    key={index.toString()}
                                    className={
                                        webpage.id === activeRoom
                                            ? 'cardselected'
                                            : 'card'
                                    }
                                    onClick={() => {
                                        handleChangeRoom(webpage.id)
                                    }}
                                >
                                    {webpage.name}
                                </button>
                            )
                        })}
                    </div>
                    <div className={'clientlist'}>
                        USERS :
                        {usersInRoom?.map((userInRoom, index) => {
                            return (
                                <button
                                    key={index.toString()}
                                    className={'clientbutton'}
                                >
                                    {userInRoom}
                                </button>
                            )
                        })}
                    </div>
                    <iframe
                        className={'iframeview'}
                        src={findWebpage(activeRoom || 1)?.hostname}
                    ></iframe>
                </div>
            ) : (
                <h1 className={'main'}>WRONG USER LOGIN</h1>
            )}
        </div>
    )
}

export default MainPage
