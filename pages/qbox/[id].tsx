import mainPageStyles from '../../styles/MainPage.module.css'
import iFrameStyles from '../../styles/IframeView.module.css'

import React, { useState, useEffect } from 'react'
import useSocket from '../../hooks/useSocket'

import settingsJSON from '../../storage/settings.json'

export default function qbox() {
    const [user, setUser] = useState({
        usersList: null,
    })
    const [qboxUrl, setQboxUrl] = useState({
        url: null,
    })
    const [username, setUsername] = useState({
        username: null,
    })

    // @ts-ignore
    const socket = useSocket()

    useEffect(() => {
        if (socket) {
            const id = window.location.pathname.match(/\d+/)[0]
            const username = new URLSearchParams(window.location.search).get(
                'username'
            )

            setQboxUrl({ url: settingsJSON.qboxes[Number(id) - 1].hostname })
            setUsername({ username: username })

            socket.emit('room', { id: id, username: username })
            socket.on('users', (data) => {
                setUser({ usersList: JSON.parse(data) })
            })
        }
    }, [socket])

    return (
        <div className={mainPageStyles.container}>
            <div className={iFrameStyles.main}>
                <div className={mainPageStyles.grid}>
                    {settingsJSON.qboxes.map((qbox, index) => {
                        return (
                            <a
                                href={
                                    '/qbox/' +
                                    qbox.id +
                                    '?username=' +
                                    username.username
                                }
                                key={qbox.id}
                            >
                                <button
                                    className={
                                        qbox.id === index
                                            ? mainPageStyles.cardselected
                                            : mainPageStyles.card
                                    }
                                >
                                    {qbox.name}
                                </button>
                            </a>
                        )
                    })}
                </div>
                <div className={mainPageStyles.clientlist}>
                    USERS :
                    {user.usersList?.map((user) => {
                        return (
                            <button className={mainPageStyles.clientbutton}>
                                {user.userName}
                            </button>
                        )
                    })}
                </div>
                <iframe
                    className={iFrameStyles.iframeview}
                    src={qboxUrl.url}
                ></iframe>
            </div>
        </div>
    )
}
