import styles from "./JobOverlay.module.css";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import ErrorIndicator from "./ErrorIndicator";
import SuccessIndicator from "./SuccessIndicator";
import { getSvg } from "@/util/helpers";
import parse from "html-react-parser";
import BackButton from "./BackButton";

const JobOverlay = ({
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
}) => {
  console.log("selected job data:", selectedJob);
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

  useEffect(() => {
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
      console.log("data updated in the table:", data);
      setJobStatus(newStatus);
    } catch (err) {
      console.log("error:", err);
    }
  }

  async function fetchAndCopyAssessmentLink() {
    setIsLoading(true);
    try {
      if (techStack) {
        const reqBody = {
          expertise: techStack,
          position_id: selectedJob?.position_id,
        };
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_REMOTE_URL}/prepare-test`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(reqBody),
          }
        );
        const dataTwo = await response.json();

        if (dataTwo?.data?.message?.question_id) {
          setTest(dataTwo);
          console.log("Test data:", dataTwo);
        }

        const questionId = dataTwo?.data?.message?.question_id;

        if (selectedJob?.is_test_req === true) {
          try {
            const req = {
              // codingExpertise: selectedJob?.expertise,
              position_id: selectedJob?.position_id,
            };

            console.log("request:", req);

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
            console.log(
              "data in job overlay about code question:",
              data?.data?.assessment_id
            );

            if (data?.data?.assessment_id) {
              setCodeQues(data);
              setAssessmentId(data?.data?.assessment_id);
              console.log("assessment id:", data?.data?.assessment_id);
              console.log("code question data:", data);

              const newLink = `https://app.recruitinn.ai/invited-candidate?position_id=${selectedJob?.position_id}&client_id=${selectedJob?.company_id}&q_id=${questionId}&a_id=${data?.data?.assessment_id}&test_req=${selectedJob?.is_test_req}`;
              copyLink(newLink);
            } else {
              console.error("Assessment ID not found in the response.");
            }
          } catch (err) {
            console.error("ERROR:", err);
          }
        } else {
          // If no candidate or test is not required, still generate the link
          const newLink = `https://app.recruitinn.ai/invited-candidate?position_id=${selectedJob?.position_id}&client_id=${selectedJob?.company_id}&q_id=${questionId}&test_req=${selectedJob?.is_test_req}`;
          copyLink(newLink);
        }
      }
    } catch (err) {
      console.error("error:", err);
    }
    setIsLoading(false);
  }

  async function copyLink(link) {
    try {
      await copyToClipboard(link);
      setMessage("Your link has been copied");
      showSuccess();
    } catch (err) {
      console.error("Could not copy text: ", err);
    }
  }

  // useEffect(() => {
  //   if (questionId && assessmentId) {
  //     const newLink = `https://app.recruitinn.ai/invited-candidate?position_id=${selectedJob?.position_id}&client_id=${selectedJob?.company_id}&q_id=${test?.data?.message?.question_id}&a_id=${assessmentId}&test_req=${isTestRequired}`;
  //     setLink(newLink);
  //   }
  // }, [questionId, assessmentId]);

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
    console.log("link in useEffect:", link);
  }, [link]);

  const handleCopyClick = async () => {
    console.log("link:", link);
    copyToClipboard(link)
      .then(() => console.log("copied!"))
      .catch((err) => console.error("Could not copy text: ", err));
    setMessage("Your link has been copied");
    showSuccess();
  };

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
                  setMessage(
                    "Job Status has been changed, refresh to see changes!"
                  );
                  showSuccess();
                }}
              >
                {selectedJob?.status === "Active" ? "Close Job" : "Open Job"}
              </span>
              {isLoading ? (
                <div className={styles.loader}></div>
              ) : (
                <button
                  disabled={selectedJob?.status === "Closed"}
                  onClick={async () => {
                    await fetchAndCopyAssessmentLink();
                  }}
                >
                  Copy Assessment Link{" "}
                  <Image src="/copylink.svg" height={25} width={25} />
                </button>
              )}
            </div>

            <div className={styles.description}>
              <div className={styles.aboutUs}>
                <h3>About us:</h3>
                <p>[Write about your company] </p>
              </div>
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
                          //   src={item?.img}
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
              <button className={styles.nextButton}>
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
