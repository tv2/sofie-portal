import styles from '../styles/MainPage.module.css'
import IframeView from '../pages/IframeView'
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

export const MainPage = (props) => {
    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <div className={styles.grid}>
                    <div className={styles.clientname}>User : Afv.D Lyd</div>

                    <button
                        className={
                            props.iframeIndex === -1
                                ? styles.cardselected
                                : styles.card
                        }
                        onClick={() => props.iframeViewHandler(-1)}
                    >
                        HOME
                    </button>
                    {clientAddress.map(
                        (client: ClientAddress, index: number) => {
                            return (
                                <button
                                    key={index}
                                    className={
                                        props.iframeIndex === index
                                            ? styles.cardselected
                                            : styles.card
                                    }
                                    onClick={() =>
                                        props.iframeViewHandler(index)
                                    }
                                >
                                    {client.name}
                                </button>
                            )
                        }
                    )}
                </div>
            </main>
            <div className={styles.usergrid}>
                <div className={styles.usercard}>{'Active Users: '}</div>
                <div className={styles.usercard}>{'Afv.D Lyd'}</div>
                <div className={styles.usercard}>{'Afv.D Producer'}</div>
                <div className={styles.usercard}>{'MCR 1'}</div>
                <div className={styles.usercard}>{'CONT 4'}</div>
            </div>
            {props.iframeIndex === -1
                ? ''
                : IframeView(clientAddress[props.iframeIndex].hostname)}
        </div>
    )
}
