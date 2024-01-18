import styles from './RightBottomBtns.module.css';
import Image from 'next/image';

const ShareLinkBtns = ({ onContinue , onBack , onClose, setCompletedStages, completedStages, handleEmailInvite }) => {

    const navigationIconSize = 20;

    async function handler() {
        await handleEmailInvite();
        onClose();
    }

    return (
        <>
            <div className={styles.btnsContainer} >
                <button id={styles.backBtn} onClick={onClose} >Skip Invitation</button>
                <button id={styles.forwardBtn} onClick={handler} >Send Invite<Image src='/send.svg' width={navigationIconSize} height={navigationIconSize}  /></button>
            </div>
        </> 
    )
}

export default ShareLinkBtns;