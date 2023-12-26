import { useState } from 'react';
import styles from './InvitationOverlay.module.css';
import Image from 'next/image';
import Stages from './Stages';
import { useRouter } from 'next/router';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import JobDetails from './JobDetails';
import JobDetailsBtn from './JobDetailsBtn';
import PersonalInfo from './PersonalInfo';
import PersonalInfoBtns from './PersonalInfoBtns';
import RequiredSkills from './RequiredSkills';
import RequiredSkillsBtns from './RequiredSkillsBtns';

const InvitationOverlay = ({ showOverlay, onClose , stages, stageHeadings }) => {

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
    const [currentStage, setCurrentStage] = useState(stages.JOB_DETAIL);
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
                case stages.JOB_DETAIL:
                    setCurrentStage(stages.PERSONAL_INFO);
                    break;
                case stages.PERSONAL_INFO:
                    setCurrentStage(stages.REQUIRED_SKILLS);
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
            case stages.REQUIRED_SKILLS:
                setCurrentStage(stages.PERSONAL_INFO);
                break;
            case stages.PERSONAL_INFO:
                setCurrentStage(stages.JOB_DETAIL);
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

                        {currentStage === stages.JOB_DETAIL && (
                            <>
                            <JobDetails />
                                <div className={styles.wrapper}>
                                    <JobDetailsBtn onContinue={toggleComponent} onBack={backToggleComponent} onClose={onClose} setCompletedStages={setCompletedStages} completedStages={completedStages} />
                                </div>
                            </>
                        )}

                        {currentStage === stages.PERSONAL_INFO && (
                            <>
                                <PersonalInfo />
                                <div className={styles.wrapper}>
                                    <PersonalInfoBtns onContinue={toggleComponent} onBack={backToggleComponent} />
                                </div>
                            </>
                        )}

                        {currentStage === stages.REQUIRED_SKILLS && (
                            <>
                                <RequiredSkills />
                                <div className={styles.wrapper}>
                                    <RequiredSkillsBtns onContinue={toggleComponent} onBack={backToggleComponent} />
                                </div>
                            </>
                        )}

                    </div>
                </div>

            </div>
        </>
    )
}

export default InvitationOverlay;