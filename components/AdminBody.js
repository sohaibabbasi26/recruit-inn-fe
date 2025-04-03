import AdminCandRep from './AdminCandRep';
import styles from './Body.module.css';
import CandidateReports from './CandidateReports';
import ClientList from './ClientsList';
import Jobs from './Jobs';

const AdminBody = ({setSelectedCandidate,selectedCandidate,setReportOverlay,allCandidates, allClients ,onOpen ,data , setData, showError,adminToken, getCandidatesByPosition}) => {

    return (
        <>
            <div className={styles.body}>
                <ClientList  allClients={allClients} onOpen={onOpen} data={data} setData={setData}  showError={showError} adminToken={adminToken}  getCandidatesByPosition={getCandidatesByPosition}/>
                <AdminCandRep allCandidates={allCandidates} setSelectedCandidate={setSelectedCandidate} setReportOverlay={setReportOverlay} />
            </div>
        </>
    )
}

export default AdminBody;