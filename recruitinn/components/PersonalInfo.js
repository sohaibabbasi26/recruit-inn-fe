import styles from './PersonalInfo.module.css';
import Image from 'next/image';


const PersonalInfo = ({
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
    validationErrors
}) => {

    console.log("validation errors:", validationErrors);

    return (
        <>
            <div className={styles.superContainer}>

                {/* <div className={styles.errorsHub}>
                    {validationErrors?.error && (Object.keys(validationErrors)?.map((errorKey, index) => (
                        <div className={styles.errorsContainer}>
                            <div key={index} className="error-message">
                                {validationErrors.error}
                            </div>
                        </div>
                    )))}
                </div> */}

                <div className={styles.masterContainer}>
                    <div className={styles.infoField}>
                        <Image />
                        <input placeholder='Enter your name' ref={nameRef} />
                    </div>
                    <div className={styles.infoField}>
                        <Image />
                        <input placeholder='Enter your email' ref={emailRef} />
                    </div>
                    <div className={styles.infoField}>
                        <Image />
                        <input placeholder='Enter your number' ref={contactRef} />
                    </div>
                    <div className={styles.infoField}>
                        <Image />
                        <select ref={expertiseRef} >
                            <option value='Expert' >Expert</option>
                            <option value='Intermediate' >Intermediate</option>
                            <option value='Beginner' >Beginner</option>
                        </select>
                    </div>
                    <div className={styles.infoField}>
                        <Image />
                        <select ref={countryRef} >
                            <option>Select your country</option>
                            <option value='Pakistan'>Pakistan</option>
                        </select>
                    </div>
                    <div className={styles.infoField}>
                        <Image />
                        <select ref={cityRef} >
                            <option>Select your city</option>
                            <option value='Karachi'>Karachi</option>
                        </select>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PersonalInfo;