import styles from "./Overlay.module.css";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useRouter } from "next/router";
import LoginComp from "./Login";
import LoginBtns from "./LoginBtns";
// import Login from '@/pages/client-login';
import ForgotPassword from "./ForgotPassword";
import ForgotPasswordBtns from "./ForgotPassBtns";
import ErrorIndicator from "./ErrorIndicator";
import SuccessIndicator from "./SuccessIndicator";

const LoginOverlay = ({
  message,
  setMessage,
  onClose,
  stages,
  stageHeadings,
  showOverlay,
}) => {
  const overlayRef = useRef(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [emailReceiver, setEmailReceiver] = useState();
  const [companyId, setCompanyId] = useState("");
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
  console.log("router object:", router);
  const { id } = router?.query;

  console.log("id:", id);
  const infoSymbolSize = 20;
  const [currentStage, setCurrentStage] = useState(stages.PERSONAL_INFO);
  const [completedStages, setCompletedStages] = useState([]);
  const [viewMode, setViewMode] = useState("login");
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");

  // const loginApiCall = async () => {
  //     const response = await fetch(`${process.env.NEXT_PUBLIC_REMOTE_URL}/client-log-in`, {
  //         method: 'POST',
  //         headers: {
  //             'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({
  //             email: email,
  //             password: password
  //         })
  //     });

  //     const data = await response.json();
  //     console.log('login info:', data?.data);
  //     if (data?.data?.token) {
  //         localStorage.setItem('client-token', data?.data?.token);
  //         router.push(`/client/${data?.data?.id}`)
  //     } else {
  //         showError('Login failed. Please check your credentials.');
  //     }
  // }

  const redirectToClientPage = (clientId) => {
    router.push(`/client/${clientId}`);
  };
  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn) {
      const clientId = localStorage.getItem("clientId");
      if (clientId) {
        redirectToClientPage(clientId);
      }
    }
  }, [router]);

  const loginApiCall = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_REMOTE_URL}/client-log-in`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }
    );
    const data = await response.json();
    console.log("login info:", data?.data);
    if (data?.data?.token) {
      localStorage.setItem("client-token", data?.data?.token);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("clientId", data?.data?.id); // Save client ID
      redirectToClientPage(data?.data?.id); // Reuse the navigation function
    } else {
      console.log("Testing thiss .....");
      showError("Login failed. Please check your credentials.");
    }
  };

  useEffect(() => {
    const demolink = `http://localhost:3000/set-password/${companyId}`;
    setSubject("RECRUITINN: SET UP YOUR NEW PASSWORD");
    setText(`
        follow the link to set up your new password: \n
            ${demolink}
        `);
  }, [companyId, emailReceiver]);

  const checkIfEmailIsInDbHandler = async () => {
    const reqBody = {
      email: email,
    };

    const requestBody = {
      to: emailReceiver,
      subject: subject,
      text: text,
    };
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_REMOTE_URL}/check-client`,
        {
          method: "POST",
          body: JSON.stringify(reqBody),
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      console.log("response about client checking:", data);
      setCompanyId(data?.data?.message?.company_id);

      if (data?.data?.message?.company_id) {
        setCompanyId(data?.data?.message?.company_id);

        const demolink = `https://app.recruitinn.ai/new-password/${data?.data?.message?.company_id}`;
        const subject = "RECRUITINN: SET UP YOUR NEW PASSWORD";
        const text = `Follow the link to set up your new password: \n ${demolink}`;

        console.log("link:", demolink);
        const requestBody = {
          to: email,
          subject: subject,
          text: text,
        };

        await sendResetPasswordEmail(requestBody);
      } else {
        showError("Some error occurred, failed to send an Email");
      }
    } catch (err) {
      showError("Such a client doesn't exist");
    }
  };

  const sendResetPasswordEmail = async (emailDetails) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_REMOTE_URL}/sendMail`,
        {
          method: "POST",
          body: JSON.stringify(emailDetails),
          headers: { "Content-Type": "application/json" },
        }
      );

      const responseData = await response.text();
      console.log("Email sent successfully:", responseData);
      showSuccess("Link to set a new password has been sent to this email!");
    } catch (error) {
      console.error("Failed to send email:", error);
    }
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

        <div className={styles.superContainer}>
          {isLoading ? (
            <div className={styles.loader}></div>
          ) : (
            <div className={styles.coverContainer}>
              <div className={styles.topContainer}>
                <h2>{stageHeadings[currentStage]}</h2>
              </div>

            

              {viewMode === "login" ? (
                <>
                  <LoginComp
                    onViewChange={() => setViewMode("forgotPassword")}
                    password={password}
                    setPassword={setPassword}
                    email={email}
                    setEmail={setEmail}
                  />
                  <div className={styles.wrapper}>
                    <LoginBtns
                      loginApiCall={loginApiCall}
                      showError={showError}
                      email={email}
                      setEmail={setEmail}
                      password={password}
                      setPassword={setPassword}
                      setCompletedStages={setCompletedStages}
                      completedStages={completedStages}
                    />
                  </div>
                </>
              ) : viewMode === "forgotPassword" ? (
                <>
                  <ForgotPassword
                    setEmail={setEmail}
                    setEmailReceiver={setEmailReceiver}
                  />
                  <div className={styles.wrapper}>
                    <ForgotPasswordBtns
                      setViewMode={setViewMode}
                      checkIfEmailIsInDbHandler={checkIfEmailIsInDbHandler}
                      email={email}
                      showError={showError}
                    />
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default LoginOverlay;
