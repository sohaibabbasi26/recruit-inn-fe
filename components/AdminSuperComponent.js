import AdminBody from "./AdminBody";
import AdminTopNavbar from "./AdminTopNavbar";
import styles from "./SuperComponent.module.css";
import SuccessIndicator from "./SuccessIndicator";
import ClientJobs from "./ClientsJobs";
import JobsHub from "./JobsHub";

const AdminSuperComponent = ({
  setMessage,
  setSelectedCandidate,
  showSuccessMessage,
  onOpen,
  selectedCandidate,
  setReportOverlay,
  adminToken,
  allCandidates,
  allClients,
  showError,
  showSuccess,
  data,
  setData,
  jobOverlay,
  setJobOverlay,
  allData,
  activeData,
  closedData,
  reportOverlay,
  getCandidatesByPosition,
}) => {
  return (
    <>
      <div className={styles.superContainer}>
        {/* {showSuccessMessage && <SuccessIndicator showSuccessMessage={showSuccessMessage} />} */}

        <AdminTopNavbar
          reportOverlay={reportOverlay}
          setReportOverlay={setReportOverlay}
          setMessage={setMessage}
          showSuccess={showSuccess}
          selectedCandidate={selectedCandidate}
          setSelectedCandidate={setSelectedCandidate}
        />

        {/* Add JobsHub rendering logic similar to AdminSuper */}
        {allData ? (
          <JobsHub
            showError={showError}
            showSuccess={showSuccess}
            adminToken={adminToken}
            data={data}
            jobOverlay={jobOverlay}
            setJobOverlay={setJobOverlay}
            setSelectedJob={setSelectedJob}
          />
        ) : activeData ? (
          <JobsHub
            showError={showError}
            showSuccess={showSuccess}
            data={data}
            adminToken={adminToken}
            jobOverlay={jobOverlay}
            setJobOverlay={setJobOverlay}
            setSelectedJob={setSelectedJob}
          />
        ) : closedData ? (
          <JobsHub
            showError={showError}
            showSuccess={showSuccess}
            data={data}
            adminToken={adminToken}
            jobOverlay={jobOverlay}
            setJobOverlay={setJobOverlay}
            setSelectedJob={setSelectedJob}
          />
        ) : (
          ""
        )}

        {/* AdminBody component */}
        <AdminBody
          allCandidates={allCandidates}
          allClients={allClients}
          adminToken={adminToken}
          setSelectedCandidate={setSelectedCandidate}
          selectedCandidate={selectedCandidate}
          showError={showError}
          onOpen={onOpen}
          setReportOverlay={setReportOverlay}
          data={data}
          setData={setData}
          getCandidatesByPosition={getCandidatesByPosition}
        />
      </div>
    </>
  );
};

export default AdminSuperComponent;
