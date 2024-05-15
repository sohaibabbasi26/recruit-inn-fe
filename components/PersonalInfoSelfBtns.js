import { useRouter } from 'next/router';
import styles from './RightBottomBtns.module.css';
import Link from 'next/link';
import Image from 'next/image';

const PersonalInfoSelfBtns = ({ showSuccess, validatePasswordReciever , validateEmailReceiver, validateContactReciever , validateNameReceiver , onBack , fillValidity, showError, showErrorMessage ,setMessage, onContinue  , setCompletedStages, completedStages, onClose }) => {
    

    const navigationIconSize = 30;
    const router = useRouter();
    const handleContinue = async () => {
        // if (!fillValidity()) {
        //     setMessage("Fill all the fields")
        //     showError()
        //     console.log("in fill validatity!")
        //     return
        // }
        // if(password.length < 8) {
        //     console.log("in password length check!")
        //     setMessage("Password must be at least 8 characters long ");            
        //     showError();
        //     return
        // }
        if (!validateNameReceiver()) {
            setMessage("Please enter a valid name")
            showError();
            return;
        }
        
        if (!validateEmailReceiver()) {
            setMessage("Please enter a valid email address")
            showError();
            console.log("in email validatity!")
            return;
        }

        if (!validateContactReciever()) {
            setMessage("Please enter a valid Contact number")
            showError();

            return;
        }
        if (!validatePasswordReciever()) {
            setMessage("Please should be 8 charcters long")
            showError();
            return;
        }


        // if (password !== confirmPassword) {
        //     console.log("in password validity!")
        //     setMessage("Passwords doesn't match");
        //     showError();
        //     return;
        // }
        await onContinue();
    }
    const backHandler = () =>{
        
        router.push("http://app.recruitinn.ai/");
    }
    return (
        <>
            <div className={styles.btnsContainer} >
                <button id={styles.backBtn} onClick={backHandler}><Image src='/backward.svg' width={navigationIconSize} height={navigationIconSize} />Back</button>
                <button id={styles.forwardBtn} onClick={handleContinue} >Continue <Image src='/Forward.svg' width={navigationIconSize} height={navigationIconSize}  /></button>
            </div>
        </>
    )
};

export default PersonalInfoSelfBtns;