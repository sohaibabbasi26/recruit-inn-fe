import EditingContainer from './EditingContainer';
import JobInfoFields from './JobInfoFields';
import styles from './JobType.module.css';
import { useFormContext } from '@/contexts/FormContext';

const JobType = ({position,country, jobType, description, location,positionRef,jobTypeRef, descriptionRef, cityRef, countryRef ,setPosition,setCity,setCountry, setJobtype,setDescription}) => {



    
    return(
        <>
            <div className={styles.jobTypeContainer}>
                <JobInfoFields country={country} positionRef={positionRef} jobTypeRef={jobTypeRef} cityRef={cityRef} countryRef={countryRef} setPosition={setPosition} setCity={setCity} setCountry={setCountry} setJobtype={setJobtype} />
                <EditingContainer description={description} descriptionRef={descriptionRef} setDescription={setDescription} />    
            </div>
        </>
    );
}
export default JobType;