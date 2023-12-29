import styles from './AdminSuper.module.css';
import JobsHub from './JobsHub';
import TopNavbar from './TopNavbar';
import Image from 'next/image';
import { useActiveItem } from '../src/contexts/ActiveItemContext';
import CandidatesHub from './CandidatesHub';
import ClientReqHub from './ClientReqHub';
import CandRepHub from './CandRepHub';
import ClientJobs from './ClientsJobs';

const AdminSuper = ({
    inActiveClientsData,
    activeClientsData,
    allClientsData,
    reqData,
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
    setSelectedJob,
    onOpen,
    individualData
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
                    <JobsHub data={activeData} jobOverlay={jobOverlay} setJobOverlay={setJobOverlay} setSelectedJob={setSelectedJob} />
                ) : closedData ? (
                    <JobsHub data={closedData} jobOverlay={jobOverlay} setJobOverlay={setJobOverlay} setSelectedJob={setSelectedJob} />
                ) : allCandidates ? (
                    <CandRepHub data={allCandidates} reportOverlay={reportOverlay} setReportOverlay={setReportOverlay} setSelectedCandidate={setSelectedCandidate} />
                ) : recommendedCandidates ? (
                    <CandRepHub data={recommendedCandidates} reportOverlay={reportOverlay} setReportOverlay={setReportOverlay} setSelectedCandidate={setSelectedCandidate} />
                ) : qualifiedCandidates ? (
                    <CandRepHub data={qualifiedCandidates} reportOverlay={reportOverlay} setReportOverlay={setReportOverlay} setSelectedCandidate={setSelectedCandidate} />
                ) : notEligibleCandidates ? (
                    <CandRepHub data={notEligibleCandidates} reportOverlay={reportOverlay} setReportOverlay={setReportOverlay} setSelectedCandidate={setSelectedCandidate} />
                ) : reqData ? (
                    <ClientReqHub data={reqData} onOpen={onOpen} />
                ) : allClientsData ? (
                    <ClientReqHub data={allClientsData} />
                ) : activeClientsData ? (
                    <ClientReqHub data={activeClientsData} />
                ) : inActiveClientsData ? (
                    <ClientReqHub data={inActiveClientsData} />
                ) : individualData ? (
                    <ClientJobs data={individualData} setSelectedJob={setSelectedJob} setJobOverlay={setJobOverlay} jobOverlay={jobOverlay} />
                ): ''
                }

            </div>
        </>
    )
}

export default AdminSuper