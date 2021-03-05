import useSWR from 'swr'
import React from "react";

const fetcher = (url) => fetch(url).then((res) => res.json())

export interface IUsers {
    id: string
    name: string
}
export default function Index() {
    const { data, error } = useSWR('/api/getSettings', fetcher)
    if (error) return <div>Failed to load </div>
    if (!data) return <div>Loading...</div>

    const users: IUsers[] = data.users

    const urlParams = new URLSearchParams(window.location.search)
    const userLoginId: string = urlParams.get('username')
    const user: IUsers = users.find((i: any) => i.id === userLoginId)
    if (!user) {
        return <div>UNKNOWN USER - /?username={userLoginId}</div>
    }

    return (
        <div className="">
            <ul>
                {data.qboxes.map((qbox) => (
                    <a href={`/qbox/${[qbox.id]}?username=${userLoginId}`} key={data.id}>
                        <button className="">{`Q-BOX ${qbox.id}`}</button>
                    </a>
                ))}
            </ul>
        </div>
    )
}
