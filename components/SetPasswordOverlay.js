import styles from "./SetPassword.module.css";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Stages from "./Stages";
import gsap from "gsap";
import PasswordConfirm from "./PasswordConfirm";
import PasswordBtns from "./PasswordBtns";
import SuccessIndicator from "./SuccessIndicator";
import ErrorIndicator from "./ErrorIndicator";

const SetPasswordOverlay = ({
  showOverlay,
  onClose,
  stages,
  stageHeadings,
}) => {
  const overlayRef = useRef(null);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [condition, setCondition] = useState();
  const [email, setEmail] = useState();
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
        id: id,
      };
      try {
        if (id) {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_REMOTE_URL}/get-one-company`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(reqBody),
            }
          );
          const data = await response.json();
          //("one company details: ", data);
          setEmail(data?.data?.email);
        }
      } catch (err) {
        //("err:", err);
      }
    }
    fetchCompanyDetails();
  }, [id]);

  const checkAndComparePassword = async () => {
    const reqBody = {
      email: email,
      newPassword: pass,
    };

    try {
      if (id) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_REMOTE_URL}/check-compare-password`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(reqBody),
          }
        );
        const data = await response.json();
        //("condition returned:", data);
        setCondition(data?.data);
        return data?.data;
      }
    } catch (err) {
      //("err:", err);
    }
  };
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [pass, setPass] = useState(null);

  const handlePasswordChange = (e) => {
    setPass(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleFormSubmit = async () => {
    if (!pass || !confirmPassword) {
      showError("Please fill in both password fields.");
      return;
    }

    if (pass !== confirmPassword) {
      //("");
      showError("Password not match");
      return;
    }
    if (
      !/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{8,}$/.test(
        pass
      )
    ) {
      //("in password length check!");
      //   setMessage(
      //     "Password must contain at least one capital letter, one number, and one special character."
      //   );
      showError(
        "Password must contain at least one capital letter, one number, and one special character."
      );
      return;
    }
    const reqBody = {
      token: id,
      password: pass,
    };

    const checkIfNotNewPassword = await checkAndComparePassword();
    //("checkinggggg:", checkIfNotNewPassword);

    if (checkIfNotNewPassword === true) {
      showError("Please enter a new password");
      return;
    } else {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_REMOTE_URL}/set-client-password/123`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(reqBody),
          }
        );
        const data = await response.text();
        //(data);
        router.push("/client-login");
      } catch (err) {
        //("Error: ", err);
      }
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
        <div className={styles.btn}>
          <button onClick={onClose}></button>
        </div>

        <div className={styles.superContainer}>
          <div className={styles.coverContainer}>
            <div className={styles.topContainer}>
              <h2>
                {stageHeadings[currentStage]
                  ? stageHeadings[currentStage]
                  : "Default Heading"}
              </h2>
            </div>

            <Stages
              currentStage={currentStage}
              stages={stages}
              completedStages={completedStages}
              style={{ marginLeft: "auto" }}
            />

            {currentStage === stages.SET_PASSWORD && (
              <>
                <PasswordConfirm
                  confirmPassword={confirmPassword}
                  setPass={setPass}
                  pass={pass}
                  setConfirmPassword={setConfirmPassword}
                  error={error}
                  password={password}
                  setPassword={setPassword}
                  handlePasswordChange={handlePasswordChange}
                  handleConfirmPasswordChange={handleConfirmPasswordChange}
                />
                <div className={styles.wrapper}>
                  <PasswordBtns handleFormSubmit={handleFormSubmit} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SetPasswordOverlay;
