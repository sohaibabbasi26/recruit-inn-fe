import { formatDate } from "@/util/formatDate";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import SelfReportComponent from "../../../../components/SelfReportComponent";

function Page({ params }) {
  //const candidateId= params?.candidate_id;
  // const router = useRouter();
    const router = useRouter();
  const {candidate_id} = router?.query;
  console.log(candidate_id)
  const [results, setResults] = useState([]);
  const [recommendedCourse, setRecommendedCourse] = useState(null);
  const [codingResult, setCodingResult] = useState();
  const [candidateInfo, setCandidateInfo] = useState(null);
  const [isCodingAssessment, setIsCodingAssessment] = useState(false);
  const [candidateDetails, setDetails] = useState([]);
  const [isPdfLoading, setIsPdfLoading] = useState(false);
  const contentRef = useRef(null);
  const [isReportTokenValid, setIsReportTokenValid] = useState(false);

  const weakSkill = results?.result?.weakSkill || null;

  // Scores
  const softSkillRating = results?.result?.softskillRating || 0;
  const technicalRating = results?.result?.technicalRating || 0;
  const overallRating = Math.round((softSkillRating + technicalRating) / 2);
  const codeRating = codingResult?.result?.technicalRating || 0;
  const candidateStatus =
    overallRating < 5
      ? "not eligible"
      : overallRating < 7
      ? "qualified"
      : "recommended";
  const candidateStatusClass =
    overallRating < 5
      ? "not_eligible"
      : overallRating < 7
      ? "qualified"
      : "recommended";
  const details = [
    {
      key: "phone",
      value: results?.candidate_info?.contact_no || "+92 304 2324115",
    },
    {
      key: "date",
      value: formatDate(
        new Date(results?.candidate_info?.createdAt) || new Date()
      ),
    },

    { key: "job type", value: results?.candidate_info?.job_type || "remote" },
    { key: "applied for", value: "self" },
    {
      key: "email",
      value: results?.candidate_info?.email || "bruce.wayne@gmail.com",
    },
  ];

  useEffect(() => {
      async function fetchResults() {
        const reqBody = {
          candidate_id,
        };
        try {
          if (candidate_id) {
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_REMOTE_URL}/result-by-cand-id-self`,
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
              setCandidateInfo(data?.data?.candidateInfo)
            }
          }
        } catch (err) {
          console.log("err:", err);
        }
      }
      //setIsLoading(true);
      fetchResults();
    }, [router?.isReady, candidate_id]);
  
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

      if(candidate_id){
        fetchCandidatesCodingResult();
      }
    }, [candidate_id]);
  
    const fetchRecommendedCourses = useCallback(async () => {
      if(weakSkill){
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
    <SelfReportComponent
      candidate_id={candidate_id}
      candidateInfo={candidateInfo}
      recommendedCourse={recommendedCourse}
      codingResult={codingResult}
      results={results}
      isPdfLoading={isPdfLoading}
      setIsPdfLoading={setIsPdfLoading}
    />
  );
}

export default Page;
