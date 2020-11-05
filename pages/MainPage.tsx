import { useState } from 'react'
import styles from '../styles/MainPage.module.css'
import IframeView from './IframeView'
interface ClientAddress {
    name: string
    description: string
    hostname: string
}

const clientAddress: ClientAddress[] = [
    { name: 'Q-BOX 01', description: '', hostname: 'http://localhost:1176' },
    { name: 'Q-BOX 02', description: '', hostname: 'http://localhost:3000' },
    { name: 'Q-BOX 03', description: '', hostname: 'http://localhost:3000' },
    { name: 'Q-BOX 04', description: '', hostname: 'http://localhost:3000' },
    { name: 'Q-BOX 05', description: '', hostname: 'http://localhost:3000' },
    { name: 'Q-BOX 06', description: '', hostname: 'http://localhost:3000' },
    { name: 'Q-BOX 07', description: '', hostname: 'http://localhost:3000' },
    { name: 'Q-BOX 08', description: '', hostname: 'http://localhost:3000' },
    { name: 'Q-BOX 09', description: '', hostname: 'http://localhost:3000' },
    { name: 'Q-BOX 10', description: '', hostname: 'http://localhost:3000' },
]

export const MainPage = () => {
    const [iframeIndex, setIframeIndex] = useState(-1)
    const IframeViewHandler = (index: number) => {
        setIframeIndex(index)
    }
    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <div className={styles.grid}>
                    <div className={styles.clientname}>User : Afv.D Lyd</div>

                    <button
                        className={
                            iframeIndex === -1
                            ? styles.cardselected
                            : styles.card
                        }
                        onClick={(event) => IframeViewHandler(-1)}
                    >
                        HOME
                    </button>
                    {clientAddress.map(
                        (client: ClientAddress, index: number) => {
                            return (
                                <button
                                className={
                                    iframeIndex === index
                                    ? styles.cardselected
                                    : styles.card
                                }
                                onClick={(event) =>
                                    IframeViewHandler(index)
                                }
                                >
                                    {client.name}
                                </button>
                            )
                        }
                        )}
                </div>
            </main>
            <div className={styles.users}>{"Active Users: Afv.D Lyd"}</div>
            {iframeIndex === -1
                ? ''
                : IframeView(clientAddress[iframeIndex].hostname)}
        </div>
    )
}
