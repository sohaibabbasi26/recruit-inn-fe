import styles from "./JobOverlay.module.css";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import ErrorIndicator from "./ErrorIndicator";
import SuccessIndicator from "./SuccessIndicator";
import { getSvg } from "@/util/helpers";
import parse from "html-react-parser";
import BackButton from "./BackButton";
import { useActiveItem } from "@/contexts/ActiveItemContext";
import { useRouter } from "next/router";
import SocialShare from "./SocialShare";
import Head from "next/head";

const JobOverlay = ({
  getCandidatesByPosition,
  setPositionIdMain,
  showError,
  message,
  showErrorMessage,
  showSuccessMessage,
  token,
  onClose,
  jobOverlay,
  selectedJob,
  companyId,
  setMessage,
  showSuccess,
  isTestRequired,
  interviewCount,
}) => {
  //("selected job data:", selectedJob);
  const [techStack, setTechStack] = useState();
  const [test, setTest] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const overlayRef = useRef(null);
  const [link, setLink] = useState();
  const [questionId, setQuestionId] = useState();
  const iconSize = 20;
  const infoSymbolSize = 10;
  const [jobStatus, setJobStatus] = useState();
  const [assessmentId, setAssessmentId] = useState();
  const [codeQues, setCodeQues] = useState();
  const { activeItem, setActiveItem } = useActiveItem();
  // const { activeItem, setActiveItem } = useActiveItem();
  const [clickedItem, setClickedItem] = useState("");

  const handleClickAllClient = () => {
    onClose();
    //("Testingggggg");
    setActiveItem("position");
    //("setting Item to position");
  };

  useEffect(() => {
    if (selectedJob?.position_id) {
      //(
        //"Fetching candidates for position ID:",
       // selectedJob.position_id
      //); // Debugging
      getCandidatesByPosition(selectedJob.position_id);
    }
  }, [selectedJob] );

  useEffect(() => {
    // selectedJob(selectedJob?.position_id);
    setTechStack(selectedJob?.expertise);
  }, [selectedJob?.expertise]);

  async function toggleJobStatus() {
    const newStatus = selectedJob?.status === "Active" ? "Closed" : "Active";
    try {
      const reqBody = {
        status: newStatus,
        position_id: selectedJob?.position_id,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_REMOTE_URL}/toggle-job`,
        {
          method: "PUT",
          body: JSON.stringify(reqBody),
          headers: {
            "Content-type": "application/JSON",
          },
        }
      );

      const data = await response.json();
      //("data updated in the table:", data);
      setJobStatus(newStatus);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err) {
      //("error:", err);
    }
  }

  function copyToClipboard(text) {
    if ("clipboard" in navigator) {
      return navigator.clipboard.writeText(text);
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "absolute";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();
      const result = document.execCommand("copy");
      document.body.removeChild(textarea);
      return result;
    }
  }

  useEffect(() => {
    //("link in useEffect:", link);
  }, [link]);

  const handleCopyClick = async () => {
    // Ensure questionId is set correctly before creating the link
    const newLink = `${process.env.NEXT_PUBLIC_URL}/invited-candidate?position_id=${selectedJob?.position_id}&client_id=${selectedJob?.company_id}&q_id=${questionId}&test_req=${selectedJob?.is_test_req}&language=${selectedJob?.language}`;
    //("Generated link:", newLink);

    try {
      await copyToClipboard(newLink);
      //("Link copied!");
      setMessage("Your link has been copied");
      showSuccess();
    } catch (err) {
      console.error("Could not copy text: ", err);
    }
  };

  // Function to copy text to clipboard
  function copyToClipboard(text) {
    if ("clipboard" in navigator) {
      return navigator.clipboard.writeText(text);
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "absolute";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();
      const result = document.execCommand("copy");
      document.body.removeChild(textarea);
      return result;
    }
  }

  useEffect(() => {
    document.body.style.overflow = "hidden";

    if (jobOverlay) {
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
  }, [jobOverlay]);

  const getBackgroundColor = (status) => {
    if (status === "Active") {
      return "#E7FFE0";
    } else {
      return "#FFE6E6";
    }
  };

  const getStatusSymbol = (status) => {
    if (status === "Active") {
      return "/activeStatus.svg";
    } else {
      return "/noteligible.svg";
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
          content={`https://app.recruitinn.ai/invited-candidate?position_id=${selectedJob?.position_id}&client_id=${selectedJob?.company_id}&q_id=${questionId}&test_req=${selectedJob?.is_test_req}&language=${selectedJob?.language}`}
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
          <div className={styles.coverContainer}>
            <Image
              className={styles.jobOverlayBg}
              src="/flower1.png"
              height={400}
              width={800}
            />

            {/*top conatiner */}
            <div className={styles.topContainer}>
              <div className={styles.content}>
                <h1>{selectedJob?.position}</h1>
                <div className={styles.subInfo}>
                  <p>
                    <Image
                      src="/JOB_TYPE-active.svg"
                      width={iconSize}
                      height={iconSize}
                    />
                    {selectedJob?.job_type}
                  </p>
                  <span
                    style={{
                      backgroundColor: getBackgroundColor(selectedJob?.status),
                    }}
                  >
                    {selectedJob?.status}
                    <Image
                      src={getStatusSymbol(selectedJob?.status)}
                      width={infoSymbolSize}
                      height={infoSymbolSize}
                    />
                  </span>
                </div>
              </div>
            </div>
            {/* body */}
            <div className={styles.copyDiv}>
              <span
                onClick={() => {
                  toggleJobStatus();
                  setMessage("Job Status has been changed!");
                  showSuccess();
                }}
              >
                {selectedJob?.status === "Active"
                  ? "Close Job"
                  : "Change job status to open"}
              </span>
              {isLoading ? (
                <div className={styles.loader}></div>
              ) : (
                <button
                  disabled={
                    selectedJob?.status === "Closed" || interviewCount === 0
                  }
                  onClick={async () => {
                    await handleCopyClick();
                  }}
                >
                  Copy Assessment Link{" "}
                  <Image src="/copylink.svg" height={25} width={25} />
                </button>
              )}{" "}
              <SocialShare
                url={`https://app.recruitinn.ai/invited-candidate?position_id=${selectedJob?.position_id}&client_id=${selectedJob?.company_id}&q_id=${questionId}&test_req=${selectedJob?.is_test_req}&language=${selectedJob?.language}`}
              />
            </div>

            <div className={styles.description}>
              {/* <div className={styles.aboutUs}>
                <h3>About us:</h3>
                <p>[Write about your company] </p>
              </div> */}
              <div className={styles.jobDescription}>
                <h3>Job Description</h3>
                <p>
                  {selectedJob?.description
                    ? parse(selectedJob?.description)
                    : ""}
                </p>
              </div>
            </div>
            {/* skils section */}

            <div className={styles.techContainer}>
              <h2>Skills</h2>
              <div className={styles.TechStack}>
                <ul>
                  {selectedJob?.expertise.map((item) => {
                    return (
                      <li>
                        <Image
                          id={styles.unique}
                          src={getSvg(item?.skill)}
                          width={
                            getSvg(item?.skill) === "/python.svg" ||
                            getSvg(item?.skill) === "/html5.svg" ||
                            getSvg(item?.skill) === "/css3.svg"
                              ? 20
                              : 25
                          }
                          height={
                            getSvg(item?.skill) === "/python.svg" ||
                            getSvg(item?.skill) === "/html5.svg" ||
                            getSvg(item?.skill) === "/css3.svg"
                              ? 20
                              : 25
                          }
                        />
                        {item?.skill}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div className={styles.bottomButtons}>
              <BackButton onClose={onClose}>Back</BackButton>
              <button
                className={styles.nextButton}
                onClick={handleClickAllClient}
              >
                All Candidates{" "}
                <span>
                  <Image src="/Forward1.svg" height={35} width={35} />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobOverlay;
