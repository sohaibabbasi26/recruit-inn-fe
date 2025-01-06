import AdminBody from "./AdminBody";
import AdminTopNavbar from "./AdminTopNavbar";
import styles from "./SuperComponent.module.css";
import SuccessIndicator from "./SuccessIndicator";

const AdminSuperComponent = ({
  companyId,
  setMessage,
  setSelectedCandidate,
  showSuccessMessage,
  selectedCandidate,
  setReportOverlay,
  allCandidates,
  allClients,
  showSuccess,
  reportOverlay,
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
        <AdminBody
          allCandidates={allCandidates}
          allClients={allClients}
          setSelectedCandidate={setSelectedCandidate}
          selectedCandidate={selectedCandidate}
          setReportOverlay={setReportOverlay}
        />
      </div>
    </>
  );
};

export default AdminSuperComponent;
