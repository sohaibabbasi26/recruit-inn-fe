import Image from 'next/image';
import { useActiveItem } from '../src/contexts/ActiveItemContext';
import CandidatesHub from './CandidatesHub';
import JobsHub from './JobsHub';
import styles from './Super.module.css';
import TopNavbar from './TopNavbar';
import CandidatesSelfHub from './CandidateSelfHub';

const CandidateSuper = ({
    results,
    isLoading,
    generateTestAndRedirect,
    recommendedCandidates,
    reportOverlay,
    setReportOverlay,
    setJobOverlay,  
    setSelectedCandidate,
    setSelectedJob,
    name,
    expertise,
    appliedThrough,
    experience
}) => {

    const showJobOverlay = (job) => {
        setSelectedJob(job);
        setJobOverlay(true)
    };

    const showCandidateOverlay = (cand) => {
        setSelectedCandidate(cand);
        setReportOverlay(true);
    }

    const activeItem = useActiveItem();
    const iconSize = 20;
    const bellIconSize = 32;

    return (
        <div className={styles.superContainer}>
            <CandidatesSelfHub appliedThrough={appliedThrough} experience={experience}  name={name} expertise={expertise} results={results} isLoading={isLoading}  generateTestAndRedirect={generateTestAndRedirect} heading='Reports' data={recommendedCandidates} reportOverlay={reportOverlay} setReportOverlay={setReportOverlay} setSelectedCandidate={setSelectedCandidate}  />
        </div>
    );
}

export default CandidateSuper;