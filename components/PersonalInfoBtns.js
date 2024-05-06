import { useRouter } from 'next/router';
import styles from './RightBottomBtns.module.css';
import Link from 'next/link';
import Image from 'next/image';

const PersonalInfoBtns = ({ showSuccess, validateEmailReceiver, onBack , fillValidity, showError, showErrorMessage ,setMessage, onContinue  , setCompletedStages, completedStages, onClose }) => {
    

    const navigationIconSize = 30;
    const router = useRouter();
    const handleContinue = () => {
        onContinue();
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

export default PersonalInfoBtns;