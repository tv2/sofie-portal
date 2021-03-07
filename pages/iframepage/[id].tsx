import mainPageStyles from '../../styles/MainPage.module.css'
import iFrameStyles from '../../styles/IframeView.module.css'

import React, { useState, useEffect } from 'react'
import useSocket from '../../hooks/useSocket'

import settingsJSON from '../../storage/settings.json'
import { ISettings, IUser, IWebPage } from '../api/getSettings'

export default function iFramePage() {
    const [usersInRoom, setUsersInRoom] = useState<Array<string>>([])
    const [thisUser, setThisUser] = useState<IUser>()
    const [webPage, setWebPage] = useState<IWebPage>()
    const [settings, setSettings] = useState<ISettings>(settingsJSON)

    // @ts-ignore
    const socket = useSocket()

    useEffect(() => {
        if (socket) {
            const webPageId = window.location.pathname.match(/\d+/)[0]
            const userUrlId = new URLSearchParams(window.location.search).get(
                'username'
            )
            setThisUser(
                settings.users.find((userId) => userId.id === userUrlId)
            )
            setWebPage(settings.webpages[Number(webPageId) - 1])

            let roomPayload: IRoomPayload = {
                roomName: webPageId,
                userUrlName: userUrlId,
            }
            socket.emit('room', roomPayload)

            socket.on('users', (socketData: any) => {
                setUsersInRoom(JSON.parse(socketData))
            })
        }
    }, [socket])

    const handleRoute = () => {
        socket.emit('leave', { username: thisUser })
    }

    return (
        <div className={mainPageStyles.container}>
            <div className={iFrameStyles.main}>
                <div className={mainPageStyles.grid}>
                    {settings.webpages.map((webpage, index) => {
                        return (
                            <a
                                href={
                                    '/iframepage/' +
                                    webpage.id +
                                    '?username=' +
                                    thisUser?.id
                                }
                                key={webpage.id}
                                onClick={handleRoute}
                            >
                                <button
                                    className={
                                        webpage.id === webPage?.id
                                            ? mainPageStyles.cardselected
                                            : mainPageStyles.card
                                    }
                                >
                                    {webpage.name}
                                </button>
                            </a>
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
                    src={webPage?.hostname}
                ></iframe>
            </div>
        </div>
    )
}
