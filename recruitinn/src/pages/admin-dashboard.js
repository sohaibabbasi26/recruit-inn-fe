import AdminSideNavbar from '../../components/AdminSideNavbar';
import AdminSuperComponent from '../../components/AdminSuperComponent';
import RightComponent from '../../components/RightComponent';
import styles from './admin-dashboard.module.css';
import { useActiveItem } from '../contexts/ActiveItemContext';
import AdminSuper from '../../components/AdminSuper';
import { reqdata, allClientsData, activeClientsData, inActiveClientsData } from '@/data/dummyClientReq';
import { allCandidates, notEligibleCandidates, recommendedCandidates, qualifiedCandidates } from '@/data/candDummyData';
import { useState } from 'react';
import ReportOverlay from '../../components/ReportOverlay';
import { individualData } from '@/data/jobsDummyData';
import JobOverlay from '../../components/JobOverlay';
import AdminOverlay from '../../components/AdminOverlay';

const Admin = () => {
    const [reportOverlay, setReportOverlay] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [showOverlay, setShowOverlay] = useState(false);
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [viewListing, setViewListing] = useState(false)
    const { activeItem } = useActiveItem();
    const [jobOverlay, setJobOverlay] = useState(false);

    const stages = {
        CLIENT_INFO: 'CLIENT_INFO',
    }

    const stageHeadings = {
        CLIENT_INFO: 'Adding A Client',
    };

    const toggleJobList = () => {
        setViewListing(!viewListing);
    }

    const toggleJobOverlay = () => {
        setJobOverlay(!jobOverlay);
    }

    const getActiveComponent = () => {
        switch (activeItem) {
            case 'Dashboard':
                return <>
                    <AdminSuperComponent />
                    <RightComponent setShowOverlay={setShowOverlay} showOverlay={showOverlay} />
                </>;
            case 'AllClients':
                return <AdminSuper onOpen={toggleJobList} allClientsData={allClientsData} />
            case 'Request':
                return <AdminSuper onOpen={toggleJobList} reqData={reqdata} />
            case 'Active':
                return <AdminSuper onOpen={toggleJobList} activeClientsData={activeClientsData} />
            case 'In-Active':
                return <AdminSuper onOpen={toggleJobList} inActiveClientsData={inActiveClientsData} />
            case 'All':
                return <AdminSuper setReportOverlay={setReportOverlay} setSelectedCandidate={setSelectedCandidate} allCandidates={allCandidates} />
            case 'Recommended':
                return <AdminSuper setReportOverlay={setReportOverlay} setSelectedCandidate={setSelectedCandidate} recommendedCandidates={recommendedCandidates} />
            case 'Qualified':
                return <AdminSuper setReportOverlay={setReportOverlay} setSelectedCandidate={setSelectedCandidate} qualifiedCandidates={qualifiedCandidates} />
            case 'NotEligible':
                return <AdminSuper setReportOverlay={setReportOverlay} setSelectedCandidate={setSelectedCandidate} notEligibleCandidates={notEligibleCandidates} />
            case 'viewJobListing':
                return <AdminSuper onOpen={toggleJobList} individualData={individualData} setSelectedJob={setSelectedJob} setJobOverlay={setJobOverlay} jobOverlay={jobOverlay} />
            default:
                return null;
        }
    };

    const toggleReportOverlay = () => {
        setReportOverlay(!reportOverlay);
    }

    const toggleOverlay = () => {
        setShowOverlay(!showOverlay);
    }

    return (
        <>
            {showOverlay && <AdminOverlay showOverlay={showOverlay} onClose={toggleOverlay} stages={stages} stageHeadings={stageHeadings} />}
            {jobOverlay && <JobOverlay onClose={toggleJobOverlay} jobOverlay={jobOverlay} selectedJob={selectedJob} />}
            {reportOverlay && <ReportOverlay onClose={toggleReportOverlay} reportOverlay={reportOverlay} selectedCandidate={selectedCandidate} />}
            <div className={styles.adminPortal}>
                <AdminSideNavbar />
                {getActiveComponent()}
            </div>
        </>
    )
}

export default Admin;