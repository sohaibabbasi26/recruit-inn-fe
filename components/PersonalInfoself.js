import { countryList } from '@/util/cities';
import { getCities } from '@/util/helpers';
import Image from 'next/image';
import { forwardRef } from 'react';
import PhoneInput from 'react-phone-number-input';
import styles from './PersonalInfo.module.css';


const PersonalInfoSelf = forwardRef(({
    setCity,
    setCountry,
    setContact,
    setEmail,
    setExpertise,
    setName,
    setPassword,
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
    password
}) => {
    const handleInputChange = (e, ref) => {
        ref.current.value = e.target.value;
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
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        {validationErrors?.name && <div className={styles.errorMessage}>{validationErrors?.name}</div>}
                    </div>

                    <div>
                    <div className={styles.infoField}>
                        <Image src="/email.svg" alt="Email" width={20} height={20} />
                        <input
                            placeholder="Enter your email"
                            type="email"
                            value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        {validationErrors?.email && <div className={styles.errorMessage}>{validationErrors?.email}</div>}
                    </div>

                    <div>
                    <div className={styles.infoField}>
                        <Image src="/phone.svg" alt="Phone" width={20} height={20} />
                        <PhoneInput className={styles.phoneInput}
                            international
                            defaultCountry="PK"
                            value={contact}
                            onChange={setContact}
                            />
                        </div>
                        {validationErrors?.contact && <div className={styles.errorMessage}>{validationErrors?.contact}</div>}
                    </div>

                    <div>
                        <div className={styles.infoField}>

                          <Image src="/password.svg" alt="City" width={20} height={20} />
                            <input placeholder='Enter your Password' value={password} type='password'
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        {validationErrors?.password && <div className={styles.errorMessage}>{validationErrors?.password}</div>}
                    </div>
                

                    <div className={styles.infoField}>
                        <Image src="/Case.svg" alt="Expertise" width={20} height={20} />
                    <select
                        placeholder="Choose level of difficulty"
                        value={expertise}
                        onChange= {(e)=> setExpertise(e.target.value)}
                        >
                       <option value="" enable>Select Your Expertise</option>
                        <option value="beginner">Beginnner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="expert">Expert</option>
                        </select>
                        {validationErrors?.expertise && <div className={styles.errorMessage}>{validationErrors.expertise}</div>}
                    </div>

                    <div>
                    <div className={styles.infoField}>
                    <Image src="/earth.svg" alt="Country" width={20} height={20} />
                        <select onChange={(e) => setCountry(e.target.value)}>
                            <option>Select country</option>
                            {countryList.map((country) => (
                            <option value={country}> {country} </option>
                            ))}
                        </select>
                    </div>
                        {validationErrors?.country && <div className={styles.errorMessage}>{validationErrors?.country}</div>}
                    </div>
                    <div className={styles.infoField}>
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

                        {validationErrors?.city && <div className={styles.errorMessage}>{validationErrors?.city}</div>}
                    </div>

                </div>
            </div>
        </>
    )
})
export default PersonalInfoSelf;