import Image from "next/image";
import styles from "./JobInfoFields.module.css";
import { countryList } from "@/util/cities";
import { getCities } from "@/util/helpers";
import { useEffect, useState } from "react";
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
  // illusion
  // Create a temporary country state to keep track of country changes as references do not trigger a re-render, and we need one here.
  const [tempCountry, setTempCountry] = useState("");
  const iconSize = 20;
  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
  };
  // useEffect(() => {
  //   countryRef.current.value = country;
  //   cityRef.current.value = city;
  // },[city, country])
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
      </div>
      <div className={styles.fieldsContainer}>
        <div className={styles.infoField}>
          <Image src="/earth.svg" width={20} height={20} />
          <select
            defaultValue="no-value"
            ref={countryRef}
            onChange={(e) => setTempCountry(e.target.value)}
          >
            <option disabled value="no-value">
              Select country
            </option>
            {countryList.map((country) => (
              <option value={country}> {country} </option>
            ))}
          </select>
        </div>
        <div className={styles.infoField}>
          <Image src="/aim.svg" width={20} height={20} />
          <select
            defaultValue="no-value"
            disabled={tempCountry === ""}
            ref={cityRef}
          >
            <option disabled value="no-value">
              Select city
            </option>
            {getCities(tempCountry)?.map((city) => (
              <option value={city}> {city} </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};
export default JobInfoFields;