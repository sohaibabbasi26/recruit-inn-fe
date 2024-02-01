import Body from './Body';
import RightComponent from './RightComponent';
import styles from './SuperComponent.module.css';
import TopNavbar from './TopNavbar';

const SuperComponent = ({setIsLoading,isLoading, data, candidateReps, jobOverlay, setJobOverlay, reportOverlay, setReportOverlay, setSelectedJob, setSelectedCandidate
 }) => {

    return (
        <>
            <div className={styles.superContainer} >
                <TopNavbar />
                <Body
                    setIsLoading={setIsLoading}
                    isLoading
                    setSelectedCandidate={setSelectedCandidate}
                    setSelectedJob = {setSelectedJob}
                    data={data}
                    candidateReps={candidateReps}
                    jobOverlay={jobOverlay}
                    setJobOverlay={setJobOverlay}
                    reportOverlay={reportOverlay}
                    setReportOverlay={setReportOverlay}
                />
            </div>

        </>
    )
}

export default SuperComponent;