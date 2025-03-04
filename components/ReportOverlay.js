import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import SelfReportComponent from "./SelfReportComponent";
import styles from "./ReportOverlay.module.css";
import ErrorIndicator from "./ErrorIndicator";
import Image from "next/image";

const ReportOverlay = ({ onClose, reportOverlay, selectedCandidate, isAdmin }) => {
  //const candidateId= params?.candidate_id;
  // const router = useRouter();

  console.log(selectedCandidate?.candidate_id);
  const { candidate_id } = selectedCandidate;
  const [results, setResults] = useState([]);
  const [recommendedCourse, setRecommendedCourse] = useState(null);
  const [codingResult, setCodingResult] = useState();
  const [candidateInfo, setCandidateInfo] = useState(null);
  const [isCodingAssessment, setIsCodingAssessment] = useState(false);
  const [isPdfLoading, setIsPdfLoading] = useState(false);

  const weakSkill = results?.result?.weakSkill || null;
  const overlayRef = useRef(null);

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
      document.body.style.overflow = "";
      gsap.to(overlayRef.current, {
        y: "100%",
        opacity: 0,
        duration: 0.1,
        ease: "power1",
      });
    };
  }, [reportOverlay, onClose]);

  useEffect(() => {
    async function fetchResults() {
      const reqBody = {
        candidate_id,
      };
      try {
        if (candidate_id) {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_REMOTE_URL}/result-by-cand-id`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(reqBody),
            }
          );
          const data = await response.json();

          if (data?.data) {
            setResults(data?.data);
            setCandidateInfo(data?.data?.candidateInfo);
          }
        }
      } catch (err) {
        console.log("err:", err);
      }
    }
    //setIsLoading(true);
    fetchResults();
  }, [candidate_id]);

  useEffect(() => {
    async function fetchCandidatesCodingResult() {
      //setIsLoading(true);
      const requestBody = {
        candidate_id,
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
      setCodingResult(data?.data);
      //
      //setIsLoading(false);
      if (data && data?.data && data?.data?.result) {
        setIsCodingAssessment(true);
      } else {
        setIsCodingAssessment(false);
      }
    }

    if (candidate_id) {
      fetchCandidatesCodingResult();
    }
  }, [candidate_id]);

  const fetchRecommendedCourses = useCallback(async () => {
    if (weakSkill) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SKILLBUILDER_URL}/search?value=${weakSkill}&searchBy=course`
      );
      const data = await response.json();

      if (data?.status !== 200) {
        setRecommendedCourse(null);
      }
      setRecommendedCourse(data?.data);
    }
  }, [recommendedCourse]);

  useEffect(() => {
    if (weakSkill && !recommendedCourse) {
      fetchRecommendedCourses();
    }
  }, [recommendedCourse, weakSkill]);

  return (
    <>
      {/* {error ? (
        <ErrorIndicator
          showErrorMessage={error}
          msgText={"Could not download the report, try again."}
        />
      ) : null} */}
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
          
          <SelfReportComponent
            flow="client"
            isAdmin = {isAdmin}
            candidate_id={candidate_id}
            candidateInfo={candidateInfo}
            recommendedCourse={recommendedCourse}
            codingResult={codingResult}
            results={results}
            isPdfLoading={isPdfLoading}
            setIsPdfLoading={setIsPdfLoading}
          />
        </div>
      </div>
    </>
  );
};
export default ReportOverlay;
