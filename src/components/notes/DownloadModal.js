import { createPortal } from 'react-dom'
import styles from './css/download-modal.module.css';
import Button from '../util/Button';

const ModalContent = ({ fileName, webContentLink, onDismiss }) => {
    return (
        <div className={styles.root}>
            <div className={styles.modal}>
                <p className={styles['download-title']}>Download {fileName}</p>
                <div className={styles.buttons}>
                    <a className={styles.download} href={webContentLink} download>Download</a>
                    <button className={styles.button} onClick={onDismiss}>Dismiss</button>
                </div>
            </div>
        </div>
    );
}

const Overlay = () => {
    return(
        <div className={styles.overlay}></div>
    );
}

const DownloadModal = ({ fileName, webContentLink, onDismiss }) => {
    return (
        <>
            {createPortal(<Overlay />, document.getElementById('overlay-root'))}
            {createPortal(<ModalContent fileName={fileName} webContentLink={webContentLink} onDismiss={onDismiss} />, document.getElementById('modal-root'))}
        </>
    );
}

export default DownloadModal;