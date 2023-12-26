import styles from './CandidatesHub.module.css';
import TopNavbar from './TopNavbar';
import Image from 'next/image';
import { useState } from 'react';

const CandidatesHub = ({ data ,reportOverlay , setReportOverlay , setSelectedCandidate}) => {

    const [recommended,setRecommended] = useState('Recommended');
    

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

    const cardClickHandler = (candidate) => {
        setSelectedCandidate(candidate);
        setReportOverlay(true);
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
                                                <span style={{backgroundColor: getBackgroundColor(item.score)}}>{item.score}/10</span>
                                                <span style={{backgroundColor: getBackgroundColor(item.score)}}>{getFilter(item.score)}<Image src={getStatusSymbol(item.score)} width={statusSize} height={statusSize} /> </span>
                                                <Image src="/rightArrow.svg" height={iconSize} width={iconSize} />
                                            </div>
                                        </div>
                                        {/* techstack Conatiner */}

                                        <div className={styles.TechStack}>
                                            <ul>
                                                {item.techStack.map((skill) => {
                                                    return (
                                                        <>
                                                            <li>
                                                                <div className={styles.basic}>
                                                                    <Image className={styles.django} src={skill.img} width={iconSize} height={iconSize} />
                                                                    <span>{skill.skill}</span>
                                                                </div>
                                                            </li>
                                                        </>
                                                    )
                                                })}
                                            </ul>
                                        </div>

                                        <div className={styles.lowerContainer}>
                                            <h4 className={styles.jobType}><Image src='/JOB_TYPE-active.svg' width={goToAllIconSize} height={goToAllIconSize} /> {item.jobType}</h4>
                                            <span ><h4>Experience:</h4>  {item.overAllExperience}</span>
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

export default CandidatesHub;