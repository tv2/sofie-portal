import mainPageStyles from '../../styles/MainPage.module.css'
import iFrameStyles from '../../styles/IframeView.module.css'

import React, { useState, useEffect } from 'react'
import useSocket from '../../hooks/useSocket'

import settingsJSON from '../../storage/settings.json'

export default function iFramePage() {
    const [users, setUsers] = useState({
        usersList: null,
    })
    const [user, setUser] = useState({
        user: null,
    })
    const [iframeUrl, setIframeUrl] = useState({
        url: null,
    })
    const [webPage, setWebPage] = useState({
        webPage: null,
    })

    // @ts-ignore
    const socket = useSocket()

    useEffect(() => {
        if (socket) {
            const webPageId = window.location.pathname.match(/\d+/)[0]
            const userUrlId = new URLSearchParams(window.location.search).get(
                'username'
            )
            const user = settingsJSON.users.find(
                (userId) => userId.id === userUrlId
            )
            setUser({ user: user })

            setWebPage({
                webPage: settingsJSON.webpages[Number(webPageId) - 1],
            })

            socket.emit('room', { id: webPageId, username: userUrlId })
            socket.on('users', (socketData: any) => {
                setUsers({ usersList: JSON.parse(socketData) })
            })
        }
    }, [socket])

    return (
        <div className={mainPageStyles.container}>
            <div className={iFrameStyles.main}>
                <div className={mainPageStyles.grid}>
                    {settingsJSON.webpages.map((webpage, index) => {
                        return (
                            <a
                                href={
                                    '/iframepage/' +
                                    webpage.id +
                                    '?username=' +
                                    user.user?.id
                                }
                                key={webpage.id}
                            >
                                <button
                                    className={
                                        webpage.id === webPage.webPage?.id
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
                    {users.usersList?.map((i) => {
                        let userName = settingsJSON.users.find(
                            (userId) => userId.id === i.userName
                        ).name
                        return (
                            <button className={mainPageStyles.clientbutton}>
                                {userName}
                            </button>
                        )
                    })}
                </div>
                <iframe
                    className={iFrameStyles.iframeview}
                    src={webPage.webPage?.hostname}
                ></iframe>
            </div>
        </div>
    )
}
