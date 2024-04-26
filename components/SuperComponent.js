import Body from './Body';
import RightComponent from './RightComponent';
import styles from './SuperComponent.module.css';
import TopNavbar from './TopNavbar';
import { useState } from 'react';

const SuperComponent = ({selectedCandidate, companyId, setIsLoading,isLoading, data, candidateReps, jobOverlay, setJobOverlay, reportOverlay, selectedJob, setReportOverlay, setSelectedJob, setSelectedCandidate
 }) => {

        const [jobOverlayVisible, setJobOverlayVisible] = useState(false);
        // const [selectedJob, setSelectedJob] = useState(null);

        const showJobOverlay = (job) => {
            setSelectedJob(job);
            setJobOverlay(true)
        };

        const showCandidateOverlay = (cand) => {
            setSelectedCandidate(cand);
            setReportOverlay(true);
        }

    return (
        <>
            <div className={styles.superContainer} >
                <TopNavbar selectedCandidate={selectedCandidate} reportOverlay={reportOverlay} setReportOverlay={setReportOverlay} setSelectedCandidate={setSelectedCandidate} onJobSelect={showJobOverlay} onCandidateSelect={showCandidateOverlay} companyId={companyId} />
                <Body
                    setIsLoading={setIsLoading}
                    isLoading
                    selectedCandidate={selectedCandidate}
                    setSelectedCandidate={setSelectedCandidate}
                    setSelectedJob = {setSelectedJob}
                    data={data}
                    candidateReps={candidateReps}
                    jobOverlay={jobOverlay}
                    setJobOverlay={setJobOverlay}
                    reportOverlay={reportOverlay}
                    setReportOverlay={setReportOverlay}
                />
            </div>

        </>
    )
}

export default SuperComponent;