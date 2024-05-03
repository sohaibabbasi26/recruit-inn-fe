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
import ErrorIndicator from './ErrorIndicator';
import SuccessIndicator from './SuccessIndicator';
import PersonalInfoSelf from './PersonalInfoself';
// import ErrorIndicator from './ErrorIndicator';

const SelfOverlay = ({ showOverlay, onClose, stages, stageHeadings }) => {

    const overlayRef = useRef(null);

    const nameRef = useRef();
    const contactRef = useRef();
    const passwordRef = useRef();
    const emailRef = useRef();
    const expertiseRef = useRef();
    const countryRef = useRef();
    const cityRef = useRef();
    const generatedCodeRef = useRef();


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
    }, [showOverlay, onClose]);

    const router = useRouter();
    const infoSymbolSize = 20;
    const [currentStage, setCurrentStage] = useState(stages.PERSONAL_INFO);
    const [completedStages, setCompletedStages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [candidate, setCandidate] = useState();
    const [checkIfEmailPresent, setCheckIfEmailPresent] = useState(false);

    const toggleComponent = async () => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
        
        if ((currentStage === stages.PERSONAL_INFO) && (!name?.trim() || !email?.trim() || !contact?.trim() || !expertise?.trim() || !country?.trim() || !city?.trim() || !password.trim())) {
            setMessage("Please fill all the fields first");
            showError();
            return;
        }

        else if (currentStage === stages.PERSONAL_INFO && !validateEmailReceiver()) {
            setMessage("Entered email is not valid");
            showError();
            return;
        }
        else if (currentStage === stages.PERSONAL_INFO && (password.length < 8 )) {
            console.log("going to this condition : " )
            setMessage("Password must be at least 8 characters long ");
            showError();
            return;
        }
        else if (currentStage === stages.PERSONAL_INFO && !validateNumber()) {
            setMessage("Entered contact is not a number");
            showError();
            return;
        }


        else if ((currentStage === stages.SKILLS) && !validateAddSkill()) {
            setMessage("At least enter one skill!");
            showError();
            return;
        }

        const newCompletedStages = [...completedStages, currentStage];
        setCompletedStages(newCompletedStages);

        if (currentStage === stages.SHARE_LINK) {
            router.push('/');
        } else {
            switch (currentStage) {
                case stages.PERSONAL_INFO:
                    const result = await handlePersonalInfo();
                    console.log("result ====" ,result);
                    if (result && !checkIfEmailPresent) {
                        setCurrentStage(stages.VERIFICATION);
                    } else if (result && checkIfEmailPresent === true) {
                        console.log("in else if check if email present:", checkIfEmailPresent);
                        setMessage("Email you're using to register is already in use, try another one!")
                        showError();
                        break;
                    }
                    break
                case stages.VERIFICATION:
                    verifyCode();
                    break;
                case stages.SKILLS:
                    handleSetExpertise();
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
        console.log("Generated OTP:", randomCode);
        return randomCode;
    }

    const validateAddSkill = () => {
        return techStack.some(skillObj => skillObj.skill && skillObj.skill.trim() !== '');
    };

    const [generatedCode, setGeneratedCode] = useState();
    const [name, setName] = useState(null);
    const [country, setCountry] = useState(null);
    const [city, setCity] = useState(null);
    const [expertise, setExpertise] = useState(null);
    const [email, setEmail] = useState(null);
    const [contact, setContact] = useState(null);
    const [password, setPassword] = useState(null);
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [isCodeInvalid, setIsCodeInvalid] = useState(false);
    const [techStack, setTechStack] = useState(null);
    const [candidateId, setCandidateId] = useState(null);
    const [showErrorMessage, setshowErrorMessage] = useState(false);
    const [message, setMessage] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [reqBody, setReqBody] = useState(null);
    const [req, setReq] = useState(null);
    const [questionId, setQuestionId] = useState([]);
    const [text, setText] = useState();
    const [personalInfo, setPersonalInfo] = useState();

    useEffect(() => {
        const reqBody = {
            name: name,
            city: city,
            contact_no: contact,
            Password: password,
            email: email,
            over_all_exp: expertise,
            country: country,
            applied_through: 'Self'
        }

        const reqtwo = {
            expertise: techStack
        }

        setReq(reqtwo);

        setReqBody(reqBody)
    }, [name, city, contact, password, email, expertise, country, techStack])

    const showError = () => {
        setshowErrorMessage(true);

        setTimeout(() => {
            setshowErrorMessage(false);
        }, 3000);
    };

    const showSuccess = () => {
        setShowSuccessMessage(true);

        setTimeout(() => {
            setShowSuccessMessage(false);
        }, 3000);
    };


    const validateEmailReceiver = () => {
        console.log('email')
        if (!isValidEmail(email)) {
            return false;
        }
        return true;
    };

    const validateNumber = () => {
    if(isNaN(contact)) {
        setMessage("Enter a correct number! ");
        showError();
        return
    };

        return /^\d+$/.test(contact);
    }

    const isValidEmail = (email) => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return regex.test(email);
    };

    const validatePassword = (password) => {
        // Password should be at least 8 characters long
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
        if (password.length < 8) {
            setMessage("Password must be at least 8 characters long.");
            showError();
            return false;
        }
        else if (!regex.test(password)) {
            setMessage("Password must contain at least 8 characters one lowercase letter, one uppercase letter, one number, and one special character.");
            showError();
            return false;
        }
        else{
            return true;
        }
        return true; // Empty string indicates no validation errors
    };
    const handlePersonalInfo = async () => {
        setIsLoading(true);
        try {

            console.log("is loading check", isLoading);
            const requestBody = {
                name: name,
                city: city,
                contact_no: contact,
                email: email,
                over_all_exp: expertise,
                country: country,
                applied_through: 'Self',
                password: password
            };

            console.log("request body: ", reqBody);
            setPersonalInfo(reqBody)

            const response = await fetch(`${process.env.NEXT_PUBLIC_REMOTE_URL}/candidate-info-self`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            const data = await response.json();
            console.log('candidate:', data);

            if (data?.data?.data) {
                setCandidateId(data.data.data.candidate_id);
                setCandidate(data.data.data);
                await sendEmail(email);
                setCheckIfEmailPresent(false);
                setIsLoading(false);
                return true; 
              } else {
                setCheckIfEmailPresent(true);
                setMessage(data?.message || "Email used for registering is already in use!");
                showError();
                setCurrentStage(stages.PERSONAL_INFO)
                setIsLoading(false);
                return false; 
            }
        } catch (err) {
            console.log('ERRROR:', err);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        console.log('current check if email present:,', checkIfEmailPresent);

    }, [checkIfEmailPresent])

    useEffect(() => {
        console.log('recent generated otp:,', generatedCode);

        console.log(text);
    }, [generatedCode])


    async function sendEmail(email) {
        const otpCode = generateRandomCode();
        setGeneratedCode(otpCode);
        console.log("otp:", otpCode)
        try {
            const requestBody = {
                to: email,
                subject: 'RECRUITINN: Verify your account!',
                text: `
                Your verification code is : ${otpCode}
            `
            }
            console.log("request body: ", requestBody);

            const response = await fetch(`${process.env.NEXT_PUBLIC_REMOTE_URL}/sendMail`, {
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
            console.log("generated code:", generatedCode);
            console.log("otpCode:", otpCode);
            console.log("generatedCode === otpCode : ", generatedCode === otpCode)
            console.log("OTP Verified");
            setCurrentStage(stages.SKILLS);
            setMessage("Success!")
            showSuccess();
        } else {
            setMessage("Invalid code entered, please try again")
            showError();
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
            setIsLoading(true);
            console.log("loading in personal info", isLoading);
            const response = await fetch(`${process.env.NEXT_PUBLIC_REMOTE_URL}/set-expertise-by-cand`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });
            const data = await response.json();
            console.log('data in set expertise:', data);
            console.log("loading in personal info", isLoading);
        } catch (err) {
            console.log("error:", err)
        }
    }

    useEffect(() => {
        console.log("Loading status", isLoading);
    }, [isLoading]);

    const handleTestPreparation = async () => {
        console.log("request.boy in handle test prep method:", req)
        console.log("handle test prep here!");
        try {
            // setIsLoading(true);
            console.log("Loading status", isLoading);
            const response = await fetch(`${process.env.NEXT_PUBLIC_REMOTE_URL}/prepare-test`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(req),
            });
            const data = await response.json();
            localStorage.setItem('testData', JSON.stringify(data));
            setQuestionId(data?.data?.message?.question_id);
            console.log('question id:', questionId);
            console.log('data in test preparation:', data);
            setIsLoading(false);
            console.log("Loading status", isLoading);
        } catch (err) {
            console.log("error:", err)
        }
    }

    return (
        <>
            {showErrorMessage && <ErrorIndicator showErrorMessage={showErrorMessage} msgText={message} />}
            <div ref={overlayRef} className={styles.parent}>
                <SuccessIndicator showSuccessMessage={showSuccessMessage} msgText={message} />
                <ErrorIndicator showErrorMessage={showErrorMessage} msgText={message} />

                <div className={styles.superContainer}>

                    {isLoading ? (
                        <div className={styles.loader}></div>
                    ) : (
                        <div className={styles.coverContainer}>
                            <div className={styles.topContainer}>
                                <h2>{stageHeadings[currentStage]}</h2>
                            </div>


                            <Stages currentStage={currentStage} stages={stages} completedStages={completedStages} />

                            {currentStage === stages.PERSONAL_INFO && (
                                <>
                                    <PersonalInfoSelf expertiseRef={expertiseRef} contact={contact} password={password} expertise={expertise} name={name} email={email} country={country} city={city} passwordRef={passwordRef} contactRef={contactRef} nameRef={nameRef} cityRef={cityRef} countryRef={countryRef} emailRef={emailRef} setName={setName} setPassword={setPassword} setExpertise={setExpertise} setContact={setContact} setCity={setCity} setEmail={setEmail} setCountry={setCountry} />
                                    <div className={styles.wrapper}>
                                        <PersonalInfoBtns showSuccess={showSuccess} setMessage={setMessage} validateEmailReceiver={validateEmailReceiver} showError={showError} onContinue={toggleComponent} onBack={backToggleComponent} />
                                    </div>
                                </>
                            )}
                            {currentStage === stages.VERIFICATION && (
                                <>
                                    <CandidateVerify  sendEmail={sendEmail} showSuccess={showSuccess} email={email} setMessage={setMessage} otp={otp} setOtp={setOtp} isCodeInvalid={isCodeInvalid} setIsCodeInvalid={setIsCodeInvalid} />
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
                                        <CandSelfAssessmentBtns setIsLoading={setIsLoading} questionId={questionId} candidateId={candidateId} onContinue={toggleComponent} onBack={backToggleComponent} />
                                    </div>
                                </>
                            )}

                        </div>
                    )}
                </div>

            </div>
        </>
    )
}

export default SelfOverlay;