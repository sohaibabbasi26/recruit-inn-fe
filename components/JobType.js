import EditingContainer from './EditingContainer';
import JobInfoFields from './JobInfoFields';
import styles from './JobType.module.css';
import { useFormContext } from '@/contexts/FormContext';

const JobType = ({position, jobType, description, location,positionRef,jobTypeRef, descriptionRef, locationRef, setPosition,setLocation,setJobtype,setDescription}) => {



    
    return(
        <>
            <div className={styles.jobTypeContainer}>
                <JobInfoFields positionRef={positionRef} jobTypeRef={jobTypeRef} locationRef={locationRef} setPosition={setPosition} setLocation={setLocation} setJobtype={setJobtype} />
                <EditingContainer description={description} descriptionRef={descriptionRef} setDescription={setDescription} />    
            </div>
        </>
    );
}
export default JobType;