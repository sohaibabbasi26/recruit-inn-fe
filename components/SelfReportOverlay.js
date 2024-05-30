import styles from "./ReportOverlay.module.css";
import Image from "next/image";
import { useRef, useEffect, useState, Fragment } from "react";
import gsap from "gsap";
import Assessment from "./Assessment";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Average from "./Average";
const SelfReportOverlay = ({
  candName,
  onClose,
  reportOverlay,
  selectedCandidate,
  email,
  jobType,
  date,
  contact,
  jobtype,
}) => {
  // console.log("selected candidate is:", selectedCandidate);

  const overlayRef = useRef();
  const contentRef = useRef();
  const infoSymbolSize = 10;
  console.log("selected candidate is:", selectedCandidate);
  const [codingResult, setCodingResult] = useState();
  const [isCodingAssessment, setIsCodingAssessment] = useState();
  useEffect(() => {
    async function fetchCandidatesCodingResult() {
      const requestBody = {
        candidate_id: selectedCandidate?.candidate_id,
      };
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_REMOTE_URL}/get-code-analysis-candidate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );
      const data = await response.json();
      console.log("data response:", data);
      setCodingResult(data);
      if (
        data &&
        data?.data &&
        data?.data?.result &&
        data?.data?.result?.technicalRating
      ) {
        setIsCodingAssessment(true);
      } else {
        setIsCodingAssessment(false);
      }
    }
    fetchCandidatesCodingResult();
  }, [selectedCandidate]);
  const headingOne = "Technical";
  const headingTwo = "Soft-skill";
  const headingThree = "Coding Exercise Analysis";
  const paraOne = `Welcome to HyperTech Solutions Unlimited, where we transcend the boundaries of reality to pioneer groundbreaking solutions in quantum software engineering. As a Quantum Code Wizard, you'll be part of a dynamic team of multidimensional thinkers who harness the power of quarks, warp drives, and a touch of magic to push the boundaries of technology.`;
  const paraTwo = `Welcome to HyperTech Solutions Unlimited, where we transcend the boundaries of reality to pioneer groundbreaking solutions in quantum software engineering. As a Quantum Code Wizard, you'll be part of a dynamic team of multidimensional thinkers who harness the power of quarks, warp drives, and a touch of magic to push the boundaries of technology.`;
  const getBackgroundColor = (score) => {
    if (score >= 7 && score <= 10) {
      return "#E7FFE0";
    } else if (score >= 5 && score <= 6) {
      return "#F0F3FF";
    } else {
      return "#FFE6E6";
    }
  };
  const getFilter = (score) => {
    if (score >= 7 && score <= 10) {
      return "Recommended";
    } else if (score >= 5 && score <= 6) {
      return "Qualified";
    } else {
      return "Not Eligible";
    }
  };
  const getStatusSymbol = (score) => {
    if (score >= 7 && score <= 10) {
      return "/activeStatus.svg";
    } else if (score >= 5 && score <= 6) {
      return "/qualified.svg";
    } else {
      return "/noteligible.svg";
    }
  };
  const downloadPDF = async () => {
    if (contentRef.current) {
      const canvas = await html2canvas(contentRef.current);
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
      });
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("download.pdf");
    }
  };

  const handleDownloadPdf = async () => {
    console.log("Calling pdf download");
    if (contentRef.current) {
      const content = contentRef.current.innerHTML;

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_REMOTE_URL}/downloadpdf`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ content }),
          }
        );

        if (response.ok) {
          const pdfBlob = await response.blob();
          const url = window.URL.createObjectURL(pdfBlob);
          const link = document.createElement("a");
          link.href = url;
          link.download = "overlay.pdf";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
        } else {
          console.error("Failed to generate PDF:", response.statusText);
        }
      } catch (error) {
        console.error("Error downloading PDF:", error);
      }
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    if (reportOverlay) {
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
  }, [reportOverlay, onClose]);
  // useEffect(() => {
  //     async function callingPuppeteer() {
  //         const htmlContent = '<div>This is the content I want to export as PDF</div>';
  //         const response = await fetch('/api/generate-pdf', {
  //             method: 'POST',
  //             body: JSON.stringify({ htmlContent }),
  //             headers: {
  //                 'Content-Type': 'application/json',
  //             },
  //         }).then((res) => res.blob())
  //             .then((blob) => {
  //                 const url = window.URL.createObjectURL(blob);
  //                 const link = document.createElement('a');
  //                 link.href = url;
  //                 link.setAttribute('download', 'report.pdf');
  //                 document.body.appendChild(link);
  //                 link.click();
  //             });
  //         console.log("puppeteer response:", response);
  //     }
  //     callingPuppeteer();
  // }, [])
  return (
    <>
      <div ref={overlayRef} className={styles.parent}>
        <div className={styles.btn}>
          <button onClick={onClose}>
            <Image src="/shut.svg" width={15} height={15} />
          </button>
        </div>
        <div className={`${styles.superContainer} content-to-print`}>
          <div className={styles.coverContainer}>
            {/*top container */}
            <div className={styles.topContainer}>
              <div className={styles.avatarContainer}>
                <Image src="/avatarDefault.svg" width={65} height={84} />
              </div>
              <div className={styles.information}>
                <h1>{selectedCandidate?.name || candName}</h1>
                <p>{selectedCandidate?.position}</p>
                <h4
                  style={{
                    backgroundColor: getBackgroundColor(
                      Math.ceil(selectedCandidate?.result?.technicalRating)
                    ),
                  }}
                >
                  {getFilter(
                    Math.ceil(selectedCandidate?.result?.technicalRating)
                  )}
                  <Image
                    src={getStatusSymbol(
                      Math.ceil(selectedCandidate?.result?.technicalRating)
                    )}
                    width={infoSymbolSize}
                    height={infoSymbolSize}
                  />
                </h4>
              </div>
              <div className={styles.rightContainer}>
                {/* <span>
                  {Math.ceil(selectedCandidate?.result?.technicalRating)}/10
                </span> */}
                <Average
                  numbers={[
                    selectedCandidate?.result?.technicalRating,
                    selectedCandidate?.result?.softskillRating,
                    parseInt(codingResult?.data?.result?.technicalRating),
                  ]}
                  outOf={10}
                />
              </div>
            </div>
            {/* candidate test info div */}
            <div className={styles.infoContainer} ref={contentRef}>
              <div className={styles.infoDiv}>
                <ul>
                  <li>
                    <span className={styles.bold}>Phone: </span>
                    <span>{contact ? contact : "03122597173"}</span>
                  </li>
                  <li>
                    <span className={styles.bold}>Name: </span>
                    <span>{selectedCandidate?.name || candName}</span>
                  </li>
                  <li>
                    <span className={styles.bold}>Date: </span>
                    <span>{date || selectedCandidate?.createdAt}</span>
                  </li>
                  <li>
                    <span className={styles.bold}>Job Type: </span>
                    <span>{jobtype || "None"}</span>
                  </li>
                  <li>
                    <span className={styles.bold}>Applied For: </span>
                    <span>
                      {selectedCandidate?.company
                        ? selectedCandidate?.company?.name
                        : "Self"}
                    </span>
                  </li>
                  <li>
                    <span className={styles.bold}>Email: </span>
                    <span>{email}</span>
                  </li>
                </ul>
              </div>
              {/*assessment components */}
              <div className={styles.cont}>
                <div className={styles.auto}>
                  <Assessment
                    heading={headingOne}
                    para={selectedCandidate?.result?.technicalAssessment}
                    score={Math.ceil(
                      selectedCandidate?.result?.technicalRating
                    )}
                  />
                  <Assessment
                    heading={headingTwo}
                    para={selectedCandidate?.result?.softskillAssessment}
                    score={Math.ceil(
                      selectedCandidate?.result?.softskillRating
                    )}
                  />
                  {isCodingAssessment && (
                    <Assessment
                      heading={headingThree}
                      para={codingResult?.data?.result?.technicalSummary}
                      score={Math.ceil(
                        parseInt(codingResult?.data?.result?.technicalRating)
                      )}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className={styles.selfReportOverlayButtons}>
              <button className={styles.backButton} onClick={onClose}>
                <span>
                  <Image
                    alt="Back arrow"
                    height={40}
                    width={40}
                    src="/backBlack.svg"
                  />
                </span>
                Back
              </button>
              <button
                className={styles.downloadButton}
                onClick={handleDownloadPdf}
              >
                Download PDF
                <span>
                  <Image
                    alt="Download icon"
                    height={40}
                    width={40}
                    src="/download.svg"
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SelfReportOverlay;
