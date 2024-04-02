import { forwardRef } from 'react';
import styles from './PersonalInfo.module.css';
import Image from 'next/image';
import NameContext from '@/contexts/NameContext';
import { useContext } from 'react';
import { useState } from 'react';

const PersonalInfo = forwardRef(({
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
                            <Image />
                            <input placeholder='Enter your name' type='text' value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        {validationErrors?.name && <div className={styles.errorMessage}>{validationErrors?.name}</div>}
                    </div>

                    <div>
                        <div className={styles.infoField}>
                            <Image />
                            <input placeholder='Enter your email' value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        {validationErrors?.email && <div className={styles.errorMessage}>{validationErrors?.email}</div>}
                    </div>
                    <div>
                        <div className={styles.infoField}>
                            <Image />
                            <input placeholder='Enter your number' type='number' value={contact}
                                onChange={(e) => setContact(e.target.value)}
                            />
                        </div>
                        {validationErrors?.contact && <div className={styles.errorMessage}>{validationErrors?.contact}</div>}
                    </div>
                    <div>
                        <div className={styles.infoField}>
                            <Image />
                            <select value={expertise}
                                onChange={(e) => setExpertise(e.target.value)}
                            >
                                <option value='Select Your Expertise' selected disabled>Select Your Expertise</option>
                                <option value='Expert'>Expert</option>
                                <option value='Intermediate'>Intermediate</option>
                                <option value='Beginner' >Beginner</option>
                            </select>
                        </div>
                        {validationErrors?.expertise && <div className={styles.errorMessage}>{validationErrors?.expertise}</div>}
                    </div>

                    <div>
                        <div className={styles.infoField}>
                            <Image />
                            <select value={country}
                                onChange={(e) => setCountry(e.target.value)}
                            >
                                <option>Select your country</option>
                                <option value='Pakistan'>Pakistan</option>
                            </select>
                        </div>
                        {validationErrors?.country && <div className={styles.errorMessage}>{validationErrors?.country}</div>}
                    </div>

                    <div>
                        <div className={styles.infoField}>
                            <Image />
                            <select value={city}
                                onChange={(e) => setCity(e.target.value)}
                            >
                                <option>Select your city</option>
                                <option value='Karachi'>Karachi</option>
                            </select>
                        </div>
                        {validationErrors?.city && <div className={styles.errorMessage}>{validationErrors?.city}</div>}
                    </div>

                </div>
            </div>
        </>
    )
})
export default PersonalInfo;