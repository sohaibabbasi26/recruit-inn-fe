import { useState } from 'react';
import styles from './InvitationOverlay.module.css';
import Image from 'next/image';
import Stages from './Stages';
import { useRouter } from 'next/router';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import PersonalInfo from './PersonalInfo';
import PersonalInfoBtns from './PersonalInfoBtns';
import CandidateVerify from './CandidateVerify';
import CandidateVerifyBtns from './CandVerifyBtns';
import CandSelfSkill from './CandSelfSkill';
import CandSelfSkillBtns from './CandSelfSkillBtn';
import CandSelfAssessment from './CandSelfAssessment';
import CandSelfAssessmentBtns from './CandSelfAssessmentBtns';

const SelfOverlay = ({ showOverlay, onClose, stages, stageHeadings }) => {

    const overlayRef = useRef(null);

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        if (showOverlay) {
            gsap.to(overlayRef.current, {
                y: '0%',
                opacity: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        }
        else {
            gsap.to(overlayRef.current, {
                y: '100%',
                opacity: 0,
                duration: 0.3,
                ease: 'power2.in',
                onComplete: onClose
            });
        }

        return (() => {
            gsap.to(overlayRef.current,
                { y: '100%', opacity: 0, duration: 0.1, ease: 'power1' }
            );
        });
    }, [showOverlay, onClose])

    const router = useRouter();
    const infoSymbolSize = 20;
    const [currentStage, setCurrentStage] = useState(stages.PERSONAL_INFO);
    const [completedStages, setCompletedStages] = useState([]);

    const toggleComponent = () => {
        console.log("Current Stage: ", currentStage);
        console.log("Is Share Link Stage? ", currentStage === stages.SHARE_LINK);

        const newCompletedStages = [...completedStages, currentStage];
        setCompletedStages(newCompletedStages);

        if (currentStage === stages.SHARE_LINK) {
            router.push('/');
        } else {
            switch (currentStage) {
                case stages.PERSONAL_INFO:
                    setCurrentStage(stages.VERIFICATION);
                    break;
                case stages.VERIFICATION:
                    setCurrentStage(stages.SKILLS);
                    break;
                case stages.SKILLS:
                    setCurrentStage(stages.ASSESSMENT);
                    break;
                default:
                    setCurrentStage(stages.JOB_DETAIL);
            }
        }
    }

    const backToggleComponent = () => {

        const stageToBePopped = completedStages.slice(0, -1);
        setCompletedStages(stageToBePopped);
        switch (currentStage) {
            case stages.VERIFICATION:
                setCurrentStage(stages.PERSONAL_INFO);
                break;
            case stages.SKILLS:
                setCurrentStage(stages.VERIFICATION);
                break;
            default:
                setCurrentStage(stages.JOB_DETAIL)
        }
    }

    return (
        <>

            <div ref={overlayRef} className={styles.parent}>

                <div className={styles.btn}>
                    <button onClick={onClose}></button>
                </div>


                <div className={styles.superContainer}>
                    <div className={styles.coverContainer}>
                        <div className={styles.topContainer}>
                            <h2>{stageHeadings[currentStage]}</h2>
                            <span>
                                <p className={styles.tooltip}>You can add maximum of 4 skills and minimum of 1</p>
                                <Image src='/info.svg' width={infoSymbolSize} height={infoSymbolSize} />
                            </span>
                        </div>

                        <Stages currentStage={currentStage} stages={stages} completedStages={completedStages} />


                        {currentStage === stages.PERSONAL_INFO && (
                            <>
                                <PersonalInfo />
                                <div className={styles.wrapper}>
                                    <PersonalInfoBtns onContinue={toggleComponent} onBack={backToggleComponent} />
                                </div>
                            </>
                        )}

                        {currentStage === stages.VERIFICATION && (
                            <>
                                <CandidateVerify /> 
                                {/* <RequiredSkills /> */}
                                <div className={styles.wrapper}>
                                    <CandidateVerifyBtns onContinue={toggleComponent} onBack={backToggleComponent} />
                                </div>
                            </>
                        )}

                        {currentStage === stages.SKILLS && (
                            <>
                            <CandSelfSkill />
                                <div className={styles.wrapper}>
                                    <CandSelfSkillBtns onContinue={toggleComponent} onBack={backToggleComponent} />
                                </div> 
                            </>
                        )}

                        {currentStage === stages.ASSESSMENT && (
                            <>
                                <CandSelfAssessment />  
                                <div className={styles.wrapper}>
                                    <CandSelfAssessmentBtns onContinue={toggleComponent} onBack={backToggleComponent} />
                                </div> 
                            </>
                        )}

                    </div>
                </div>

            </div>
        </>
    )
}

export default SelfOverlay;