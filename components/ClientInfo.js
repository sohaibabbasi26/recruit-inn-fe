import styles from "./ClientInfo.module.css";
import Image from "next/image";
import { useState } from "react";
import { countryList } from "@/util/cities";
import { getCities } from "@/util/helpers";
import PhoneInput from 'react-phone-number-input';


const ClientInfo = ({
  email,
  phoneNo,
  setActManager,
  setCity,
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

  const [validationErrors, setValidationErrors] = useState({}); // Define if used for error handling

  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
    console.log(getCities(country));
  };

  return (
    <>
    
      <div className={styles.superContainer}>
        {/* Client Name Input */}
        <div className={styles.inputField}>
          <Image src="/smiley.svg" width={iconSize} height={iconSize} alt="Smiley" />
          <input
            placeholder="Client Name"
            onChange={(e) => setClientname(e.target.value)}
          />
        </div>

        {/* Company Name Input */}
        <div className={styles.inputField}>
          <Image src="/company.svg" width={iconSize} height={iconSize} alt="Company" />
          <input
            placeholder="Company Name"
            onChange={(e) => setCompanyname(e.target.value)}
          />
        </div>

        {/* Email Input */}
        <div className={styles.inputField}>
          <Image src="/email.svg" width={iconSize} height={iconSize} alt="Email" />
          <input
            placeholder="Business Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Phone Input with Validation */}
      
        <div className={styles.inputField}>
          <Image src="/phone.svg" alt="Phone" width={iconSize} height={iconSize} />
          <PhoneInput
            international
            defaultCountry="PK"
            value={phoneNo}
            onChange={setPhoneNo}
            className={styles.phoneInput}
          />
        </div>

        {/* Account Manager Input */}
        <div className={styles.inputField}>
          <Image src="/Case.svg" width={iconSize} height={iconSize} alt="Case" />
          <input
            placeholder="Password"
            type="password"
            onChange={(e) => setpassword(e.target.value)}
          />
        </div>

        <div className={styles.inputField}>
          <Image src="/Case.svg" width={iconSize} height={iconSize} />
          <input
            placeholder="Confirm password"
            type="password"
            onChange={(e) => setconfirmpassword(e.target.value)}
          />
        </div>

        <div className={styles.inputField}>
          <Image src="/Case.svg" width={iconSize} height={iconSize} />
          <input
            placeholder="Account manager"
            onChange={(e) => setActManager(e.target.value)}
          />
        </div>

        {/* Company Size Selection */}
        <div className={styles.inputField}>
          <Image src="/company.svg" width={iconSize} height={iconSize} alt="Company Size" />
          <select onChange={(e) => setCompanySize(e.target.value)}>
            <option>Company size</option>
            <option value="0-15">0-15</option>
            <option value="16-50">16-50</option>
            <option value="51-100">51-100</option>
          </select>
        </div>

        {/* Country Selection */}
        <div className={styles.inputField}>
          <Image src="/earth.svg" width={iconSize} height={iconSize} alt="Earth" />
          <select onChange={(e) => setCountry(e.target.value)}>
            <option>Select country</option>
            {countryList.map((country, index) => (
              <option key={index} value={country}> {country} </option>
            ))}
          </select>
        </div>

        {/* City Selection */}
        <div className={styles.inputField}>
          <Image src="/aim.svg" width={iconSize} height={iconSize} alt="Aim" />
          <select
            disabled={!country}
            onChange={(e) => setCity(e.target.value)}
          >
            <option>Select city</option>
            {country && getCities(country)?.map((city, index) => (
              <option key={index} value={city}>{city}</option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};

export default ClientInfo;