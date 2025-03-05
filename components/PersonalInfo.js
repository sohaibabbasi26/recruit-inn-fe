import { countryList } from "@/util/cities";
import { getCities } from "@/util/helpers";

import { forwardRef, useState, useContext } from "react";
import styles from "./PersonalInfo.module.css";
import Image from "next/image";
import PhoneInput from "react-phone-number-input";
import { findFlagUrlByCountryName } from "country-flags-svg";
import FileInputField from "./FileInputField";

const PersonalInfo = forwardRef(
  (
    {
      setCity,
      setLinkedinUrl,
      cvRef,
      setCountry,
      setContact,
      setEmail,
      setExpertise,
      setName,
      validationErrors,
      name,
      email,
      contact,
      expertise,
      country,
      city,
      setCv
    },
    ref
  ) => {
    // const [phoneNumber, setPhoneNumber] = useState(contact || '');
    // // Handling the form input changes
    const handleInputChange = (setter) => (event) => {
      setter(event.target.value);
    };
    return (
      <>
        <div className={styles.superContainer}>
          <div className={styles.masterContainer}>
            <div>
              <div
                className={`${styles.infoField} ${name ? styles.filled : ""}`}
              >
                <Image src="/smiley.svg" alt="Name" width={20} height={20} />
                <input
                  placeholder="Enter your name"
                  type="text"
                  value={name}
                  onChange={handleInputChange(setName)}
                />
                {validationErrors?.name && (
                  <div className={styles.errorMessage}>
                    {validationErrors.name}
                  </div>
                )}
              </div>
            </div>
            <div>
              <div
                className={`${styles.infoField} ${email ? styles.filled : ""}`}
              >
                <Image src="/email.svg" alt="Email" width={20} height={20} />
                <input
                  placeholder="Enter your email"
                  type="email"
                  value={email}
                  onChange={handleInputChange(setEmail)}
                />
                {validationErrors?.email && (
                  <div className={styles.errorMessage}>
                    {validationErrors.email}
                  </div>
                )}
              </div>
            </div>
            <div>
              <div
                className={`${styles.infoField} ${
                  contact ? styles.filled : ""
                }`}
              >
                <Image src="/phone.svg" alt="Phone" width={20} height={20} />
                <PhoneInput
                  className={styles.phoneInput2}
                  international
                  defaultCountry="PK"
                  value={contact}
                  onChange={setContact}
                />
                {validationErrors?.contact && (
                  <div className={styles.errorMessage}>
                    {validationErrors.contact}
                  </div>
                )}
              </div>
            </div>

            <div>
              <div
                className={`${styles.infoField} ${
                  expertise ? styles.filled : ""
                }`}
              >
                <Image src="/Case.svg" alt="Expertise" width={20} height={20} />
                <select
                  value={expertise}
                  onChange={handleInputChange(setExpertise)}
                >
                  <option value="" disabled selected>
                    Select Your Expertise
                  </option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Expert">Expert</option>
                </select>
                {validationErrors?.expertise && (
                  <div className={styles.errorMessage}>
                    {validationErrors.expertise}
                  </div>
                )}
              </div>
            </div>

            <div>
              <div
                className={`${styles.infoField} ${
                  country ? styles.filled : ""
                } ${
                  country &&
                  findFlagUrlByCountryName(country) &&
                  styles.countryField
                }`}
              >
                {/* <Image src=" /earth.svg"  width={20} height={20} /> */}
                <Image
                  src={
                    country
                      ? findFlagUrlByCountryName(country) || "/earth.svg"
                      : "/earth.svg"
                  }
                  width={20}
                  height={20}
                />
                <select
                  defaultValue="no-value"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <option disabled value="no-value">
                    Select country
                  </option>
                  {countryList.map((country) => (
                    <option value={country}> {country} </option>
                  ))}
                </select>
                {validationErrors?.country && (
                  <div className={styles.errorMessage}>
                    {validationErrors.country}
                  </div>
                )}
              </div>
            </div>

            <div>
              <div
                className={`${styles.infoField} ${
                  country ? styles.filled : ""
                }`}
              >
                <Image src="/aim.svg" width={20} height={20} alt="Aim" />
                <select
                  defaultValue="no-value"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                >
                  <option disabled value="no-value">
                    Select city
                  </option>
                  {country &&
                    getCities(country)?.map((city, index) => (
                      <option key={index} value={city}>
                        {city}
                      </option>
                    ))}
                </select>
                {validationErrors?.city && (
                  <div className={styles.errorMessage}>
                    {validationErrors.city}
                  </div>
                )}
              </div>
            </div>

            <div>
              <div
                className={`${styles.infoField} ${
                  cvRef ? styles.filled : "a"
                }`}
              >
                <FileInputField ref={cvRef} setCv={setCv}/>
                {validationErrors?.cv && (
                  <div className={styles.errorMessage}>
                    {validationErrors.cv}
                  </div>
                )}
              </div>
            </div>
            <div>
              <div
                className={`${styles.infoField} ${name ? styles.filled : ""}`}
              >
                <Image src="/smiley.svg" alt="Name" width={20} height={20} />
                <input
                  placeholder="Enter your Linkedin Url"
                  type="text"
                  //value={name}
                  onChange={handleInputChange(setLinkedinUrl)}
                />
                {validationErrors?.linkedin_url && (
                  <div className={styles.errorMessage}>
                    {validationErrors.linkedin_url}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
);
export default PersonalInfo;
