import styles from './JobInfoFields.module.css';
import Image from 'next/image';


const JobInfoFields = ({setPosition,setLocation,setJobtype}) => {

    const iconSize = 20;

    return (
        <>
            <div className={styles.fieldsContainer}>
                <div className={styles.conatiner} >
                    <Image src='/suitcase.svg' width={iconSize} height={iconSize} />
                    <input type='text' placeholder='Add Job Title' onChange={(e) => setPosition(e.target.value)} />
                </div>
        
                <div className={styles.conatiner} >
                <Image src='/location.svg' width={iconSize} height={iconSize} />
                <input type='text' placeholder='Anywhere' onChange={(e) => setLocation(e.target.value)} />
                </div>
            </div>

            <div className={styles.wrapper}>
                    <Image src='/suitcase.svg' width={iconSize} height={iconSize} />
                    <select onChange={(e) => setJobtype(e.target.value)} >
                        <option value="On-site">On-site</option>
                        <option value="Remote">Remote</option>
                    </select>
            </div>
        </>
    );
}

export default JobInfoFields