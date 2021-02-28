import useSWR from 'swr'
import Head from 'next/head'
import { MainPage } from '../components/MainPage'
import { useState } from 'react'
import { IUsers } from './api/users/index'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Index() {
    const { data, error } = useSWR('/api/users', fetcher)
    const users: IUsers[] = data
    const [iframeIndex, setIframeIndex] = useState(-1)
    const iframeViewHandler = (index: number) => {
        setIframeIndex(index)
    }

    if (error) return <div>Failed to load</div>
    if (!users) return <div>Loading...</div>

    var urlParams = new URLSearchParams(window.location.search)
    const userLoginId = urlParams.get('username')
    const user: IUsers = users.find((i: any) => i.id === userLoginId)
    if (!user) {
        return <div>UNKNOWN USER - /?username={userLoginId}</div>
    }
    console.log(user.id)

    return (
        <div>
            <Head>
                <title>Sisyfos Portal</title>
            </Head>
            <MainPage
                user={user}
                iframeIndex={iframeIndex}
                iframeViewHandler={iframeViewHandler}
                data = {users}
            />
        </div>
    )
}

export async function getServerSideProps(context) {
    return {
        props: {},
    }
}

const verifyUser = (userName: string, data: any) => {
    return data.find((i: any) => i.id === userName)
}
