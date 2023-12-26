import styles from './RightBottomBtns.module.css';
import Image from 'next/image';

const ShareLinkBtns = ({ onContinue , onBack , onClose, setCompletedStages, completedStages }) => {

    const navigationIconSize = 20;

    return (
        <>
            <div className={styles.btnsContainer} >
                <button id={styles.backBtn} onClick={onClose} >Skip Invitation</button>
                <button id={styles.forwardBtn} onClick={onClose} >Send Invite<Image src='/send.svg' width={navigationIconSize} height={navigationIconSize}  /></button>
            </div>
        </> 
    )
}

export default ShareLinkBtns;