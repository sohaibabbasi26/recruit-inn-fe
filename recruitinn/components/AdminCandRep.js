import styles from './AdminCandRep.module.css';
import Image from 'next/image';

const AdminCandRep = () => {
    const iconSize = 25;
    const goToAllIconSize = 15;
    const statusSize = 10;

    const data = [
        {
            name: 'Jacob Jones',
            position: 'Front-End Developer',
            score: 9,
            techstack: [
                {
                    skill: 'Django',
                    src: '/django.svg',
                    experience: 3
                },
                {
                    skill: 'Django',
                    src: '/django.svg',
                    experience: 3
                },
                {
                    skill: 'Django',
                    src: '/django.svg',
                    experience: 3
                },
                {
                    skill: 'Django',
                    src: '/django.svg',
                    experience: 3
                }
            ],
            appliedThrough: 'Self',
            overAllExperience: 'Senior'
        },
        {
            name: 'Jacob Jones',
            position: 'Front-End Developer',
            score: 9,
            techstack: [
                {
                    skill: 'Django',
                    src: '/django.svg',
                    experience: 3
                },
                {
                    skill: 'Django',
                    src: '/django.svg',
                    experience: 3
                },
                {
                    skill: 'Django',
                    src: '/django.svg',
                    experience: 3
                },
                {
                    skill: 'Django',
                    src: '/django.svg',
                    experience: 3
                }
            ],
            appliedThrough: 'Self',
            overAllExperience: 'Senior'
        }
    ]

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
                    {
                        data.map((item) => {
                            return (
                                <>
                                    <div className={styles.reportsCard} >
                                        {/*top container */}
                                        <div className={styles.topContainer}>
                                            <div className={styles.leftTop}>
                                                <Image src='/Emoji.svg' width={iconSize} height={iconSize} />
                                                <div className={styles.basicInfo}>
                                                    <h4>{item.name}</h4>
                                                    <span>{item.position}</span>
                                                </div>
                                            </div>
                                            <div className={styles.rightTop}>
                                                <span>{item.score}/10</span>
                                                <Image />
                                            </div>
                                        </div>

                                        {/* techstack Conatiner */}
                                        <div className={styles.techStack}>
                                            <ul>
                                                {
                                                    item.techstack.map((tech) => {
                                                        return (
                                                            <>
                                                                <li>
                                                                    <div className={styles.basic}>
                                                                        <Image className={styles.django} src={tech.src} width={iconSize} height={iconSize} />
                                                                        <span>{tech.skill}</span>
                                                                    </div>
                                                                    <p>{tech.experience}+ Years</p>
                                                                </li>
                                                            </>
                                                        )})
                                                }
                                            </ul>
                                        </div>

                                        <div className={styles.lowerContainer}>
                                            <p><span>Applied:</span>{item.appliedThrough}</p>
                                            <p><span>Experience:</span>{item.overAllExperience}</p>
                                        </div>

                                    </div>
                                </>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default AdminCandRep;