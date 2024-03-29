
// const candidate = () =>{
//     return(
//         <div>
//             <h1>Candidate dashboard</h1>
//         </div>
//     )
// };
// export default candidate;


import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css';
import SideNavbar from '../../../components/SideNavbar';
import SuperComponent from '../../../components/SuperComponent';
import RightComponent from '../../../components/RightComponent';
import { useState, useEffect } from 'react';
import Overlay from '../../../components/Overlay';
import { useActiveItem } from '../../contexts/ActiveItemContext';
import Super from '../../../components/Super';
import ReportOverlay from '../../../components/ReportOverlay';
import JobOverlay from '../../../components/JobOverlay';
import { useRouter } from 'next/router';
import SuccessIndicator from '../../../components/SuccessIndicator';
import ErrorIndicator from '../../../components/ErrorIndicator';
import PaymentOverlay from '../../../components/PaymentOverlay';
import { FormProvider } from '@/contexts/FormContext';
import CandidateSideNavbar from '../../../components/CandidateSideNavbar';
import CandidateSuper from '../../../components/CandidateSuper';

const inter = Inter({ subsets: ['latin'] })


export default function Candidate({ allJobsData, allActiveJobsData, allClosedJobsData }) {
  const router = useRouter();
  const { id } = router?.query;

  const [finalData, setFinalData] = useState(null);
  const [preprocessedCandidates, setPreprocessedCandidates] = useState([]);
  const [token, setToken] = useState(null);

  const [isLoading, setIsLoading] = useState(false);



  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedInCandidate');
    
    if (!isLoggedIn) {
      router.push('/candidate-login');
    }
  }, [router]);

//   useEffect(() => {
//     // Check if user is logged in
//     const isLoggedIn = localStorage.getItem('isLoggedIn');
    
//     if (!isLoggedIn) {
//       // If not logged in, redirect to login page
//       router.push('/client-login');
//     }
//   }, [router]);

//   useEffect(() => {
//     const token = localStorage.getItem('client-token');
//     async function fetchAllPositions() {
//       const requestBody = { company_id: id };
//       setIsLoading(true)
//       const response = await fetch(`${process.env.NEXT_PUBLIC_REMOTE_URL}/get-all-positions`,
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//           },
//           body: JSON.stringify(requestBody),
//         });
//       console.log('response: ', response);
//       const allData = await response.json();
//       setFinalData(allData.data)
//       setIsLoading(false)
//       console.log('jsonified response: ', allData.data);
//     }

//     if (token) {
//       fetchAllPositions()
//     }

//   }, [id])

//   useEffect(() => {
//     if (Array.isArray(finalData)) {
//       const filterActive = (job) => job?.status === 'Active';
//       const filterClosed = (job) => job?.status === 'Closed';

//       setActiveJobsData(finalData.filter(filterActive));
//       setClosedJobsData(finalData.filter(filterClosed));
//     } else {
//       console.log('finalData is not an array:', finalData);
//     }
//   }, [finalData]);

//   useEffect(() => {
//     let isMounted = true;
//     console.log('client_id:', id)
//     localStorage.setItem('clientId', id);
//     const token = localStorage.getItem('client-token');
//     setToken(token)
//     async function fetchAllCandidateReports() {
//       const requestBody = { company_id: id };
//       setIsLoading(true)

//       const response = await fetch(`${process.env.NEXT_PUBLIC_REMOTE_URL}/get-results-by-company`,
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//           },
//           body: JSON.stringify(requestBody),
//         });

//       console.log('response: ', response);
//       if (!response.ok) {
//         console.log(`Error: ${response.status}`);
//       }
//       const allData = await response.json();
//       if (isMounted) {
//         setAllCandidateReports(allData);
//         setIsLoading(false);
//       }
//       console.log('jsonified candidates response: ', allData);
//     }
//     fetchAllCandidateReports()
//     return () => {
//       isMounted = false;
//     };
//   }, [id])


//   const preprocessCandidatesData = (candidates, company) => {
//     return candidates.map(candidate => {
//       let latestResult = {
//         softskillRating: 0,
//         technicalRating: 0,
//         softskillAssessment: "",
//         technicalAssessment: "",
//         createdAt: null
//       };

//       if (candidate.results && candidate.results.length > 0) {
//         const sortedResults = candidate.results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//         latestResult = sortedResults[0].result || latestResult;
//         latestResult.createdAt = sortedResults[0].createdAt;
//       }

//       const score = (latestResult.softskillRating + latestResult.technicalRating) / 2;
//       const formattedDate = latestResult.createdAt ? new Date(latestResult.createdAt).toLocaleDateString() : 'N/A';

//       const expertiseList = candidate.expertise.map(exp => ({
//         skill: exp.skill,
//         level: exp.level
//       }));

//       const inferredPosition = candidate.expertise.length > 0 ? candidate.expertise[0].skill : 'N/A'; // Inferred position from the first skill

//       return {
//         position: candidate.position,
//         jobType: candidate.job_type,
//         name: candidate.name,
//         email: candidate.email,
//         score: score.toFixed(1),
//         contactNo: candidate.contact_no,
//         date: formattedDate,
//         expertise: expertiseList,
//         position: inferredPosition,
//         overAllExperience: candidate.over_all_exp || 'N/A',
//         results: {
//           softskillRating: latestResult.softskillRating,
//           technicalRating: latestResult.technicalRating,
//           softskillAssessment: latestResult.softskillAssessment,
//           technicalAssessment: latestResult.technicalAssessment
//         },
//         company: {
//           name: company.company_name,
//           location: company.company_location,
//           email: company.email,
//           contactNo: company.contact_no,
//           status: company.status
//         }
//       };
//     });
//   };


//   useEffect(() => {
//     async function fetchClientInfo() {
//       const reqBody = {
//         id
//       }
//       console.log("req body:", reqBody)
//       try {
//         const response = await fetch(`${process.env.NEXT_PUBLIC_REMOTE_URL}/get-one-company`,
//           {
//             method: 'POST',
//             headers: { 'Content-type': 'application/json' },
//             body: JSON.stringify(reqBody)
//           })
//         const data = await response.json();
//         setCompanyName(data?.data?.company_name);
//         localStorage.setItem('clientName', companyName);
//         console.log("company self data:", data);
//       } catch (err) {
//         console.log("ERROR:", err);
//       }
//     }
//     if (id) {
//       fetchClientInfo();
//     }
//   }, [id])

//   console.log("Company Data:", allCandidatesReports);
//   console.log("Candidates Data:", allCandidatesReports?.data?.candidates);
//   console.log("testing:", allCandidatesReports?.data?.candidates)

//   useEffect(() => {
//     if (allCandidatesReports?.data?.candidates && allCandidatesReports?.data) {
//       const processedData = preprocessCandidatesData(allCandidatesReports.data.candidates, allCandidatesReports.data);
//       setPreprocessedCandidates(processedData);
//       console.log('pre processed data:', preprocessedCandidates)

//       const filterRecommended = (candidate) => Math.ceil(candidate?.results?.technicalRating) >= 7 && Math.ceil(candidate?.results?.technicalRating) <= 10;
//       const filterQualified = (candidate) => Math.ceil(candidate?.results?.technicalRating) >= 5 && Math.ceil(candidate?.results?.technicalRating) < 7;
//       const filterNotEligible = (candidate) => Math.ceil(candidate?.results?.technicalRating) < 5;

//       setRecommendedCand(processedData.filter(filterRecommended));
//       setQualifiedCand(processedData.filter(filterQualified));
//       setNotEligibleCand(processedData.filter(filterNotEligible));
//       console.log('Recommended Candidate:', recommendedCand);
//       console.log('Qualified Candidate:', qualifiedCand);
//       console.log('Not Eligible Candidate:', notEligibleCand);
//     }
//   }, [allCandidatesReports]);

  const { activeItem } = useActiveItem();
  const [showOverlay, setShowOverlay] = useState(false);
  const [showPaymentOverlay, setShowPaymentOverlay] = useState(false);
  const [reportOverlay, setReportOverlay] = useState(false);
  const [jobOverlay, setJobOverlay] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [message, setMessage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const showError = () => {
    setShowErrorMessage(true);

    setTimeout(() => {
      setShowErrorMessage(false);
    }, 3000);
  };

  const showSuccess = () => {
    setShowSuccessMessage(true);

    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  const stages = {
    ADD_SKILL: 'ADD_SKILL',
    JOB_TYPE: 'JOB_TYPE',
    AI_ASSESSMENT: 'AI_ASSESSMENT',
    SHARE_LINK: 'SHARE_LINK'
  }

  const stageHeadings = {
    ADD_SKILL: 'Add Skills',
    JOB_TYPE: 'Enter Job Details',
    AI_ASSESSMENT: 'Your Job Is Created Successfully',
    SHARE_LINK: 'Share the link with candidates'
  };    

  const toggleOverlay = () => {
    setShowOverlay(!showOverlay);
  }
  const togglePaymentOverlay = () => {
    setShowPaymentOverlay(!showPaymentOverlay);
  }

  const toggleReportOverlay = () => {
    setReportOverlay(!reportOverlay);
  }

  const toggleJobOverlay = () => {
    setJobOverlay(!jobOverlay);
  }

  const getActiveComponent = () => {
    switch (activeItem) {
      case 'Dashboard':
        return <>
          <CandidateSuper />
        </>;
      default:
        return null;
    }
  };

  return (
    <>
      {showErrorMessage && <ErrorIndicator showErrorMessage={showErrorMessage} msgText={message} />}
      {showSuccessMessage && <SuccessIndicator showSuccessMessage={showSuccessMessage} msgText={message} />}
      <FormProvider>
        {showOverlay && <Overlay showError={showError} showErrorMessage={showErrorMessage} showSuccessMessage={showSuccessMessage} setMessage={setMessage} showSuccess={showSuccess} message={message} token={token} set onClose={toggleOverlay} showOverlay={showOverlay} stages={stages} stageHeadings={stageHeadings} />}
      </FormProvider>
      {reportOverlay && <ReportOverlay showError={showError} showErrorMessage={showErrorMessage} showSuccessMessage={showSuccessMessage} onClose={toggleReportOverlay} reportOverlay={reportOverlay} selectedCandidate={selectedCandidate} />}
      {jobOverlay && <JobOverlay message={message} showError={showError} showErrorMessage={showErrorMessage} showSuccessMessage={showSuccessMessage} setMessage={setMessage} showSuccess={showSuccess} token={token} onClose={toggleJobOverlay} jobOverlay={jobOverlay} selectedJob={selectedJob} />}
      {showPaymentOverlay && <PaymentOverlay onClose={togglePaymentOverlay} showPaymentOverlay={showPaymentOverlay} />}
      <div className={styles.clientPortal}>
        {/* <SideNavbar  showOverlay={showOverlay} setShowOverlay={setShowPaymentOverlay} /> */}

        <CandidateSideNavbar showOverlay={showOverlay} setShowOverlay={setShowPaymentOverlay} />
        {getActiveComponent()}
      </div>
    </>
  )
}