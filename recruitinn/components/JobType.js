import EditingContainer from './EditingContainer';
import JobInfoFields from './JobInfoFields';
import styles from './JobType.module.css';

const JobType = ({setPosition,setLocation,setJobtype,setDescription}) => {

    return(
        <>
            <div className={styles.jobTypeContainer}>
                <JobInfoFields setPosition={setPosition} setLocation={setLocation} setJobtype={setJobtype} />
                <EditingContainer setDescription={setDescription} />    
            </div>
        </>
    );
}

export default JobType;