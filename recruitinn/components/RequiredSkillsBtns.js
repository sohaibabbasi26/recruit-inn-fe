import styles from './RightBottomBtns.module.css';
import Image from 'next/image';
import { useRouter } from 'next/router';

const RequiredSkillsBtns = ({ onContinue , onBack , setCompletedStages, completedStages, onClose }) => {

    const router = useRouter();
    const navigationIconSize = 30;

    const startAssessmentHandler = () => {
        router.push('/test');
    }

    return (
        <>
            <div className={styles.btnsContainer} >
                <button id={styles.backBtn} onClick={onBack}><Image src='/backward.svg' width={navigationIconSize} height={navigationIconSize} />Back</button>
                <button id={styles.forwardBtn} onClick={startAssessmentHandler} >Start Assessment<Image src='/Forward.svg' width={navigationIconSize} height={navigationIconSize}  /></button>
            </div>
        </> 
    )
}

export default RequiredSkillsBtns;