import styles from "./Body.module.css";
import Jobs from "./Jobs";

const Body = ({
  positionCandidates,
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
          positionCandidates={positionCandidates}
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
      </div>
    </>
  );
};

export default Body;
