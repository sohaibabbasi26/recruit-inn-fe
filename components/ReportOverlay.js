import { useEffect, useRef, useState } from "react";
import { format, isValid, parseISO } from "date-fns";
import gsap from "gsap";
import Image from "next/image";
import Assessment from "./Assessment";
import BackButton from "./BackButton";
import ErrorIndicator from "./ErrorIndicator";
import styles from "./ReportOverlay.module.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import generatePDF from "@/util/generatePDF";

const isValidDate = (date) => {
  const parsedDate = Date.parse(date);
  return !isNaN(parsedDate);
};

const ReportOverlay = ({ onClose, reportOverlay, selectedCandidate }) => {
  console.log("selected candidate is:", selectedCandidate);
  console.log(
    "selected candidate is this:",
    selectedCandidate?.results?.softskillRating
  );
  console.log("//////////////////////////", selectedCandidate?.results);
  const [codingResult, setCodingResult] = useState();
  const [isCodingAssessment, setIsCodingAssessment] = useState(false);
  const [results, setResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPdfLoading, setIsPdfLoading] = useState(false);
  const [error, setError] = useState(false);

  // const [datee, setDatee] = useState();

  // useEffect(() => {
  //   const date = new Date(selectedCandidate?.date);
  //   setDatee(date.toDateString());
  // });
  const candidateDate = selectedCandidate?.date;
  const resultDate = results?.data?.createdAt;

  const displayDate = isValidDate(candidateDate)
    ? candidateDate
    : isValidDate(resultDate)
    ? resultDate
    : null;

  useEffect(() => {

    console.log("SELECTED CANDIDATE ISS :", selectedCandidate);

    if(selectedCandidate){
      async function fetchCandidatesCodingResult() {
        setIsLoading(true);
        // const requestBody = {
        //   candidate_id: selectedCandidate?.candidate_id,
        // };
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_REMOTE_URL}/get-code-analysis-candidate`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              candidate_id: selectedCandidate?.candidate_id,
            }),
          }
        );

        const data = await response.json();
        console.log("data response123132:", data);
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
    }
    
  }, [selectedCandidate]);

  const calculateCumulativeMean = (val1, val2, val3) => {
    let total = 0;
    let count = 0;

    if (val1) {
      total += parseFloat(val1);
      count += 1;
    }

    if (val2) {
      total += parseFloat(val2);
      count += 1;
    }

    if (val3) {
      total += parseFloat(val3);
      count += 1;
    }

    if (count === 0) return 0;

    return (total / count).toFixed(1); // Round the final result to one decimal place
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
    const roundedScore = Math.round(score);
    if (roundedScore >= 7 && roundedScore <= 10) {
      return "#E7FFE0";
    } else if (roundedScore >= 5 && roundedScore < 7) {
      // Ensure the range is correct
      return "#F0F3FF";
    } else {
      return "#FFE6E6";
    }
  };

  const getFilter = (score) => {
    const roundedScore = Math.round(score);

    if (roundedScore >= 7 && roundedScore <= 10) {
      return "Recommended";
    } else if (roundedScore >= 5 && roundedScore < 7) {
      // Ensure the range is correct
      return "Qualified";
    } else {
      return "Not Eligible";
    }
  };

  const getStatusSymbol = (score) => {
    const roundedScore = Math.round(score);

    if (roundedScore >= 7 && roundedScore <= 10) {
      return "/activeStatus.svg";
    } else if (roundedScore >= 5 && roundedScore < 7) {
      // Ensure the range is correct
      return "/qualified.svg";
    } else {
      return "/noteligible.svg";
    }
  };

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

  // const handleDownloadPdf = async () => {
  //   console.log("Calling pdf download");
  //   if (contentRef.current) {
  //     const content = contentRef.current.innerHTML;

  //     try {
  //       const response = await fetch(
  //         `${process.env.NEXT_PUBLIC_REMOTE_URL}/downloadpdf`,
  //         {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({ content }),
  //         }
  //       );
  //       if (response.ok) {
  //         const pdfBlob = await response.blob();
  //         const url = window.URL.createObjectURL(pdfBlob);
  //         const link = document.createElement("a");
  //         link.href = url;
  //         link.download = "overlay.pdf";
  //         document.body.appendChild(link);
  //         link.click();
  //         document.body.removeChild(link);
  //         window.URL.revokeObjectURL(url);
  //         console.log("PDF Downloaded");
  //       } else {
  //         console.error("Failed to generate PDF:", response.statusText);
  //         const errorText = await response.text(); // Fetching detailed error message from the server
  //         console.error("Server response:", errorText);
  //       }
  //     } catch (error) {
  //       console.error("Error downloading PDF:", error);
  //     }
  //   }
  // };
  const showError = (message) => {
    setError(true);
    setTimeout(() => {
      setError(false);
    }, 3000);
  };

  // async function getPDFprinted(){
  //   try{
  //     const response = await fetch (`http://api.screenshotlayer.com/api/capture?access_key=15a203bb25ab19766195cc09ef37f675&url=https://app.recruitinn.ai/client/fc0fb150-f118-4716-8a3f-7ea3ae99cd6b&`)
  //   } catch (err) {

  //   }
  // }

  // useEffect(() => {
  //   try{

  //   }
  // })

  // async function generatePDF() {
  //   console.log("generating pdf");
  //   if (contentRef.current) {
  //     setIsPdfLoading(true);
  //     const content = contentRef.current.innerHTML;
  //     console.log("Content:", content);
  //     try {
  //       // const response = await fetch(
  //       //   // `/api/generate-pdf`,
  //       //   `${process.env.NEXT_PUBLIC_REMOTE_URL}/downloadpdf`,
  //       //   {
  //       //     method: "POST", // Change method to POST
  //       //     headers: {
  //       //       "Content-Type": "application/json",
  //       //     },
  //       //     body: JSON.stringify({ content }), // Send content in the request body
  //       //   }
  //       // );
  //       // if (!response.ok) {
  //       //   throw new Error("Failed to generate PDF");
  //       // }
  //       // // Assuming the response is a PDF file
  //       // const pdfBlob = await response.blob();
  //       // // Create a temporary anchor element
  //       // const link = document.createElement("a");
  //       // link.href = window.URL.createObjectURL(pdfBlob);
  //       // // Set the download attribute with desired filename
  //       // link.download = selectedCandidate
  //       //   ? `${selectedCandidate.name}'s-report.pdf`
  //       //   : "overlay.pdf";
  //       // // Append the anchor element to the document body
  //       // document.body.appendChild(link);
  //       // // Trigger a click event on the anchor element
  //       // link.click();
  //       // // Remove the anchor element from the document body
  //       // document.body.removeChild(link);

  //       //my code
  //       html2canvas(contentRef.current).then(canvas => {
  //         const imgData = canvas.toDataURL('image/png');
  //         const pdf = new jsPDF('portrait');
  //         pdf.html(content)
  //         //pdf.add(imgData, 'PNG', 0, 0, 297, 210); // Adjust width and height for landscape
  //         pdf.save(`${selectedCandidate.name}'s-report.pdf`);
  //       });
  //       setIsPdfLoading(false);
  //     } catch (error) {
  //       console.error("Error generating PDF:", error);
  //       showError();
  //       console.log(error);
  //       // Handle error
  //     } finally {
  //       setIsPdfLoading(false);
  //     }
  //   }
  // }

  // async function generatePDF() {
  //   console.log("generating pdf");
  //   if (contentRef.current) {
  //     try {
  //       setIsPdfLoading(true);
  //       const pdf = new jsPDF('landscape', 'mm', 'a4');  // Use A4 size in millimeters
  //       const contentWidth = 210;  // A4 page width in mm
  //       const contentHeight = 297; // A4 page height in mm

  //       // Use the actual DOM element and apply scaling
  //       pdf.html(contentRef.current, {
  //         callback: function (pdf) {
  //           pdf.save(selectedCandidate ? `${selectedCandidate.name}'s-report.pdf` : 'overlay.pdf');
  //         },
  //         x: 10,  // Left margin
  //         y: 10,  // Top margin
  //         html2canvas: {
  //           scale: 0.16  // Adjust the scale to fit the content on one page
  //         },
  //         width: contentWidth - 20,  // Set content width to fit within the page margins
  //         windowWidth: contentRef.current.scrollWidth  // Use the scroll width of the content for scaling
  //       });

  //       setIsPdfLoading(false);
  //     } catch (error) {
  //       console.error("Error generating PDF:", error);
  //       showError();
  //       console.log(error);
  //       // Handle error
  //     } finally {
  //       setIsPdfLoading(false);
  //     }
  //   }
  //   setIsPdfLoading(false);

  // }

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
      {error ? (
        <ErrorIndicator
          showErrorMessage={error}
          msgText={"Could not download the report, try again."}
        />
      ) : null}
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
                      parseFloat(
                        calculateCumulativeMean(
                          selectedCandidate?.results?.technicalRating,
                          selectedCandidate?.results?.softskillRating
                          // codingResult?.data?.result?.technicalRating
                        )
                      )
                    ),
                  }}
                >
                  {getFilter(
                    parseFloat(
                      calculateCumulativeMean(
                        selectedCandidate?.results?.technicalRating,
                        selectedCandidate?.results?.softskillRating
                        // codingResult?.data?.result?.technicalRating
                      )
                    )
                  )}
                  <Image
                    src={getStatusSymbol(
                      parseFloat(
                        calculateCumulativeMean(
                          selectedCandidate?.results?.technicalRating,
                          selectedCandidate?.results?.softskillRating
                          // codingResult?.data?.result?.technicalRating
                        )
                      )
                    )}
                    width={infoSymbolSize}
                    height={infoSymbolSize}
                  />
                </h4>
              </div>
              <div className={styles.rightContainer}>
                <span
                  style={{
                    backgroundColor: getBackgroundColor(
                      Math.round(
                        calculateCumulativeMean(
                          selectedCandidate?.results?.technicalRating,
                          selectedCandidate?.results?.softskillRating
                        )
                      )
                    ),
                  }}
                >
                  {Math.round(
                    calculateCumulativeMean(
                      selectedCandidate?.results?.technicalRating,
                      selectedCandidate?.results?.softskillRating
                    )
                  )}
                  /10
                </span>
              </div>
            </div>
            {/* candidate test info div  upperList */}
            <div className={styles.infoContainer} ref={contentRef}>
              <div className={styles.infoDiv}>
                <ul>
                  <li>
                    <span className={styles.bold}  >Name: </span>
                    <span>{selectedCandidate?.name}</span>
                  </li>
                  <li>
                    <span className={styles.bold}>Phone: </span>
                    <span>
                      {selectedCandidate?.contactNo ||
                      selectedCandidate?.contact_no
                        ? selectedCandidate?.contactNo ||
                          selectedCandidate?.contact_no
                        : "+92 333 3333333"}
                    </span>
                  </li>
                  <li>
                    <span className={styles.bold}>Date: </span>
                    {/* <span>
                      {selectedCandidate?.date || results?.data?.createdAt
                        ? selectedCandidate?.date || results?.data?.createdAt
                        : selectedCandidate?.date || results?.data?.createdAt}
                    </span> */}
                    <span>
                      {/* {format(new Date(2014, 1, 11), "EEE, yyyy-MM-dd")} */}

                      {selectedCandidate?.date || results?.data?.createdAt
                        ? // format(
                          // displayDate
                          selectedCandidate?.date || results?.data?.createdAt
                        : // new Date(
                          //   selectedCandidate?.date ||
                          //     results?.data?.createdAt
                          // ),
                          // "EEE, MMM dd yyyy"
                          // )
                          selectedCandidate?.date || results?.data?.createdAt}
                    </span>
                  </li>
                  <li>
                    <span className={styles.bold}>Job Type: </span>
                    <span>
                      {selectedCandidate?.job_type ||
                        results?.data?.job_type ||
                        selectedCandidate.jobType}
                    </span>
                  </li>
                  <li>
                    <span className={styles.bold}>Applied For: </span>
                    <span>
                      {selectedCandidate?.appliedFor
                        ? selectedCandidate?.appliedFor
                        : "Self-Evaluation"}
                    </span>
                  </li>
                  <li>
                    <span className={styles.bold}>Email: </span>
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
                      selectedCandidate?.results?.technicalRating.toString() ||
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
                      selectedCandidate?.results?.softskillRating.toString() ||
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
                  // onClick={handleDownloadPdf}
                  onClick={() =>
                    generatePDF({
                      setIsPdfLoading,
                      contentRef,
                      selectedCandidate,
                    })
                  }
                  disabled={isPdfLoading}
                >
                  {isPdfLoading ? "Downloading..." : "Download PDF"}
                  <span>
                    {isPdfLoading ? (
                      <div className={styles.loaderSmall}></div>
                    ) : (
                      <Image
                        alt="Download icon"
                        height={35}
                        width={35}
                        src="/download.svg"
                      />
                    )}
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
