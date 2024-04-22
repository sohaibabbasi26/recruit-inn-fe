import styles from "./JobInfoFields.module.css";
import Image from "next/image";

const JobInfoFields = ({
  position,
  jobType,
  description,
  location,
  positionRef,
  jobTypeRef,
  locationRef,
  setPosition,
  setLocation,
  setJobtype,
}) => {
  const iconSize = 20;

  return (
    <>
      <div className={styles.fieldsContainer}>
        <div className={styles.conatiner}>
          <Image src="/suitcase.svg" width={iconSize} height={iconSize} />
          <input
            type="text"
            placeholder="Add Job Title"
            value={position}
            ref={positionRef}
          />
        </div>

        <div className={styles.conatiner}>
          <Image src="/location.svg" width={iconSize} height={iconSize} />
          <input
            type="text"
            placeholder="Enter Location"
            value={location}
            ref={locationRef}
          />
        </div>
      </div>

<<<<<<< HEAD
      <div className={styles.wrapper}>
        <Image src="/suitcase.svg" width={iconSize} height={iconSize} />
        <select ref={jobTypeRef}>
          <option value="" selected disable>
            {" "}
            Select Job Type
          </option>
          <option value="On-site">On-site</option>
          <option value="Remote">Remote</option>
          <option value="Hybrid">Hybrid</option>
        </select>
      </div>
    </>
  );
};
=======
    return (
        <>
            <div className={styles.fieldsContainer}>
                <div className={styles.conatiner} >
                    <Image src='/suitcase.svg' width={iconSize} height={iconSize} />
                    <input type='text' placeholder='Add Job Title' value={position}  ref={positionRef} />
                </div>    
                <div className={styles.conatiner} >
                <Image src='/location.svg' width={iconSize} height={iconSize} />
                <input type='text' placeholder='Anywhere' value={location} ref={locationRef} />
                </div>
            </div>      
>>>>>>> 910e63e2e7ccd69c1961dbdd4fb6c719507de85a

export default JobInfoFields;
