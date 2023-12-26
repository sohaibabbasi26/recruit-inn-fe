import { useState } from 'react';
import styles from './Overlay.module.css';
import Image from 'next/image';
import Stages from './Stages';
import AddSkillForm from './AddSkillForm';
import RightBottomBtns from './RightBottomBtns';
import JobType from './JobType';
import JobTypeBtns from './JobTypeBtns';
import AIassessment from './AIassesment';
import AssessmentBtns from './AssessmentBtns';
import ShareLink from './ShareLink';
import { useRouter } from 'next/router';
import ShareLinkBtns from './ShareLinkBtns';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';

const Overlay = ({ showOverlay, onClose , stages, stageHeadings }) => {

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
    const [currentStage, setCurrentStage] = useState(stages.ADD_SKILL);
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
                case stages.ADD_SKILL:
                    setCurrentStage(stages.JOB_TYPE);
                    break;
                case stages.JOB_TYPE:
                    setCurrentStage(stages.AI_ASSESSMENT);
                    break;
                case stages.AI_ASSESSMENT:
                    setCurrentStage(stages.SHARE_LINK);
                    break;
                default:
                    setCurrentStage(stages.ADD_SKILL);
            }
        }
    }

    const backToggleComponent = () => {

        const stageToBePopped = completedStages.slice(0, -1);
        setCompletedStages(stageToBePopped);
        switch (currentStage) {
            case stages.JOB_TYPE:
                setCurrentStage(stages.ADD_SKILL);
                break;
            case stages.AI_ASSESSMENT:
                setCurrentStage(stages.JOB_TYPE);
                break;
            case stages.SHARE_LINK:
                setCurrentStage(stages.AI_ASSESSMENT);
                break;
            default:
                setCurrentStage(stages.ADD_SKILL);
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
                                {/* <button onClick={onClose}></button> */}
                            </span>
                        </div>

                        <Stages currentStage={currentStage} stages={stages} completedStages={completedStages} />

                        {currentStage === stages.ADD_SKILL && (
                            <>
                                <AddSkillForm />
                                <div className={styles.wrapper}>
                                    <RightBottomBtns onContinue={toggleComponent} onBack={backToggleComponent} onClose={onClose} setCompletedStages={setCompletedStages} completedStages={completedStages} />
                                </div>
                            </>
                        )}

                        {currentStage === stages.JOB_TYPE && (
                            <>
                                <JobType />
                                <div className={styles.wrapper}>
                                    <JobTypeBtns onContinue={toggleComponent} onBack={backToggleComponent} />
                                </div>
                            </>
                        )}

                        {currentStage === stages.AI_ASSESSMENT && (
                            <>
                                <AIassessment />
                                <div className={styles.wrapper}>
                                    <AssessmentBtns onContinue={toggleComponent} onBack={backToggleComponent} />
                                </div>
                            </>
                        )}

                        {currentStage === stages.SHARE_LINK && (
                            <>
                                <ShareLink />
                                <div className={styles.wrapper}>
                                    <ShareLinkBtns onContinue={toggleComponent} onBack={backToggleComponent} onClose={onClose} />
                                </div>
                            </>
                        )}

                    </div>
                </div>

            </div>
        </>
    )
}

export default Overlay;