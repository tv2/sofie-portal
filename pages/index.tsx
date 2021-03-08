import useSWR from 'swr'
import React from "react";
import styles from '../styles/MainPage.module.css'
import { ISettings, IUser, IWebPage } from '../model/settingsInterface';

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Index() {
    const { data, error } = useSWR('/api/getSettings', fetcher)
    if (error) return <div>Failed to load </div>
    if (!data) return <div>Loading...</div>

    const settings: ISettings = data

    const urlParams: URLSearchParams = new URLSearchParams(window.location.search)
    const userLoginId: string = urlParams.get('username')
    const user = settings.users.find((i: IUser) => i.id === userLoginId)
    if (!user) {
        return <div>UNKNOWN USER - /?username={userLoginId}</div>
    }

    return (
        <div className={styles.grid}>
            <ul>
                {settings.webpages.map((webpage: IWebPage) => (
                    <a href={`/iframepage/${[webpage.id]}?username=${userLoginId}`} key={data.id}>
                        <button className={styles.card}>{webpage.name}</button>
                    </a>
                ))}
            </ul>
        </div>
    )
}
