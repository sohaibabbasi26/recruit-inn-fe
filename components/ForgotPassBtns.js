import styles from './RightBottomBtns.module.css';

import Image from 'next/image';

const ForgotPasswordBtns = ({setViewMode, checkIfEmailIsInDbHandler, email, showError , onClose }) => {

    const text = `Follow this link to set your new password: \n
    `
    const navigationIconSize = 30;

    const handler = () => {
        setViewMode('login')
    }

    // const handleEmailInvite = async () => {
    //     const requestBody = {
    //         to: emailReceiver,
    //         subject: subject,
    //         text: text
    //     }

    //     try {
    //         const response = await fetch(`${process.env.NEXT_PUBLIC_REMOTE_URL}/sendMail`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${token}`,
    //             },
    //             body: JSON.stringify(requestBody),
    //         });
    //         const data = await response.json();
    //         console.log('resp:',data);
    //     } catch (error) {   
    //         console.error('Error submitting form:', error);
    //     }
    // }

    // async function handleSendInvite() {
    //     await handleEmailInvite();
    //     setMessage('An invitation has been sent to the candidate via email')
    //     showSuccess();
    //     onClose();
    // }
    const validateForm = () => {
        let isValid = true;
        // Validate email
        if (!email?.trim()) {
            console.log("email checking   ...");
            showError('Email is required');
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            console.log("is condition me chala jaa bhai");
            showError('Invalid email format');
            isValid = false;
        }
        return isValid;
    };
    const Handleforgotpassword = (e) =>{
        console.log("Handle forgot password for:", email);
        e.preventDefault();
        if (validateForm()) {
            // Proceed with form submission
            checkIfEmailIsInDbHandler();
            // You can send your request to the server here
        };
    }

    return (
        <>
            <div className={styles.btnsContainer} >
                <button id={styles.backBtn} onClick={handler} >Back</button>
                <button id={styles.forwardBtn} onClick={Handleforgotpassword}>Reset Password<Image src='/Forward.svg' width={navigationIconSize} height={navigationIconSize}  /></button>
            </div>
        </> 
    )
}

export default ForgotPasswordBtns;