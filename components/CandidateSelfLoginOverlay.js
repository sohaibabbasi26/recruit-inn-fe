import styles from './Overlay.module.css';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import Stages from './Stages';
import { useRouter } from 'next/router';
import LoginComp from './Login';
import LoginBtns from './LoginBtns';
// import Login from '@/pages/client-login';
import ForgotPassword from './ForgotPassword';
import ForgotPasswordBtns from './ForgotPassBtns';
import ErrorIndicator from './ErrorIndicator';
import SuccessIndicator from './SuccessIndicator';

const CandidateSelfLoginOverlay = ({ message, setMessage, onClose, stages, stageHeadings, showOverlay }) => {

    const overlayRef = useRef(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [emailReceiver, setEmailReceiver] = useState();
    // const [candidateId, setCandidateId] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    const showError = (message) => {
        setMessage(message);
        setShowErrorMessage(true);

        setTimeout(() => {
            setShowErrorMessage(false);
        }, 3000);
    };

    const showSuccess = (message) => {
        setMessage(message);
        setShowSuccessMessage(true);

        setTimeout(() => {
            setShowSuccessMessage(false);
        }, 3000);
    };

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
    console.log("router object:", router)
    const { id } = router?.query;

    console.log('id:', id);
    const infoSymbolSize = 20;
    const [currentStage, setCurrentStage] = useState(stages.LOG_IN);
    const [completedStages, setCompletedStages] = useState([]);
    const [viewMode, setViewMode] = useState('login');
    const [subject, setSubject] = useState('');
    const [text, setText] = useState('');
    const [candidateId,setCandidateId] = useState();
    

    const redirectToClientPage = (candidateId) => {
        router.push(`/candidate/${candidateId}`);
    };

    useEffect(() => {
        // Check if user is logged in
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (isLoggedIn) {
            const candidate_id = localStorage.getItem('candidateID');
            if (candidate_id) {
                redirectToClientPage(candidate_id);
            }
        }
    }, [router]);

    const loginApiCall = async () => {
        

        const response = await fetch(`${process.env.NEXT_PUBLIC_REMOTE_URL}/candidate-log-in`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        const data = await response.json();
        console.log('login info:', data?.data);
        setCandidateId(data?.data?.id);
        if (data?.data?.token) {
            localStorage.setItem('candidate-token', data?.data?.token);
            localStorage.setItem('isLoggedInCandidate', 'true');
            localStorage.setItem('candidateId', data?.data?.id); 
            redirectToClientPage(data?.data?.id);   
        } else {
            showError('Login failed. Please check your credentials.');
        }
    };

    useEffect(() => {   
        const demolink = `http://localhost:3000/cand-new-pass/${candidateId}`;
        setSubject('RECRUITINN: SET UP YOUR NEW PASSWORD');
        setText(`
        follow the link to set up your new password: \n
            ${demolink}
        `)
    }, [candidateId, emailReceiver]);


    const checkIfEmailIsInDbHandler = async () => {
        const reqBody = {
            email: email
        };

        const requestBody = {
            to: emailReceiver,
            subject: subject,
            text: text
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_REMOTE_URL}/check-candidate`, {
                method: 'POST',
                body: JSON.stringify(reqBody),
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await response.json();
            console.log("response about client checking:", data);
            setCandidateId(data?.data?.message?.candidate_id);

            if (data?.data?.message?.candidate_id) {
                setCandidateId(data?.data?.message?.candidate_id);
                // ${candidateId}
                const demolink = `https://app.recruitinn.ai/cand-new-pass/${data?.data?.message?.candidate_id}`;
                const subject = 'RECRUITINN: SET UP YOUR NEW PASSWORD';
                const text = `Follow the link to set up your new password: \n ${demolink}`;

                console.log('link:', demolink)
                const requestBody = {
                    to: email,
                    subject: subject,
                    text: text,
                };

                await sendResetPasswordEmail(requestBody);
            } else {
                showError('Some error occurred, failed to send an Email')
            }
        } catch (err) {
            showError("Such a client doesn't exist")
        }
    }

    const sendResetPasswordEmail = async (emailDetails) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_REMOTE_URL}/sendMail`, {
                method: 'POST',
                body: JSON.stringify(emailDetails),
                headers: { 'Content-Type': 'application/json' },
            });

            const responseData = await response.text();
            console.log('Email sent successfully:', responseData);
            showSuccess('Link to set a new password has been sent to this email!');
        } catch (error) {
            console.error('Failed to send email:', error);
        }
    };

    return (
        <>
            <div ref={overlayRef} className={styles.parent}>
                {showErrorMessage && <ErrorIndicator showErrorMessage={showErrorMessage} msgText={message} />}
                {showSuccessMessage && <SuccessIndicator showSuccessMessage={showSuccessMessage} msgText={message} />}

                <div className={styles.superContainer}>
                    {isLoading ? (
                        <div className={styles.loader}></div>
                    ) : (
                        <div className={styles.coverContainer}>
                            <div className={styles.topContainer}>
                                <h2>{stageHeadings[currentStage]}</h2>
                            </div>

                            <Stages currentStage={currentStage} stages={stages} completedStages={completedStages} />

                            {viewMode === 'login' ? (
                                <>
                                    <LoginComp onViewChange={() => setViewMode('forgotPassword')} setPassword={setPassword} setEmail={setEmail} />
                                    <div className={styles.wrapper}>
                                        <LoginBtns loginApiCall={loginApiCall} setCompletedStages={setCompletedStages} completedStages={completedStages} />
                                    </div>
                                </>
                            ) : viewMode === 'forgotPassword' ? (
                                <>
                                    <ForgotPassword email={email} setEmail={setEmail} setEmailReceiver={setEmailReceiver} />
                                    <div className={styles.wrapper}>
                                        <ForgotPasswordBtns setViewMode={setViewMode}
                                        checkIfEmailIsInDbHandler={checkIfEmailIsInDbHandler}
                                         email={emailReceiver} />
                                    </div>
                                </>
                            ) : (
                                <>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default CandidateSelfLoginOverlay;