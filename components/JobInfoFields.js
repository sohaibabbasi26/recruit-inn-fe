import styles from "./JobInfoFields.module.css";
import Image from "next/image";

const JobInfoFields = ({
  position,
  jobType,
  description,
  city,
  country,
  positionRef,
  jobTypeRef,
  locationRef,
  setPosition,
  validationErrors,
  setCity,
  setCountry,
  setJobtype,
  countryRef,
  cityRef,
  showSuccessMessage,
  }) => {
  
  const iconSize = 20;
  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
};
  return (
    <>
      <div className={styles.fieldsContainer}>
        <div className={styles.infoField}>
          <Image src="/smiley.svg" width={iconSize} height={iconSize} />
          <input
            type="text"
            placeholder="Add Job Title"
            value={position}
            ref={positionRef}
          />
        </div>

        <div className={styles.infoField}>
          <Image src="/aim.svg" alt="City" width={20} height={20} />
          <select
            name="city"
            value={city}
            ref={cityRef}
            // onChange={handleInputChange(setCity)}
          >
            <option value="">Select your city</option>
            <option value="Karachi">Karachi</option>
          </select>
        </div>
      </div>
  
      <div className={styles.fieldsContainer}>

      <div className={styles.infoField}>
        <Image src="/suitcase.svg" width={iconSize} height={iconSize} />
        <select ref={jobTypeRef}>
          <option value="" selected disable>
            Select Job Type
          </option>
          <option value="On-site">On-site</option>
          <option value="Remote">Remote</option>
          <option value="Hybrid">Hybrid</option>
        </select>
      </div>

        <div className={styles.infoField}>
                        <Image src="/earth.svg" alt="Country" width={20} height={20} />
                        <select
                            value={country}
                            ref={countryRef}
                            // onChange={handleInputChange(setCountry)}
                        >
                            <option value="">Select your country</option>
                            <option value="PK">Pakistan</option>
                        </select>
                        {validationErrors?.country && <div className={styles.errorMessage}>{validationErrors.country}</div>}
      </div>

      </div>
    </>
  );
};

export default JobInfoFields;
