import '../styles/MainPage.css'
import '../styles/IframeView.css'

import React, { useState, useEffect } from 'react'
import { io } from 'socket.io-client'
// @ts-ignore
const socket = io()

import { ISettings, IUser, IWebPage } from '../../model/settingsInterface'
import { IRoomPayload } from '../../model/socketClientInterface'

const MainPage = () => {
    const [usersInRoom, setUsersInRoom] = useState<Array<string>>([])
    const [thisUser, setThisUser] = useState<IUser>()
    const [activeRoom, setRoom] = useState<number>()
    const [webPage, setWebPage] = useState<IWebPage>()
    const [settings, setSettings] = useState<ISettings>()

    useEffect(() => {
        if (socket) {
            const room = 1
            setRoom(room)
            //            setWebPage(settings.webpages[room])
            const userUrlId = new URLSearchParams(window.location.search).get(
                'username'
            ) || ''

            socket.on('users', (socketPayload: any) => {
                setUsersInRoom(JSON.parse(socketPayload))
            })
            socket.on('settings', (socketPayload: any) => {
                if (!settings) {
                    setThisUser(
                        JSON.parse(socketPayload).users.find(
                            (userId: any) => userId.id === userUrlId
                        )
                    )
                    handleChangeRoom(room, userUrlId.toString())
                }
                setSettings(JSON.parse(socketPayload))
            })
        }
    }, [socket])

    const handleChangeRoom = (room: number, userUrl: string) => {
        let roomPayload: IRoomPayload = {
            roomName: room.toString(),
            userUrlName: userUrl,
        }
        setRoom(room)
        setWebPage(findWebpage(room))
        socket.emit('room', roomPayload)
    }

    const findWebpage = (id: number) => {
        return settings?.webpages.find((webpage) => {
            return webpage.id === id
        })
    }

    return (
        <div className={"container"}>
            <div className={"main"}>
                <div className={"grid"}>
                    {settings?.webpages.map((webpage, index) => {
                        return (
                            <button
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
                    {usersInRoom?.map((userInRoom) => {
                        let userName = settings?.users.find(
                            (user) => user.id === userInRoom
                        )?.name
                        return (
                            <button className={"clientbutton"}>
                                {userName}
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
