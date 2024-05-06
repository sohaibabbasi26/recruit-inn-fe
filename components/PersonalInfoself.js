import { countryList } from "@/util/cities";
import { getCities } from "@/util/helpers";
import Image from "next/image";
import { forwardRef, useState } from "react";
import PhoneInput from "react-phone-number-input";
import styles from "./PersonalInfoself.module.css";
import ShowPassword from "./ShowPassword";

const PersonalInfoSelf = forwardRef(
  ({
    setCity,
    setCountry,
    setContact,
    setEmail,
    setExpertise,
    setName,
    setPassword,
    setConfirmPassword,
    nameRef,
    contactRef,
    emailRef,
    expertiseRef,
    countryRef,
    cityRef,
    updateFormData,
    validationErrors,
    showSuccessMessage,
    msgText,
    name,
    email,
    contact,
    expertise,
    country,
    city,
    password,
    confirmPassword,
  }) => {
    const handleInputChange = (e, ref) => {
      ref.current.value = e.target.value;
    };
    const [isPassword, setIsPassword] = useState(false);
    const [isConfirmPassword, setIsConfirmPassword] = useState(false);

    return (
      <>
        <div className={styles.superContainer}>
          <div className={styles.masterContainer}>
            <div>
              <div
                className={`${styles.infoField} ${name ? styles.filled : null}`}
              >
                <Image src="/smiley.svg" alt="Name" width={20} height={20} />
                <input
                  placeholder="Enter your name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              {validationErrors?.name && (
                <div className={styles.errorMessage}>
                  {validationErrors?.name}
                </div>
              )}
            </div>

            <div>
              <div
                className={`${styles.infoField} ${
                  email ? styles.filled : null
                }`}
              >
                <Image src="/email.svg" alt="Email" width={20} height={20} />
                <input
                  placeholder="Enter your email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {validationErrors?.email && (
                <div className={styles.errorMessage}>
                  {validationErrors?.email}
                </div>
              )}
            </div>

            <div>
              <div
                className={`${styles.infoField} ${
                  password ? styles.filled : null
                }`}
              >
                <Image src="/password.svg" alt="City" width={20} height={20} />
                <input
                  placeholder="Enter your Password"
                  value={password}
                  type={isPassword ? "text" : "password"}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <ShowPassword pass={isPassword} setPass={setIsPassword} />
              </div>
              {validationErrors?.password && (
                <div className={styles.errorMessage}>
                  {validationErrors?.password}
                </div>
              )}
            </div>

            {/* confirm password here */}
            <div>
              <div
                className={`${styles.infoField} ${
                  confirmPassword ? styles.filled : null
                }`}
              >
                <Image src="/password.svg" alt="City" width={20} height={20} />
                <input
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  type={isConfirmPassword ? "text" : "password"}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <ShowPassword
                  pass={isConfirmPassword}
                  setPass={setIsConfirmPassword}
                />
              </div>
              {validationErrors?.confirmPassword && (
                <div className={styles.errorMessage}>
                  {validationErrors?.confirmPassword}
                </div>
              )}
            </div>

            <div>
              <div
                className={`${styles.infoField} ${
                  contact ? styles.filled : null
                }`}
              >
                <Image src="/phone.svg" alt="Phone" width={20} height={20} />
                <PhoneInput
                  className={styles.phoneInput}
                  international
                  defaultCountry="PK"
                  value={contact}
                  onChange={setContact}
                />
              </div>
              {validationErrors?.contact && (
                <div className={styles.errorMessage}>
                  {validationErrors?.contact}
                </div>
              )}
            </div>

            <div
              className={`${styles.infoField} ${
                expertise ? styles.filled : null
              }`}
            >
              <Image src="/Case.svg" alt="Expertise" width={20} height={20} />
              <select
                placeholder="How do you Rate yourself"
                value={expertise}
                onChange={(e) => setExpertise(e.target.value)}
              >
                <option value="" enable>
                  How do you Rate yourself
                </option>
                <option value="beginner">Beginnner</option>
                <option value="intermediate">Intermediate</option>
                <option value="expert">Expert</option>
              </select>
              {validationErrors?.expertise && (
                <div className={styles.errorMessage}>
                  {validationErrors.expertise}
                </div>
              )}
            </div>

            <div>
              <div
                className={`${styles.infoField} ${
                  country ? styles.filled : null
                }`}
              >
                <Image src="/earth.svg" alt="Country" width={20} height={20} />
                <select onChange={(e) => setCountry(e.target.value)}>
                  <option>Select country</option>
                  {countryList.map((country) => (
                    <option value={country}> {country} </option>
                  ))}
                </select>
              </div>
              {validationErrors?.country && (
                <div className={styles.errorMessage}>
                  {validationErrors?.country}
                </div>
              )}
            </div>
            <div
              className={`${styles.infoField} ${city ? styles.filled : null}`}
            >
              <Image src="/aim.svg" alt="City" width={20} height={20} />
              <select
                disabled={country === null}
                onChange={(e) => setCity(e.target.value)}
              >
                <option>Select city</option>
                {getCities(country)?.map((city) => (
                  <option value={city}> {city} </option>
                ))}
              </select>

              {validationErrors?.city && (
                <div className={styles.errorMessage}>
                  {validationErrors?.city}
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
);
export default PersonalInfoSelf;
