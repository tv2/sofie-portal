import Head from 'next/head'
import { MainPage } from './MainPage'

export default function Home() {
    return (
        <div>
            <Head>
                <title>Sisyfos Portal</title>
            </Head>
            {MainPage()}
        </div>
    )
}
