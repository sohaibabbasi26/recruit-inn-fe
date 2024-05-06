import styles from './RightBottomBtns.module.css';
import Image from 'next/image';
import { useRouter } from 'next/router';

const CandSelfAssessmentBtns = ({testReq, assessmentId, isTestRequired, setIsLoading, questionId, onContinue, onBack, setCompletedStages, completedStages, onClose,candidateId }) => {

    const navigationIconSize = 30;
    const router = useRouter();
    console.log('assessmentID in candSelfAss:',assessmentId);
    console.log("Is test Required:", isTestRequired);

    
    const startAssessmentHandler = () => {
        console.log('assessmentID:',assessmentId);
        if(assessmentId){
            console.log('assessmentID:',assessmentId);
            console.log(`/test?cid=${candidateId}&qid=${questionId}&a_id=${assessmentId}&test_req=${testReq}`);
            router.push(`/test?cid=${candidateId}&qid=${questionId}&a_id=${assessmentId}&test_req=${testReq}`);
        }else{
            console.log(`/test?cid=${candidateId}&qid=${questionId}&a_id=${assessmentId}&test_req=${testReq}`);
            router.push(`/test?cid=${candidateId}&qid=${questionId}&a_id=${assessmentId}&test_req=${testReq}`);
        }
    }

    const redirectToCandidateDashB = () => {
        router.push(`/candidate/${candidateId}`);
    }

    return (
        <>
            <div className={styles.btnsContainer} >
                <button id={styles.backBtn} onClick={redirectToCandidateDashB}>Later</button>
                <button id={styles.forwardBtn} onClick={startAssessmentHandler}>Start Assessment<Image src='/Forward.svg' width={navigationIconSize} height={navigationIconSize} /></button>
            </div>
        </>
    )
}

export default CandSelfAssessmentBtns;