import styles from './RightBottomBtns.module.css';
import Image from 'next/image';

const AdminOverlayBtns = ({password ,conformpassword, email, fillValidity, validateEmailReceiver, showError, showSuccess, setMessage, onContinue, onBack, setCompletedStages, completedStages, onClose, handleFormSubmit }) => {

    const onAddClientHandler = async () => {
        if (!fillValidity()) {
            showError("Fill all the fields")
            // setMessage();
            
            return
        }

        if (!validateEmailReceiver()) {
            
            showError("Please enter a valid email address");
            return
        }

        if (password !== conformpassword) {
            //("")
            showError('Password not match');
            return;
        }

        await handleFormSubmit();
        onClose();
        setMessage("Client has been created")
        showSuccess("Client has been created. Invitation has sent to client.........");
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