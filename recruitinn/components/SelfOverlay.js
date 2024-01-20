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
                    handlePersonalInfo();
                    setCurrentStage(stages.VERIFICATION);
                    break;
                case stages.VERIFICATION:
                    verifyCode();
                    break;
                case stages.SKILLS:
                    handleSetExpertise();
                    console.log("techstack:", techStack)
                    handleTestPreparation();
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

    function generateRandomCode() {
        const randomCode = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
        return randomCode;
    }

    const [generatedCode, setGeneratedCode] = useState(() => generateRandomCode());
    const [name, setName] = useState(null);
    const [country, setCountry] = useState(null);
    const [city, setCity] = useState(null);
    const [expertise, setExpertise] = useState(null);
    const [email, setEmail] = useState(null);
    const [contact, setContact] = useState(null);
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [isCodeInvalid, setIsCodeInvalid] = useState(false);
    const [techStack, setTechStack] = useState(null);
    const [candidateId, setCandidateId] = useState(null);

    const handlePersonalInfo = async () => {
        const newToken = localStorage.getItem('client-token');

        try {
            const reqBody = {
                name: name,
                country: country,
                city: city,
                over_all_exp: expertise,
                email: email,
                contact_no: contact,
                applied_through: 'Self'
            }

            console.log("request body: ", reqBody);

            const response = await fetch('http://localhost:3002/v1/candidate-info-self', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${newToken}`
                },
                body: JSON.stringify(reqBody),
            })

            const data = await response.json();
            setCandidateId(data?.data?.data?.candidate_id);
            console.log('data in Self overlay:', data?.data?.data?.candidate_id);
        } catch (err) {
            console.log('ERRROR:', err);
        }

        try {
            const requestBody = {
                to: email,
                subject: 'RECRUITINN: Verify your account!',
                text: `
                    Your verification code is : ${generatedCode}
                `
            }

            console.log("request body: ", requestBody);

            const response = await fetch('http://localhost:3002/v1/sendMail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            const data = await response.json();
            console.log('data in Self overlay:', data);
        } catch (err) {
            console.log('ERRROR:', err);
        }
    }

    const verifyCode = () => {
        const otpCode = otp.join("");
        console.log("Entered OTP:", otpCode);
        console.log("generated code compare:", generatedCode)

        if (generatedCode === otpCode) {
            console.log("OTP Verified");
            setCurrentStage(stages.SKILLS);
        } else {
            setIsCodeInvalid(true);
            console.error('its invalid')
        };
    }

    const handleSetExpertise = async () => {

        const requestBody = {
            token: candidateId,
            expertise: techStack
        }
        console.log("req body for setting expertise:", requestBody);
        try {
            const response = await fetch('http://localhost:3002/v1/set-expertise-by-cand', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });
            const data = await response.json();
            console.log('data in set expertise:', data);
        } catch (err) {
            console.log("error:", err)
        }
    }

    const handleTestPreparation = async () => {
        const reqBody = {
            expertise: techStack
        }

        console.log("request.boy in handle test prep method:",reqBody)
        try {
            const response = await fetch('http://localhost:3002/v1/prepare-test', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reqBody),
            });
            const data = await response.json(); 
            localStorage.setItem('testData', JSON.stringify(data));
            console.log('data in set expertise:', data);
        } catch (err) {
            console.log("error:", err)
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
                                <PersonalInfo setName={setName} setExpertise={setExpertise} setContact={setContact} setCity={setCity} setEmail={setEmail} setCountry={setCountry} />
                                <div className={styles.wrapper}>
                                    <PersonalInfoBtns onContinue={toggleComponent} onBack={backToggleComponent} />
                                </div>
                            </>
                        )}

                        {currentStage === stages.VERIFICATION && (
                            <>
                                <CandidateVerify otp={otp} setOtp={setOtp} isCodeInvalid={isCodeInvalid} setIsCodeInvalid={setIsCodeInvalid} />
                                <div className={styles.wrapper}>
                                    <CandidateVerifyBtns onContinue={toggleComponent} onBack={backToggleComponent} />
                                </div>
                            </>
                        )}

                        {currentStage === stages.SKILLS && (
                            <>
                                <CandSelfSkill handleTestPreparation={handleTestPreparation} setTechStack={setTechStack} />
                                <div className={styles.wrapper}>
                                    <CandSelfSkillBtns handleTestPreparation={handleTestPreparation} onContinue={toggleComponent} onBack={backToggleComponent} />
                                </div>
                            </>
                        )}

                        {currentStage === stages.ASSESSMENT && (
                            <>
                                <CandSelfAssessment />
                                <div className={styles.wrapper}>
                                    <CandSelfAssessmentBtns candidateId={candidateId} onContinue={toggleComponent} onBack={backToggleComponent} />
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