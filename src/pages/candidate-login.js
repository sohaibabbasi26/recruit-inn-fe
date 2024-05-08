import { useRouter } from "next/router";
import styles from "./Login.module.css";
import { useEffect, useState } from "react";
import CandidateSelfLoginOverlay from "../../components/CandidateSelfLoginOverlay";

const CandidateSelfLogin = () => {
  const router = useRouter();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [message, setMessage] = useState("");

  // const [showOverlay, setShowOverlay] = useState(false);

  const stages = {
    PERSONAL_INFO: "PERSONAL_INFO",
  };

  const stageHeadings = {
    PERSONAL_INFO: "Log in",
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();

        const activeElement = document.activeElement;

        if (activeElement.tagName === "INPUT" && activeElement.form) {
          const form = activeElement.form;
          const submitButton = form.querySelector('[type="submit"]');
          if (submitButton) {
            submitButton.click();
          }
        } else {
          const continueButton = document.getElementById(
            "RightBottomBtns_forwardBtn__83dJ2"
          );
          if (continueButton) {
            continueButton.click();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

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

  const showOverlay = true;

  return (
    <>
      <CandidateSelfLoginOverlay
        showSuccess
        showError={showError}
        showErrorMessage={showErrorMessage}
        showSuccessMessage={showSuccessMessage}
        setMessage={setMessage}
        message={message}
        stageHeadings={stageHeadings}
        stages={stages}
        showOverlay={showOverlay}
      />
    </>
  );
};
export default CandidateSelfLogin;
