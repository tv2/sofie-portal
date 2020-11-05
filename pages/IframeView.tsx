import styles from '../styles/IframeView.module.css'

export default function IframeView(hostName: string) {
    return <iframe className={styles.iframeview} src={hostName}></iframe>
}
