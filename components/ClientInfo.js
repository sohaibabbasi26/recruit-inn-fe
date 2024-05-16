import styles from "./ClientInfo.module.css";
import Image from "next/image";
import { useState } from "react";
import { countryList } from "@/util/cities";
import { getCities } from "@/util/helpers";
import { findFlagUrlByCountryName } from "country-flags-svg";

import PhoneInput from "react-phone-number-input";
import ShowPassword from "./ShowPassword";

const ClientInfo = ({
  clientName,
  companyName,
  email,
  phoneNo,
  password,
  confirmPassword,
  actManager,
  companySize,
  country,
  city,
  setActManager,
  setCity,
  setClientname,
  setEmail,
  setPhoneNo,
  setPassword,
  setConfirmPassword,
  setCompanySize,
  setCountry,
  setCompanyname,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const iconSize = 25;

  const [validationErrors, setValidationErrors] = useState({}); // Define if used for error handling

  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
    // console.log(getCities(country));
  };

  return (
    <>
      <div className={styles.superContainer}>
        {/* Client Name Input */}
        <div
          className={`${styles.inputField} ${clientName ? styles.filled : ""}`}
        >
          <Image
            src="/smiley.svg"
            width={iconSize}
            height={iconSize}
            alt="Smiley"
          />
          <input
            placeholder="Client Name"
            onChange={(e) => setClientname(e.target.value)}
          />
        </div>

        {/* Company Name Input */}
        <div
          className={`${styles.inputField} ${companyName ? styles.filled : ""}`}
        >
          <Image
            src="/company.svg"
            width={iconSize}
            height={iconSize}
            alt="Company"
          />
          <input
            placeholder="Company Name"
            onChange={(e) => setCompanyname(e.target.value)}
          />
          {validationErrors?.name && (
            <div className={styles.errorMessage}>{validationErrors.name}</div>
          )}
        </div>

        {/* Email Input */}
        <div className={`${styles.inputField} ${email ? styles.filled : ""}`}>
          <Image
            src="/email.svg"
            width={iconSize}
            height={iconSize}
            alt="Email"
          />
          <input
            placeholder="Business Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          {validationErrors?.email && (
            <div className={styles.errorMessage}>{validationErrors.name}</div>
          )}
        </div>

        {/* Phone Input with Validation */}

        <div className={`${styles.inputField} ${phoneNo ? styles.filled : ""}`}>
          <Image
            src="/phone.svg"
            alt="Phone"
            width={iconSize}
            height={iconSize}
          />
          <PhoneInput
            international
            defaultCountry="PK"
            value={phoneNo}
            onChange={setPhoneNo}
            className={styles.phoneInput}
          />
          {validationErrors?.phoneNo && (
            <div className={styles.errorMessage}>{validationErrors.name}</div>
          )}
        </div>

        {/* Account Manager Input */}
        <div
          className={`${styles.inputField} ${password ? styles.filled : ""}`}
        >
          <Image
            src="/Case.svg"
            width={iconSize}
            height={iconSize}
            alt="Case"
          />
          <input
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
          />
          <ShowPassword pass={showPassword} setPass={setShowPassword} />
          {validationErrors?.password && (
            <div className={styles.errorMessage}>{validationErrors.name}</div>
          )}
        </div>

        <div
          className={`${styles.inputField} ${
            confirmPassword ? styles.filled : ""
          }`}
        >
          <Image src="/Case.svg" width={iconSize} height={iconSize} />
          <input
            placeholder="Confirm password"
            type={showConfirmPassword ? "text" : "password"}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <ShowPassword
            pass={showConfirmPassword}
            setPass={setShowConfirmPassword}
          />
          {validationErrors?.confirmPassword && (
            <div className={styles.errorMessage}>{validationErrors.name}</div>
          )}
        </div>

        <div
          className={`${styles.inputField} ${actManager ? styles.filled : ""}`}
        >
          <Image src="/Case.svg" width={iconSize} height={iconSize} />
          <input
            placeholder="Account manager"
            onChange={(e) => setActManager(e.target.value)}
          />
        </div>

        {/* Company Size Selection */}
        <div
          className={`${styles.inputField} ${companySize ? styles.filled : ""}`}
        >
          <Image
            src="/company.svg"
            width={iconSize}
            height={iconSize}
            alt="Company Size"
          />
          <select onChange={(e) => setCompanySize(e.target.value)}>
            <option>Company size</option>
            <option value="0-15">0-15</option>
            <option value="16-50">16-50</option>
            <option value="51-100">51-100</option>
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

export default ClientInfo;
