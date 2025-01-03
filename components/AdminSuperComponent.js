import AdminBody from './AdminBody';
import AdminTopNavbar from './AdminTopNavbar';
import styles from './SuperComponent.module.css';
import SuccessIndicator from './SuccessIndicator';

const AdminSuperComponent = ({ setMessage,setSelectedCandidate,showSuccessMessage, selectedCandidate, setReportOverlay, allCandidates,allClients, showSuccess }) => {

    return (
        <>
            <div className={styles.superContainer} >
                {/* {showSuccessMessage && <SuccessIndicator showSuccessMessage={showSuccessMessage} />} */}
                <AdminTopNavbar setMessage={setMessage} showSuccess={showSuccess} />
                <AdminBody allCandidates={allCandidates} allClients={allClients} setSelectedCandidate={setSelectedCandidate} selectedCandidate={selectedCandidate} setReportOverlay={setReportOverlay} />
            </div>
        </>
    )
}

export default AdminSuperComponent;