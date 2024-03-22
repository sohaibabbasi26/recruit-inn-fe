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
    nameRef,
    contactRef,
    emailRef,
    expertiseRef,
    countryRef,
    cityRef,
    updateFormData,
    validationErrors,
    showSuccessMessage,
    msgText
}) => {
    const handleInputChange = (e, ref) => {
        ref.current.value = e.target.value;
      };
    return (
        
        <>
            <div className={styles.superContainer}>
                <div className={styles.masterContainer}>
                    <div className={styles.infoField}>
                        <Image />
                        <input placeholder='Enter your name' ref={nameRef} onChange={(e) => handleInputChange(e, nameRef)} />
                    </div>
                    <div className={styles.infoField}>
                        <Image />
                        <input placeholder='Enter your email' ref={emailRef} onChange={(e) => handleInputChange(e, emailRef)} />
                    </div>
                    <div className={styles.infoField}>
                        <Image />
                        <input placeholder='Enter your number' ref={contactRef}  onChange={(e) => handleInputChange(e, contactRef)} />
                    </div>
                    <div className={styles.infoField}>
                        <Image />
                        <select ref={expertiseRef}  onChange={(e) => handleInputChange(e, expertiseRef)} >
                            <option value='Select Your Expertise' selected disabled>Select Your Expertise</option>
                            <option value='Expert'>Expert</option>
                            <option value='Intermediate'>Intermediate</option>
                            <option value='Beginner' >Beginner</option>
                        </select>
                    </div>
                    <div className={styles.infoField} >
                        <Image />
                        <select ref={countryRef} onChange={(e) => handleInputChange(e, countryRef)} >
                            <option>Select your country</option>
                            <option value='Pakistan'>Pakistan</option>
                        </select>
                    </div>
                    <div className={styles.infoField}>
                        <Image />
                        <select ref={cityRef} onChange={(e) => handleInputChange(e, cityRef)} >
                            <option>Select your city</option>
                            <option value='Karachi'>Karachi</option>
                        </select>
                    </div>
                </div>
            </div>
        </>
    )
})
export default PersonalInfo;