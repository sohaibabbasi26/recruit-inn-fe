import styles from './PersonalInfo.module.css';
import Image from 'next/image';


const PersonalInfo = ({
    setCity,
    setCountry,
    setContact,
    setEmail,
    setExpertise,
    setName
}) => {

    

    return (
        <>
            <div className={styles.superContainer}>
                <div className={styles.masterContainer}>
                    <div className={styles.infoField}>
                        <Image />
                        <input placeholder='Enter your name' onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className={styles.infoField}>
                        <Image />
                        <input placeholder='Enter your email' onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className={styles.infoField}>
                        <Image />
                        <input placeholder='Enter your number' onChange={(e) => setContact(e.target.value)} />
                    </div>
                    <div className={styles.infoField}>
                        <Image />
                        <select onChange={(e) => setExpertise(e.target.value)}>
                            <option value='Expert' >Expert</option>
                            <option value='Intermediate' >Intermediate</option>
                            <option value='Beginner' >Beginner</option>
                        </select>
                    </div>
                    <div className={styles.infoField}>
                        <Image />
                        <select onChange={(e) => setCountry(e.target.value)}>
                            <option>Select your city</option>
                            <option value='Pakistan'>Pakistan</option>
                        </select>
                    </div>
                    <div className={styles.infoField}>
                        <Image />
                        <select onChange={(e) => setCity(e.target.value)}>
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