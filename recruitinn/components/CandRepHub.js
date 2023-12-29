import styles from './CandRepHub.module.css';
import Image from 'next/image';

const CandRepHub = ({ data ,setSelectedCandidate ,setReportOverlay}) => {

    const cardClickHandler = (candidate) => {
        setSelectedCandidate(candidate);
        setReportOverlay(true);
    }

    const iconSize = 25;
    const goToAllIconSize = 18;
    const statusSize = 10;

    const getBackgroundColor = (score) => {
        if(score >= 7 && score <= 10){
            return '#E7FFE0';
        } else if (score >= 5 && score <= 6){
            return '#F0F3FF';
        } else {
            return '#FFE6E6';
        }
    }

    const getFilter = (score) => {
        if(score >= 7 && score <= 10){
            return 'Recommended';
        } else if (score >= 5 && score <= 6){
            return 'Qualified';
        } else {
            return 'Not Eligible';
        }
    }
    const getStatusSymbol = (score) => {
        if(score >= 7 && score <= 10){
            return '/activeStatus.svg';
        } else if (score >= 5 && score <= 6){
            return '/qualified.svg';
        } else {
            return '/noteligible.svg';
        }
    }

    return (
        <>
            <div className={styles.parentContainer}>
                <div className={styles.superContainer}>
                    <div className={styles.headingContainer}>
                        <div className={styles.heading}>
                            <h3>All Candidates</h3>
                            <span>1000</span>
                        </div>

                        <select>
                            <option value='hybrid'>Hybrid</option>
                            <option value='onsite'>On-site</option>
                            <option value='remote'>Remote</option>
                        </select>
                    </div>

                    <div className={styles.subContainer}>
                        {data.map((item) => {
                            return (
                                <>
                                    <div onClick={() => {cardClickHandler(item)}} className={styles.reportsCard} >
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
                                                <span style={{backgroundColor : getBackgroundColor(item.score)}}>{item.score}/10</span>
                                                <span style={{backgroundColor: getBackgroundColor(item.score)}}>{getFilter(item.score)}<Image src={getStatusSymbol(item.score)} width={statusSize} height={statusSize} /> </span>
                                                <Image src="/rightArrow.svg" height={iconSize} width={iconSize} />                                            </div>
                                        </div>

                                        {/* techstack Conatiner */}
                                        <div className={styles.techStack}>
                                            <ul>
                                                {item?.techStack?.map((tech) => {
                                                    return (
                                                        <>
                                                            <li>
                                                                <div className={styles.basic}>
                                                                    <Image className={styles.django} src={tech.img} width={iconSize} height={iconSize} />
                                                                    <span>{tech.skill}</span>
                                                                </div>
                                                                {/* <p>{tech.experience}+ Years</p> */}
                                                            </li>
                                                        </>
                                                    )
                                                })}
                                            </ul>
                                        </div>

                                        <div className={styles.lowerContainer}>
                                            <p><span>Applied:</span>{item.appliedThrough}</p>
                                            <p><span>Experience:</span>{item.overAllExperience}</p>
                                        </div>
                                    </div>
                                </>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default CandRepHub;