import styles from './RightBottomBtns.module.css';
import Image from 'next/image';

const AdminOverlayBtns = ({showSuccess, setMessage, onContinue, onBack, setCompletedStages, completedStages, onClose, handleFormSubmit }) => {

    const onAddClientHandler = async () => {
        await handleFormSubmit();
        onClose();
        setMessage("Client has been created")
        showSuccess();
    }

    const navigationIconSize = 30;
    const iconSize = 20;
    return (
        <>
            <div className={styles.btnsContainer} > 
                <button id={styles.backBtn} onClick={onClose}><Image src='/backward.svg' width={navigationIconSize} height={navigationIconSize} />Back</button>
                <button id={styles.forwardBtn} onClick={onAddClientHandler} >Add Client <Image src='/addsign.svg' width={iconSize} height={iconSize} /></button>
            </div>
        </>
    )
}

export default AdminOverlayBtns;