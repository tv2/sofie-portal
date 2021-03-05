import useSWR from 'swr'
import React from "react";
import styles from '../styles/MainPage.module.css'
import { ISettings, IUsers, IWebPages } from './api/getSettings';

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Index() {
    const { data, error } = useSWR('/api/getSettings', fetcher)
    if (error) return <div>Failed to load </div>
    if (!data) return <div>Loading...</div>

    const settings: ISettings = data

    const urlParams: URLSearchParams = new URLSearchParams(window.location.search)
    const userLoginId: string = urlParams.get('username')
    const user = settings.users.find((i: IUsers) => i.id === userLoginId)
    if (!user) {
        return <div>UNKNOWN USER - /?username={userLoginId}</div>
    }

    return (
        <div className={styles.grid}>
            <ul>
                {settings.webpages.map((webpage: IWebPages) => (
                    <a href={`/iframepage/${[webpage.id]}?username=${userLoginId}`} key={data.id}>
                        <button className={styles.card}>{webpage.name}</button>
                    </a>
                ))}
            </ul>
        </div>
    )
}
