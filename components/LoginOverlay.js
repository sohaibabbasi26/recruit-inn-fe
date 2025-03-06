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
  onSignup,
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
      document.body.style.overflow = "";
      gsap.to(overlayRef.current, {
        y: "100%",
        opacity: 0,
        duration: 0.1,
        ease: "power1",
      });
    };
  }, [showOverlay, onClose]);

  const router = useRouter();
  //("router object:", router);
  const { id } = router?.query;

  //("id:", id);
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
  //     //('login info:', data?.data);
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
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.toLowerCase(),
          password: password,
        }),
      }
    );
    const data = await response.json();
    if (data?.data?.token) {
      // Cookie
      const expiresIn = 10 * 60 * 60;
      const expiresDate = new Date(Date.now() + expiresIn * 1000);
      document.cookie = `loginToken=${
        data?.data?.token
      }; expires=${expiresDate.toUTCString()}; path=/; ${
        process.env.NODE_ENV === "production" ? "Secure; " : ""
      }SameSite=Strict`;

      localStorage.setItem("client-token", data?.data?.token);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("clientId", data?.data?.id); // Save client ID
      //("this is hte id", data?.data?.id); // Reuse the navigation function
      redirectToClientPage(data?.data?.id);
    } else {
      //("Testing thiss .....");
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

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_REMOTE_URL}/check-client`,
        {
          method: "POST",
          body: JSON.stringify(reqBody),
          headers: { "Content-Type": "application/json" },
        }
      );
      const clientData = await response.json(); // Renamed this variable to clientData
      if (clientData) {
        //("response about client checking:", clientData);
        setCompanyId(clientData?.data?.message?.company_id);

        if (clientData?.data?.message?.company_id) {
          setCompanyId(clientData?.data?.message?.company_id);
          const body = {
            client_id: clientData?.data?.message?.company_id,
          };
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_REMOTE_URL}/send-reset-password-email`,
            {
              method: "POST",
              body: JSON.stringify(body),
              headers: { "Content-Type": "application/json" },
            }
          );

          const emailData = await res.json(); // Renamed this to emailData
          //("email data: ", emailData);

          if (emailData?.code === 200) {
            showSuccess(
              "Link to set a new password has been sent to this email!"
            );
          }
        } else {
          showError("Such a client doesn't exist");
        }
      }
    } catch (err) {
      //(err);
      showError("Some error occurred, failed to send an Email");
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
      //("Email sent successfully:", responseData);
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
                    onSignup={onSignup}
                    password={password}
                    setPassword={setPassword}
                    email={email}
                    setEmail={setEmail}
                    showSignuplink={true}
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
