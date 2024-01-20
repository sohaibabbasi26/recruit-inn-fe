import AdminBody from './AdminBody';
import AdminTopNavbar from './AdminTopNavbar';
import styles from './SuperComponent.module.css';

const AdminSuperComponent = ({setSelectedCandidate,selectedCandidate,setReportOverlay ,allCandidates,showSuccess}) => {

    return (
        <>
            <div className={styles.superContainer} >
                <AdminTopNavbar showSuccess={showSuccess} />
                <AdminBody allCandidates={allCandidates} setSelectedCandidate={setSelectedCandidate} selectedCandidate={selectedCandidate} setReportOverlay={setReportOverlay} />
            </div>
        </>
    )
}

export default AdminSuperComponent;