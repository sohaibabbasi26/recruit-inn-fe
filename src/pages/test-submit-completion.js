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
        console.log("Current active flow:", activeFlow);
        switch (activeFlow) {
            case 'candidate-self':
                return `/candidate/${candidateId}`;
            case 'client':
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