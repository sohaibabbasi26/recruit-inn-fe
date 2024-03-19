import styles from './AdminSuper.module.css';
import JobsHub from './JobsHub';
import TopNavbar from './TopNavbar';
import Image from 'next/image';
import { useActiveItem } from '../src/contexts/ActiveItemContext';
import CandidatesHub from './CandidatesHub';
import ClientReqHub from './ClientReqHub';
import CandRepHub from './CandRepHub';
import ClientJobs from './ClientsJobs';
import AdminTopNavbar from './AdminTopNavbar';
import { useState } from 'react';

const AdminSuper = ({
    allClients,
    inActiveClientsData,
    activeClientsData,
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
    setSelectedJob,
    onOpen,
    setShowOverlay,
    setData,
    data,
    adminToken,
    showError,
    showSuccess
}) => {


    const iconSize = 15;
    const bellIconSize = 20;

    const openAddClientHandler = () => {
        setShowOverlay(true)
    }

    return (
        <>
            <div className={styles.superContainer}>

                <div className={styles.topContainer}>
                    <div className={styles.searchContainer}>
                        <AdminTopNavbar />
                    </div>
                    <div className={styles.btnsDiv}>
                        <button className={styles.addJobBtn} onClick={openAddClientHandler}><Image src='/Add.svg' width={iconSize} height={iconSize} />Create A Client</button>
                        <button className={styles.notificationsBtn}><Image src="/BellIcon.svg" width={bellIconSize} height={bellIconSize} /></button>
                    </div>
                </div>

                {allData ? (
                    <JobsHub showError={showError} showSuccess={showSuccess} adminToken={adminToken} data={data} jobOverlay={jobOverlay} setJobOverlay={setJobOverlay} setSelectedJob={setSelectedJob} />
                ) : activeData ? (
                    <JobsHub showError={showError} showSuccess={showSuccess} data={data} adminToken={adminToken} jobOverlay={jobOverlay} setJobOverlay={setJobOverlay} setSelectedJob={setSelectedJob} />
                ) : closedData ? (
                    <JobsHub showError={showError} showSuccess={showSuccess} data={data} adminToken={adminToken} jobOverlay={jobOverlay} setJobOverlay={setJobOverlay} setSelectedJob={setSelectedJob} />
                ) : allCandidates ? (
                    <CandRepHub showError={showError} showSuccess={showSuccess} adminToken={adminToken} heading='All Candidates' data={allCandidates} reportOverlay={reportOverlay} setReportOverlay={setReportOverlay} setSelectedCandidate={setSelectedCandidate} />
                ) : recommendedCandidates ? (
                    <CandRepHub showError={showError} showSuccess={showSuccess} adminToken={adminToken} heading='Recommended Candidates' data={recommendedCandidates} reportOverlay={reportOverlay} setReportOverlay={setReportOverlay} setSelectedCandidate={setSelectedCandidate} />
                ) : qualifiedCandidates ? (
                    <CandRepHub showError={showError} showSuccess={showSuccess} adminToken={adminToken} heading='Qualified Candidates' data={qualifiedCandidates} reportOverlay={reportOverlay} setReportOverlay={setReportOverlay} setSelectedCandidate={setSelectedCandidate} />
                ) : notEligibleCandidates ? (
                    <CandRepHub showError={showError} showSuccess={showSuccess} adminToken={adminToken} heading='Not Eligible Candidates' data={notEligibleCandidates} reportOverlay={reportOverlay} setReportOverlay={setReportOverlay} setSelectedCandidate={setSelectedCandidate} />
                ) : reqData ? (
                    <ClientReqHub showError={showError} showSuccess={showSuccess} adminToken={adminToken} heading='Client Requests' dataToBeSet={data} setData={setData} data={reqData} onOpen={onOpen} />
                ) : allClients ? (
                    <ClientReqHub showError={showError} showSuccess={showSuccess} adminToken={adminToken} heading='All Clients' dataToBeSet={data} setData={setData} data={allClients} />
                ) : activeClientsData ? (
                    <ClientReqHub showError={showError} showSuccess={showSuccess} adminToken={adminToken} heading='Active Clients' setData={setData} dataToBeSet={data} data={activeClientsData} />
                ) : inActiveClientsData ? (
                    <ClientReqHub showError={showError} showSuccess={showSuccess} adminToken={adminToken} heading='In-Active Clients' setData={setData} dataToBeSet={data} data={inActiveClientsData} />
                ) : data ? (
                    <ClientJobs showError={showError} showSuccess={showSuccess} adminToken={adminToken} heading='In-Active Clients' setData={setData} data={data} setSelectedJob={setSelectedJob} setJobOverlay={setJobOverlay} jobOverlay={jobOverlay} />
                ) : ''
                }

            </div>
        </>
    )
}

export default AdminSuper