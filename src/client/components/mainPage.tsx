import '../styles/MainPage.css'
import '../styles/IframeView.css'

import React, { useState, useEffect } from 'react'
import { io } from 'socket.io-client'
// @ts-ignore
const socket = io()

import { IUser, IWebPage } from '../../model/settingsInterface'
import { IRoomPayload } from '../../model/socketClientInterface'
import { THIS_USER, WEBPAGES, USERS_IN_ROOM, JOIN_ROOM } from '../../model/socketConstants'

const MainPage = () => {
    const [usersInRoom, setUsersInRoom] = useState<Array<string>>([])
    const [thisUser, setThisUser] = useState<IUser>()
    const [activeRoom, setRoom] = useState<number>()
    const [currentWebPage, setCurrentWebPage] = useState<IWebPage>()
    const [webpages, setWebpages] = useState<IWebPage[]>()

    useEffect(() => {
        if (socket) {
            const room = 1
            setRoom(room)
            //            setWebPage(settings.webpages[room])
            const userUrlId = new URLSearchParams(window.location.search).get(
                'username'
            ) || ''
            socket.on(THIS_USER, (payload: any) => {
                setThisUser(JSON.parse(payload))
            })

            socket.on(USERS_IN_ROOM, (socketPayload: any) => {
                setUsersInRoom(JSON.parse(socketPayload))
            })
            socket.on(WEBPAGES, (socketPayload: any) => {
                handleChangeRoom(room, userUrlId.toString())
                setWebpages(JSON.parse(socketPayload))
            })
        }
    }, [socket])

    const handleChangeRoom = (room: number, userUrl: string) => {
        let roomPayload: IRoomPayload = {
            roomName: room.toString(),
            userUrlName: userUrl,
        }
        setRoom(room)
        setCurrentWebPage(findWebpage(room))
        socket.emit(JOIN_ROOM, roomPayload)
    }

    const findWebpage = (id: number) => {
        return webpages?.find((webpage) => {
            return webpage.id === id
        })
    }

    return (
        <div className={"container"}>
            <div className={"main"}>
                <div className={"grid"}>
                    {webpages?.map((webpage, index) => {
                        return (
                            <button
                                key={index.toString()}
                                className={
                                    webpage.id === activeRoom
                                        ? "cardselected"
                                        : "card"
                                }
                                onClick={() => {
                                    handleChangeRoom(index + 1, thisUser?.id || '')
                                }}
                            >
                                {webpage.name}
                            </button>
                        )
                    })}
                </div>
                <div className={"clientlist"}>
                    USERS :
                    {usersInRoom?.map((userInRoom, index) => {
                        return (
                            <button key={index.toString()} className={"clientbutton"}>
                                { userInRoom }
                            </button>
                        )
                    })}
                </div>
                <iframe
                    className={"iframeview"}
                    src={findWebpage(activeRoom || 1)?.hostname}
                ></iframe>
            </div>
        </div>
    )
}

export default MainPage
