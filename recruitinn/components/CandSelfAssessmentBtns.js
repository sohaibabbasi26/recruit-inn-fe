import styles from './RightBottomBtns.module.css';
import Image from 'next/image';
import { useRouter } from 'next/router';

const CandSelfAssessmentBtns = ({ onContinue , onBack , setCompletedStages, completedStages, onClose }) => {

    const navigationIconSize = 30;
    const router = useRouter();

    const startAssessmentHandler = () => {
        router.push('/test');
    }

    return (
        <>
            <div className={styles.btnsContainer} >
                <button id={styles.backBtn} onClick={onClose}>Later</button>
                <button id={styles.forwardBtn} onClick={startAssessmentHandler} >Start Assessment<Image src='/Forward.svg' width={navigationIconSize} height={navigationIconSize}  /></button>
            </div>
        </> 
    )
}

export default CandSelfAssessmentBtns;