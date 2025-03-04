import styles from "./ClientInfo.module.css";
import Image from "next/image";
import { useState,useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { isValidPhoneNumber } from "libphonenumber-js";
import { countryList } from "@/util/cities";
import { getCities } from "@/util/helpers";
import { findFlagUrlByCountryName } from "country-flags-svg";
//ans

const AdminClientInfo = ({
  email,
  phoneNo,
  setActManager,
  setCity,
  city,
  setClientname,
  setEmail,
  setPhoneNo,
  setpassword,
  setconfirmpassword,
  setCompanySize,
  country,
  setCountry,
  setCompanyname,
}) => {
  const iconSize = 25;
  const [isValid, setIsValid] = useState(true);
  const handlePhoneChange = (value, country) => {
    setPhoneNo(value);
    // Check if the phone number is valid
    setIsValid(isValidPhoneNumber(value, country));
  };
  //(getCities(country));

  const [cities, setCities] = useState([]); // Maintain local state for cities

  // Update cities whenever country changes
  useEffect(() => {
    if (country) {
      const fetchedCities = getCities(country);
      if (fetchedCities) {
        setCities(fetchedCities);
      } else {
        setCities([]); // Reset cities if no match
      }
    } else {
      setCities([]); // Reset cities when country is null
    }
  }, [country]);

  return (
    <>
      <div className={styles.superContainer}>
        <div className={styles.inputField}>
          <Image src="/smiley.svg" width={iconSize} height={iconSize} />
          <input
            placeholder="Client Name"
            onChange={(e) => setClientname(e.target.value)}
          />
        </div>
        <div className={styles.inputField}>
          <Image src="/company.svg" width={iconSize} height={iconSize} />
          <input
            placeholder="Company Name"
            onChange={(e) => setCompanyname(e.target.value)}
          />
        </div>
        <div className={styles.inputField}>
          <Image src="/email.svg" width={iconSize} height={iconSize} />
          <input
            placeholder="Business Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* <div className={styles.inputField} >
                    <Image src='/phone.svg' width={iconSize} height={iconSize} />
                    <input placeholder='Client’s phone number' onChange={(e) => setPhoneNo(e.target.value)} />
                </div> */}
        <div className={styles.inputField}>
          <Image src="/phone.svg" width={iconSize} height={iconSize} />
          <PhoneInput
            country={"us"} // Set default country (you can change it based on your requirement)
            onChange={handlePhoneChange}
            inputStyle={{ border: "none" }}
            inputProps={{
              placeholder: "phone number",
            }}
          />
        </div>
{/* 
        <div className={styles.inputField}>
          <Image src="/Case.svg" width={iconSize} height={iconSize} />
          <input
            placeholder="Password"
            type="password"
            onChange={(e) => setpassword(e.target.value)}
          />
        </div> */}

        {/* <div className={styles.inputField}>
          <Image src="/Case.svg" width={iconSize} height={iconSize} />
          <input
            placeholder="Confirm password"
            type="password"
            onChange={(e) => setconfirmpassword(e.target.value)}
          />
        </div> */}

        <div className={styles.inputField}>
          <Image src="/Case.svg" width={iconSize} height={iconSize} />
          <input
            placeholder="Account manager"
            onChange={(e) => setActManager(e.target.value)}
          />
        </div>

        <div className={styles.inputField}>
          <Image src="/company.svg" width={iconSize} height={iconSize} />
          <select onChange={(e) => setCompanySize(e.target.value)}>
            <option>Company size</option>
            <option>100-50</option>
            <option>25-50</option>
            <option>0-15</option>
          </select>
        </div>
       {/* Country Selection */}
        {/* <div className={`${styles.inputField} ${country ? styles.filled : ""}`}> */}
        <div
          className={`${styles.inputField} ${country ? styles.filled : ""} ${
            country && findFlagUrlByCountryName(country) && styles.countryField
          }`}
        >
          {/* <Image
            src="/earth.svg"
            width={iconSize}
            height={iconSize}
            alt="Earth"
          /> */}
          <Image
            src={
              country
                ? findFlagUrlByCountryName(country) || "/earth.svg"
                : "/earth.svg"
            }
            width={20}
            height={20}
          />

          <select onChange={(e) => setCountry(e.target.value)}>
            <option>Select country</option>
            {countryList.map((country, index) => (
              <option key={index} value={country}>
                {" "}
                {country}{" "}
              </option>
            ))}
          </select>
        </div>

        {/* City Selection */}
        <div className={`${styles.inputField} ${city ? styles.filled : ""}`}>
          <Image src="/aim.svg" width={iconSize} height={iconSize} alt="Aim" />
          <select disabled={!country} onChange={(e) => setCity(e.target.value)}>
            <option>Select city</option>
            {country &&
              getCities(country)?.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
          </select>
        </div>
       
      </div>
    </>
  );
};

export default AdminClientInfo;

