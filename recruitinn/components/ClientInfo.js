import styles from './ClientInfo.module.css';
import Image from 'next/image';

const ClientInfo = () => {

    const iconSize = 25;

    return (
        <>
            <div className={styles.superContainer}>
                <div className={styles.inputField} >
                    <Image src='/smiley.svg' width={iconSize} height={iconSize} />
                    <input placeholder='Client Name' />
                </div>
                <div className={styles.inputField} >
                    <Image src='/company.svg' width={iconSize} height={iconSize} />
                    <input placeholder='Company Name' />
                </div>
                <div className={styles.inputField} >
                    <Image src='/email.svg' width={iconSize} height={iconSize} />
                    <input placeholder='Business Email' />
                </div>
                <div className={styles.inputField} >
                    <Image src='/phone.svg' width={iconSize} height={iconSize} />
                    <input placeholder='Client’s phone number' />
                </div>
                <div className={styles.inputField} >
                    <Image src='/case.svg' width={iconSize} height={iconSize} />
                    <input placeholder='Account manager' />
                </div>
                <div className={styles.inputField} >
                    <Image src='/company.svg' width={iconSize} height={iconSize} />
                    <select>
                        <option>Company size</option>
                        <option>100-50</option>
                        <option>25-50</option>
                        <option>0-15</option>
                    </select>
                </div>
                <div className={styles.inputField} >
                    <Image src='/earth.svg' width={iconSize} height={iconSize} />
                    <select>
                        <option>Select country</option>
                        <option>Pakistan</option>
                        <option>India</option>
                    </select>
                </div>
                <div className={styles.inputField} >
                    <Image src='/aim.svg' width={iconSize} height={iconSize} />
                    <select>
                        <option>Select city</option>
                        <option>Karachi</option>
                        <option>Lahore</option>
                    </select>
                </div>
            </div>
        </>
    )
}

export default ClientInfo;