import Image from "next/image";
import { useActiveItem } from "../src/contexts/ActiveItemContext";
import CandidatesHub from "./CandidatesHub";
import JobsHub from "./JobsHub";
import styles from "./Super.module.css";
import TopNavbar from "./TopNavbar";
import { useEffect } from "react";

const Super = ({
  positionCandidates,
  selectedCandidate,
  companyId,
  activeJobsData,
  closedJobsData,
  finalData,
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
}) => {
  console.log("final data from Super.js ", finalData);
  console.log("active data from Super.js ", activeJobsData);
  const showJobOverlay = (job) => {
    setSelectedJob(job);
    setJobOverlay(true);
  };

  const showCandidateOverlay = (cand) => {
    setSelectedCandidate(cand);
    setReportOverlay(true);
  };

  const activeItem = useActiveItem();
  const iconSize = 13;
  const bellIconSize = 30;
  let dataToRender;
  switch (activeItem) {
    case "AllJobs":
      dataToRender = finalData;
      break;
    case "Active":
      dataToRender = activeJobsData;
      console.log("Rendering Active Jobs Data:", activeJobsData);
      break;
    case "Closed":
      dataToRender = closedJobsData;
      break;
  }
  useEffect(() => {
    console.log("position candidates are :", positionCandidates);
  }, [positionCandidates]);

  useEffect(() => {
    console.log("all candidates are :", allCandidates);
  }, [allCandidates]);

  return (
    <div className={styles.superContainer}>
      <div className={styles.topContainer}>
        <div className={styles.searchContainer}>
          <TopNavbar
            selectedCandidate={selectedCandidate}
            reportOverlay={reportOverlay}
            setReportOverlay={setReportOverlay}
            setSelectedCandidate={setSelectedCandidate}
            onJobSelect={showJobOverlay}
            onCandidateSelect={showCandidateOverlay}
            companyId={companyId}
          />
        </div>
        <div class="RightComponent_superContainer__1aFKs">
        
              <button
                className={styles.RightComponent_addJobBtn__PGBvV}
                onClick={toggleOverlay}
              >
                <Image src="/Add.svg" width={iconSize} height={iconSize} />{" "}
                Create a Job
              </button>

              {/* <button className={styles.notificationsBtn}>
                <Image
                  src="/BellIcon.svg"
                  width={bellIconSize}
                  height={bellIconSize}
                />
              </button> */}
            </div>
        
      </div>

      {finalData && (
        <JobsHub
          heading="All Jobs"
          setReportOverlay={setReportOverlay}
          data={finalData}
          jobOverlay={jobOverlay}
          setJobOverlay={setJobOverlay}
          setSelectedJob={setSelectedJob}
        />
      )}
      {activeJobsData && (
        <JobsHub
          heading="Active Jobs"
          setReportOverlay={setReportOverlay}
          data={activeJobsData}
          jobOverlay={jobOverlay}
          setJobOverlay={setJobOverlay}
          setSelectedJob={setSelectedJob}
        />
      )}
      {closedJobsData && (
        <JobsHub
          heading="Closed Jobs"
          setReportOverlay={setReportOverlay}
          data={closedJobsData}
          jobOverlay={jobOverlay}
          setJobOverlay={setJobOverlay}
          setSelectedJob={setSelectedJob}
        />
      )}
      {allCandidates && (
        <CandidatesHub
          heading="All Candidates"
          setJobOverlay={setJobOverlay}
          data={allCandidates}
          reportOverlay={reportOverlay}
          setReportOverlay={setReportOverlay}
          setSelectedCandidate={setSelectedCandidate}
        />
      )}
      {recommendedCandidates && (
        <CandidatesHub
          heading="Recommended Candidates"
          setJobOverlay={setJobOverlay}
          data={recommendedCandidates}
          reportOverlay={reportOverlay}
          setReportOverlay={setReportOverlay}
          setSelectedCandidate={setSelectedCandidate}
        />
      )}
      {qualifiedCandidates && (
        <CandidatesHub
          heading="Qualified Candidates"
          setJobOverlay={setJobOverlay}
          data={qualifiedCandidates}
          reportOverlay={reportOverlay}
          setReportOverlay={setReportOverlay}
          setSelectedCandidate={setSelectedCandidate}
        />
      )}
      {notEligibleCandidates && (
        <CandidatesHub
          heading="Not-Eligible Candidates"
          setJobOverlay={setJobOverlay}
          data={notEligibleCandidates}
          reportOverlay={reportOverlay}
          setReportOverlay={setReportOverlay}
          setSelectedCandidate={setSelectedCandidate}
        />
      )}
      {positionCandidates && (
        <div>
          
          <CandidatesHub
            heading="Selected Position's Candidates"
            setJobOverlay={setJobOverlay}
            data={positionCandidates}
            reportOverlay={reportOverlay}
            setReportOverlay={setReportOverlay}
            setSelectedCandidate={setSelectedCandidate}
          />
        </div>
      )}
    </div>
  );
};

export default Super;
