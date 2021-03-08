import mainPageStyles from '../../styles/MainPage.module.css'
import iFrameStyles from '../../styles/IframeView.module.css'

import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
// @ts-ignore
const socket = io()

import { ISettings, IUser, IWebPage } from '../../model/settingsInterface'
import { IRoomPayload } from '../../model/socketClientInterface'

export default function iFramePage() {
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
            )

            socket.on('users', (socketPayload: any) => {
                setUsersInRoom(JSON.parse(socketPayload))
            })
            socket.on('settings', (socketPayload: any) => {
                if (!settings) {
                    setThisUser(
                        JSON.parse(socketPayload).users.find(
                            (userId) => userId.id === userUrlId
                        )
                    )
                    handleChangeRoom(room, userUrlId)
                }
                setSettings(JSON.parse(socketPayload))
            })
        }
    }, [socket])

    const handleChangeRoom = (room: number, userUrl) => {
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
        <div className={mainPageStyles.container}>
            <div className={iFrameStyles.main}>
                <div className={mainPageStyles.grid}>
                    {settings?.webpages.map((webpage, index) => {
                        return (
                            <button
                                className={
                                    webpage.id === activeRoom
                                        ? mainPageStyles.cardselected
                                        : mainPageStyles.card
                                }
                                onClick={() => {
                                    handleChangeRoom(index + 1, thisUser.id)
                                }}
                            >
                                {webpage.name}
                            </button>
                        )
                    })}
                </div>
                <div className={mainPageStyles.clientlist}>
                    USERS :
                    {usersInRoom?.map((userInRoom) => {
                        let userName = settings.users.find(
                            (user) => user.id === userInRoom
                        )?.name
                        return (
                            <button className={mainPageStyles.clientbutton}>
                                {userName}
                            </button>
                        )
                    })}
                </div>
                <iframe
                    className={iFrameStyles.iframeview}
                    src={findWebpage(activeRoom)?.hostname}
                ></iframe>
            </div>
        </div>
    )
}
