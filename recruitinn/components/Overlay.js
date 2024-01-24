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
import { useTest } from '@/contexts/QuestionsContent';
import { useExpertiseContext } from '@/contexts/ExpertiseContext';
import SuccessIndicator from './SuccessIndicator';
import React from 'react';

const Overlay = React.memo(({ token, showOverlay, onClose, stages, stageHeadings, showSuccessMessage, message , setMessage , showSuccess }) => {

    const overlayRef = useRef(null);
    const { test, setTest } = useTest();
    const { expertiseItem, setExpertiseItem } = useExpertiseContext();
    const [isLoading, setIsLoading] = useState(false);


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
    }, [showOverlay])

    const router = useRouter();
    console.log("router object:", router)
    const { id } = router?.query;

    console.log('id:', id);
    const infoSymbolSize = 20;
    const [currentStage, setCurrentStage] = useState(stages.ADD_SKILL);
    const [completedStages, setCompletedStages] = useState([]);
    const [techStack, setTechStack] = useState(null);
    const [position, setPosition] = useState(null);
    const [location, setLocation] = useState(null);
    const [jobtype, setJobtype] = useState(null);
    const [description, setDescription] = useState(null);
    const [emailReceiver, setEmailReceiver] = useState(null);
    const [subject, setSubject] = useState(null);
    const [text, setText] = useState(null);
    const [positionId, setPositionId] = useState(null);
    

    const toggleComponent = async () => {
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
                    await handleFormSubmit();
                    break;
                case stages.AI_ASSESSMENT:
                    setCurrentStage(stages.SHARE_LINK);
                    await handleFormSubmitForTest();
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

    const handleFormSubmit = async () => {

        const requestBody = {
            position: position,
            company_id: id,
            expertise: techStack,
            job_type: jobtype,
            description: description,
            location: location
        }

        localStorage.setItem('expertiseData', JSON.stringify({
            description: description,
            techStack: techStack,
            jobtype: jobtype,
            position: position
        }));
        console.log("Expertise:", expertiseItem);
        console.log("Token in Overlay method:", token)
        try {
            setIsLoading(true);
            const response = await fetch('http://localhost:3002/v1/create-position', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(requestBody),
            });
            const data = await response.json();
            console.log('data of created position:', data?.data?.data?.position_id);
            setPositionId(data?.data?.data?.position_id)
            setIsLoading(false);
            console.log(data);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const handleFormSubmitForTest = async () => {
        const requestBody = {
            expertise: techStack,
        }
        console.log("req body : ", requestBody);
        try {
            setIsLoading(true);
            const response = await fetch('http://localhost:3002/v1/prepare-test', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(requestBody),
            });
            const data = await response.json();
            setTest(data);
            setIsLoading(false);
            localStorage.setItem('testData', JSON.stringify(data));
            console.log('test', test)
            console.log(data);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const handleEmailInvite = async () => {
        const requestBody = {
            to: emailReceiver,
            subject: subject,
            text: text
        }

        try {
            setIsLoading(true);
            const response = await fetch('http://localhost:3002/v1/sendMail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(requestBody),
            });
            const data = await response.json();
            setTest(data);
            setIsLoading(false);
            localStorage.setItem('testData', JSON.stringify(data));
            console.log('test', test)
            console.log(data);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    }

    return (
        <>
            <div ref={overlayRef} className={styles.parent}>
                {showSuccessMessage && <SuccessIndicator showSuccessMessage={showSuccessMessage} msgText={message} />}
                <div className={styles.btn}>
                    <button onClick={onClose}>
                        <Image src='/shut.svg' width={15} height={15} />
                    </button>
                </div>

                <div className={styles.superContainer}>
                    {isLoading ? (
                        <div className={styles.loader}></div>
                    ) : (
                        <div className={styles.coverContainer}>
                            <div className={styles.topContainer}>
                                <h2>{stageHeadings[currentStage]}</h2>
                                <span>
                                    <p className={styles.tooltip}>You can add maximum of 4 skills and minimum of 1</p>
                                    <Image src='/info.svg' width={infoSymbolSize} height={infoSymbolSize} />
                                </span>
                            </div>

                            <Stages currentStage={currentStage} stages={stages} completedStages={completedStages} />

                            {currentStage === stages.ADD_SKILL && (
                                <>
                                    <AddSkillForm
                                        setTechStack={setTechStack}
                                    />
                                    <div className={styles.wrapper}>
                                        <RightBottomBtns onContinue={toggleComponent} onBack={backToggleComponent} onClose={onClose} setCompletedStages={setCompletedStages} completedStages={completedStages} />
                                    </div>
                                </>
                            )}

                            {currentStage === stages.JOB_TYPE && (
                                <>
                                    <JobType
                                        setPosition={setPosition}
                                        setJobtype={setJobtype}
                                        setDescription={setDescription}
                                        setLocation={setLocation}
                                    />
                                    <div className={styles.wrapper} >
                                        <JobTypeBtns showSuccess={showSuccess} setMessage={setMessage} onContinue={toggleComponent} onBack={backToggleComponent} />
                                    </div>
                                </>
                            )}

                            {currentStage === stages.AI_ASSESSMENT && (
                                <>
                                    <AIassessment />
                                    <div className={styles.wrapper}>
                                        <AssessmentBtns showSuccess={showSuccess} setMessage={setMessage} onContinue={toggleComponent} onBack={backToggleComponent} />
                                    </div>
                                </>
                            )}

                            {currentStage === stages.SHARE_LINK && (
                                <>
                                    <ShareLink
                                        positionId = {positionId}
                                        companyId = {id}
                                        emailReceiver={emailReceiver}
                                        setEmailReceiver={setEmailReceiver}
                                        setText={setText}
                                        text={text}
                                        setSubject={setSubject}
                                        subject={subject}
                                        position={position}
                                        showSuccess={showSuccess}
                                        setMessage={setMessage}
                                    />
                                    <div className={styles.wrapper}>
                                        <ShareLinkBtns showSuccess={showSuccess} setMessage={setMessage} handleEmailInvite={handleEmailInvite} onContinue={toggleComponent} onBack={backToggleComponent} onClose={onClose} />
                                    </div>
                                </>
                            )}

                        </div>
                    )}
                </div>

            </div>
        </>
    )
})

export default Overlay; 