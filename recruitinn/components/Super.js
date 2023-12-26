import JobsHub from './JobsHub';
import styles from './Super.module.css';
import TopNavbar from './TopNavbar';
import Image from 'next/image';
import { useActiveItem } from '../src/contexts/ActiveItemContext';
import CandidatesHub from './CandidatesHub';

const Super = ({
    allData,
    activeData,
    closedData,
    allCandidates,
    recommendedCandidates,
    qualifiedCandidates,
    notEligibleCandidates,
    reportOverlay,
    setReportOverlay,
    jobOverlay,
    setJobOverlay,
    setSelectedCandidate,
    toggleOverlay,
    setSelectedJob
}) => {

    const activeItem = useActiveItem();
    const iconSize = 15;
    const bellIconSize = 20;

    return (
        <>
            <div className={styles.superContainer}>

                <div className={styles.topContainer}>
                    <div className={styles.searchContainer}>
                        <TopNavbar />
                    </div>
                    <div className={styles.btnsDiv}>
                        <button className={styles.addJobBtn} onClick={toggleOverlay}><Image src='/Add.svg' width={iconSize} height={iconSize} />  Create A Job</button>
                        <button className={styles.notificationsBtn}><Image src="/BellIcon.svg" width={bellIconSize} height={bellIconSize} /></button>
                    </div>
                </div>

                {allData ? (
                    <JobsHub data={allData} jobOverlay={jobOverlay} setJobOverlay={setJobOverlay} setSelectedJob={setSelectedJob} />
                ) : activeData ? (
                    <JobsHub data={activeData}  jobOverlay={jobOverlay} setJobOverlay={setJobOverlay} setSelectedJob={setSelectedJob}/>
                ) : closedData ? (
                    <JobsHub data={closedData} jobOverlay={jobOverlay} setJobOverlay={setJobOverlay} setSelectedJob={setSelectedJob} />
                ) : allCandidates ? (
                    <CandidatesHub data={allCandidates} reportOverlay={reportOverlay} setReportOverlay={setReportOverlay} setSelectedCandidate={setSelectedCandidate} />
                ) : recommendedCandidates ? (
                    <CandidatesHub data={recommendedCandidates} reportOverlay={reportOverlay} setReportOverlay={setReportOverlay} setSelectedCandidate={setSelectedCandidate} />
                ) : qualifiedCandidates ? (
                    <CandidatesHub data={qualifiedCandidates} reportOverlay={reportOverlay} setReportOverlay={setReportOverlay} setSelectedCandidate={setSelectedCandidate} />
                ) : notEligibleCandidates ? (
                    <CandidatesHub data={notEligibleCandidates} reportOverlay={reportOverlay} setReportOverlay={setReportOverlay} setSelectedCandidate={setSelectedCandidate} />
                ) : ''
                }

            </div>
        </>
    )
}

export default Super;