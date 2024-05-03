import CompletionComponent from '../../components/CompletionComponent';
import styles from './test.module.css';
import { useActiveFlow } from '@/contexts/ActiveFlowContext';
import { useEffect,useState } from 'react';

const testSumitCompletion = () => {

    const {activeFlow} = useActiveFlow();
    const [candidateId, setCandidateId] = useState('');

    

    useEffect(() => {
        const storedTestData = localStorage.getItem('candidate-id');
        if (storedTestData) {
            setCandidateId(storedTestData);
            console.log("candidate id:",candidateId);
        }
    }, [candidateId]);

    const getActiveComponent = () => {
        const activeFlow = localStorage.getItem('activeFlow');
        console.log("Current active flow:", activeFlow);
        switch (activeFlow) {
            case 'Candidate_self':
                return `/candidate/${candidateId}`;
            case 'Client':
                return `/`;
            default:
                return null;
        }
    };

    return(
        <>
            <div className={styles.superContainer}>
                <CompletionComponent candidateId={candidateId} getActiveComponent={getActiveComponent} /> 
            </div>
        </>
    )
}

export default testSumitCompletion