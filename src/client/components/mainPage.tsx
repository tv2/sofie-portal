import '../styles/MainPage.css'
import '../styles/IframeView.css'

import React, { useState, useEffect } from 'react'
import { io } from 'socket.io-client'

const userUrlId =
    new URLSearchParams(window.location.search).get('username') || ''
// @ts-ignore
const socket = io({ extraHeaders: { userurl: userUrlId } })

import { IWebPage } from '../../model/settingsInterface'
import { IUser, IUserAccessRights } from '../../model/usersInterface'
import {
    THIS_USER,
    WEBPAGES,
    USERS_IN_ROOM,
    JOIN_ROOM,
} from '../../model/socketConstants'

const MainPage = () => {
    const [usersInRoom, setUsersInRoom] = useState<Array<string>>([])
    const [thisUser, setThisUser] = useState<IUser>()
    const [activeRoomIndex, setRoomIndex] = useState<number>(-1)
    const [webpages, setWebpages] = useState<IWebPage[]>()

    useEffect(() => {
        if (socket) {
            socket.on(THIS_USER, (payload: any) => {
                setThisUser(payload)
            })

            socket.on(USERS_IN_ROOM, (socketPayload: any) => {
                setUsersInRoom(socketPayload)
            })
            socket.on(WEBPAGES, (socketPayload: any) => {
                setWebpages(socketPayload)
            })
        }
    }, [socket])

    const handleChangeRoom = (room: IUserAccessRights, index: number) => {
        setRoomIndex(index)
        socket.emit(JOIN_ROOM, room.webpageId)
    }

    const findWebpage = (id: string) => {
        return webpages?.find((webpage) => {
            return webpage.id === id
        })
    }

    return (
        <div className={'container'}>
            {thisUser?.accessRights?.[0].webpageId !== '-1' ? (
                <div className={'main'}>
                    <div className={'grid'}>
                        {thisUser?.accessRights?.map((accessRight, index) => {
                            return (
                                <button
                                    key={index.toString()}
                                    className={
                                        index === activeRoomIndex
                                            ? 'cardselected'
                                            : 'card'
                                    }
                                    onClick={() => {
                                        handleChangeRoom(accessRight, index)
                                    }}
                                >
                                    {accessRight.label ||
                                        findWebpage(
                                            thisUser?.accessRights[index]
                                                .webpageId
                                        )?.label}
                                </button>
                            )
                        })}
                    </div>
                    {activeRoomIndex >= 0 ? (
                        <React.Fragment>
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
                                src={
                                    findWebpage(
                                        thisUser?.accessRights[activeRoomIndex]
                                            .webpageId || '1'
                                    )?.hostname
                                }
                            ></iframe>
                        </React.Fragment>
                    ) : (
                        <React.Fragment></React.Fragment>
                    )}
                </div>
            ) : (
                <h1 className={'main'}>WRONG USER LOGIN</h1>
            )}
        </div>
    )
}

export default MainPage
