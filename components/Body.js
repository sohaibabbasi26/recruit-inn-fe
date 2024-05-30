import AdminCandRep from "./AdminCandRep";
import styles from "./Body.module.css";
import CandidateReports from "./CandidateReports";
import ClientList from "./ClientsList";
import JobCard from "./JobCard";
import Jobs from "./Jobs";

const Body = ({
  setIsLoading,
  isLoading,
  data,
  candidateReps,
  jobOverlay,
  setJobOverlay,
  reportOverlay,
  setReportOverlay,
  setSelectedJob,
  setSelectedCandidate,
  selectedCandidate,
}) => {
  const cardClickHandler = (job) => {
    setSelectedJob(job);
    setSelectedOverlay(true);
  };
  return (
    <>
      <div className={styles.body}>
        <Jobs
          heading="Posted Jobs"
          data={data}
          setSelectedOverlay={setJobOverlay}
          setSelectedJob={setSelectedJob}
          isFor="jobs"
        />

        <Jobs
          heading="Candidate Reports"
          data={candidateReps}
          setSelectedOverlay={setReportOverlay}
          setSelectedJob={setSelectedCandidate}
          isFor="candidates"
        />

        {/* <CandidateReports
          candidateReps={candidateReps}
          setReportOverlay={setReportOverlay}
          setSelectedCandidate={setSelectedCandidate}
          reportOverlay={reportOverlay}
        /> */}
      </div>
    </>
  );
};

export default Body;
