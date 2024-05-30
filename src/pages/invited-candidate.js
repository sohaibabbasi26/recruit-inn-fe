import InvitationOverlay from "../../components/InvitationOverlay";
import Overlay from "../../components/Overlay";
import styles from "./invited-candidate.module.css";
import { useState, useEffect } from "react";

const invitedCandidate = () => {
  useEffect(() => {
    localStorage.setItem("activeFlow", "Client");
  }, []);

  const stages = {
    JOB_DETAIL: "JOB_DETAIL",
    PERSONAL_INFO: "PERSONAL_INFO",
    REQUIRED_SKILLS: "REQUIRED_SKILLS",
  };

  const stageHeadings = {
    JOB_DETAIL: "You've been invited for the interview",
    PERSONAL_INFO: "Hello there, tell us about yourself",
    REQUIRED_SKILLS: "Technologies you will be asked for",
  };

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [message, setMessage] = useState(null);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const showSuccess = () => {
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  const showError = () => {
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  const showOverlay = true;
  return (
    <div className={styles.invitedCandidate}>
      <InvitationOverlay
        setShowSuccessMessage={setShowSuccessMessage}
        message={message}
        setMessage={setMessage}
        showSuccess={showSuccess}
        showSuccessMessage={showSuccessMessage}
        showOverlay={showOverlay}
        stages={stages}
        stageHeadings={stageHeadings}
      />
    </div>
  );
};

export default invitedCandidate;
