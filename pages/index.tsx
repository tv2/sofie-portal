import useSWR from 'swr'
import Head from 'next/head'
import { MainPage } from '../components/MainPage'
import { useState } from 'react'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Index() {
    const { data, error } = useSWR('/api/users', fetcher)
    const [iframeIndex, setIframeIndex] = useState(-1)
    const iframeViewHandler = (index: number) => {
        setIframeIndex(index)
    }

    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>

    var urlParams = new URLSearchParams(window.location.search)
    const userName = urlParams.get('username')
    console.log(userName)
    if (!verifyUser(userName, data)) {
        return <div></div>
    }

    return (
        <div>
            <Head>
                <title>Sisyfos Portal</title>
            </Head>
            <MainPage
                iframeIndex={iframeIndex}
                iframeViewHandler={iframeViewHandler}
                data = {data}
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
