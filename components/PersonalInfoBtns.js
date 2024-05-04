<<<<<<< HEAD
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from './RightBottomBtns.module.css';

const PersonalInfoBtns = ({ showSuccess, validateEmailReceiver, fillValidity, showError, showErrorMessage ,setMessage, onContinue , onBack , setCompletedStages, completedStages, onClose }) => {
=======
import { useRouter } from 'next/router';
import styles from './RightBottomBtns.module.css';

import Image from 'next/image';

const PersonalInfoBtns = ({ showSuccess, validateEmailReceiver, fillValidity, showError, showErrorMessage ,setMessage, onContinue  , setCompletedStages, completedStages, onClose }) => {
>>>>>>> 64737ef51706193177dde30af7ec537ba76905f4
    const router = useRouter();

    const navigationIconSize = 30;

    const handleContinue = () => {
        onContinue();
    }
<<<<<<< HEAD
    const handleback = () => {
        router.push('/');
=======
    const backHandler = () =>{
        router.push("/")
>>>>>>> 64737ef51706193177dde30af7ec537ba76905f4
    }
    return (
        <>
            <div className={styles.btnsContainer} >
<<<<<<< HEAD
                <button id={styles.backBtn} onClick={handleback}><Image src='/backward.svg' width={navigationIconSize} height={navigationIconSize} />Back</button>
=======
                {/* <button id={styles.backBtn} onClick={backHandler}><Image src='/backward.svg' width={navigationIconSize} height={navigationIconSize} />Back</button> */}
>>>>>>> 64737ef51706193177dde30af7ec537ba76905f4
                <button id={styles.forwardBtn} onClick={handleContinue} >Continue <Image src='/Forward.svg' width={navigationIconSize} height={navigationIconSize}  /></button>
            </div>
        </>
    )
};

export default PersonalInfoBtns;