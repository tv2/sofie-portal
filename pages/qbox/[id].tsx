import {useRouter} from "next/router";
import styles from "../../styles/IframeView.module.css";
import React, { useState, useEffect } from "react";
import useSocket from "../../hooks/useSocket";

export default function qbox() {
    const router = useRouter()

    const [user, setUser] = useState({
        usersList: null
    });
    // @ts-ignore
    const socket = useSocket();

    useEffect(() => {
        if (socket) {
            socket.emit("channel", router.query);
            socket.on("users", data => {
                setUser({ usersList: JSON.parse(data) })
            });
        }
    }, [socket ]);

    return (
        <div>
            <h3 className="d-flex justify-content-center"> Connected users : {user.usersList?.length} </h3>
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
            <iframe className={styles.iframeview} src={""}></iframe>
        </div >
    );
}
