import mainPageStyles from '../../styles/MainPage.module.css'
import iFrameStyles from '../../styles/IframeView.module.css'

import React, { useState, useEffect } from 'react'
import useSocket from '../../hooks/useSocket'

import settingsJSON from '../../storage/settings.json'

export default function iFramePage() {
    const [userState, setUser] = useState({
        usersList: null,
    })
    const [iframeUrlState, setIframeUrl] = useState({
        url: null,
    })
    const [usernameState, setUsername] = useState({
        username: null,
    })

    // @ts-ignore
    const socket = useSocket()

    useEffect(() => {
        if (socket) {
            const webPageId = window.location.pathname.match(/\d+/)[0]
            const userId = new URLSearchParams(window.location.search).get(
                'username'
            )

            setIframeUrl({ url: settingsJSON.webpages[Number(webPageId) - 1].hostname })
            setUsername({ username: userId })

            socket.emit('room', { id: webPageId, username: userId })
            socket.on('users', (socketData: any) => {
                setUser({ usersList: JSON.parse(socketData) })
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
                                    usernameState.username
                                }
                                key={webpage.id}
                            >
                                <button
                                    className={
                                        webpage.id === index
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
                    {userState.usersList?.map((user) => {
                        return (
                            <button className={mainPageStyles.clientbutton}>
                                {user.userName}
                            </button>
                        )
                    })}
                </div>
                <iframe
                    className={iFrameStyles.iframeview}
                    src={iframeUrlState.url}
                ></iframe>
            </div>
        </div>
    )
}
