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
    import ClientInfo from './ClientInfo';
    import AdminOverlayBtns from './AdminOverlayBtns';
    import ErrorIndicator from './ErrorIndicator';

    const ClientSignUpOverlay = ({adminToken, message, showError, showErrorMessage, showSuccess, setMessage, showOverlay, onClose, stages, stageHeadings }) => {
        console.log('stage headings:'.stageHeadings);
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
        }, [showOverlay])

        const router = useRouter();
        const infoSymbolSize = 20;
        const [currentStage, setCurrentStage] = useState(stages.CLIENT_INFO);
        const [completedStages, setCompletedStages] = useState([]);
        const [clientname, setClientname] = useState(null);
        const [companyname, setCompanyname] = useState(null);
        const [email, setEmail] = useState(null);
        const [phoneNo, setPhoneNo] = useState(null);
        const [actManager, setActManager] = useState(null);
        const [companySize, setCompanySize] = useState(null);
        const [city, setCity] = useState(null);
        const [country, setCountry] = useState(null);
        const [companyId, setCompanyId] = useState(null);
        const [text, setText] = useState(null);
        const [subject, setSubject] = useState(null);
        const[isLoading , setisLoading] = useState(false);
        const [linkk, setLink] = useState();

        const validateEmailReceiver = () => {
            if (!email || !isValidEmail(email)) {
                setMessage("Please enter a valid email address.");
                showError();
                return false;
            }
            return true;
        };

        const isValidEmail = (email) => {
            const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            return regex.test(email);
        };

        const fillValidity = () => {
            return companyname && companySize && phoneNo && actManager && country && city && clientname && email ;
        };

        let link;
        useEffect(() => {
            setCurrentStage(stages.CLIENT_INFO);
        }, []);

        useEffect(() => {
            
        }, [companyId, email]); 

        useEffect(() => {
            if (companyId && email) { 
                const demolink = `https://app.recruitinn.ai/set-password/${companyId}`;
                const emailSubject = 'RECRUITINN: SET UP YOUR PASSWORD';
                const emailText = `Follow the link to set up your new password: \n ${demolink}`;
        
                const details = {
                    to: email,
                    subject: emailSubject,
                    text: emailText,
                };
        
                console.log("details:", details);

               setEmail(email);
               setSubject(emailSubject);
               setText(emailText);

            }
        }, [companyId, email,subject,text])

        const getActiveComponent = () => {
            const activeFlow = localStorage.getItem('activeFlow');
            console.log("Current active flow:", activeFlow);
            switch (activeFlow) {
                case 'Client':
                    router.push(`/set-password/${companyId}`);
                case 'Admin':
                    console.log('its an admin flow!!!!')
                default:
                    return null;
            }
        };

        const handleFormSubmit = async () => {
            const requestBody = {   
                company_name: companyname,
                company_location: city,
                email: email,
                account_user_name: actManager,
                contact_no: phoneNo
            }
            try {
                setisLoading(true);
                const response = await fetch(`${process.env.NEXT_PUBLIC_REMOTE_URL}/client-sign-up-admin`, {
                    method: 'POST',
                    headers: {  
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${adminToken}`,
                    },
                    body: JSON.stringify(requestBody),
                });
                const data = await response.json();
                console.log("login response:", data?.data?.data?.company_id);
                setCompanyId(data?.data?.data?.company_id);
                sendMail(data?.data?.data?.company_id)
                getActiveComponent();
            } catch (error) {
                console.error('Error submitting form:', error);
            }
        };

       
    

        const sendMail = async (companyId) => {
            const demolink = `https://app.recruitinn.ai/set-password/${companyId}`;
            const emailSubject = 'RECRUITINN: SET UP YOUR PASSWORD';
            const emailText = `Follow the link to set up your new password: \n ${demolink}`;
        
            const reqBody = {
                to: email,
                subject: emailSubject,
                text: emailText,
            };

            console.log("body data to be sent:",reqBody)
        
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_REMOTE_URL}/sendMail`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(reqBody),
                });
        
                if (!response.ok) {
                    throw new Error('Failed to send email');
                }
        
                const data = await response.text();
                console.log('Email sent successfully:', data);
                setisLoading(false);
            } catch (error) {
                console.error('Error sending email:', error);
            }
            
        };

        return (
            <>
                <div ref={overlayRef} className={styles.parent}>
                    <ErrorIndicator showErrorMessage={showErrorMessage} msgText={message} />

                    <div className={styles.superContainer}>
                        <div className={styles.coverContainer}>
                            <div className={styles.topContainer}>
                                <h2>{stageHeadings[currentStage] ? stageHeadings[currentStage] : 'Default Heading'}</h2>
                            </div>

                            <Stages currentStage={currentStage} stages={stages} completedStages={completedStages} />

                            {currentStage === stages.CLIENT_INFO && !isLoading && (
                                <>
                                    <ClientInfo email={email} setActManager={setActManager} setCity={setCity} setClientname={setClientname} setEmail={setEmail} setPhoneNo={setPhoneNo} setCountry={setCountry} setCompanySize={setCompanySize} setCompanyname={setCompanyname} />
                                    <div className={styles.wrapper}>
                                        <AdminOverlayBtns email={email} showError={showError} setMessage={setMessage} fillValidity={fillValidity} validateEmailReceiver={validateEmailReceiver} showSuccess={showSuccess} handleFormSubmit={handleFormSubmit} onClose={onClose} setCompletedStages={setCompletedStages} completedStages={completedStages} />
                                    </div>
                                </>
                            )}
                            {isLoading && <div className={styles.loader}></div>}
                        </div>
                    </div>
                </div>
            </>
        )
    }

    
export default ClientSignUpOverlay;