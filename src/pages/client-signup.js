import AdminSideNavbar from '../../components/AdminSideNavbar';
import AdminSuperComponent from '../../components/AdminSuperComponent';
import RightComponent from '../../components/RightComponent';
import styles from './admin-dashboard.module.css';
import { useActiveItem } from '../contexts/ActiveItemContext';
import AdminSuper from '../../components/AdminSuper';
import { reqdata, allClientsData, activeClientsData, inActiveClientsData } from '@/data/dummyClientReq';
import { allCandidates, notEligibleCandidates, recommendedCandidates, qualifiedCandidates } from '@/data/candDummyData';
import { useState, useEffect } from 'react';
import ReportOverlay from '../../components/ReportOverlay';
import { individualData } from '@/data/jobsDummyData';
import JobOverlay from '../../components/JobOverlay';
import AdminOverlay from '../../components/AdminOverlay';
import AdminRightComponent from '../../components/AdminRightComponent';
import SuccessIndicator from '../../components/SuccessIndicator';
import ErrorIndicator from '../../components/ErrorIndicator';
import ClientSignUpOverlay from '../../components/ClientSignupOverlay';







const ClientSignup = ({ }) => {
    const [activeClientsData, setActiveClientsData] = useState(null);
    const [inActiveClientsData, setInActiveClientsData] = useState(null);
    const [requestedClientsData, setRequestedClientsData] = useState(null);
    const [preprocessedCandidates, setPreprocessedCandidates] = useState(null); 
    const [recommendedCand, setRecommendedCand] = useState([]);
    const [qualifiedCand, setQualifiedCand] = useState([]);
    const [notEligibleCand, setNotEligibleCand] = useState([]);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [adminnToken, setAdminToken] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const { activeItem } = useActiveItem();
    const [reportOverlay, setReportOverlay] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [showOverlay, setShowOverlay] = useState(false);
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [viewListing, setViewListing] = useState(false)
    const [jobOverlay, setJobOverlay] = useState(false);
    const [message , setMessage] = useState(null);

    useEffect(() => {
        const handleKeyDown = (event) => {
          if (event.key === 'Enter') {
            event.preventDefault();
    
            const activeElement = document.activeElement;
    
           if (activeElement.tagName === 'INPUT' && activeElement.form) {
              const form = activeElement.form;
              const submitButton = form.querySelector('[type="submit"]');
              if (submitButton) {
                submitButton.click();
              }
            } else {
              const continueButton = document.getElementById('RightBottomBtns_forwardBtn__83dJ2'); 
              if (continueButton) {
                continueButton.click();
              }
            }
          }
        };
    
        window.addEventListener('keydown', handleKeyDown);
    
        return () => {
          window.removeEventListener('keydown', handleKeyDown);
        };
      }, []);

    useEffect(() => {
        localStorage.setItem('activeFlow', 'Client');
    }, []);

    const showError = (message) => {
        setShowErrorMessage(true);
        setTimeout(() => {
            setShowErrorMessage(false);
        }, 3000);
    };

    const stages = {
        CLIENT_INFO: 'CLIENT_INFO',
    }

    const stageHeadings = {
        CLIENT_INFO: 'Adding A Client',
    };

    const showSuccess = (message) => {
        setShowSuccessMessage(true);
        setTimeout(() => {
            setShowSuccessMessage(false);
        }, 3000);
    };

    useEffect(() => {
        const adminToken = localStorage.getItem('admin-token');
        setAdminToken(adminToken);
    })

    const getActiveComponent = () => {
        switch (activeItem) {
            case 'Dashboard':
                return <>
                    <AdminSuperComponent setMessage={setMessage} showSuccessMessage={showSuccessMessage} showSuccess={showSuccess} allCandidates={preprocessedCandidates} setSelectedCandidate={setSelectedCandidate} setReportOverlay={setReportOverlay} selectedCandidate={selectedCandidate} />
                    <AdminRightComponent setShowOverlay={setShowOverlay} showOverlay={showOverlay} />
                </>;
            case 'AllClients':
                return <AdminSuper showError={showError} showSuccess={showSuccess} adminToken={adminnToken} data={data} setData={setData} setShowOverlay={setShowOverlay} onOpen={toggleJobList} allClients={allClients?.data} />
            case 'Request':
                return <AdminSuper showError={showError} showSuccess={showSuccess} adminToken={adminnToken} data={data} setData={setData} setShowOverlay={setShowOverlay} onOpen={toggleJobList} reqData={requestedClientsData} />
            case 'Active':
                return <AdminSuper showError={showError} showSuccess={showSuccess} adminToken={adminnToken} data={data} setData={setData} setShowOverlay={setShowOverlay} onOpen={toggleJobList} activeClientsData={activeClientsData} />
            case 'In-Active':
                return <AdminSuper showError={showError} showSuccess={showSuccess} adminToken={adminnToken} data={data} setData={setData} setShowOverlay={setShowOverlay} onOpen={toggleJobList} inActiveClientsData={inActiveClientsData} />
            case 'All':
                return <AdminSuper showError={showError} showSuccess={showSuccess} adminToken={adminnToken} setShowOverlay={setShowOverlay} setReportOverlay={setReportOverlay} setSelectedCandidate={setSelectedCandidate} allCandidates={preprocessedCandidates} />
            case 'Recommended':
                return <AdminSuper showError={showError} showSuccess={showSuccess} adminToken={adminnToken} setShowOverlay={setShowOverlay} setReportOverlay={setReportOverlay} setSelectedCandidate={setSelectedCandidate} recommendedCandidates={recommendedCand} />
            case 'Qualified':
                return <AdminSuper showError={showError} showSuccess={showSuccess} adminToken={adminnToken} setShowOverlay={setShowOverlay} setReportOverlay={setReportOverlay} setSelectedCandidate={setSelectedCandidate} qualifiedCandidates={qualifiedCand} />
            case 'NotEligible':
                return <AdminSuper showError={showError} showSuccess={showSuccess} setShowOverlay={setShowOverlay} setReportOverlay={setReportOverlay} setSelectedCandidate={setSelectedCandidate} notEligibleCandidates={notEligibleCand} />
            case 'viewJobListing':
                return <AdminSuper showError={showError} showSuccess={showSuccess} adminToken={adminnToken} data={data} setData={setData} setShowOverlay={setShowOverlay} onOpen={toggleJobList} setSelectedJob={setSelectedJob} setJobOverlay={setJobOverlay} jobOverlay={jobOverlay} />
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
            {showErrorMessage && <ErrorIndicator showErrorMessage={showErrorMessage} msgText={message} />}
            {showSuccessMessage && <SuccessIndicator showSuccessMessage={showSuccessMessage} msgText={message} />}
            <ClientSignUpOverlay adminToken={adminnToken} showError={showError} showErrorMessage={showErrorMessage} message={message} setMessage={setMessage} showSuccessMessage={showSuccessMessage} showSuccess={showSuccess}  showOverlay={showOverlay} onClose={toggleOverlay} stages={stages} stageHeadings={stageHeadings}/>
            {isLoading && <div className={styles.loader}></div>}
            {jobOverlay && <JobOverlay onClose={toggleJobOverlay} jobOverlay={jobOverlay} selectedJob={selectedJob} />}
            {reportOverlay && <ReportOverlay onClose={toggleReportOverlay} reportOverlay={reportOverlay} selectedCandidate={selectedCandidate} />}
            {!isLoading && getActiveComponent()}
        </>
    )
}

export default ClientSignup;
