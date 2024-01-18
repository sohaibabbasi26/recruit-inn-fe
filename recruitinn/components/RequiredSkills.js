import styles from './RequiredSkills.module.css';
import Image from 'next/image';

const RequiredSkills = ({ expertise }) => {

    console.log('expertise in required skills:', expertise);

    return (
        <>
            <div className={styles.superContainer}>

                {expertise?.techStack?.map((item) => {
                    return (
                        <>
                            <div className={styles.listItem}>
                                <div className={styles.techContainer}>
                                    <Image src='/nextjs.svg' width={20} height={20} />
                                    <span>{item?.skill}</span>
                                </div>

                                <span>{item?.level}</span>
                            </div>
                        </>
                    )
                })}



                {/* <div className={styles.listItem}>
                    <div className={styles.techContainer}>
                        <Image src='/nextjs.svg' width={20} height={20} />
                        <span>NextJS</span>
                    </div>

                    <span>Intermediate</span>
                </div>

                <div className={styles.listItem}>
                    <div className={styles.techContainer}>
                        <Image src='/nextjs.svg' width={20} height={20} />
                        <span>NextJS</span>
                    </div>

                    <span>Intermediate</span>
                </div>

                <div className={styles.listItem}>
                    <div className={styles.techContainer}>
                        <Image src='/nextjs.svg' width={20} height={20} />
                        <span>NextJS</span>
                    </div>

                    <span>Intermediate</span>
                </div> */}

            </div>
        </>
    )
}

export default RequiredSkills;