import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css';
import SideNavbar from '../../components/SideNavbar';
import SuperComponent from '../../components/SuperComponent';
import TopNavbar from '../../components/TopNavbar';
import RightComponent from '../../components/RightComponent';
import { useState } from 'react';
import Overlay from '../../components/Overlay';
import { useActiveItem } from '../contexts/ActiveItemContext';
import Super from '../../components/Super';
import jobData from '../data/jobsDummyData';
import CandData from '../data/candDummyData';
import ReportOverlay from '../../components/ReportOverlay';
import JobOverlay from '../../components/JobOverlay';


const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const { allData, activeData, closedData } = jobData;
  const { allCandidates, recommendedCandidates, qualifiedCandidates, notEligibleCandidates } = CandData;
  const { activeItem } = useActiveItem();
  const [showOverlay, setShowOverlay] = useState(false);
  const [reportOverlay, setReportOverlay] = useState(false); 
  const [jobOverlay,setJobOverlay] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);

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
          <SuperComponent />
          <RightComponent setShowOverlay={setShowOverlay} showOverlay={showOverlay}  />
        </>;  
      case 'AllJobs':
        return <Super setJobOverlay={setJobOverlay} reportOverlay={jobOverlay} allData={allData} toggleOverlay={toggleOverlay} setSelectedJob={setSelectedJob} />
      case 'Active':
        return <Super setJobOverlay={setJobOverlay} reportOverlay={jobOverlay} activeData={activeData} toggleOverlay={toggleOverlay} setSelectedJob={setSelectedJob} />
      case 'Closed':
        return <Super setJobOverlay={setJobOverlay} reportOverlay={jobOverlay} closedData={closedData} toggleOverlay={toggleOverlay} setSelectedJob={setSelectedJob} />
      case 'All':
        return <Super setReportOverlay={setReportOverlay} reportOverlay={reportOverlay} allCandidates={allCandidates} setSelectedCandidate={setSelectedCandidate} toggleOverlay={toggleOverlay} />
      case 'Recommended':
        return <Super setReportOverlay={setReportOverlay} reportOverlay={reportOverlay}  recommendedCandidates = {recommendedCandidates} setSelectedCandidate={setSelectedCandidate} toggleOverlay={toggleOverlay} />
      case 'Qualified':
        return <Super setReportOverlay={setReportOverlay} reportOverlay={reportOverlay} qualifiedCandidates = {qualifiedCandidates} setSelectedCandidate={setSelectedCandidate} toggleOverlay={toggleOverlay} />
      case 'NotEligible':
        return <Super setReportOverlay={setReportOverlay} reportOverlay={reportOverlay} notEligibleCandidates = {notEligibleCandidates} setSelectedCandidate={setSelectedCandidate} toggleOverlay={toggleOverlay} />
      default:
        return null;
    }
  };

  return (
    <>
      {showOverlay && <Overlay onClose={toggleOverlay} showOverlay={showOverlay} stages={stages} stageHeadings={stageHeadings}/>}
      {reportOverlay && <ReportOverlay onClose={toggleReportOverlay} reportOverlay={reportOverlay} selectedCandidate={selectedCandidate} />}
      {jobOverlay && <JobOverlay onClose={toggleJobOverlay} jobOverlay={jobOverlay} selectedJob={selectedJob} />}
      <div className={styles.clientPortal}>
        <SideNavbar  />
        {getActiveComponent()}
      </div>
    </>
  )
}
