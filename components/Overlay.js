import gsap from "gsap";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import AIassessment from "./AIassesment";
import AddSkillForm from "./AddSkillForm";
import AssessmentBtns from "./AssessmentBtns";
import JobType from "./JobType";
import JobTypeBtns from "./JobTypeBtns";
import styles from "./Overlay.module.css";
import RightBottomBtns from "./RightBottomBtns";
import ShareLink from "./ShareLink";
import ShareLinkBtns from "./ShareLinkBtns";
import Stages from "./Stages";
// import { useTest } from '@/contexts/QuestionsContent';
// import { useExpertiseContext } from '@/contexts/ExpertiseContext';
import React from "react";
import ErrorIndicator from "./ErrorIndicator";
import SuccessIndicator from "./SuccessIndicator";
import SocialShare from "./SocialShare";
import Head from "next/head";

const Overlay = React.memo(
  ({
    setIsTestRequired,
    isArabicChosen,
    setIsArabicChosen,
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
    interviewCount,
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
        document.body.style.overflow = "";
        gsap.to(overlayRef.current, {
          y: "100%",
          opacity: 0,
          duration: 0.1,
          ease: "power1",
        });
      };
    }, [showOverlay]);

    const { id } = router?.query;

    const [currentStage, setCurrentStage] = useState(stages.ADD_SKILL);
    const [completedStages, setCompletedStages] = useState([]);
    const [techStack, setTechStack] = useState(null);
    const [position, setPosition] = useState(null);
    const [city, setCity] = useState(null);
    const [country, setCountry] = useState(null);
    const [jobtype, setJobtype] = useState(null);
    const [description, setDescription] = useState("");
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
    const [nameReceivers, setNameReceivers] = useState([{ name: "" }]);
    const [assessmentId, setAssessmentId] = useState();
    const [skill1, setSkill1] = useState("");
    const [skill2, setSkill2] = useState("");
    const [skill3, setSkill3] = useState("");
    const [skill4, setSkill4] = useState("");
    // const [codingSkill, setCodingSkill] = useState("");
    const [level, setLevel] = useState(null);
    const [level1, setLevel1] = useState("");
    const [level2, setLevel2] = useState("");
    const [level3, setLevel3] = useState("");
    const [level4, setLevel4] = useState("");
    const [isLevelEntered, setIsLevelEntered] = useState("");
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
      const newReceivers = [...receivers];
      newReceivers.splice(index, 1);
      setReceivers(newReceivers);
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
      // we set this in TopContainer.js for it to work for now...
      // setDescription(descriptionRef?.current?.value);
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
      //("description:", description);
    }, [description]);

    const validateJobType = () => {
      const positionValid =
        positionRef.current && positionRef.current.value.trim() !== "";
      const jobTypeValid =
        jobTypeRef.current && jobTypeRef.current.value.trim() !== "";
      const descriptionValid = description && description.trim() !== "";

      // Validate city and country only for On-site and Hybrid job types
      const jobType = jobTypeRef.current?.value;
      console.warn(jobType, "////////");
      const cityValid =
        jobType == "On-site" || jobType == "Hybrid"
          ? cityRef.current && cityRef.current.value.trim() !== ""
          : true;
      const countryValid =
        jobType === "On-site" || jobType === "Hybrid"
          ? countryRef.current && countryRef.current.value.trim() !== ""
          : true;

      return (
        positionValid &&
        jobTypeValid &&
        descriptionValid &&
        cityValid &&
        countryValid
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

      const isAnySkillEntered = skillsWithLevels.some(({ skill }) =>
        skill.trim()
      );
      const areAllLevelsSelected = skillsWithLevels.every(
        ({ skill, level }) => {
          return skill.trim() ? level : true;
        }
      );

      if (areAllLevelsSelected) {
        setIsLevelEntered(true);
      }

      let newCompletedStages = [...completedStages, currentStage];
      setCompletedStages(newCompletedStages);

      switch (currentStage) {
        case stages.ADD_SKILL:
          isValid = validateAddSkill();
          if (!isValid) {
            setMessage(
              "Please enter at least one skill and its difficulty level properly"
            );
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
          } else if (description.length > 3000) {
            setMessage("Maximum 3000 words limit");
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
      const jobType = jobTypeRef.current.value;

      const requestBody = {
        position: positionRef.current.value,
        company_id: id,
        expertise: techStack,
        job_type: jobType,
        description: description,
        location:
          jobType === "On-site" || jobType === "Hybrid"
            ? `${cityRef.current.value}, ${countryRef.current.value}`
            : "",
        is_test_required: isTestRequired,
        language: isArabicChosen ? "Arabic" : "English",
        coding_level: level,
      };

      //("request body:", requestBody);

      localStorage.setItem(
        "expertiseData",
        JSON.stringify({
          description: description,
          techStack: techStack,
          jobtype: jobtype,
          position: position,
          isTestRequired: isTestRequired,
          language: isArabicChosen ? "Arabic" : "English",
          coding_level: level,
        })
      );

      try {
        setIsLoading(true);
        // //(
        //   "Payload size in bytes:",
        //   new Blob([JSON.stringify(requestBody)]).size
        // );

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
        //("data of just created position:", data);
        //("data of created position:", data?.data?.data?.position_id);
        setPositionId(data?.data?.data?.position_id);
        setPositionName(data?.data?.data?.position);
        setIsLoading(false);
        //(data);
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    };

    useEffect(() => {
      //("positionId", positionId);
      //("questionId", questionId);
    }, [positionId, questionId, router?.isReady]);

    useEffect(() => {
      //("expertise for coding:", codingExpertise);
    }, [codingExpertise]);

    const handleFormSubmitForTest = async () => {
      const requestBody = {
        expertise: techStack,
        position_id: positionId,
        isArabic: isArabicChosen,
      };
      //("req body : ", requestBody);
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
        //("response data of a test creation:", data);
        setQuestionId(data?.data?.message?.question_id);
        //("question id:");
        setIsLoading(false);
        setMessage("Successfully created a test for your job!");
        showSuccess();
        //(data);
      } catch (error) {
        console.error("Error submitting form:", error);
      }
      //("required:", isTestRequired);
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
          //("assessment id:", assessmentId);
          //("code question data:", data);
          setIsLoading(false);
          try {
            const body = {
              position_id: positionId,
              is_test_req: isTestRequired,
            };

            //("body data sent in setPositionTestReq:", body);
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_REMOTE_URL}/set-position-test-req`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(body),
              }
            );
            const data = await response.json();
            setCodeQues(data);
          } catch (err) {
            //("ERROR:", err);
          }
        } catch (err) {
          console.error("ERROR:", err);
        }
      }
    };

    useEffect(() => {
      //("codeQues:", codeQues);
    }, [codeQues]);

    const addEmailReceiver = () => {
      if (receivers.length < 3) {
        setReceivers([...receivers, { name: "", email: "" }]);
      }
    };

    const addNameReceiver = () => {
      //("Adding a new name receiver");
      setNameReceivers((currentReceivers) => {
        const newReceivers = [...currentReceivers, { name: "" }];
        //("new recievers:");
        return newReceivers;
      });
    };

    const handleNameChange = (e, index) => {
      const newNameReceivers = [...nameReceivers];
      newNameReceivers[index].email = e.target.value;
      setNameReceivers(newNameReceivers);
    };

    const handleEmailChange = (e, index) => {
      const newEmailReceivers = [...emailReceivers];
      newEmailReceivers[index].email = e.target.value;
      setEmailReceivers(newEmailReceivers);
    };

    const removeEmailReceiver = (index) => {
      setEmailReceivers((currentReceivers) =>
        currentReceivers.filter((_, i) => i !== index)
      );
      setNameReceivers((currentReceivers) =>
        currentReceivers.filter((_, i) => i !== index)
      );
    };
    const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
    const handleEmailInvite = async () => {
      let isValid = true;

      // Validate each receiver
      receivers.forEach((receiver) => {
        const trimmedEmail = receiver.email.trim();
        const trimmedName = receiver.name.trim();

        if (trimmedEmail === "" || !validateEmail(trimmedEmail)) {
          console.error("Invalid email address:", receiver.email);
          setMessage("Please enter a valid email address for all candidates.");
          showError();
          isValid = false;
        }

        if (trimmedName === "") {
          console.error("Name field is empty:", receiver.name);
          setMessage("Please enter a name for all candidates.");
          showError();
          isValid = false;
        }
      });

      if (!isValid) {
        // If any receiver is invalid, stop and return
        return;
      }

      const validEmailReceivers = receivers.filter((receiver) => {
        const trimmedEmail = receiver.email.trim();
        return validateEmail(trimmedEmail);
      });

      const sendInvitesPromises = validEmailReceivers.map((receiver) => {
        //("Checking Email Functionality", receiver.email);
        return fetch(`${process.env.NEXT_PUBLIC_REMOTE_URL}/sendMail`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Ensure token is defined
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
        //("Emails sent successfully");
        setMessage("Invitations have been sent to all candidates via email");
        showSuccess();
        onClose();
      } catch (error) {
        console.error("Error sending invites:", error);
        setMessage("Error sending invites. Please try again later.");
      }
    };

    return (
      <>
        <Head>
          <title>Job - Recruitinn</title>
          <meta
            name="description"
            content="Revolutionize your hiring process with Recruitinn's AI-powered recruitment platform. Discover top talent faster, streamline hiring, and make data-driven decisions with ease. Experience the future of recruitment today!"
          />
          <meta property="og:title" content="Job - Recruitinn" />
          <meta
            property="og:description"
            content="Revolutionize your hiring process with Recruitinn's AI-powered recruitment platform. Discover top talent faster, streamline hiring, and make data-driven decisions with ease. Experience the future of recruitment today!"
          />
          <meta
            property="og:image"
            content="https://app.recruitinn.ai/og-image.png"
          />
          <meta
            property="og:url"
            content={`${
              process.env.NEXT_PUBLIC_URL
            }/invited-candidate?position_id=${positionId}&client_id=${id}&q_id=${questionId}&a_id=${assessmentId}&test_req=${isTestRequired}&language=${
              isArabicChosen ? "Arabic" : "English"
            }`}
          />
          <meta property="og:type" content="website" />
        </Head>
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
                      Please select at least 1 skill and up to a maximum of 4
                      skills
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
                      isArabicChosen={isArabicChosen}
                      setIsArabicChosen={setIsArabicChosen}
                      skill1={skill1}
                      setSkill1={setSkill1}
                      skill2={skill2}
                      setSkill2={setSkill2}
                      skill3={skill3}
                      setSkill3={setSkill3}
                      skill4={skill4}
                      setSkill4={setSkill4}
                      level={level}
                      setLevel={setLevel}
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
                        currentStage={currentStage}
                        stages={stages}
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
                        showBackBtn={false}
                      />
                    </div>
                  </>
                )}

                {currentStage === stages.SHARE_LINK && (
                  <>
                    <ShareLink
                      language={isArabicChosen ? "Arabic" : "English"}
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
                      interviewCount={interviewCount}
                    />
                    <div className={styles.wrapper}>
                      <SocialShare
                        url={`${
                          process.env.NEXT_PUBLIC_URL
                        }/invited-candidate?position_id=${positionId}&client_id=${id}&q_id=${questionId}&a_id=${assessmentId}&test_req=${isTestRequired}&language=${
                          isArabicChosen ? "Arabic" : "English"
                        }`}
                      />
                      <ShareLinkBtns
                        showError={showError}
                        receivers={receivers}
                        showSuccess={showSuccess}
                        setMessage={setMessage}
                        handleEmailInvite={handleEmailInvite}
                        onContinue={toggleComponent}
                        onBack={backToggleComponent}
                        onClose={onClose}
                        interviewCount={interviewCount}
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
