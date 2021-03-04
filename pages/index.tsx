import useSWR from 'swr'
import Link from 'next/link'
import { IUsers } from './api/getUsers'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Index() {
    const { data, error } = useSWR('/api/getWebpages', fetcher)
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
        <ul>
            {data.qboxes.map((webpage) => (
                <li key={webpage.id}>
                    <Link href={`/qbox/${[webpage.id]}?username=${userLoginId}`} as={`/qbox/${webpage.id}?username=${userLoginId}`}>
                        <a>{`Webpage ${webpage.id}`}</a>
                    </Link>
                </li>
            ))}
        </ul>
    )
}
