import styles from './CandidateReports.module.css';
import Image from 'next/image';

const CandidateReports = () => {

    const iconSize = 25;
    const goToAllIconSize = 15;
    const statusSize = 10;

    return (
        <>
            <div className={styles.superContainer}>
                <div className={styles.headingContainer}>
                    <div className={styles.heading} >
                        <h3>Candidate Reports</h3>
                        <span>1000</span>
                    </div>

                    <Image src="/goAll.svg" width={goToAllIconSize} height={goToAllIconSize} />
                </div>  

                <div className={styles.reportsCardContainer}>


                    <div className={styles.reportsCard} >

                        {/*top container */}
                        <div className={styles.topContainer}>
                            <div className={styles.leftTop}>
                                <Image src='/Emoji.svg' width={iconSize} height={iconSize} />
                                <div className={styles.basicInfo}>
                                    <h4>Jacob Jones</h4>
                                    <span>Front-End     Developer</span>
                                </div>
                            </div>
                            <div className={styles.rightTop}>
                                <span>9/10</span>
                                <Image />
                            </div>
                        </div>

                        {/* techstack Conatiner */}

                        <div className={styles.techStack}>
                            <ul>
                                <li>
                                    <div className={styles.basic}>
                                        <Image className={styles.django} src='/Django.svg' width={iconSize} height={iconSize} />
                                        <span>Django</span>
                                    </div>
                                    <p>3+ Years</p>
                                </li>
                                <li>
                                    <div className={styles.basic}>
                                        <Image className={styles.django} src='/Django.svg' width={iconSize} height={iconSize} />
                                        <span>Django</span>
                                    </div>
                                    <p>3+ Years</p>
                                </li>
                                <li>
                                    <div className={styles.basic}>
                                        <Image className={styles.django} src='/Django.svg' width={iconSize} height={iconSize} />
                                        <span>Django</span>
                                    </div>
                                    <p>3+ Years</p>
                                </li>
                                <li>
                                    <div className={styles.basic}>
                                        <Image className={styles.django} src='/Django.svg' width={iconSize} height={iconSize} />
                                        <span>Django</span>
                                    </div>
                                    <p>3+ Years</p>
                                </li>
                            </ul>
                        </div>

                    </div>


                    <div className={styles.reportsCard} >

                        {/*top container */}
                        <div className={styles.topContainer}>
                            <div className={styles.leftTop}>
                                <Image src='/Emoji.svg' width={iconSize} height={iconSize} />
                                <div className={styles.basicInfo}>
                                    <h4>Jacob Jones</h4>
                                    <span>Front-End     Developer</span>
                                </div>
                            </div>
                            <div className={styles.rightTop}>
                                <span>9/10</span>
                                <Image />
                            </div>
                        </div>

                        {/* techstack Conatiner */}

                        <div className={styles.techStack}>
                            <ul>
                                <li>
                                    <div className={styles.basic}>
                                        <Image className={styles.django} src='/Django.svg' width={iconSize} height={iconSize} />
                                        <span>Django</span>
                                    </div>
                                    <p>3+ Years</p>
                                </li>
                                <li>
                                    <div className={styles.basic}>
                                        <Image className={styles.django} src='/Django.svg' width={iconSize} height={iconSize} />
                                        <span>Django</span>
                                    </div>
                                    <p>3+ Years</p>
                                </li>
                                <li>
                                    <div className={styles.basic}>
                                        <Image className={styles.django} src='/Django.svg' width={iconSize} height={iconSize} />
                                        <span>Django</span>
                                    </div>
                                    <p>3+ Years</p>
                                </li>
                                <li>
                                    <div className={styles.basic}>
                                        <Image className={styles.django} src='/Django.svg' width={iconSize} height={iconSize} />
                                        <span>Django</span>
                                    </div>
                                    <p>3+ Years</p>
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>

            </div>
        </>
    )
}

export default CandidateReports;