
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
import { useActiveFlow } from '@/contexts/ActiveFlowContext';
import SelfReportOverlay from '../../../components/SelfReportOverlay';

const inter = Inter({ subsets: ['latin'] })


export default function Candidate({ allJobsData, allActiveJobsData, allClosedJobsData }) {
  const router = useRouter();
  const { id } = router?.query;

  const [finalData, setFinalData] = useState(null);
  const [preprocessedCandidates, setPreprocessedCandidates] = useState([]);
  const [token, setToken] = useState(null);
  const [expertise, setExpertise] = useState();
  const [questionId, setQuestionId] = useState();
  const [results, setResults] = useState();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedInCandidate');
    
    if (!isLoggedIn) {
      router.push('/candidate-login');
    }
  }, [router]);

  useEffect(() => {
    async function fetchCompanyDetails() {
        const reqBody = {
            candidate_id : id
        }

        try {
            if (id) {
                const response = await fetch(`${process.env.NEXT_PUBLIC_REMOTE_URL}/get-one-candidate`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(reqBody),
                });
                const data = await response.json();
                console.log("one candidate details: ", data);
                // setEmail(data?.data?.email);
                setExpertise(data?.data?.expertise);
                setCandName(data?.data?.name);
                setExperience(data?.data?.over_all_exp);
                setDate(data?.data?.applied_through);
                setEmail(data?.data?.email);
                setJobType(data?.data?.applied_through);
                setAppliedThrough(data?.data?.applied_through);
                console.log('Expertise in fetch company details:',expertise);
            }
        } catch (err) {
            console.log('err:', err)
        }
    }
    fetchCompanyDetails();
    }, [router?.isReady]);

    useEffect(() => {
        async function fetchResults() {
            const reqBody = {
                candidate_id : id
            }
    
            try {
                if (id) {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_REMOTE_URL}/result-by-cand-id`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(reqBody),
                    });
                    const data = await response.json();
                    console.log("one candidate result details: ", data);
                    setResults(data?.data);
                    console.log('Expertise in fetch company details:',expertise);
                }
            } catch (err) {
                console.log('err:', err)
            }
        }
        fetchResults();
        }, [router?.isReady]);


    useEffect(() => {
        setActiveFlow('candidate-self');
        console.log('current flow:',activeFlow);
    },[])

    const generateTestAndRedirect = async () => {
        const reqBody = {
            expertise : expertise
        }

        console.log('generate test and redirect:' , reqBody);

        try {
            setIsLoading(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_REMOTE_URL}/prepare-test`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reqBody),
            });
            const data = await response.json();
            localStorage.setItem('testData', JSON.stringify(data));
            setQuestionId(data?.data?.message?.question_id);
            console.log('question id:', questionId);
            console.log('data in test preparation:', data);
            setIsLoading(false);
            router.push(`/test?cid=${id}&qid=${data?.data?.message?.question_id}`);
        } catch (err) {
            setIsLoading(false);    
            console.log("error:", err)
        }
    }



  const { activeItem } = useActiveItem();
  const {setActiveFlow, activeFlow} = useActiveFlow();
  const [showOverlay, setShowOverlay] = useState(false);
  const [showPaymentOverlay, setShowPaymentOverlay] = useState(false);
  const [reportOverlay, setReportOverlay] = useState(false);
  const [jobOverlay, setJobOverlay] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [message, setMessage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [candName, setCandName] = useState();
  const [experience, setExperience] = useState();
  const [appliedThrough, setAppliedThrough] = useState();
  const [contact,setContact] = useState();
  const [date, setDate] = useState();
  const [jobtype, setJobType] = useState();
  const [email, setEmail] = useState();


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
          <CandidateSuper setReportOverlay={setReportOverlay} setSelectedCandidate={setSelectedCandidate} appliedThrough={appliedThrough} experience={experience}  name={candName} expertise={expertise} results={results} isLoading={isLoading} generateTestAndRedirect={generateTestAndRedirect}  />
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
      {reportOverlay && <SelfReportOverlay email={email} jobtype={jobtype} date={date} contact={contact} showError={showError} showErrorMessage={showErrorMessage} showSuccessMessage={showSuccessMessage} onClose={toggleReportOverlay} reportOverlay={reportOverlay} selectedCandidate={selectedCandidate} />}
      {jobOverlay && <JobOverlay message={message} showError={showError} showErrorMessage={showErrorMessage} showSuccessMessage={showSuccessMessage} setMessage={setMessage} showSuccess={showSuccess} token={token} onClose={toggleJobOverlay} jobOverlay={jobOverlay} selectedJob={selectedJob} />}
      {showPaymentOverlay && <PaymentOverlay onClose={togglePaymentOverlay} showPaymentOverlay={showPaymentOverlay} />}
      <div className={styles.clientPortal}> 
        <CandidateSideNavbar showOverlay={showOverlay} setShowOverlay={setShowPaymentOverlay} />
        {getActiveComponent()}
      </div>
    </>
  )
}