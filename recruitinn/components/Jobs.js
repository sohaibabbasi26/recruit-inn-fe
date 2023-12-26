import styles from './Jobs.module.css';
import Image from 'next/image';

const Jobs = ({ data }) => {


    const iconSize = 25;
    const goToAllIconSize = 15;
    const statusSize = 10;

    return (
        <>
            <div className={styles.superContainer}>
                <div className={styles.headingContainer}>
                    <div className={styles.heading} >
                        <h3>Posted Jobs</h3>
                        <span>1000</span>
                    </div>

                    <Image src="/goAll.svg" width={goToAllIconSize} height={goToAllIconSize} />
                </div>

                <div className={styles.jobsContainer}>
                    {data.map((item) => {
                        return (
                            <div className={styles.jobsCard} >
                                <div className={styles.topContainer}>
                                    <h3>{item.designation}</h3>

                                    <div className={styles.rightTopBtns}>
                                        <span>{item.noOfAppliedCand}+ Applied</span>
                                        <Image src="/rightArrow.svg" height={iconSize} width={iconSize} />
                                    </div>
                                </div>
                                <div className={styles.TechStack}>
                                    <ul  >
                                        {item.techStack.map((skill) => {
                                            return (
                                                <li><Image id={styles.unique} src={skill.img} width={iconSize} height={iconSize} />{skill.skill}</li>
                                            )
                                        })}
                                    </ul>
                                </div>
                                <div className={styles.lowerContainer}>
                                    <h4 className={styles.location}>{item.location}</h4>
                                    <h4 className={styles.status}>{item.status}<Image src="/activeStatus.svg" width={statusSize} height={statusSize} /></h4>
                                </div>
                            </div>
                        )
                    })}

                </div>
            </div>
        </>
    )
}

export default Jobs;