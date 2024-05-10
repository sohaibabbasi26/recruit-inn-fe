import styles from './RightBottomBtns.module.css';
import Image from 'next/image';

const ShareLinkBtns = ({showError, onContinue , onBack , onClose, setCompletedStages, completedStages, handleEmailInvite, setMessage, showSuccess }) => {

    const navigationIconSize = 20;

    async function handleSendInvite() {
        // const valid = validateReceivers();
        // if (valid) {
        await handleEmailInvite();
        // } 
        // else {
        //   // Already handled in validateReceivers, just exit
        //   setMessage("Validation failed");
        //   showError()
        // }
    }

    return (
        <>
            <div className={styles.btnsContainer} >
                <button id={styles.backBtn} onClick={onClose} >Skip Invitation</button>
                <button id={styles.forwardBtn} onClick={handleSendInvite} >Send Invite<Image src='/send.svg' width={navigationIconSize} height={navigationIconSize}  /></button>
            </div>
        </>
    )
}
export default ShareLinkBtns;