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
import ErrorIndicator from './ErrorIndicator';
import { useDispatch } from 'react-redux';
import { fetchQuestions } from '../store/slices/questionSlice';

const Overlay = React.memo(({ showError, showErrorMessage, token, showOverlay, onClose, stages, stageHeadings, showSuccessMessage, message, setMessage, showSuccess }) => {

    const overlayRef = useRef(null);
    const { test, setTest } = useTest();
    const { expertiseItem, setExpertiseItem } = useExpertiseContext();
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    // const dispatch = useDispatch();
    // const { items, status, error } = useSelector((state) => state.questions);
    // // const techStack = 'exampleTechStack'; // Define how you choose the techStack

    // useEffect(() => {
    //     if (techStack) {
    //       dispatch(fetchQuestions(techStack));
    //     }
    //   }, [dispatch]);

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
    }, [showOverlay]);

    // console.log("router object:", router)
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
    const expertiseRef = useRef({});
    const positionRef = useRef();
    const locationRef = useRef();
    const jobTypeRef = useRef();
    const descriptionRef = useRef();
    const [questionId, setQuestionId] = useState();
    const [emailReceivers,setEmailReceivers] = useState([{ email: '' }]);

    


    const JobPositionRef = useRef();
    const recipientRef = useRef();

    useEffect(() => {
        setPosition(positionRef?.current?.value);
        setLocation(locationRef?.current?.value);
        setJobtype(jobTypeRef?.current?.value);
        setDescription(descriptionRef?.current?.value);
    }, [positionRef?.current?.value, expertiseRef?.current?.value, locationRef?.current?.value, jobTypeRef?.current?.value, description?.current?.value])

    const validateAddSkill = () => {
        return techStack.some(skillObj => skillObj.skill && skillObj.skill.trim() !== '');
    };

    const isValidEmail = (email) => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return regex.test(email);
    };

    useEffect(() => {
        console.log('description:', description);
    }, [description])

    const validateJobType = () => {
        return (positionRef.current.value).trim() !== '' && (locationRef.current.value).trim() !== '' && (jobTypeRef.current.value).trim() !== '' && description?.trim();
    };

    const toggleComponent = async () => {
        let isValid = false;

        let newCompletedStages = [...completedStages, currentStage];
        setCompletedStages(newCompletedStages);

        switch (currentStage) { 
            case stages.ADD_SKILL:
                isValid = validateAddSkill();
                if (!isValid) {
                    setMessage("Please fill in at least one skill.");
                    showError();
                    return;
                }
                setCurrentStage(stages.JOB_TYPE);
                break;
            case stages.JOB_TYPE:
                isValid = validateJobType();
                if (!isValid) {
                    setMessage("Please fill all the fields.");
                    showError();
                    return;
                }
                setCurrentStage(stages.AI_ASSESSMENT);
                setMessage('Job has been created successfully!')
                showSuccess();
                await handleFormSubmit();
                break;
            case stages.AI_ASSESSMENT:
                setCurrentStage(stages.SHARE_LINK);
                await handleFormSubmitForTest();
                break;
            default:
                setCurrentStage(stages.ADD_SKILL);
        }

        if (isValid) {
            const newCompletedStages = [...completedStages, currentStage];
            setCompletedStages(newCompletedStages);
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
            position: positionRef.current.value,
            company_id: id,
            expertise: techStack,
            job_type: jobTypeRef.current.value,
            description: description,
            location: locationRef.current.value
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
            const response = await fetch(`${process.env.NEXT_PUBLIC_REMOTE_URL}/create-position`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(requestBody),
            });
            const data = await response.json();
            console.log('data of just created position:', data)
            console.log('data of created position:', data?.data?.data?.position_id);
            setPositionId(data?.data?.data?.position_id)
            setIsLoading(false);
            console.log(data);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    useEffect(() => {
        console.log('positionId', positionId);
        console.log('questionId', questionId)
    }, [positionId, questionId, router?.isReady]);

    const handleFormSubmitForTest = async () => {
        const requestBody = {
            expertise: techStack,
            position_id: positionId
        }
        console.log("req body : ", requestBody);
        try {
            setIsLoading(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_REMOTE_URL}/prepare-test`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(requestBody),
            });
            const data = await response.json();
            console.log('response data of a test creation:', data);
            setQuestionId(data?.data?.message?.question_id);
            console.log('question id:')
            setTest(data);
            setIsLoading(false);
            setMessage("Successfully created a test for your job!");
            showSuccess();
            localStorage.setItem('testData', JSON.stringify(data));
            console.log('test', test)
            console.log(data);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const addEmailReceiver = () => {
        console.log('Adding a new email receiver');
        setEmailReceivers(currentReceivers => {
            const newReceivers = [...currentReceivers, { email: '' }];
            console.log("new recievers:");
            return newReceivers;
        });
    };
    
    const handleEmailChange = (e, index) => {
        const newEmailReceivers = [...emailReceivers];
        newEmailReceivers[index].email = e.target.value;
        setEmailReceivers(newEmailReceivers);
    };

    const handleEmailInvite = async () => {
        const validEmailReceivers = emailReceivers.filter(receiver => receiver.email.trim() !== '');

        const sendInvitesPromises = validEmailReceivers.map(receiver => {
            return fetch(`${process.env.NEXT_PUBLIC_REMOTE_URL}/sendMail`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    to: receiver.email,
                    subject: subject,
                    text: text
                }),
            });
        });

        try {
            // Wait for all promises to resolve
            await Promise.all(sendInvitesPromises);
            setMessage('Invitations have been sent to all candidates via email');
            showSuccess();
            onClose(); // Close the modal or overlay if needed
        } catch (error) {
            console.error('Error sending invites:', error);
        }
    };

    // const handleEmailInvite = async () => {
    //     const requestBody = {
    //         to: emailReceiver,
    //         subject: subject,
    //         text: text
    //     }

    //     try {
    //         setIsLoading(true);
    //         const response = await fetch(`${process.env.NEXT_PUBLIC_REMOTE_URL}/sendMail`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${token}`,
    //             },
    //             body: JSON.stringify(requestBody),
    //         });
    //         const data = await response.json();
    //         setTest(data);
    //         setIsLoading(false);
    //         localStorage.setItem('testData', JSON.stringify(data));
    //         console.log('test', test)
    //         console.log(data);
    //     } catch (error) {
    //         console.error('Error submitting form:', error);
    //     }
    // }

    return (
        <>
            <div ref={overlayRef} className={styles.parent}>
                {showErrorMessage && <ErrorIndicator showErrorMessage={showErrorMessage} msgText={message} />}
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

                            </div>

                            <Stages currentStage={currentStage} stages={stages} completedStages={completedStages} />

                            {currentStage === stages.ADD_SKILL && (
                                <>
                                    <AddSkillForm
                                        expertiseRef={expertiseRef}
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
                                        position={position}
                                        jobtype={jobtype}
                                        description={description}
                                        location={location}
                                        positionRef={positionRef}
                                        jobTypeRef={jobTypeRef}
                                        descriptionRef={descriptionRef}
                                        locationRef={locationRef}
                                        setPosition={setPosition}
                                        setJobtype={setJobtype}
                                        setDescription={setDescription}
                                        setLocation={setLocation}
                                    />
                                    <div className={styles.wrapper}>
                                        <JobTypeBtns showError={showError} showErrorMessage={showErrorMessage} showSuccess={showSuccess} setMessage={setMessage} onContinue={toggleComponent} onBack={backToggleComponent} />
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
                                        emailReceivers={emailReceivers}
                                        handleEmailChange={handleEmailChange}
                                        addEmailReceiver={addEmailReceiver}
                                        questionId={questionId}
                                        positionId={positionId}
                                        companyId={id}
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