import styles from './RightBottomBtns.module.css';
import Image from 'next/image';

const ClientSignUpOverlayBtn = ({password ,confirmPassword, email, fillValidity, validateEmailReceiver, showError, showSuccess, setMessage, onContinue, onBack, setCompletedStages, completedStages, onClose, handleFormSubmit }) => {
    

    const onAddClientHandler = async () => {
        if (!fillValidity()) {
            setMessage("Fill all the fields")
            showError()
            console.log("in fill validatity!")
            return
        }

        if (!validateEmailReceiver()) {
            setMessage("Please enter a valid email address")
            showError();
            console.log("in email validatity!")

            return;
        }

        if (password !== confirmPassword) {
            console.log("in password validity!")
            setMessage('Password not match')
            showError();
            return;
        }
        console.log("butonnnif")

        await handleFormSubmit();
        onClose();
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