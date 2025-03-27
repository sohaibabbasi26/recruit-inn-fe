import styles from './RightBottomBtns.module.css';
import Image from 'next/image';
import { useRouter } from 'next/router';

const CandSelfAssessmentBtns = ({testReq, assessmentId, isTestRequired, setIsLoading, questionId, onContinue, onBack, setCompletedStages, completedStages, onClose,candidateId }) => {

    const navigationIconSize = 30;
    const router = useRouter();
    //('assessmentID in candSelfAss:',assessmentId);
    //("Is test Required:", isTestRequired);

    
    const startAssessmentHandler = () => {
        //('assessmentID:',assessmentId);
        if(assessmentId){
            //('assessmentID:',assessmentId);
            //(`/test?cid=${candidateId}&qid=${questionId}&a_id=${assessmentId}&test_req=${isTestRequired}`);
            router.push(`/test?cid=${candidateId}&qid=${questionId}&a_id=${assessmentId}&test_req=${isTestRequired}`);
        }else{
            //(`/test?cid=${candidateId}&qid=${questionId}&a_id=${assessmentId}&test_req=${isTestRequired}`);
            router.push(`/test?cid=${candidateId}&qid=${questionId}&a_id=${assessmentId}&test_req=${isTestRequired}`);
        }
    }

    const redirectToCandidateDashB = () => {
        localStorage.setItem("isLoggedInCandidate", "true");
        localStorage.setItem("candidateId", candidateId);
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