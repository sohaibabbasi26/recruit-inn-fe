import { useRouter } from 'next/router';
import styles from './RightBottomBtns.module.css';

import Image from 'next/image';

const PersonalInfoBtns = ({ showSuccess, validateEmailReceiver, fillValidity, showError, showErrorMessage ,setMessage, onContinue  , setCompletedStages, completedStages, onClose }) => {
    const router = useRouter();

    const navigationIconSize = 30;

    const handleContinue = () => {
        onContinue();
    }
    const backHandler = () =>{
        router.push("/")
    }
    return (
        <>
            <div className={styles.btnsContainer} >
                {/* <button id={styles.backBtn} onClick={backHandler}><Image src='/backward.svg' width={navigationIconSize} height={navigationIconSize} />Back</button> */}
                <button id={styles.forwardBtn} onClick={handleContinue} >Continue <Image src='/Forward.svg' width={navigationIconSize} height={navigationIconSize}  /></button>
            </div>
        </>
    )
};

export default PersonalInfoBtns;