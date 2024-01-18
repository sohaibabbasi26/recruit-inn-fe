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

const InvitationOverlay = ({ showOverlay, onClose, stages, stageHeadings }) => {

    const { expertiseItem, setExpertiseItem } = useExpertiseContext();
    console.log("expertise Item in invitationOverlay :", expertiseItem);

    useEffect(() => {
        try {
            const newExpertise = localStorage.getItem('expertiseData');

            if (newExpertise) {
                const parsedExpertise = JSON.parse(newExpertise);
                console.log("parsedExpertise:", parsedExpertise);
                setNewExpert(parsedExpertise);
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

    const router = useRouter();
    const infoSymbolSize = 20;
    const [currentStage, setCurrentStage] = useState(stages.JOB_DETAIL);
    const [completedStages, setCompletedStages] = useState([]);
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [contact, setContact] = useState();
    const [expertise, setExpertise] = useState();
    const [country, setCountry] = useState();
    const [city, setCity] = useState();
    const [candidateExpertise, setCandidateExpertise] = useState();
    const [newToken, setNewToken] = useState(null);
    const [newId, setNewId] = useState(null);
    const [newExpert, setNewExpert] = useState(null);
    const [clientName,setClientName] = useState(null);

    const toggleComponent = () => {

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


    useEffect(() => {
        console.log('newExpert:', newExpert);
    }, [newExpert]);

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

    useEffect(() => {
        const clientName = localStorage.getItem('clientName');
        const storedToken = localStorage.getItem('client-token');
        const storedId = localStorage.getItem('clientId');
        if (storedToken && storedId) {
            setNewToken(storedToken);
            setNewId(storedId);
            setClientName(clientName);
        }
    }, []);

    const createCandidate = async () => {
        const requestBody = {
            name: name,
            email: email,
            over_all_exp: expertise,
            applied_through: 'Co-ventech',
            company_id: newId,
            expertise: candidateExpertise,
            contact_no: contact,
        }
        console.log('request body: ', requestBody);
        console.log("new token:", newToken, 'and new id:', newId)

        try {
            const response = await fetch('http://localhost:3002/v1/candidate-info', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${newToken}`
                },
                body: JSON.stringify(requestBody),
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
            console.log(`/test?id=${candidateId}`)
            router.push(`/test?id=${candidateId}`);
        }
    };

    return (
        <>

            <div ref={overlayRef} className={styles.parent}>

                <div className={styles.btn}>
                    <button onClick={onClose}>
                        <Image src='/shut.svg' width={15} height={15} />
                    </button>
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
                                <JobDetails clientName={clientName} details={newExpert} />
                                <div className={styles.wrapper}>
                                    <JobDetailsBtn onContinue={toggleComponent} onBack={backToggleComponent} onClose={onClose} setCompletedStages={setCompletedStages} completedStages={completedStages} />
                                </div>
                            </>
                        )}

                        {currentStage === stages.PERSONAL_INFO && (
                            <>
                                <PersonalInfo setCity={setCity} setContact={setContact} setCountry={setCountry} setEmail={setEmail} setExpertise={setExpertise} setName={setName} />
                                <div className={styles.wrapper}>
                                    <PersonalInfoBtns onContinue={toggleComponent} onBack={backToggleComponent} />
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