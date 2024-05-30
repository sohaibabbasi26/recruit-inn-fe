import gsap from "gsap";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import CandSelfAssessment from "./CandSelfAssessment";
import CandSelfAssessmentBtns from "./CandSelfAssessmentBtns";
import CandSelfSkill from "./CandSelfSkill";
import CandSelfSkillBtns from "./CandSelfSkillBtn";
import CandidateVerifyBtns from "./CandVerifyBtns";
import CandidateVerify from "./CandidateVerify";
import ErrorIndicator from "./ErrorIndicator";
import styles from "./SelfOverlay.module.css";
import PersonalInfoBtns from "./PersonalInfoBtns";
import PersonalInfoSelf from "./PersonalInfoself";
import Stages from "./Stages";
import SuccessIndicator from "./SuccessIndicator";
import PersonalInfoSelfBtns from "./PersonalInfoSelfBtns";

const SelfOverlay = ({
  showOverlay,
  onClose,
  stages,
  stageHeadings,
  isTestRequired,
  setIsTestRequired,
}) => {
  const overlayRef = useRef();

  const nameRef = useRef();
  const contactRef = useRef();
  const passwordRef = useRef();
  const emailRef = useRef();
  const expertiseRef = useRef();
  const countryRef = useRef();
  const cityRef = useRef();
  const generatedCodeRef = useRef();

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
  }, [showOverlay, onClose]);

  const router = useRouter();
  const infoSymbolSize = 20;
  const [currentStage, setCurrentStage] = useState(stages.PERSONAL_INFO);
  const [completedStages, setCompletedStages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [candidate, setCandidate] = useState();
  const [checkIfEmailPresent, setCheckIfEmailPresent] = useState(false);
  const [generatedCode, setGeneratedCode] = useState();
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [name, setName] = useState(null);
  const [country, setCountry] = useState(null);
  const [city, setCity] = useState(null);
  const [expertise, setExpertise] = useState(null);
  const [email, setEmail] = useState(null);
  const [contact, setContact] = useState(null);
  const [password, setPassword] = useState(null);
  const [otp, setOtp] = useState(null);
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
  const [testReq, setTestReq] = useState(false);
  const [assessmentId, setAssessmentId] = useState(null);
  const [codeQues, setCodeQues] = useState(null);
  const [skill1, setSkill1] = useState("");
  const [skill2, setSkill2] = useState("");
  const [level1, setLevel1] = useState("");
  const [level2, setLevel2] = useState("");
  const [isLevelEntered, setIsLevelEntered] = useState();
  // const [testRequirement, setIsTestRequirement] = useState(false);

  const [testRequirement, setTestRequirement] = useState(false);

  useEffect(() => {
    const reqBody = {
      name: name,
      city: city,
      contact_no: contact,
      Password: password,
      email: email,
      over_all_exp: expertise,
      country: country,
      applied_through: "Self",
    };

    const reqtwo = {
      expertise: techStack,
    };

    setReq(reqtwo);
    setReqBody(reqBody);
  }, [name, city, contact, password, email, expertise, country, techStack]);

  const toggleComponent = async () => {
    const skills = [
      { skill: skill1, level: level1 },
      { skill: skill2, level: level2 },
    ];

    const isAnySkillEntered = skills.some(({ skill }) => skill.trim());

    const areAllLevelsSelected = skills.every(({ skill, level }) => {
      return skill.trim() ? level : true;
    });

    if (areAllLevelsSelected) {
      setIsLevelEntered(true);
    }

    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;

    if (
      currentStage === stages.PERSONAL_INFO &&
      (!name?.trim() ||
        !email?.trim() ||
        !contact?.trim() ||
        !expertise?.trim() ||
        !country?.trim() ||
        !city?.trim() ||
        !password.trim() ||
        !confirmPassword?.trim())
    ) {
      setMessage("Please fill all the fields first");
      showError();
      return;
    } else if (
      currentStage === stages.PERSONAL_INFO &&
      checkIfCandidateAlreadyThere() === true
    ) {
      // setMessage("Entered email is already registered");
      // showError();
      return;
    } else if (
      currentStage === stages.PERSONAL_INFO &&
      !validateEmailReceiver()
    ) {
      setMessage("Entered email is not valid");
      showError();
      return;
    } else if (
      currentStage === stages.PERSONAL_INFO &&
      !validateNameReceiver()
    ) {
      setMessage("Entered name is not valid");
      showError();
      return;
    } else if (
      currentStage === stages.PERSONAL_INFO &&
      !validateContactReciever()
    ) {
      setMessage("Entered contact is not valid");
      showError();
      return;
    } else if (currentStage === stages.PERSONAL_INFO && password.length < 8) {
      setMessage("Password must be at least 8 characters long ");
      showError();
      return;
    } else if (
      currentStage === stages.PERSONAL_INFO &&
      !validateNumber(contact)
    ) {
      return;
    } else if (currentStage === stages.PERSONAL_INFO && !isConfirmPassword()) {
      setMessage("Confirm password is different");
      showError();
      return;
    } else if (currentStage === stages.SKILLS && !validateAddSkill()) {
      setMessage("At least enter one skill!");
      showError();
      return;
    } else if (isAnySkillEntered && !areAllLevelsSelected) {
      setMessage("Please select a level for the entered skills.");
      showError();
      return;
    }

    const newCompletedStages = [...completedStages, currentStage];
    setCompletedStages(newCompletedStages);

    if (currentStage === stages.SHARE_LINK) {
      router.push("/");
    } else {
      switch (currentStage) {
        case stages.PERSONAL_INFO:
          const requestBody = {
            name: name,
            city: city,
            contact_no: contact,
            email: email,
            over_all_exp: expertise,
            country: country,
            applied_through: "Self",
            password: password,
          };

          console.log("Request body:", requestBody);
          if (!checkIfEmailPresent) {
            setCurrentStage(stages.VERIFICATION);
            return;
          } else if (checkIfEmailPresent === true) {
            setCurrentStage(stages.PERSONAL_INFO);
            return;
          }
          break;
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
  };

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
        setCurrentStage(stages.JOB_DETAIL);
    }
  };

  function generateRandomCode() {
    const randomCode = Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, "0");
    console.log("Generated OTP:", randomCode);
    return randomCode;
  }

  const validateAddSkill = () => {
    return techStack.some(
      (skillObj) => skillObj.skill && skillObj.skill.trim() !== ""
    );
  };

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
    if (!isValidEmail(email)) {
      return false;
    }
    return true;
  };
  const validateNameReceiver = () => {
    if (!isValidName(name)) {
      return false;
    }
    return true;
  };
  const validateContactReciever = () => {
    if (!isvalidphone(contact)) {
      return false;
    }
    return true;
  };
  const validatePasswordReciever = () => {
    if (password.length < 8) {
      return false;
    }
    return true;
  };

  const validateNumber = (contact) => {
    const num = parseInt(contact);
    if (isNaN(num)) {
      setMessage("Please enter a valid number.");
      showError();
      return false;
    } else if (num < 10) {
      setMessage("Number must be greater than or equal to 10.");
      showError();
      return false;
    } else {
      return true;
    }
  };

  function isConfirmPassword() {
    return password === confirmPassword;
  }

  const isValidEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
  };
  const isValidName = (name) => {
    const nameRegex = /^[a-zA-Z]+(?:[. ][a-zA-Z]+)*$/;
    return nameRegex.test(name);
  };
  const isvalidphone = (phone) => {
    const phoneRegex = /^\+[1-9]\d{6,14}$/;
    return phoneRegex.test(phone);
  };
  // const isvalidpassword = (password) => {

  // }
  const validatePassword = (password) => {
    if (password && password.length < 8) {
      setMessage("Password must be at least 8 characters long.");
      showError();
      return false;
    } else {
      return true;
    }
  };

  const checkIfCandidateAlreadyThere = async () => {
    setIsLoading(true);
    try {
      const reqBody = {
        email: email,
      };

      console.log("request body:", reqBody);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_REMOTE_URL}/check-candidate-self`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reqBody),
        }
      );
      const data = await response.json();
      console.log("data:", data);
      if (data?.data?.candidate_id) {
        setCheckIfEmailPresent(true);
        setCurrentStage(stages.PERSONAL_INFO);
        setMessage("Entered email is already registered");
        showError();
      } else {
        // setCurrentStage(stages.VERIFICATION);
        await sendEmail(email);
        setCheckIfEmailPresent(false);
      }
      return checkIfEmailPresent;
    } catch (err) {
      console.log("ERR:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePersonalInfo = async () => {
    setIsLoading(true);
    try {
      const requestBody = {
        name: name,
        city: city,
        contact_no: contact,
        email: email,
        over_all_exp: expertise,
        country: country,
        applied_through: "Self",
        password: password,
      };

      console.log("Request body:", requestBody);
      setPersonalInfo(requestBody);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_REMOTE_URL}/candidate-info-self`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      const data = await response.json();
      console.log("candidate:", data);

      if (data?.data?.data) {
        setCandidateId(data.data.data.candidate_id);
        setCandidate(data.data.data);
        await sendEmail(email);
        setIsLoading(false);
        return true;
      } else {
        setMessage(
          data?.message || "Email used for registering is already in use!"
        );
        showError();
        setCurrentStage(stages.PERSONAL_INFO);
        setIsLoading(false);
        return false;
      }
    } catch (err) {
      console.log("ERRROR:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("current check if email present:,", checkIfEmailPresent);
  }, [checkIfEmailPresent]);

  useEffect(() => {
    console.log("recent generated otp:,", generatedCode);
    console.log(text);
  }, [generatedCode]);

  async function sendEmail(email) {
    const otpCode = generateRandomCode();
    setGeneratedCode(otpCode);
    console.log("otp:", otpCode);
    try {
      const requestBody = {
        to: email,
        subject: "RECRUITINN: Verify your account!",
        text: `
          Your verification code is : ${otpCode}
        `,
      };
      console.log("request body: ", requestBody);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_REMOTE_URL}/sendMail`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      const data = await response.json();
      console.log("data in Self overlay:", data);
    } catch (err) {
      console.log("ERRROR:", err);
    }
  }

  const verifyCode = async () => {
    const otpCode = otp;
    console.log("generated code:", generatedCode);
    console.log("entered otp code:", otpCode);
    if (generatedCode === otpCode) {
      console.log("here in verify code if block");
      setCurrentStage(stages.SKILLS);
      setMessage("Success!");
      showSuccess();
      const result = await handlePersonalInfo();
      console.log("result ====", result);
    } else {
      setMessage("Invalid code entered, please try again");
      showError();
      setIsCodeInvalid(true);
      console.error("its invalid");
    }
  };

  const handleSetExpertise = async () => {
    const requestBody = {
      token: candidateId,
      expertise: techStack,
    };

    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_REMOTE_URL}/set-expertise-by-cand`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );
      const data = await response.json();
      console.log("data in set expertise:", data);
    } catch (err) {
      console.log("error:", err);
    }
  };

  useEffect(() => {
    console.log("Loading status", isLoading);
  }, [isLoading]);

  const handleTestPreparation = async () => {
    console.log("request.boy in handle test prep method:", req);
    console.log("handle test prep here!");
    try {
      console.log("Loading status", isLoading);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_REMOTE_URL}/prepare-test`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(req),
        }
      );
      const data = await response.json();
      localStorage.setItem("testData", JSON.stringify(data));
      setQuestionId(data?.data?.message?.question_id);
      console.log("question id:", questionId);
      console.log("data in test preparation:", data);
      setIsLoading(false);
      console.log("Loading status", isLoading);

      if (isTestRequired === true) {
        try {
          setIsLoading(true);
          const req = {
            codingExpertise: techStack,
            candidate_id: candidateId,
          };
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_REMOTE_URL}/get-coding-question`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(req),
            }
          );
          const data = await response.json();
          console.log("code data:", data);
          if (data?.data?.assessment_id) {
            setCodeQues(data);
            setAssessmentId(data?.data?.assessment_id);
          }
          console.log("Data is here:", codeQues);
          console.log("assessment id:", assessmentId);
          if (data?.data?.assessment_id) {
            setTestReq(true);
          }

          console.log("assessment id:", assessmentId);
          console.log("code question data:", data);
          setIsLoading(false);
        } catch (err) {
          console.error("ERROR:", err);
        }

        try {
          const req = {
            is_test_req: isTestRequired,
            candidate_id: candidateId,
          };
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_REMOTE_URL}/set-cand-test-req`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(req),
            }
          );
          const data = await response.json();
          console.log("data is updated perfectly:", data);
        } catch (err) {
          console.log("ERROR:", err);
        }
      }
    } catch (err) {
      console.log("error:", err);
    }
  };

  useEffect(() => {
    console.log("code assessment id:", assessmentId);
  }, [assessmentId]);

  return (
    <>
      {showErrorMessage && (
        <ErrorIndicator showErrorMessage={showErrorMessage} msgText={message} />
      )}
      <div ref={overlayRef} className={styles.parent}>
        <SuccessIndicator
          showSuccessMessage={showSuccessMessage}
          msgText={message}
        />
        <ErrorIndicator showErrorMessage={showErrorMessage} msgText={message} />

        <div className={styles.superContainer}>
          {isLoading ? (
            <div className={styles.loader}></div>
          ) : (
            <div className={styles.coverContainer}>
              <div className={styles.topContainer}>
                <h2>{stageHeadings[currentStage]}</h2>
              </div>

              <Stages
                currentStage={currentStage}
                stages={stages}
                completedStages={completedStages}
              />

              {currentStage === stages.PERSONAL_INFO && (
                <>
                  <PersonalInfoSelf
                    expertiseRef={expertiseRef}
                    contact={contact}
                    password={password}
                    confirmPassword={confirmPassword}
                    setConfirmPassword={setConfirmPassword}
                    expertise={expertise}
                    name={name}
                    email={email}
                    country={country}
                    city={city}
                    passwordRef={passwordRef}
                    contactRef={contactRef}
                    nameRef={nameRef}
                    cityRef={cityRef}
                    countryRef={countryRef}
                    emailRef={emailRef}
                    setName={setName}
                    setPassword={setPassword}
                    setExpertise={setExpertise}
                    setContact={setContact}
                    setCity={setCity}
                    setEmail={setEmail}
                    setCountry={setCountry}
                    setIsTestRequired={setIsTestRequired}
                  />
                  <div className={styles.wrapper}>
                    <PersonalInfoSelfBtns
                      showSuccess={showSuccess}
                      setMessage={setMessage}
                      validateEmailReceiver={validateEmailReceiver}
                      validateNameReceiver={validateNameReceiver}
                      validateContactReciever={validateContactReciever}
                      validatePasswordReciever={validatePasswordReciever}
                      showError={showError}
                      onContinue={toggleComponent}
                      onBack={backToggleComponent}
                    />
                  </div>
                </>
              )}
              {currentStage === stages.VERIFICATION && (
                <>
                  <CandidateVerify
                    sendEmail={sendEmail}
                    showSuccess={showSuccess}
                    email={email}
                    setMessage={setMessage}
                    otp={otp}
                    setOtp={setOtp}
                    isCodeInvalid={isCodeInvalid}
                    setIsCodeInvalid={setIsCodeInvalid}
                  />
                  <div className={styles.wrapper}>
                    <CandidateVerifyBtns
                      onContinue={toggleComponent}
                      onBack={backToggleComponent}
                    />
                  </div>
                </>
              )}

              {currentStage === stages.SKILLS && (
                <>
                  <CandSelfSkill
                    skill1={skill1}
                    skill2={skill2}
                    setSkill1={setSkill1}
                    setSkill2={setSkill2}
                    level1={level1}
                    level2={level2}
                    setLevel1={setLevel1}
                    setLevel2={setLevel2}
                    isTestRequired={isTestRequired}
                    setIsTestRequired={setIsTestRequired}
                    handleTestPreparation={handleTestPreparation}
                    setTechStack={setTechStack}
                    setTestRequirement={setTestRequirement}
                    testRequirement={testRequirement}
                  />

                  <div className={styles.wrapper}>
                    <CandSelfSkillBtns
                      handleTestPreparation={handleTestPreparation}
                      onContinue={toggleComponent}
                      onBack={backToggleComponent}
                    />
                  </div>
                </>
              )}

              {currentStage === stages.ASSESSMENT && (
                <>
                  <CandSelfAssessment />
                  <div className={styles.wrapper}>
                    <CandSelfAssessmentBtns
                      isTestRequired={isTestRequired}
                      assessmentId={assessmentId}
                      setIsLoading={setIsLoading}
                      questionId={questionId}
                      candidateId={candidateId}
                      onContinue={toggleComponent}
                      onBack={backToggleComponent}
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
};

export default SelfOverlay;
