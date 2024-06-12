import Image from "next/image";
import { useActiveItem } from "../src/contexts/ActiveItemContext";
import CandidatesHub from "./CandidatesHub";
import JobsHub from "./JobsHub";
import styles from "./Super.module.css";
import TopNavbar from "./TopNavbar";

const Super = ({
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
          <div class="RightComponent_masterContainer__Ad_ng">
            <div class="RightComponent_btnsDiv__jJavs">
              {/* <button onClick={toggleOverlay}>
                <Image
                  src="/Add.svg"
                  width={iconSize}
                  height={iconSize}
                  style={{ marginRight: "20px" }}
                />{" "}
                Create A Job
              </button> */}

              <button
                className={styles.RightComponent_addJobBtn__PGBvV}
                onClick={toggleOverlay}
              >
                <Image src="/Add.svg" width={iconSize} height={iconSize} />{" "}
                create a job
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
    </div>
  );
};

export default Super;
