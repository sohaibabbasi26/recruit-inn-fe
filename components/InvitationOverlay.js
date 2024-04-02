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
import { useExpertiseContext } from '@/contexts/ExpertiseContext';
import ErrorIndicator from './ErrorIndicator';

const InvitationOverlay = ({ setShowSuccessMessage, message, setMessage, showSuccess, showSuccessMessage, showOverlay, onClose, stages, stageHeadings }) => {

    // const { expertiseItem, setExpertiseItem } = useExpertiseContext();
    useEffect(() => {
        // Load form data from local storage when the component mounts
        console.log("data saved successfully")
        try {
          const savedFormData = JSON.parse(localStorage.getItem('invitationFormData')) || {};
          console.log(savedFormData.name);
          nameRef.current.value = savedFormData.name || '';
          emailRef.current.value = savedFormData.email || '';
          contactRef.current.value = savedFormData.contact || '';
          expertiseRef.current.value = savedFormData.expertise || '';
          countryRef.current.value = savedFormData.country || '';
          cityRef.current.value = savedFormData.city || '';
          
        } catch (error) {
          console.error('Error loading form data from local storage:', error);
        }
      }, []);

    // console.log("expertise Item in invitationOverlay :", expertiseItem);
    const router = useRouter();
    const { client_id } = router.query;
    const { position_id } = router.query;
    const { q_id } = router.query;
    const { test_req } = router.query;
    const {a_id} = router.query;

    console.log("client_id:", client_id)

    useEffect(() => {
        try {
            const newExpertise = localStorage.getItem('expertiseData');

            if (newExpertise) {
                const parsedExpertise = JSON.parse(newExpertise);
                console.log("parsedExpertise:", parsedExpertise);
                // setNewExpert(parsedExpertise);
                console.log('expertisE:', newExpert)
                console.log("newExpertise:", newExpertise)
                setCandidateExpertise(parsedExpertise);
                console.log("New expertise:", parsedExpertise);
            } else {
                console.log("No expertise data found in local storage.");
            }
        } catch (error) {
            console.error("Error parsing expertise data:", error);
        }
    }, []);

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

    const infoSymbolSize = 20;
    const [currentStage, setCurrentStage] = useState(stages.JOB_DETAIL);
    const [completedStages, setCompletedStages] = useState([]);
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [contact, setContact] = useState();
    const [expertise, setExpertise] = useState();
    const [country, setCountry] = useState();
    const [city, setCity] = useState();
    const [candidateExpertise, setCandidateExpertise] = useState();
    const [newToken, setNewToken] = useState(null);
    const [newId, setNewId] = useState(null);
    const [newExpert, setNewExpert] = useState(null);
    const [clientName, setClientName] = useState(null);
    const [clientData, setClientData] = useState(null);
    const [positionId, setPositionId] = useState(null);
    const [positionData, setPositionData] = useState(null);
    const [questionId, setQuestionId] = useState();
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const cityRef = useRef(null);
    const countryRef = useRef(null);
    const expertiseRef = useRef(null);
    const contactRef = useRef(null);
    const [jobType, setJobType] = useState();
    const [position, setPosition] = useState();
    const [validationErrors, setValidationErrors] = useState({});
    const [allFieldsCheck,setAllFieldsCheck] = useState();
    const [reqBody, setReqBody] = useState(null);
    

    useEffect(() => {
        console.log("hey its me! req body", reqBody);
    }, [name, city, country , password , expertise, contact, email]);

    useEffect(() => {
        const allFields = validateAllFields();
        console.log('all fields:',allFields);
        setAllFieldsCheck(allFields);


        if(!validateAllFields){
            setMessage('Please enter all the fields')
            showSuccess();
        }
    },[allFieldsCheck])

    useEffect(() => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (email && !emailRegex.test(email)) {
            setValidationErrors(errors => ({ ...errors, email: 'Invalid email address.' }));
        } else {
            const { email, ...rest } = validationErrors;
            setValidationErrors(rest);
        }
    }, [email]);

    useEffect(() => {
        if (name?.trim() === '') {
            setValidationErrors(errors => ({ ...errors, name: 'Name is required.' }));
        } else {
            const { name, ...rest } = validationErrors;
            setValidationErrors(rest);
        }
    }, [name]);

    useEffect(() => {
        if (password?.trim() === '') {
            setValidationErrors(errors => ({ ...errors, password: 'Pasword is required.' }));
        } else {
            const { password, ...rest } = validationErrors;
            setValidationErrors(rest);
        }
    }, [password]);

    useEffect(() => {
        if (contact?.trim() === '') {
            setValidationErrors(errors => ({ ...errors, contact: 'Contact is required.' }));
        } else {
            const { contact, ...rest } = validationErrors;
            setValidationErrors(rest);
        }
    }, [contact]);

    useEffect(() => {
        if (country?.trim() === '') {
            setValidationErrors(errors => ({ ...errors, country: 'Country is required.' }));
        } else {
            const { country, ...rest } = validationErrors;
            setValidationErrors(rest);
        }
    }, [country]);

    useEffect(() => {
        if (city?.trim() === '') {
            setValidationErrors(errors => ({ ...errors, city: 'City is required.' }));
        } else {
            const { city, ...rest } = validationErrors;
            setValidationErrors(rest);
        }
    }, [city]);

    useEffect(() => {
        if (expertise?.trim() === '') {
            setValidationErrors(errors => ({ ...errors, expertise: 'Experise is required.' }));
        } else {
            const { country, ...rest } = validationErrors;
            setValidationErrors(rest);
        }
    }, [expertise]);

    const validateAllFields = () => {
        return name?.trim() !== '' && email?.trim() !== '' && contact?.trim() !== '' && password?.trim() !== '' && expertise?.trim() !== '' && country?.trim() !== '' && city?.trim() !== ''
    }

    const handleContinue = () => {
        const errors = {};
        let isFormIncomplete = false;
        let specificMsg = false;

        console.log("Form Incomplete: ", isFormIncomplete, "Errors: ", errors);

        console.log("Debug: Name:", name, "Email:", email,
            "city:", city, "Country", country, "password", password ,"expertise: ", expertise,
            "contact:", contact
        );

        setReqBody({
            job_type: jobType,
            position: position,
            position_id: positionId,
            name: name,
            email: email,
            over_all_exp: expertise,
            contact_no: contact,
            Password : password,
            applied_through: clientData?.client_name,
            company_id: newId,
            expertise: newExpert,
        })

        let isValid = true; // Assume the form is valid initially

        if (!allFieldsCheck) {
            console.log('isnide if condition:', !allFieldsCheck)
            setMessage('Please make sure to fill all the fields correctly.')
            showSuccess();
            errors.fieldsAreEmpty = 'Please make sure to fill all the fields correctly.';
            isValid = false;
        }

        // Simple validation checks
        if (!name?.trim()) {
            errors.name = 'Please enter a name.';
            isValid = false;
        }
        if (!email?.trim()) {
            errors.email = 'Please enter an email.';
            isValid = false;
        } else {
            // Simple regex for email validation
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            if (!emailRegex.test(email)) {
                errors.email = 'Email is not valid.';
                isValid = false;
            }
        }
        if (!contact?.trim()) {
            errors.contact = 'Please enter a contact number.';
            isValid = false;
        }
        if (!password?.trim()) {
            errors.password = 'Please enter a Password';
            isValid = false;
        }

        if (!expertise?.trim()) {
            errors.expertise = 'Please enter an expertise level!';
            isValid = false;
        }

        if (!city?.trim()) {
            errors.city = 'Please enter your city';
            isValid = false;
        }

        if (!country?.trim()) {
            errors.country = 'Please enter your country';
            isValid = false;
        }

        setValidationErrors(errors);

        const hasErrors = Object.keys(validationErrors).length > 0;
        const error = Object.keys(validationErrors);
        console.log('hasErrors:', error);

        if (!hasErrors) {
            setShowSuccessMessage(false);
            console.log('Form submitted successfully!');
            toggleComponent();
        }
        // } else if (name?.trim() === '' && email?.trim() === '' && contact?.trim() === '' && expertise?.trim() === '' && country?.trim() === '' && city?.trim() === '') {
        //     setMessage("Please make sure to fill all the fields correctly.");
        // }
    };

    // const toggleComponent = () => {



    //     const newCompletedStages = [...completedStages, currentStage];
    //     setCompletedStages(newCompletedStages);

    //     if (currentStage === stages.SHARE_LINK) {
    //         router.push('/');
    //     } else {
    //         switch (currentStage) {
    //             case stages.JOB_DETAIL:

    //                 setCurrentStage(stages.PERSONAL_INFO);
    //                 break;
    //             case stages.PERSONAL_INFO:

    //                 const allFields = validateAllFields();
    //                 console.log('all fields bool var before flip:', allFields);
    //                 if (!allFields) {
    //                     console.log('all fields bool var after flip:', allFields);
    //                     setMessage('Please make sure to fill all the fields correctly.')
    //                     showSuccess();
    //                 } else {
    //                     setCurrentStage(stages.REQUIRED_SKILLS);
    //                     break;
    //                 }

    //             default:
    //                 setCurrentStage(stages.JOB_DETAIL);
    //         }
    //     }
    // }

    const toggleComponent = () => {
        // First, check if we are in the PERSONAL_INFO stage and validate fields
        if (currentStage === stages.PERSONAL_INFO) {
            const isValid = validateAllFields(); // Ensure this function accurately checks all fields
            if (!isValid) {
                // If not valid, possibly show an error message to the user
                setMessage('Please make sure to fill all the fields correctly.');
                showSuccess(); // Assuming this function shows the message
                return; // Do not proceed to the next stage
            }
        }
    
        // Proceed with setting the next stage as before
        const newCompletedStages = [...completedStages, currentStage];
        setCompletedStages(newCompletedStages);
    
        switch (currentStage) {
            case stages.JOB_DETAIL:
                setCurrentStage(stages.PERSONAL_INFO);
                break;
            case stages.PERSONAL_INFO:
                setCurrentStage(stages.REQUIRED_SKILLS); // Now we know all fields are validated
                break;
            default:
                setCurrentStage(stages.JOB_DETAIL); // Fallback to default stage
        }
    };


    useEffect(() => {
        console.log('newExpert:', newExpert);
    }, [newExpert]);

    useEffect(() => {
        setQuestionId(q_id);
        console.log('quesiton id:', questionId);
    }, [q_id])

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
        updateFormData();
    }

    // useEffect(() => {

    // },[])

    useEffect(() => {
        const { client_id } = router.query;
        const { position_id } = router.query;

        console.log("client id:", client_id);
        console.log("position id:", position_id)
        setPositionId(position_id)
        setNewId(client_id);
    }, [router.isReady, router.query]);

    useEffect(() => {
        async function fetchOneCompany() {
            if (!client_id) {
                console.error("Client ID is undefined.");
                return;
            }

            const reqBody = {
                id: newId
            }
            const response = await fetch(`${process.env.NEXT_PUBLIC_REMOTE_URL}/get-one-company`,
                {
                    method: 'POST',
                    body: JSON.stringify(reqBody),
                    headers: { 'Content-Type': 'application/json' },
                }
            );
            const data = await response.json();
            setClientData(data?.data)
            console.log('one company data:', data?.data);
        }
        if (client_id) {
            fetchOneCompany();
        }
    }, [newId, router.query, router.isReady])

    useEffect(() => {
        async function fetchOnePosition() {

            if (!position_id) {
                console.error("Client ID is undefined.");
                return;
            }
            const reqBody = {
                position_id: positionId
            }
            const response = await fetch(`${process.env.NEXT_PUBLIC_REMOTE_URL}/get-one-positions`,
                {
                    method: 'POST',
                    body: JSON.stringify(reqBody),
                    headers: { 'Content-Type': 'application/json' },
                }
            );
            const data = await response.json();
            setNewExpert(data?.data?.expertise)
            setPositionData(data?.data)
            setPosition(data?.data?.position);
            setJobType(data?.data?.job_type)
            console.log('one position data:', data?.data);
        }
        if (position_id) {
            fetchOnePosition();
        }
    }, [positionId, router.query, router.isReady])

    const updateFormData = () => {
        // Save form data to local storage whenever it changes
        try {
          const formData = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            contact: contactRef.current.value,
            expertise: expertiseRef.current.value,
            country: countryRef.current.value,
            city: cityRef.current.value,
          };
          localStorage.setItem('invitationFormData', JSON.stringify(formData));
        } catch (error) {
          console.error('Error saving form data to local storage:', error);
        }
      };

    const createCandidate = async () => {

        console.log('request body: ', reqBody);
        console.log("new token:", newToken, 'and new id:', newId);
        console.log('request body: ', reqBody);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_REMOTE_URL}/candidate-info`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${newToken}`
                },
                body: JSON.stringify(reqBody),
            });
            const data = await response.json();
            console.log("candidate data :", data?.data?.data?.candidate_id)
            return data?.data?.data?.candidate_id;
        } catch (error) {
            console.error('Error creating candidate:', error);
        }
    };


    const redirectToTestPage = async () => {
        const candidateId = await createCandidate();
        console.log("candidate id:", candidateId)
        if (candidateId) {
            console.log("REDIRECTING TO:")
            console.log(`/test?cid=${candidateId}&pid=${positionId}&test_req=${test_req}}&a_id=${a_id}`)
            router.push(`/test?cid=${candidateId}&qid=${questionId}&pid=${positionId}&test_req=${test_req}}&a_id=${a_id}`);
        }
    };

    const jobDetails = {
        position: positionData?.position,
        description: positionData?.description
    };

    return (
        <>
            <div ref={overlayRef} className={styles.parent}>
                {showSuccessMessage && <ErrorIndicator showErrorMessage={showSuccessMessage} showSuccessMessage={showSuccessMessage} msgText={message} />}
                <div className={styles.superContainer}>
                    <div className={styles.coverContainer}>
                        <div className={styles.topContainer}>
                            <h2>{stageHeadings[currentStage]}</h2>
                        </div>

                        <Stages currentStage={currentStage} stages={stages} completedStages={completedStages} />
                        {currentStage === stages.JOB_DETAIL && (
                            <>
                                <JobDetails clientName={clientData?.company_name} details={jobDetails} />
                                <div className={styles.wrapper}>
                                    <JobDetailsBtn onContinue={toggleComponent} onBack={backToggleComponent} onClose={onClose} setCompletedStages={setCompletedStages} completedStages={completedStages} />
                                </div>
                            </>
                        )}

                        {currentStage === stages.PERSONAL_INFO && (
                            <>
                                <PersonalInfo
                                    validationErrors={validationErrors}
                                    name={name}
                                    email={email}
                                    contact={contact}
                                    expertise={expertise}
                                    country={country}
                                    city={city}
                                    password = {password}
                                    showSuccessMessage={showSuccessMessage}
                                    msgText={message}
                                    // validationErrors={validationErrors}
                                    nameRef={nameRef} contactRef={contactRef}
                                    emailRef={emailRef}
                                    cityRef={cityRef}
                                    countryRef={countryRef}
                                    expertiseRef={expertiseRef}
                                    handleContinue={handleContinue}
                                    setCity={setCity}
                                    setContact={setContact}
                                    setCountry={setCountry}
                                    setEmail={setEmail}
                                    setExpertise={setExpertise}
                                    setName={setName}
                                    setPassword = {setPassword}
                                />
                                <div className={styles.wrapper}>
                                    <PersonalInfoBtns showSuccess={showSuccess} onContinue={handleContinue} onBack={backToggleComponent} />
                                </div>
                            </>
                        )}

                        {currentStage === stages.REQUIRED_SKILLS && (
                            <>
                                <RequiredSkills expertise={newExpert} />
                                <div className={styles.wrapper}>
                                    <RequiredSkillsBtns redirectToTestPage={redirectToTestPage} onBack={backToggleComponent} />
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