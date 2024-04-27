import styles from './SetPassword.module.css';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Stages from './Stages';
import gsap from 'gsap';
import PasswordConfirm from './PasswordConfirm';
import PasswordBtns from './PasswordBtns';
import SuccessIndicator from './SuccessIndicator';
import ErrorIndicator from './ErrorIndicator';


const CandPassSetOverlay = ({ setEmail, email, showOverlay, onClose, stages, stageHeadings }) => {

    const overlayRef = useRef(null);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState('');
    const [condition, setCondition] = useState();
    

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
    const { id } = router?.query;
    const infoSymbolSize = 20;
    const [currentStage, setCurrentStage] = useState(stages.SET_PASSWORD);
    const [completedStages, setCompletedStages] = useState([]);
    const [password, setPassword] = useState(null);

    useEffect(() => {
        setCurrentStage(stages.SET_PASSWORD);
    }, []);

    useEffect(() => {
        async function fetchCompanyDetails() {
            const reqBody = {
                candidate_id : id
            }
            try {
                if (id) {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_REMOTE_URL}/get-one-candidate-self`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(reqBody),
                    });
                    const data = await response.json();
                    console.log("one company details: ", data);
                    setEmail(data?.data?.email);
                }
            } catch (err) {
                console.log('err:', err)
            }
        }
        fetchCompanyDetails();
    }, [id]);


    const checkAndComparePassword = async () => {
        const reqBody = {
            email: email,
            newPassword: password
        };

        try {
            if (id) {
                const response = await fetch(`${process.env.NEXT_PUBLIC_REMOTE_URL}/check-compare-cand-password`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        
                    },
                    body: JSON.stringify(reqBody),
                });
                const data = await response.json();
                console.log("condition returned:", data);
                setCondition(data?.data);
                return data?.data;
            }
        } catch (err) {
            console.log('err:', err)
        }
    }

    const handleFormSubmit = async () => {
        const reqBody = {
            token: id,
            password: password
        }

        const checkIfNotNewPassword = await checkAndComparePassword();
        console.log('checkinggggg:', checkIfNotNewPassword);

        if (checkIfNotNewPassword === true) {
            showError('Please enter a new password')
            return;
        } else {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_REMOTE_URL}/set-candidate-password`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(reqBody),
                });
                const data = await response.text();
                console.log(data);
                router.push('/candidate-login');
            } catch (err) {
                console.log("Error: ", err)
            }
        }
    };

    return (
        <>

            <div ref={overlayRef} className={styles.parent}>

                {showErrorMessage && <ErrorIndicator showErrorMessage={showErrorMessage} msgText={message} />}
                {showSuccessMessage && <SuccessIndicator showSuccessMessage={showSuccessMessage} msgText={message} />}
                <div className={styles.btn}>
                    <button onClick={onClose}></button>
                </div>

                <div className={styles.superContainer}>
                    <div className={styles.coverContainer}>
                        <div className={styles.topContainer}>
                            <h2>{stageHeadings[currentStage] ? stageHeadings[currentStage] : 'Default Heading'}</h2>
                        </div>

                        <Stages currentStage={currentStage} stages={stages} completedStages={completedStages} />

                        {currentStage === stages.SET_PASSWORD && (
                            <>
                                <PasswordConfirm error={error} password={password} setPassword={setPassword} />
                                <div className={styles.wrapper}>
                                    <PasswordBtns handleFormSubmit={handleFormSubmit} />
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default CandPassSetOverlay;