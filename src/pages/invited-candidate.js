import InvitationOverlay from "../../components/InvitationOverlay";
import Overlay from "../../components/Overlay";
import styles from "./invited-candidate.module.css";
import { useState, useEffect } from "react";
import ErrorPageTestCount from "../../components/ErrorPageTestCount";

import { useRouter } from "next/router";
import Head from "next/head";

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
  const client_id = router.query.client_id;


  //const client_id = router.query.client_id;

  async function canConductTest() {
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
      //("conduct test response:", data?.data?.shouldConductTest);
      setShouldConductTest(data?.data?.shouldConductTest);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  useEffect(() => {
    if (client_id) {
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
  ////(router.asPath);
  //const { position_id, client_id, q_id, test_req, language } = router.query;
  //const metaUrl = `https://app.recruitinn.ai/invited-candidate?position_id=${position_id}&client_id=${client_id}&q_id=${q_id}&test_req=${test_req}&language=${language}`;

  return (
    <>
      <Head>
      <meta
          property="og:url"
          content={`https://app.recruitinn.ai${router.asPath}`}
        />
        <meta
          property="og:title"
          content="Recruitinn - AI-Powered Recruitment for Smarter Hiring Decisions"
        />
        <meta
          property="og:description"
          content="Revolutionize your hiring process with Recruitinn's AI-powered recruitment platform. Discover top talent faster, streamline hiring, and make data-driven decisions with ease. Experience the future of recruitment today!"
        />
        <meta
          property="og:image"
          content="https://app.recruitinn.ai/og-image.jpg"
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      {shouldConductTest ? (
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
      )}
    </>
  );
};

export default invitedCandidate;
