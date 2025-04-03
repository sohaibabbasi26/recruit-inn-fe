import { useState } from "react";
import Image from "next/image";
import { findFlagUrlByCountryName } from "country-flags-svg";
import { countryList } from "@/util/cities";
import { getCities } from "@/util/helpers";
import styles from "./JobInfoFields.module.css";

const JobInfoFields = ({
  position,
  positionRef,
  jobTypeRef,
  setJobtype,
  countryRef,
  cityRef,
}) => {
  const [tempCountry, setTempCountry] = useState("");
  const [selectedJobType, setSelectedJobType] = useState("");

  const iconSize = 20;

  const handleJobTypeChange = (e) => {
    const jobType = e.target.value;
    setSelectedJobType(jobType);
    setJobtype(jobType);
  };

  return (
    <>
      <div className={styles.fieldsContainer}>
        {/* Job Title Field */}
        <div className={styles.infoField}>
          <Image src="/smiley.svg" width={iconSize} height={iconSize} />
          <input
            type="text"
            placeholder="Add Job Title"
            value={position}
            ref={positionRef}
          />
        </div>

        {/* Job Type Field */}
        <div className={styles.infoField}>
          <Image src="/suitcase.svg" width={iconSize} height={iconSize} />
          <select ref={jobTypeRef} onChange={handleJobTypeChange}>
            <option value="" selected disabled>
              Select Job Type
            </option>
            <option value="On-site">On-site</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>
      </div>

      {/* Show City and Country fields only for On-site and Hybrid */}
      {(selectedJobType === "On-site" || selectedJobType === "Hybrid") && (
        <div className={styles.fieldsContainer}>
          {/* Country Field */}
          <div
            className={`${styles.infoField} ${
              tempCountry ? styles.filled : ""
            } ${tempCountry && findFlagUrlByCountryName(tempCountry) && styles.countryField}`}
          >
            <Image
              src={
                tempCountry
                  ? findFlagUrlByCountryName(tempCountry) || "/earth.svg"
                  : "/earth.svg"
              }
              width={20}
              height={20}
            />
            <select
              defaultValue="no-value"
              ref={countryRef}
              onChange={(e) => setTempCountry(e.target.value)}
            >
              <option disabled value="no-value">
                Select country
              </option>
              {countryList.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          {/* City Field */}
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
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </>
  );
};

export default JobInfoFields;
