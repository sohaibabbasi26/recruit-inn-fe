// import { forwardRef, useState, useContext } from 'react';
// import styles from './PersonalInfo.module.css';
// import Image from 'next/image';
// import PhoneInput from 'react-phone-number-input';
import { countryList } from "@/util/cities";
import { getCities } from "@/util/helpers";

// const PersonalInfo = forwardRef(({
//     setCity,
//     setCountry,
//     setContact,
//     setEmail,
//     setExpertise,
//     setName,
//     nameRef,
//     contactRef,
//     emailRef,
//     expertiseRef,
//     countryRef,
//     cityRef,
//     validationErrors,
//     showSuccessMessage,
//     msgText,
//     name,
//     email,
//     contact,
//     expertise,
//     country,
//     city,
// }, ref) => {
//     // const [phoneNumber, setPhoneNumber] = useState(contact || '');

//     // // Handling the form input changes
//     const handleInputChange = (setter) => (event) => {
//         setter(event.target.value);
//     };

//     return (
//         <>
//             <div className={styles.superContainer}>
//                 <div className={styles.masterContainer}>
//                     <div className={styles.infoField}>
//                         <Image src="/smiley.svg" alt="Name" width={20} height={20} />
//                         <input
//                             placeholder="Enter your name"
//                             type="text"
//                             value={name}
//                             onChange={handleInputChange(setName)}
//                         />
//                         {validationErrors?.name && <div className={styles.errorMessage}>{validationErrors.name}</div>}
//                     </div>

//                     <div className={styles.infoField}>
//                         <Image src="/email.svg" alt="Email" width={20} height={20} />
//                         <input
//                             placeholder="Enter your email"
//                             type="email"
//                             value={email}
//                             onChange={handleInputChange(setEmail)}
//                         />
//                         {validationErrors?.email && <div className={styles.errorMessage}>{validationErrors.email}</div>}
//                     </div>

//             <div>
//               <div className={styles.infoField}>
//                 {/* <Image src="/earth.svg" width={20} height={20} /> */}
//                 <select onChange={(e) => setCountry(e.target.value)}>
//                   <option>Select country</option>
//                   {countryList.map((country) => (
//                     <option value={country}> {country} </option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//             <div>
//               <div className={styles.infoField}>
//                 {/* <Image src="/aim.svg" width={20} height={20} /> */}
//                 <select
//                   disabled={country === null}
//                   onChange={(e) => setCity(e.target.value)}
//                 >
//                   <option>Select city</option>
//                   {getCities(country)?.map((city) => (
//                     <option value={city}> {city} </option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//             {/*
//             <div>
//               <div className={styles.infoField}>
//                 <Image />
//                 <select
//                   value={country}
//                   onChange={(e) => setCountry(e.target.value)}
//                 >
//                   <option>Select your country</option>
//                   <option value="Pakistan">Pakistan</option>
//                 </select>
//               </div>
//               {validationErrors?.country && (
//                 <div className={styles.errorMessage}>
//                   {validationErrors?.country}
//                 </div>
//               )}
//             </div>

//                     <div className={styles.infoField}>
//                         <Image src="/Case.svg" alt="Expertise" width={20} height={20} />
//                         <select
//                             value={expertise}
//                             onChange={handleInputChange(setExpertise)}
//                         >
//                             <option value="" disabled>Select Your Expertise</option>
//                             <option value="Beginner">Beginner</option>
//                             <option value="Intermediate">Intermediate</option>
//                             <option value="Expert">Expert</option>
//                         </select>
//                         {validationErrors?.expertise && <div className={styles.errorMessage}>{validationErrors.expertise}</div>}
//                     </div>

//                     <div className={styles.infoField}>
//                         <Image src="/earth.svg" alt="Country" width={20} height={20} />
//                         <select
//                             value={country}
//                             onChange={handleInputChange(setCountry)}
//                         >
//                             <option value="">Select your country</option>
//                             <option value="PK">Pakistan</option>
//                         </select>
//                         {validationErrors?.country && <div className={styles.errorMessage}>{validationErrors.country}</div>}
//                     </div>

//                     <div className={styles.infoField}>
//                         <Image src="/aim.svg" alt="City" width={20} height={20} />
//                         <select
//                             value={city}
//                             onChange={handleInputChange(setCity)}
//                         >
//                             <option value="">Select your city</option>
//                             <option value="Karachi">Karachi</option>
//                         </select>
//                         {validationErrors?.city && <div className={styles.errorMessage}>{validationErrors.city}</div>}
//                     </div>
//                 </div>
//               )}
//             </div> */}
//           </div>
//         </div>
//       </>
//     );
// });

// export default PersonalInfo;

import { forwardRef, useState, useContext } from "react";
import styles from "./PersonalInfo.module.css";
import Image from "next/image";
import PhoneInput from "react-phone-number-input";
const PersonalInfo = forwardRef(
  (
    {
      setCity,
      setCountry,
      setContact,
      setEmail,
      setExpertise,
      setName,
      nameRef,
      contactRef,
      emailRef,
      expertiseRef,
      countryRef,
      cityRef,
      validationErrors,
      showSuccessMessage,
      msgText,
      name,
      email,
      contact,
      expertise,
      country,
      city,
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
              <div className={styles.infoField}>
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
              <div className={styles.infoField}>
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
              <div className={styles.infoField}>
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
              <div className={styles.infoField}>
                <Image src="/Case.svg" alt="Expertise" width={20} height={20} />
                <select
                  value={expertise}
                  onChange={handleInputChange(setExpertise)}
                >
                  <option value="" disabled>
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
              <div className={styles.infoField}>
                <Image src="/earth.svg" width={20} height={20} />
                <select onChange={(e) => setCountry(e.target.value)}>
                  <option disabled={true}>Select country</option>
                  {countryList.map((country) => (
                    <option value={country}> {country} </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <div className={styles.infoField}>
                <Image src="/aim.svg" width={20} height={20} />
                <select
                  disabled={country === null}
                  onChange={(e) => setCity(e.target.value)}
                >
                  <option disabled={true}>Select city</option>
                  {getCities(country)?.map((city) => (
                    <option value={city}> {city} </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
);
export default PersonalInfo;
