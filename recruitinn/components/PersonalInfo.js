import styles from './PersonalInfo.module.css';
import Image from 'next/image';


const PersonalInfo = () => {

    return (
        <>
            <div className={styles.superContainer}>
                <div className={styles.masterContainer}>
                    <div className={styles.infoField}>
                        <Image />
                        <input placeholder='Enter your name' />
                    </div>
                    <div className={styles.infoField}>
                        <Image />
                        <input placeholder='Enter your email'  />
                    </div>
                    <div className={styles.infoField}>
                        <Image />
                        <input placeholder='Enter your number' />
                    </div>
                    <div className={styles.infoField}>
                        <Image />
                        <select>
                            <option value='Expert' >Expert</option>
                            <option value='Intermediate' >Intermediate</option>
                            <option value='Beginner' >Beginner</option>
                        </select>
                    </div>
                    <div className={styles.infoField}>
                        <Image />
                        <select>
                            <option>Select your city</option>
                            <option value='Pakistan'>Pakistan</option>
                        </select>
                    </div>
                    <div className={styles.infoField}>
                        <Image />
                        <select>
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