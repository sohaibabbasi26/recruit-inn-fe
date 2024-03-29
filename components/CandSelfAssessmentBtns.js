import styles from './RightBottomBtns.module.css';
import Image from 'next/image';
import { useRouter } from 'next/router';

const CandSelfAssessmentBtns = ({questionId, onContinue, onBack, setCompletedStages, completedStages, onClose,candidateId }) => {

    const navigationIconSize = 30;
    const router = useRouter();

    const startAssessmentHandler = () => {
        console.log(`/test?id=${candidateId}`)
        router.push(`/test?cid=${candidateId}&qid=${questionId}`)
    }

    const redirectToCandidateDashB = () => {
        router.push(`/candidate/${candidateId}`);
    }

    return (
        <>
            <div className={styles.btnsContainer} >
                <button id={styles.backBtn} onClick={redirectToCandidateDashB}>Later</button>
                <button id={styles.forwardBtn} onClick={startAssessmentHandler} >Start Assessment<Image src='/Forward.svg' width={navigationIconSize} height={navigationIconSize} /></button>
            </div>
        </>
    )
}

export default CandSelfAssessmentBtns;