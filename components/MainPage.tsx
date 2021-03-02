import styles from '../styles/MainPage.module.css'
import IframeView from '../pages/IframeView'

import webAddressJSON from '../storage/webpages.json'
interface IWebAddress {
    name: string
    description: string
    hostname: string
}
const webAddress: IWebAddress[] = webAddressJSON

export const MainPage = (props) => {
    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <div className={styles.grid}>
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

                    {webAddress.map((client: IWebAddress, index: number) => {
                        return (
                            <button
                                key={index}
                                className={
                                    props.iframeIndex === index
                                        ? styles.cardselected
                                        : styles.card
                                }
                                onClick={() => props.iframeViewHandler(index)}
                            >
                                {client.name}
                            </button>
                        )
                    })}
                </div>
                <div className={styles.clientname}>
                    User : {props.user.name}
                </div>
            </main>

            {props.iframeIndex === -1
                ? ''
                : IframeView(webAddress[props.iframeIndex].hostname)}
        </div>
    )
}

/* USER Active list Example - not implemented yet
            <div className={styles.usergrid}>
                <div className={styles.usercard}>{'Active Users: '}</div>
                <div className={styles.usercard}>{'Afv.D Lyd'}</div>
                <div className={styles.usercard}>{'Afv.D Producer'}</div>
                <div className={styles.usercard}>{'MCR 1'}</div>
                <div className={styles.usercard}>{'CONT 4'}</div>
            </div>
*/
