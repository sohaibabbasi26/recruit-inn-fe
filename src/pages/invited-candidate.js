import InvitationOverlay from "../../components/InvitationOverlay";
import Overlay from "../../components/Overlay";
import styles from "./invited-candidate.module.css";
import { useState, useEffect } from "react";
import ErrorPageTestCount from "../../components/ErrorPageTestCount";

import {useRouter} from "next/router";

const invitedCandidate = () => {
  useEffect(() => {
    localStorage.setItem("activeFlow", "Client");
  }, []);

  const stages = {
    JOB_DETAIL: "JOB_DETAIL",
    PERSONAL_INFO: "PERSONAL_INFO",
    REQUIRED_SKILLS: "REQUIRED_SKILLS",
  };

  const router = useRouter();

  const stageHeadings = {
    JOB_DETAIL: `You've been invited for the interview`,
    PERSONAL_INFO: "Hello there, tell us about yourself",
    REQUIRED_SKILLS: "Technologies you will be asked for",
  };

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [message, setMessage] = useState(null);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [shouldConductTest, setShouldConductTest] = useState(true);

  const client_id = router.query.client_id


  async function canConductTest(){
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_REMOTE_URL}/should-conduct-test?client_id=${client_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log("conduct test response:", data?.data?.shouldConductTest);
      setShouldConductTest(data?.data?.shouldConductTest);
      
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  useEffect(() => {
    if(client_id){

      canConductTest();
    }
  }, [client_id]);

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
  return shouldConductTest ? (
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
  ) : (
    <ErrorPageTestCount />
  );
};

export default invitedCandidate;
