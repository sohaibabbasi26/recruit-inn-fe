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

const Admin = ({ allClients, allResults }) => {

    const [activeClientsData, setActiveClientsData] = useState(null);
    const [inActiveClientsData, setInActiveClientsData] = useState(null);
    const [requestedClientsData, setRequestedClientsData] = useState(null);
    const [preprocessedCandidates, setPreprocessedCandidates] = useState(null);
    const [recommendedCand, setRecommendedCand] = useState([]);
    const [qualifiedCand, setQualifiedCand] = useState([]);
    const [notEligibleCand, setNotEligibleCand] = useState([]);

    useEffect(() => {
        if (Array.isArray(allClients?.data)) {
            const filterRequestsData = (client) => client?.status === 'Request';
            const filterActiveData = (client) => client?.status === 'Active';
            const filterInActiveData = (client) => client?.status === 'In-Active'

            setActiveClientsData(allClients?.data?.filter(filterActiveData));
            setInActiveClientsData(allClients?.data?.filter(filterInActiveData))
            setRequestedClientsData(allClients?.data?.filter(filterRequestsData));
        } else {
            console.log('allClients is not an array:', allClients);
        }
    }, [allClients]);

    const preprocessCandidatesData = (candidates) => {
        return candidates.map(candidate => {
            let latestResult = {
                softskillRating: 0,
                technicalRating: 0,
                softskillAssessment: "",
                technicalAssessment: "",
                createdAt: null
            };

            if (candidate.results && candidate.results.length > 0) {
                const sortedResults = candidate.results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                latestResult = sortedResults[0].result || latestResult;
                latestResult.createdAt = sortedResults[0].createdAt;
            }

            const score = (latestResult.softskillRating + latestResult.technicalRating) / 2;
            const formattedDate = latestResult.createdAt ? new Date(latestResult.createdAt).toLocaleDateString() : 'N/A';

            return {
                name: candidate.name,
                email: candidate.email,
                position: candidate.position,
                score: score.toFixed(1),
                contactNo: candidate.contact_no,
                date: formattedDate,
                expertise: candidate.expertise ? candidate.expertise.techStack : [],
                jobType: candidate.expertise ? candidate.expertise.jobtype : 'N/A',
                position: candidate.expertise ? candidate.expertise.position : 'N/A',
                overAllExperience: candidate.over_all_exp || 'N/A',
                results: latestResult,
                company: candidate.company || null,
                appliedThrough : candidate?.company?.company_name || 'Self',
                companyId : candidate?.company?.company_id
            };
        });
    };


    console.log('checking:', allResults?.data?.candidates)

    useEffect(() => {
        if (allResults?.data) {
            const processedData = preprocessCandidatesData(allResults?.data, allResults?.data);
            setPreprocessedCandidates(processedData);
            console.log('pre processed data:', processedData)

            const filterRecommended = (candidate) => Math.ceil(candidate?.results?.technicalRating) >= 7 && Math.ceil(candidate?.results?.technicalRating) <= 10;
            const filterQualified = (candidate) => Math.ceil(candidate?.results?.technicalRating) >= 5 && Math.ceil(candidate?.results?.technicalRating) < 7;
            const filterNotEligible = (candidate) => Math.ceil(candidate?.results?.technicalRating) < 5;

            setRecommendedCand(processedData.filter(filterRecommended));
            setQualifiedCand(processedData.filter(filterQualified));
            setNotEligibleCand(processedData.filter(filterNotEligible));
        }
    }, [allResults]);

    useEffect(() => {
        console.log('Recommended Candidate:', recommendedCand);
        console.log('Qualified Candidate:', qualifiedCand);
        console.log('Not Eligible Candidate:', notEligibleCand);
    },[recommendedCand,qualifiedCand,notEligibleCand]);


    useEffect(() => {
        console.log('pre processed data:', preprocessedCandidates);
    }, [preprocessedCandidates]);

    useEffect(() => {

    }, [])

    console.log('all clients :', allClients);
    console.log('all results :', allResults);

    const [reportOverlay, setReportOverlay] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [showOverlay, setShowOverlay] = useState(false);
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [viewListing, setViewListing] = useState(false)
    const { activeItem } = useActiveItem();
    const [jobOverlay, setJobOverlay] = useState(false);
    const [data, setData] = useState(null);


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
                    <AdminSuperComponent allCandidates={preprocessedCandidates} setSelectedCandidate={setSelectedCandidate} setReportOverlay={setReportOverlay} selectedCandidate={selectedCandidate} />
                    <AdminRightComponent setShowOverlay={setShowOverlay} showOverlay={showOverlay} />
                </>;
            case 'AllClients':
                return <AdminSuper data={data} setData={setData} setShowOverlay={setShowOverlay} onOpen={toggleJobList} allClients={allClients?.data} />
            case 'Request':
                return <AdminSuper data={data} setData={setData} setShowOverlay={setShowOverlay} onOpen={toggleJobList} reqData={requestedClientsData} />
            case 'Active':
                return <AdminSuper data={data} setData={setData} setShowOverlay={setShowOverlay} onOpen={toggleJobList} activeClientsData={activeClientsData} />
            case 'In-Active':
                return <AdminSuper  setShowOverlay={setShowOverlay} onOpen={toggleJobList} inActiveClientsData={inActiveClientsData} />
            case 'All':
                return <AdminSuper setShowOverlay={setShowOverlay} setReportOverlay={setReportOverlay} setSelectedCandidate={setSelectedCandidate} allCandidates={preprocessedCandidates} />
            case 'Recommended':
                return <AdminSuper setShowOverlay={setShowOverlay} setReportOverlay={setReportOverlay} setSelectedCandidate={setSelectedCandidate} recommendedCandidates={recommendedCand} />
            case 'Qualified':
                return <AdminSuper setShowOverlay={setShowOverlay} setReportOverlay={setReportOverlay} setSelectedCandidate={setSelectedCandidate} qualifiedCandidates={qualifiedCand} />
            case 'NotEligible':
                return <AdminSuper setShowOverlay={setShowOverlay} setReportOverlay={setReportOverlay} setSelectedCandidate={setSelectedCandidate} notEligibleCandidates={notEligibleCand} />
            case 'viewJobListing':
                return <AdminSuper data={data} setData={setData} setShowOverlay={setShowOverlay} onOpen={toggleJobList} setSelectedJob={setSelectedJob} setJobOverlay={setJobOverlay} jobOverlay={jobOverlay} />
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

    console.log('active clients data:', activeClientsData);
    console.log('in active clients data:', inActiveClientsData);
    console.log('requetsed Clients data', requestedClientsData)

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

export const getServerSideProps = async () => {
    try {
        const response = await fetch('http://127.0.0.1:3002/v1/get-companies',
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM4Yzk2MmRiLTMzM2QtNDY0My1iMWY2LTFjZTgzYzhjOGI3YiIsImVtYWlsIjoic29iaWFiYmFzaTIyQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcwNTY2MzU1NCwiZXhwIjoxNzA2MjY4MzU0fQ.XTsmc1gdWHOpc_9RosWV4CyfXT-7FbkQr--CPy3ego4'
                }
            });
        console.log('response: ', response);
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        console.log('jsonified response: ', data);


        const responseTwo = await fetch('http://127.0.0.1:3002/v1/get-all-results',
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM4Yzk2MmRiLTMzM2QtNDY0My1iMWY2LTFjZTgzYzhjOGI3YiIsImVtYWlsIjoic29iaWFiYmFzaTIyQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcwNTY2MzU1NCwiZXhwIjoxNzA2MjY4MzU0fQ.XTsmc1gdWHOpc_9RosWV4CyfXT-7FbkQr--CPy3ego4'
                }
            });
        console.log('response: ', response);
        if (!responseTwo.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const dataTwo = await responseTwo.json();
        console.log('jsonified response: ', dataTwo);
        return {
            props: {
                allClients: data,
                allResults: dataTwo
            },
        };
    } catch (error) {
        console.error("Failed to fetch companies:", error);
        return {
            props: {
                error: "Failed to fetch data",
            },
        };
    }



};  