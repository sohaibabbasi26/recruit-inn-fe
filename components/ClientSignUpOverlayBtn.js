import styles from './RightBottomBtns.module.css';
import Image from 'next/image';

const ClientSignUpOverlayBtn = ({password ,conformpassword, email, fillValidity, validateEmailReceiver, showError, showSuccess, setMessage, onContinue, onBack, setCompletedStages, completedStages, onClose, handleFormSubmit }) => {
    

    const onAddClientHandler = async () => {
        if (!fillValidity()) {
            setMessage("Fill all the fields")
            showError()
            // setMessage();
            
            return
        }

        if (!validateEmailReceiver()) {
            setMessage("Please enter a valid email address")
            showError();
            return;
        }

        if (password !== conformpassword) {
            console.log("")
            setMessage('Password not match')
            showError();
            return;
        }

        await handleFormSubmit();
        // setisLoading(false);
        onClose();
        // setMessage("Client has been created")
        // showSuccess();
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

export default ClientSignUpOverlayBtn;