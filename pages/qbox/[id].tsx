import styles from "../../styles/IframeView.module.css";
import React, { useState, useEffect } from "react";
import useSocket from "../../hooks/useSocket";

import settingsJSON from '../../storage/settings.json'

export default function qbox() {
    const [user, setUser] = useState({
        usersList: null
    });
    const [qboxUrl, setQboxUrl] = useState({
        url: null
    });
    const [username, setUsername] = useState({
        username: null
    });

    // @ts-ignore
    const socket = useSocket();

    useEffect(() => {
        if (socket) {
            const id = window.location.pathname.match(/\d+/)[0]
            const username = new URLSearchParams(window.location.search).get('username')

            setQboxUrl({url: settingsJSON.qboxes[Number(id)-1].hostname})
            setUsername({username: username})

            socket.emit("room", {id: id, username: username});
            socket.on("users", data => {
                setUser({ usersList: JSON.parse(data) })
            });
        }
    }, [socket ]);

    return (
        <div className="">
        <div className="">
            <h3 className=""> Connected users : {user.usersList?.length} </h3>
            <table className="table">
                <thead>
                <tr>
                    <th> User name </th>
                    <th> Connection Date </th>
                </tr>
                </thead>
                <tbody>
                {user.usersList?.map(user => {
                    return (<tr key={user.id}>
                        <td> {user.userName} </td>
                        <td> {user.connectionTime} </td>
                    </tr>)
                })}
                </tbody>
            </table>
            <div>
                {settingsJSON.qboxes.map(qbox => {
                    return (
                        <a href={"/qbox/"+qbox.id+"?username="+username.username} key={qbox.id}>
                            <button className="">
                                {qbox.name}
                            </button>
                        </a>
                        )
                    }
                )}

            </div>
        </div >
            <div className="">
                <iframe className={styles.iframeview} src={qboxUrl.url}></iframe>
            </div>
        </div>
    );
}
