import { useState } from "react";
import styles from "./Overlay.module.css";
import Image from "next/image";
import Stages from "./Stages";
import AddSkillForm from "./AddSkillForm";
import RightBottomBtns from "./RightBottomBtns";
import JobType from "./JobType";
import JobTypeBtns from "./JobTypeBtns";
import AIassessment from "./AIassesment";
import AssessmentBtns from "./AssessmentBtns";
import ShareLink from "./ShareLink";
import { useRouter } from "next/router";
import ShareLinkBtns from "./ShareLinkBtns";
import { useRef, useEffect } from "react";
import gsap from "gsap";
// import { useTest } from '@/contexts/QuestionsContent';
// import { useExpertiseContext } from '@/contexts/ExpertiseContext';
import SuccessIndicator from "./SuccessIndicator";
import React from "react";
import ErrorIndicator from "./ErrorIndicator";
import { useTestState } from "@/contexts/TestRequirementContext";
import { fetchQuestions } from "../store/slices/questionSlice";

const Overlay = React.memo(
  ({
    setIsTestRequired,
    isTestRequired,
    showError,
    showErrorMessage,
    token,
    showOverlay,
    onClose,
    stages,
    stageHeadings,
    showSuccessMessage,
    message,
    setMessage,
    showSuccess,
  }) => {
    const overlayRef = useRef(null);
    // const { test, setTest } = useTest();
    // const { expertiseItem, setExpertiseItem } = useExpertiseContext();
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
      document.body.style.overflow = "hidden";

      if (showOverlay) {
        gsap.to(overlayRef.current, {
          y: "0%",
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        gsap.to(overlayRef.current, {
          y: "100%",
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
          onComplete: onClose,
        });
      }

      return () => {
        gsap.to(overlayRef.current, {
          y: "100%",
          opacity: 0,
          duration: 0.1,
          ease: "power1",
        });
      };
    }, [showOverlay]);

    // console.log("router object:", router)
    const { id } = router?.query;

    console.log("id:", id);
    const infoSymbolSize = 20;
    const [currentStage, setCurrentStage] = useState(stages.ADD_SKILL);
    const [completedStages, setCompletedStages] = useState([]);
    const [techStack, setTechStack] = useState(null);
    const [position, setPosition] = useState(null);
    const [city, setCity] = useState(null);
    const [country, setCountry] = useState(null);
    const [jobtype, setJobtype] = useState(null);
    const [description, setDescription] = useState(null);
    const [emailReceiver, setEmailReceiver] = useState(null);
    const [subject, setSubject] = useState(null);
    const [text, setText] = useState(null);
    const [positionId, setPositionId] = useState(null);
    const [positionName, setPositionName] = useState(null);
    const expertiseRef = useRef({});
    const positionRef = useRef();
    const cityRef = useRef();
    const countryRef = useRef();
    const jobTypeRef = useRef();
    const descriptionRef = useRef();
    const [questionId, setQuestionId] = useState();
    const [emailReceivers, setEmailReceivers] = useState([{ email: "" }]);
    const [nameReceivers, setNameReceivers] = useState([{ name: "" }])
    const [assessmentId, setAssessmentId] = useState();
    const [skill1, setSkill1] = useState("");
    const [skill2, setSkill2] = useState("");
    const [skill3, setSkill3] = useState("");
    const [skill4, setSkill4] = useState("");
    const [codingSkill, setCodingSkill] = useState("");
    const [level1, setLevel1] = useState("");
    const [level2, setLevel2] = useState("");
    const [level3, setLevel3] = useState("");
    const [level4, setLevel4] = useState("");
    const [isLevelEntered, setIsLevelEntered] = useState('');
    const [name, setName] = useState();
    const [receivers, setReceivers] = useState([{ name: "", email: "" }]);

    const handleReceiverChange = (index, field, value) => {
      const newReceivers = [...receivers];
      newReceivers[index][field] = value;
      setReceivers(newReceivers);
    };

    const addReceiver = () => {
      setReceivers([...receivers, { name: "", email: "" }]);
    };

    const removeReceiver = (index) => {
      setReceivers(receivers.filter((_, i) => i !== index));
    };


    const [codingExpertise, setCodingExpertise] = useState(null);
    const [codeQues, setCodeQues] = useState(null);

    const JobPositionRef = useRef();
    const recipientRef = useRef();

    useEffect(() => {
      setPosition(positionRef?.current?.value);
      setCity(cityRef?.current?.value);
      setCountry(countryRef?.current?.value);
      setJobtype(jobTypeRef?.current?.value);
      setDescription(descriptionRef?.current?.value);
    }, [
      positionRef?.current?.value,
      expertiseRef?.current?.value,
      cityRef?.current?.value,
      countryRef?.current?.value,
      jobTypeRef?.current?.value,
      description?.current?.value,
    ]);

    const validateAddSkill = () => {
      return techStack.some(
        (skillObj) => skillObj.skill && skillObj.skill.trim() !== ""
      );
    };

    const isValidEmail = (email) => {
      const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      return regex.test(email);
    };

    useEffect(() => {
      console.log("description:", description);
    }, [description]);

    const validateJobType = () => {
      return (
        positionRef.current.value.trim() !== "" &&
        cityRef.current.value.trim() !== "" &&
        countryRef.current.value.trim() !== "" &&
        jobTypeRef.current.value.trim() !== "" &&
        description?.trim()
      );
    };

    const toggleComponent = async () => {

      const skillsWithLevels = [
        { skill: skill1, level: level1 },
        { skill: skill2, level: level2 },
        { skill: skill3, level: level3 },
        { skill: skill4, level: level4 },
      ];

      let isValid = false;

      const isAnySkillEntered = skillsWithLevels.some(({ skill }) => skill.trim());
      const areAllLevelsSelected = skillsWithLevels.every(({ skill, level }) => {
        return skill.trim() ? level : true;
      });

      if (areAllLevelsSelected) {
        setIsLevelEntered(true);
      }

      let newCompletedStages = [...completedStages, currentStage];
      setCompletedStages(newCompletedStages);

      switch (currentStage) {
        case stages.ADD_SKILL:
          isValid = validateAddSkill();
          if (!isValid) {
            setMessage("Please enter at least one skill and its difficulty level properly");
            showError();
            return;
          } else if (isAnySkillEntered && !areAllLevelsSelected) {
            setMessage("Please select a level for the entered skills.");
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
          setMessage("Job has been created successfully!");
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

      // if(isAnySkillEntered){
      //   const newCompletedStages = [...completedStages, currentStage];
      //   setCompletedStages(newCompletedStages);
      // }
    };

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
    };

    const handleFormSubmit = async () => {
      const requestBody = {
        position: positionRef.current.value,
        company_id: id,
        expertise: techStack,
        job_type: jobTypeRef.current.value,
        description: description,
        location: cityRef.current.value + ", " + countryRef.current.value,
        is_test_required: isTestRequired,
      };

      console.log("request body:", requestBody);

      localStorage.setItem(
        "expertiseData",
        JSON.stringify({
          description: description,
          techStack: techStack,
          jobtype: jobtype,
          position: position,
          isTestRequired: isTestRequired,
        })
      );

      try {
        setIsLoading(true);
        console.log(
          "Payload size in bytes:",
          new Blob([JSON.stringify(requestBody)]).size
        );

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_REMOTE_URL}/create-position`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(requestBody),
          }
        );
        const data = await response.json();
        console.log("data of just created position:", data);
        console.log("data of created position:", data?.data?.data?.position_id);
        setPositionId(data?.data?.data?.position_id);
        setPositionName(data?.data?.data?.position);
        setIsLoading(false);
        console.log(data);
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    };

    useEffect(() => {
      console.log("positionId", positionId);
      console.log("questionId", questionId);
    }, [positionId, questionId, router?.isReady]);

    useEffect(() => {
      console.log("expertise for coding:", codingExpertise);
    }, [codingExpertise]);

    const handleFormSubmitForTest = async () => {
      const requestBody = {
        expertise: techStack,
        position_id: positionId,
      };
      console.log("req body : ", requestBody);
      try {
        setIsLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_REMOTE_URL}/prepare-test`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(requestBody),
          }
        );
        const data = await response.json();
        console.log("response data of a test creation:", data);
        setQuestionId(data?.data?.message?.question_id);
        console.log("question id:");
        setIsLoading(false);
        setMessage("Successfully created a test for your job!");
        showSuccess();
        console.log(data);
      } catch (error) {
        console.error("Error submitting form:", error);
      }
      console.log("required:", isTestRequired);
      if (isTestRequired === true) {
        try {
          setIsLoading(true);
          const req = {
            codingExpertise: codingExpertise,
            position_id: positionId,
          };

          
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_REMOTE_URL}/get-coding-question`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(req),
            }
          );
          const data = await response.json();
          setCodeQues(data);
          setAssessmentId(data?.data?.assessment_id);
          console.log("assessment id:", assessmentId);
          console.log("code question data:", data);
          setIsLoading(false);
          try{
              const body ={
                position_id: positionId,
                is_test_req: isTestRequired
              }

              console.log("body data sent in setPositionTestReq:",body);
              const response = await fetch(`${process.env.NEXT_PUBLIC_REMOTE_URL}/set-position-test-req`, {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${token}`,
                  },
                  body: JSON.stringify(body),
              });
              const data = await response.json();
              setCodeQues(data);
          } catch(err){
              console.log('ERROR:',err);
          }
        } catch (err) {
          console.error("ERROR:", err);
        }
      }
    };

    useEffect(() => {
      console.log("codeQues:", codeQues);
    }, [codeQues]);

    const addEmailReceiver = () => {
      console.log("Adding a new email receiver");
      setEmailReceivers((currentReceivers) => {
        const newReceivers = [...currentReceivers, { email: "" }];
        console.log("new recievers:");
        return newReceivers;
      });
    };

    const addNameReceiver = () => {
      console.log("Adding a new name receiver");
      setNameReceivers((currentReceivers) => {
        const newReceivers = [...currentReceivers, { name: "" }];
        console.log("new recievers:");
        return newReceivers;
      });
    };

    const handleNameChange = (e, index) => {
      const newNameReceivers = [...nameReceivers];
      newNameReceivers[index].email = e.target.value;
      setNameReceivers(newNameReceivers)
    }

    const handleEmailChange = (e, index) => {
      const newEmailReceivers = [...emailReceivers];
      newEmailReceivers[index].email = e.target.value;
      setEmailReceivers(newEmailReceivers);
    };

    const removeEmailReceiver = (index) => {
      setEmailReceivers((currentReceivers) => currentReceivers.filter((_, i) => i !== index))
      setNameReceivers((currentReceivers) => currentReceivers.filter((_, i) => i !== index))
    }

    const handleEmailInvite = async () => {

      console.log("HANDLE EMAIL INVITE")
      let hasError = false;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      const validatedReceivers = emailReceivers.map((receiver, index) => {
        const emailIsValid = emailRegex.test(receiver.email.trim());
        const nameIsValid = nameReceivers[index]?.name?.trim() !== "";

        if (!emailIsValid && !nameIsValid) {
          setMessage("Both name and email are required for each entry.");
          showError();
          hasError = true;
          return null;
        } else if (!emailIsValid) {
          setMessage("Please enter a valid email address.");
          showError();
          hasError = true;
          return null;
        } else if (!nameIsValid) {
          setMessage("Please enter a name for each email.");
          showError();
          hasError = true;
          return null;
        }
        return receiver;
      }).filter(receiver => receiver !== null);

      if (hasError) return;

      const sendInvitesPromises = validatedReceivers.map(receiver => {
        return fetch(`${process.env.NEXT_PUBLIC_REMOTE_URL}/sendMail`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            to: receiver.email,
            subject: subject,
            text: text,
          }),
        });
      });
      try {
        await Promise.all(sendInvitesPromises);
        setMessage("Invitations have been sent to all candidates via email");
        showSuccess();
        onClose();
      } catch (error) {
        console.error("Error sending invites:", error);
        setMessage("Failed to send invitations, please try again.");
        showError();
      }
    };

    const validateReceivers = async () => {
      for (let receiver of receivers) {
        if (!receiver.email || !isValidEmail(receiver.email) || !receiver.name.trim()) {
          console.log("!receiver.email",!receiver.email, " !isValidEmail(receiver.email)",!isValidEmail(receiver.email), '!receiver.name.trim()',!receiver.name.trim())
          setMessage("Each receiver must have a valid name and email.");
          showError();
          return false;
        }
      }
      return true; // All receivers are valid
    };

    return (
      <>
        <div ref={overlayRef} className={styles.parent}>
          {showErrorMessage && (
            <ErrorIndicator
              showErrorMessage={showErrorMessage}
              msgText={message}
            />
          )}
          {showSuccessMessage && (
            <SuccessIndicator
              showSuccessMessage={showSuccessMessage}
              msgText={message}
            />
          )}
          <div className={styles.btn}>
            <button onClick={onClose}>
              <Image src="/shut.svg" width={15} height={15} />
            </button>
          </div>
          <div className={styles.superContainer}>
            {isLoading ? (
              <div className={styles.loader}></div>
            ) : (
              <div className={styles.coverContainer}>
                <div className={styles.topContainer}>
                  <h2>{stageHeadings[currentStage]}</h2>

                  {stageHeadings[currentStage] === "Add Skills" ? (
                    <p>
                      You can add maximum of 4 skills and minimum of 1
                      <span>
                        <Image src="/warning2.svg" width={15} height={15} />
                      </span>
                    </p>
                  ) : null}
                </div>

                <Stages
                  currentStage={currentStage}
                  stages={stages}
                  completedStages={completedStages}
                />

                {currentStage === stages.ADD_SKILL && (
                  <>
                    <AddSkillForm
                      skill1={skill1}
                      setSkill1={setSkill1}
                      skill2={skill2}
                      setSkill2={setSkill2}
                      skill3={skill3}
                      setSkill3={setSkill3}
                      skill4={skill4}
                      setSkill4={setSkill4}
                      level1={level1}
                      setLevel1={setLevel1}
                      level2={level2}
                      setLevel2={setLevel2}
                      level3={level3}
                      setLevel3={setLevel3}
                      level4={level4}
                      setLevel4={setLevel4}
                      codingExpertise={codingExpertise}
                      setCodingExpertise={setCodingExpertise}
                      isTestRequired={isTestRequired}
                      setIsTestRequired={setIsTestRequired}
                      expertiseRef={expertiseRef}
                      setTechStack={setTechStack}
                    />
                    <div className={styles.wrapper}>
                      <RightBottomBtns
                        onContinue={toggleComponent}
                        onBack={backToggleComponent}
                        onClose={onClose}
                        setCompletedStages={setCompletedStages}
                        completedStages={completedStages}
                      />
                    </div>
                  </>
                )}

                {currentStage === stages.JOB_TYPE && (
                  <>
                    <JobType
                      position={position}
                      jobtype={jobtype}
                      description={description}
                      city={city}
                      country={country}
                      positionRef={positionRef}
                      jobTypeRef={jobTypeRef}
                      descriptionRef={descriptionRef}
                      cityRef={cityRef}
                      countryRef={countryRef}
                      setPosition={setPosition}
                      setJobtype={setJobtype}
                      setDescription={setDescription}
                      setCity={setCity}
                      setCountry={setCountry}
                    />
                    <div className={styles.wrapper}>
                      <JobTypeBtns
                        showError={showError}
                        showErrorMessage={showErrorMessage}
                        showSuccess={showSuccess}
                        setMessage={setMessage}
                        onContinue={toggleComponent}
                        onBack={backToggleComponent}
                      />
                    </div>
                  </>
                )}

                {currentStage === stages.AI_ASSESSMENT && (
                  <>
                    <AIassessment />
                    <div className={styles.wrapper}>
                      <AssessmentBtns
                        showSuccess={showSuccess}
                        setMessage={setMessage}
                        onContinue={toggleComponent}
                        onBack={backToggleComponent}
                      />
                    </div>
                  </>
                )}

                {currentStage === stages.SHARE_LINK && (
                  <>
                    <ShareLink
                      receivers={receivers}
                      removeReceiver={removeReceiver}
                      setReceivers={setReceivers}
                      handleReceiverChange={handleReceiverChange}
                      name={name}
                      setName={setName}
                      assessmentId={assessmentId}
                      isTestRequired={isTestRequired}
                      setEmailReceivers={setEmailReceivers}
                      emailReceivers={emailReceivers}
                      handle
                      handleEmailChange={handleEmailChange}
                      handleNameChange={handleNameChange}
                      addEmailReceiver={addEmailReceiver}
                      questionId={questionId}
                      positionId={positionId}
                      companyId={id}
                      nameReceivers={nameReceivers}
                      emailReceiver={emailReceiver}
                      setEmailReceiver={setEmailReceiver}
                      setNameReceivers={setNameReceivers}
                      setText={setText}
                      text={text}
                      setSubject={setSubject}
                      subject={subject}
                      position={position}
                      showSuccess={showSuccess}
                      setMessage={setMessage}
                      removeEmailReceiver={removeEmailReceiver}
                      positionName={positionName}
                    />
                    <div className={styles.wrapper}>
                      <ShareLinkBtns
                        showError={showError}
                        validateReceivers={validateReceivers}
                        showSuccess={showSuccess}
                        setMessage={setMessage}
                        handleEmailInvite={handleEmailInvite}
                        onContinue={toggleComponent}
                        onBack={backToggleComponent}
                        onClose={onClose}
                      />
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
);

export default Overlay;
