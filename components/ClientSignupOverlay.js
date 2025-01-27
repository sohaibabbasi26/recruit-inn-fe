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
import ClientInfo from "./ClientInfo";
import AdminOverlayBtns from "./AdminOverlayBtns";
import ErrorIndicator from "./ErrorIndicator";
import ClientSignUpOverlayBtn from "./ClientSignUpOverlayBtn";

const ClientSignUpOverlay = ({
  adminToken,
  message,
  showError,
  showErrorMessage,
  showSuccess,
  setMessage,
  showOverlay,
  onClose,
  stages,
  stageHeadings,
}) => {
  console.log("stage headings:".stageHeadings);
  const overlayRef = useRef(null);

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
    };
  }, [showOverlay]);

  const router = useRouter();
  const infoSymbolSize = 20;
  const [currentStage, setCurrentStage] = useState(stages.PERSONAL_INFO);
  const [completedStages, setCompletedStages] = useState([]);
  const [clientname, setClientname] = useState(null);
  const [companyname, setCompanyname] = useState(null);
  const [email, setEmail] = useState(null);
  const [phoneNo, setPhoneNo] = useState(null);
  const [actManager, setActManager] = useState(null);
  const [companySize, setCompanySize] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [city, setCity] = useState(null);
  const [country, setCountry] = useState(null);
  const [companyId, setCompanyId] = useState(null);
  const [text, setText] = useState(null);
  const [subject, setSubject] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [linkk, setLink] = useState();
  const [checkkClient, setCheckClient] = useState();

  const validateEmailReceiver = () => {
    if (!email || !isValidEmail(email)) {
      setMessage("Please enter a valid email address.");
      showError();
      return false;
    }
    return true;
  };
  const validatephoneReceiver = () => {
    if (!phoneNo || !isvalidcontact(phoneNo)) {
      setMessage("Please enter a valid contact number");
      showError();
      return false;
    }
    return true;
  };
  const validateNameReceiver = () => {
    if (!clientname || !isvalidname(clientname)) {
      setMessage("Please enter a valid name");
      showError();
      return false;
    }
    return true;
  };

  const isvalidname = (name) => {
    const nameRegex = /^[a-zA-Z]+(?:[. ][a-zA-Z]+)*$/;
    return nameRegex.test(name);
  };

  const isvalidcontact = (contact) => {
    const phoneRegex = /^\+[1-9]\d{6,14}$/;
    return phoneRegex.test(contact);
  };

  const isValidEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
  };

  const fillValidity = () => {
    return (
      companyname &&
      companySize &&
      companySize !== "Company size" &&
      phoneNo &&
      actManager &&
      password &&
      confirmPassword &&
      country &&
      country !== "Select Country" &&
      city &&
      city !== "Select city" &&
      clientname &&
      email
    );
  };

  let link;
  useEffect(() => {
    setCurrentStage(stages.PERSONAL_INFO);
  }, []);

  useEffect(() => {}, [companyId, email]);

  const getActiveComponent = () => {
    const activeFlow = localStorage.getItem("activeFlow");
    console.log("Current active flow:", activeFlow);
    switch (activeFlow) {
      case "Client":
        router.push(`/client-login`);
        return null;
      case "Admin":
        console.log("its an admin flow!!!!");
        return null;
      default:
        return null;
    }
  };

  const checkClient = async () => {
    const requestBody = {
      email: email,
    };
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_REMOTE_URL}/check-client`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${adminToken}`,
          },
          body: JSON.stringify(requestBody),
        }
      );
      const data = await response.json();
      console.log("checking if client exists:", data);
      return data;
    } catch (e) {
      console.log(e);
      setMessage("some expected error occurs");
      showError();
      return null;
    }
  };

  const handleFormSubmit = async () => {
    // Start by checking if all required fields are filled
    if (
      !companyname ||
      !city ||
      !email ||
      !password ||
      !actManager ||
      !phoneNo
    ) {
      setMessage("Please fill in all required fields.");
      showError();
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const requestBody = {
        company_name: companyname,
        company_location: city,
        email: email,
        password: password,
        account_user_name: actManager,
        contact_no: phoneNo,
      };

      const check = await checkClient();

      if (check?.data?.message !== null) {
        setMessage(
          "Email you are registering with is already in use, try another one!"
        );
        showError();
        // Clear only the email field here
        setEmail(""); // Assuming you have a setEmail function to update email state
        setCompanyname("");
        setPassword("");
        setConfirmPassword("");
        setPhoneNo("");
        setActManager("");
        setClientname("");
        setCompanySize("");
        setCountry("");
        setCity("");
        setIsLoading(false);
        return;
      } else if (check?.data?.message === null) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_REMOTE_URL}/client-sign-up-admin`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                // Authorization: `Bearer ${adminToken}`,
              },
              body: JSON.stringify(requestBody),
            }
          );
          const data = await response.json();
          console.log("login response:", data?.data?.data?.company_id);
          setCompanyId(data?.data?.data?.company_id);
          // await sendMail(data?.data?.data?.company_id);
          setMessage("A client account for you has been created!");
          showSuccess();
          setIsLoading(false);
          // getActiveComponent();
          router.push("/client-login");
        } catch (error) {
          console.error("Error submitting form:", error);
          setMessage("Failed to process form submission.");
          showError();
          setIsLoading(false);
        }
      }
    } catch (err) {
      console.log("ERR:", err);
      setMessage("An unexpected error occurred.");
      showError();
      setIsLoading(false);
    }
  };

  const sendMail = async (companyId) => {
    const demolink = `https://app.recruitinn.ai/set-password/${companyId}`;
    const emailSubject = "RECRUITINN: SET UP YOUR PASSWORD";
    const emailText = `Follow the link to set up your new password: \n ${demolink}`;

    const reqBody = {
      to: email,
      subject: emailSubject,
      text: emailText,
    };

    console.log("body data to be sent:", reqBody);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_REMOTE_URL}/sendMail`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reqBody),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      const data = await response.text();
      console.log("Email sent successfully:", data);
    } catch (error) {
      console.log("Error sending email:", error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div ref={overlayRef} className={styles.parent}>
        <ErrorIndicator showErrorMessage={showErrorMessage} msgText={message} />

        <div className={styles.superContainer}>
          <div className={styles.coverContainer}>
            <div className={styles.topContainer}>
              <h2> Company Registration</h2>
            </div>

            <Stages
              currentStage={currentStage}
              stages={stages}
              completedStages={completedStages}
            />

            {currentStage === stages.PERSONAL_INFO && !isLoading && (
              <>
                <ClientInfo
                  clientName={clientname}
                  companyName={companyname}
                  email={email}
                  phoneNo={phoneNo}
                  password={password}
                  confirmPassword={confirmPassword}
                  actManager={actManager}
                  companySize={companySize}
                  country={country}
                  city={city}
                  setActManager={setActManager}
                  setCity={setCity}
                  setPassword={setPassword}
                  setConfirmPassword={setConfirmPassword}
                  setClientname={setClientname}
                  setEmail={setEmail}
                  setPhoneNo={setPhoneNo}
                  setCountry={setCountry}
                  setCompanySize={setCompanySize}
                  setCompanyname={setCompanyname}
                />
                <div className={styles.wrapper}>
                  <ClientSignUpOverlayBtn
                    password={password}
                    confirmPassword={confirmPassword}
                    email={email}
                    showError={showError}
                    setMessage={setMessage}
                    fillValidity={fillValidity}
                    validateNameReceiver={validateNameReceiver}
                    validateEmailReceiver={validateEmailReceiver}
                    validatephoneReceiver={validatephoneReceiver}
                    showSuccess={showSuccess}
                    handleFormSubmit={handleFormSubmit}
                    onClose={onClose}
                    setCompletedStages={setCompletedStages}
                    completedStages={completedStages}
                  />
                </div>
              </>
            )}
            {isLoading && <div className={styles.loader}></div>}
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientSignUpOverlay;
