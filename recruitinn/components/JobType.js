import EditingContainer from './EditingContainer';
import JobInfoFields from './JobInfoFields';
import styles from './JobType.module.css';

const JobType = () => {

    return(
        <>
            <div className={styles.jobTypeContainer}>
                <JobInfoFields />
                <EditingContainer />    
            </div>
        </>
    );
}

export default JobType;