import styles from "./ReportOverlay.module.css";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import Assessment from "./Assessment";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import BackButton from "./BackButton";
import Average from "./Average";

const ReportOverlay = ({ onClose, reportOverlay, selectedCandidate }) => {
  console.log("selected candidate is:", selectedCandidate);
  const [codingResult, setCodingResult] = useState();
  const [isCodingAssessment, setIsCodingAssessment] = useState(false);
  const [results, setResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [datee, setDatee] = useState();

  useEffect(() => {
    const date = new Date(selectedCandidate?.date);
    setDatee(date.toDateString());
  });

  useEffect(() => {
    async function fetchCandidatesCodingResult() {
      setIsLoading(true);
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
      //
      setIsLoading(false);
      if (data && data?.data && data?.data?.result) {
        setIsCodingAssessment(true);
      } else {
        setIsCodingAssessment(false);
      }
    }
    fetchCandidatesCodingResult();
  }, [selectedCandidate]);

  // const calculateCumulativeMean = (val1,val2,val3) => {
  //     let total = 0;
  //     let count = 0;

  //     if (selectedCandidate?.results?.technicalRating || results?.data?.result?.technicalAssessment) {
  //         total += Math.round(selectedCandidate?.results?.technicalRating || results?.data?.result?.technicalAssessment);
  //         count += 1;
  //     }

  //     if (selectedCandidate?.results?.softskillRating || results?.data?.result?.softskillRating) {
  //         total += Math.round(selectedCandidate?.results?.softskillRating || results?.data?.result?.softskillRating);
  //         count += 1;
  //     }

  //     if (codingResult?.data?.result?.technicalRating) {
  //         total += Math.round(parseInt(codingResult.data.result.technicalRating));
  //         count += 1;
  //     }

  //     if (count === 0) return 0;

  //     return (total / count).toFixed(2);
  // }

  const calculateCumulativeMean = (val1, val2, val3) => {
    let total = 0;
    let count = 0;

    if (val1) {
      total += Math.round(parseInt(val1));
      count += 1;
    }

    if (val2) {
      total += Math.round(parseInt(val2));
      count += 1;
    }

    if (val3) {
      total += Math.round(parseInt(val3));
      count += 1;
    }

    if (count === 0) return 0;

    return Math.round(total / count); // Round the final result to the nearest integer
  };

  const overlayRef = useRef(null);
  const overlayRef1 = useRef(null);
  const contentRef = useRef(null);
  const infoSymbolSize = 10;

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

  // const downloadPDF = async () => {
  //     if (contentRef.current) {
  //       const content = contentRef.current;

  //       // Get the total height and width of the content
  //       const contentHeight = content.scrollHeight;
  //       const contentWidth = content.scrollWidth;

  //       // Define the dimensions for capturing
  //       const captureWidth = contentWidth;
  //       const captureHeight = content.clientHeight;

  //       // Calculate the number of sections based on height and viewport
  //       const numSections = Math.round(contentHeight / captureHeight);

  //       // Create a new PDF instance
  //       const pdf = new jsPDF({
  //         orientation: 'landscape', // or 'landscape'
  //       });

  //       // Loop through each section and capture it
  //       for (let i = 0; i < numSections; i++) {
  //         // Scroll to the next section
  //         content.scrollTo(0, i * captureHeight);

  //         // Wait for a brief moment to allow content to render
  //         await new Promise((resolve) => setTimeout(resolve, 500)); // Adjust delay as needed

  //         // Capture the current section as an image using html2canvas
  //         const canvas = await html2canvas(content, {
  //           width: captureWidth,
  //           height: captureHeight,
  //           scrollY: -window.scrollY, // Capture scrolled content
  //           useCORS: true, // Enable CORS
  //         });

  //         // Add the captured image to the PDF
  //         if (i > 0) {
  //           pdf.addPage();
  //         }
  //         pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());

  //         // Reset scroll position
  //         content.scrollTo(0, 0);
  //       }

  //       // Save the PDF
  //       pdf.save('overlay.pdf');
  //     }
  //   };
  // const downloadPDF = async () => {
  //     if (contentRef.current) {
  //         const canvas = await html2canvas(contentRef.current);
  //         const imgData = canvas.toDataURL('image/png');
  //         const pdf = new jsPDF({
  //             orientation: 'portrait',
  //         });

  useEffect(() => {
    async function fetchAllCandidateReports() {
      const requestBody = {
        candidate_id: selectedCandidate?.candidate_id,
      };
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_REMOTE_URL}/result-by-cand-id`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      console.log("response: ", response);
      if (!response.ok) {
        console.log(`Error: ${response.status}`);
      }
      const allData = await response.json();
      setResults(allData);

      console.log("jsonified candidates response: ", allData);
    }
    fetchAllCandidateReports();
  }, []);

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
          console.log("PDF Downloaded");
        } else {
          console.error("Failed to generate PDF:", response.statusText);
          const errorText = await response.text(); // Fetching detailed error message from the server
          console.error("Server response:", errorText);
        }
      } catch (error) {
        console.error("Error downloading PDF:", error);
      }
    }
  };

  // const handleDownloadPdf = async () => {
  //     const htmlContent = document.getElementById('content-to-print').innerHTML;
  //     if (htmlContent) {
  //         const response = await fetch('/api/generate-pdf', {
  //             method: 'POST',
  //             body: JSON.stringify({ htmlContent }),
  //             headers: {
  //                 'Content-Type': 'application/json',
  //             },
  //         });

  //         if (response.ok) {
  //             const blob = await response.blob();
  //             const url = window.URL.createObjectURL(blob);
  //             const link = document.createElement('a');
  //             link.href = url;
  //             link.setAttribute('download', 'report.pdf');
  //             document.body.appendChild(link);
  //             link.click();
  //             link.parentNode.removeChild(link);
  //         } else {
  //             console.error('Failed to load PDF document.');
  //         }
  //     }
  // };

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

  return (
    <>
      <div ref={overlayRef} className={styles.parent}>
        <div className={styles.btn}>
          <button onClick={onClose}>
            <Image src="/shut.svg" width={15} height={15} />
          </button>
        </div>

        <div
          className={`${styles.superContainer} content-to-print`}
          id="content-to-print"
        >
          <div className={styles.coverContainer}>
            {/*top container */}
            <div className={styles.topContainer}>
              <div className={styles.avatarContainer}>
                <Image src="/avatarDefault.svg" width={65} height={84} />
              </div>
              <div className={styles.information}>
                <h1>{selectedCandidate?.name}</h1>
                <p className={styles.role}>{selectedCandidate?.position}</p>
                <h4
                  style={{
                    backgroundColor: getBackgroundColor(
                      calculateCumulativeMean(
                        Math.round(
                          selectedCandidate?.results?.technicalRating
                        ) || Math.round(results?.data?.result?.technicalRating),
                        Math.round(
                          selectedCandidate?.results?.softskillRating
                        ) || Math.round(results?.data?.result?.softskillRating)
                      )
                    ),
                  }}
                >
                  {getFilter(
                    calculateCumulativeMean(
                      Math.round(selectedCandidate?.results?.technicalRating) ||
                        Math.round(results?.data?.result?.technicalRating),
                      Math.round(selectedCandidate?.results?.softskillRating) ||
                        Math.round(results?.data?.result?.softskillRating)
                    )
                  )}
                  <Image
                    src={getStatusSymbol(
                      calculateCumulativeMean(
                        Math.round(
                          selectedCandidate?.results?.technicalRating
                        ) || Math.round(results?.data?.result?.technicalRating),
                        Math.round(
                          selectedCandidate?.results?.softskillRating
                        ) || Math.round(results?.data?.result?.softskillRating)
                      )
                    )}
                    width={infoSymbolSize}
                    height={infoSymbolSize}
                  />
                </h4>
              </div>

              <div className={styles.rightContainer}>
                <Average
                  numbers={[
                    selectedCandidate?.results?.technicalRating ||
                      results?.data?.result?.technicalRating,
                    selectedCandidate?.results?.softskillRating ||
                      results?.data?.result?.softskillRating,
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
                    <span className={styles.bold}>Name</span>
                    <span>{selectedCandidate?.name}</span>
                  </li>

                  <li>
                    <span className={styles.bold}>Phone</span>
                    <span>
                      {selectedCandidate?.contactNo
                        ? selectedCandidate?.contactNo
                        : "03122597173"}
                    </span>
                  </li>
                  <li>
                    <span className={styles.bold}>Date</span>
                    <span>
                      {selectedCandidate?.date || results?.data?.createdAt}
                    </span>
                  </li>
                  <li>
                    <span className={styles.bold}>Job Type</span>
                    <span>
                      {selectedCandidate?.jobType ||
                        selectedCandidate?.job_type}
                    </span>
                  </li>
                  <li>
                    <span className={styles.bold}>Applied For</span>
                    <span>
                      {selectedCandidate?.company
                        ? selectedCandidate?.company?.name
                        : "Self"}
                    </span>
                  </li>
                  <li>
                    <span className={styles.bold}>Email</span>
                    <span>{selectedCandidate?.email}</span>
                  </li>
                </ul>
              </div>

              {/*assessment components */}
              <div className={styles.cont}>
                <div className={styles.auto}>
                  <Assessment
                    heading={headingOne}
                    para={
                      selectedCandidate?.results?.technicalAssessment ||
                      results?.data?.result?.technicalAssessment
                    }
                    score={
                      selectedCandidate?.results?.technicalRating ||
                      results?.data?.result?.technicalRating
                    }
                  />
                  <Assessment
                    heading={headingTwo}
                    para={
                      selectedCandidate?.results?.softskillAssessment ||
                      results?.data?.result?.softskillAssessment
                    }
                    score={
                      selectedCandidate?.results?.softskillRating ||
                      results?.data?.result?.softskillRating
                    }
                  />

                  {isCodingAssessment && (
                    <>
                      <Assessment
                        heading={headingThree}
                        para={codingResult?.data?.result?.technicalSummary}
                        score={Math.round(
                          parseInt(codingResult?.data?.result?.technicalRating)
                        )}
                      />
                    </>
                  )}
                  {/* {codingResult ? (
                                    
                                ) : (
                                    <>
                                    </>
                                )} */}
                </div>
              </div>
            </div>

            <div className={styles.selfReportOverlayButtons}>
              {/* <button className={styles.backButton} onClick={onClose}>
                <span>
                  <Image
                    alt="Back arrow"
                    height={40}
                    width={40}
                    src="/backBlack.svg"
                  />
                </span>
                Back
              </button> */}
              <BackButton onClose={onClose}>Back</BackButton>

              {!isLoading && (
                <button
                  className={styles.downloadButton}
                  onClick={handleDownloadPdf}
                >
                  Download PDF{" "}
                  <span>
                    <Image
                      alt="Download icon"
                      height={35}
                      width={35}
                      src="/download.svg"
                    />
                  </span>
                </button>
              )}
              {isLoading && <div className={styles.loader}> </div>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ReportOverlay;
