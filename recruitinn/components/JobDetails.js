import styles from './JobDetails.module.css';
import Image from 'next/image';

const JobDetails = () => {

    return (
        <>
            <div className={styles.superContainer}>

                {/* info field containers */}
                <div className={styles.infoFieldContainers}>
                    <div className={styles.infoField}>
                        <Image src='/Award.svg' width={30} height={30} />
                        <span>
                            Warren Brothers
                        </span>
                    </div>

                    <div className={styles.infoField}>
                        <Image src='/Award.svg' width={30} height={30} />
                        <span>
                            Front-End Engineer
                        </span>
                    </div>
                </div>

                {/* about company container */}

                <div className={styles.jobDescription}>
                    <h4>About Us:</h4>
                    <span id={styles.gap}>
                        Write about your company
                    </span>


                    <h4>Job Description:</h4>
                    <span>
                        Welcome to HyperTech Solutions Unlimited, where we transcend the boundaries of reality to pioneer groundbreaking solutions in quantum software engineering. As a Quantum Code Wizard, you'll be part of a dynamic team of multidimensional thinkers who harness the power of quarks, warp drives, and a touch of magic to push the boundaries of technology.
                    </span>
                </div>
            </div>
        </>
    )
}

export default JobDetails;