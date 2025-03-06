import { FormProvider } from "@/contexts/FormContext";
import { useTestState } from "@/contexts/TestRequirementContext";
import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ErrorIndicator from "../../../components/ErrorIndicator";
import JobOverlay from "../../../components/JobOverlay";
import Overlay from "../../../components/Overlay";
import PaymentOverlay from "../../../components/PaymentOverlay";
import ReportOverlay from "../../../components/ReportOverlay";
import RightComponent from "../../../components/RightComponent";
import SideNavbar from "../../../components/SideNavbar";
import SuccessIndicator from "../../../components/SuccessIndicator";
import Super from "../../../components/Super";
import SuperComponent from "../../../components/SuperComponent";
import { useActiveItem } from "../../contexts/ActiveItemContext";

export default function Home() {
  const router = useRouter();
  const { id } = router?.query;
  const [finalData, setFinalData] = useState([]);
  const [allCandidatesReports, setAllCandidateReports] = useState();
  const [preprocessedCandidates, setPreprocessedCandidates] = useState([]);
  const [token, setToken] = useState(null);
  const [recommendedCand, setRecommendedCand] = useState([]);
  const [qualifiedCand, setQualifiedCand] = useState([]);
  const [notEligibleCand, setNotEligibleCand] = useState([]);
  const [activeJobsData, setActiveJobsData] = useState(null);
  const [closedJobsData, setClosedJobsData] = useState(null);
  const [allJobData, setAllJobData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [companyName, setCompanyName] = useState(null);
  const [companyEmail, setCompanyEmail] = useState(null);
  const [positionCandidates, setPositionCandidates] = useState();
  const [currentPackage, setCurrentPackage] = useState("free");
  const [interviewCount, setInterviewCount] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("client-token");
    async function fetchAllPositions() {
      const requestBody = { company_id: id };
      setIsLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_REMOTE_URL}/get-all-positions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestBody),
        }
      );
      //("response:", response);
      const allData = await response.json();
      setFinalData(allData.data);
      setIsLoading(false);
      //("jsonified response: ", allData.data);
    }
    if (token) {
      fetchAllPositions();
    }
  }, [id]);

  useEffect(() => {
    if (Array.isArray(finalData)) {
      //("Final fata from active filter ", finalData);
      const filterActive = (job) => job?.status === "Active";
      const filterClosed = (job) => job?.status === "Closed";
      const filterall = (job) =>
        job?.status === "Active" || job?.status === "Closed";
      setAllJobData(finalData.filter(filterall));
      //("all jobs data is ... ", finalData.filter(filterall));
      setActiveJobsData(finalData.filter(filterActive));
      //("Active jobs data ... ", finalData.filter(filterActive));
      setClosedJobsData(finalData.filter(filterClosed));
      //("active jobs", finalData.filter(filterActive));
    } else {
      //("finalData is not an array:", finalData);
    }
  }, [finalData]);

  useEffect(() => {
    let isMounted = true;
    //("client_id:", id);
    localStorage.setItem("clientId", id);
    // const token = localStorage.getItem("client-token");

    const token =
      document.cookie
        .split("; ")
        .find((cookie) => cookie.startsWith("loginToken="))
        ?.split("=")[1] || null; // Extract the token value

    if (!token) {
      console.error("Token not found");
      return;
    }
    setToken(token);

    async function fetchAllCandidateReports() {
      const requestBody = { company_id: id };
      setIsLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_REMOTE_URL}/get-results-by-company`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestBody),
        }
      );

      //("response: ", response);
      if (!response.ok) {
        //(`Error: ${response.status}`);
      }
      const allData = await response.json();
      if (isMounted) {
        setAllCandidateReports(allData);
        setIsLoading(false);
      }
      //("jsonified candidates response: ", allData);
    }
    fetchAllCandidateReports();
    return () => {
      isMounted = false;
    };
  }, [id]);

  useEffect(() => {
    async function fetchClientSubscription() {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_REMOTE_URL}/get-client-subscription?company_id=${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();

      setCurrentPackage(data?.data?.package_type || "free");
      setInterviewCount(data?.data?.test_count);
    }

    if (id) {
      fetchClientSubscription();
      if (localStorage.getItem("clickedPackage") === "true") {
        setShowPaymentOverlay(true);
        localStorage.removeItem("clickedPackage");
      }
    }
  }, [id]);

  // useEffect(() => {
  //   try {
  //     if (positionCandidates && positionCandidates?.data) {
  //       const candidates = preprocessCandidatesData(
  //         positionCandidates?.data,
  //         allCandidatesReports?.data
  //       );
  //     }
  //   } catch (err) {
  //     //("error in preprocessing:", err);
  //   }
  // }, [positionCandidates]);

  
  const preprocessCandidatesData = (candidates, company) => {
    return candidates
      .filter((candidate) => candidate.results && candidate.results.length > 0) // Filter out candidates without test results
      .map((candidate) => {
        let latestResult = {
          softskillRating: 0,
          technicalRating: 0,
          softskillAssessment: "",
          technicalAssessment: "",
          createdAt: null,
        };
        const sortedResults = candidate.results.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        latestResult = sortedResults[0].result || latestResult;
        latestResult.createdAt = sortedResults[0].createdAt;
        const score = (
          (latestResult.softskillRating + latestResult.technicalRating) /
          2
        ).toFixed(1);
        const formattedDate = latestResult.createdAt
          ? new Date(latestResult.createdAt).toLocaleDateString()
          : "N/A";
        const expertiseList = candidate?.expertise?.map((exp) => ({
          skill: exp.skill,
          level: exp.level,
        }));
        const inferredPosition =
          candidate?.expertise?.length > 0
            ? candidate?.expertise[0]?.skill
            : "N/A"; // Inferred position from the first skill
        return {
          candidate_id: candidate.candidate_id,
          position: candidate?.position,
          jobType: candidate?.job_type,
          name: candidate.name,
          email: candidate.email,
          score: parseFloat(score),
          contactNo: candidate.contact_no,
          date: formattedDate,
          expertise: expertiseList,
          inferredPosition: inferredPosition,
          overAllExperience: candidate.over_all_exp || "N/A",
          results: {
            softskillRating: latestResult.softskillRating,
            technicalRating: latestResult.technicalRating,
            softskillAssessment: latestResult.softskillAssessment,
            technicalAssessment: latestResult.technicalAssessment,
          },
          company: {
            name: company?.company_name || "N/A",
            location: company?.company_location || "N/A",
            email: company?.email || "N/A",
            contactNo: company?.contact_no || "N/A",
            status: company?.status || "N/A",
          },
        };
      });
  };

  useEffect(() => {
    async function fetchClientInfo() {
      const reqBody = {
        id,
      };
      //("req body:", reqBody);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_REMOTE_URL}/get-one-company`,
          {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(reqBody),
          }
        );
        const data = await response.json();
        setCompanyName(data?.data?.company_name);
        setCompanyEmail(data?.data?.email);
        localStorage.setItem("clientName", companyName);
        //("company self data:", data);
      } catch (err) {
        //("ERROR:", err);
      }
    }
    if (id) {
      fetchClientInfo();
    }
  }, [id]);

  //("Company Data:", allCandidatesReports);
  //("Candidates Data:", allCandidatesReports?.data?.candidates);
  //("testing:", allCandidatesReports?.data?.candidates);

  useEffect(() => {
    if (allCandidatesReports?.data?.candidates && allCandidatesReports?.data) {
      const completedCandidates = preprocessCandidatesData(
        allCandidatesReports.data.candidates,
        allCandidatesReports.data
      );
      setPreprocessedCandidates(completedCandidates);

      const filterRecommended = (candidate) =>
        Math.round(parseFloat(candidate.score)) >= 7 &&
        Math.round(parseFloat(candidate.score)) <= 10;
      const filterQualified = (candidate) =>
        Math.round(parseFloat(candidate.score)) >= 5 &&
        Math.round(parseFloat(candidate.score)) < 7;
      const filterNotEligible = (candidate) =>
        Math.round(parseFloat(candidate.score)) < 5;

      setRecommendedCand(completedCandidates.filter(filterRecommended));
      setQualifiedCand(completedCandidates.filter(filterQualified));
      setNotEligibleCand(completedCandidates.filter(filterNotEligible));

      //(
      //   "Recommended Candidates:",
      //   completedCandidates.filter(filterRecommended)
      // );
      //(
      //   "Qualified Candidates:",
      //   completedCandidates.filter(filterQualified)
      // );
      //(
      //   "Not Eligible Candidates:",
      //   completedCandidates.filter(filterNotEligible)
      // );
    }
  }, [allCandidatesReports]);

  async function getCandidatesByPosition(position_id) {
    try {
      const reqBody = { position_id };
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_REMOTE_URL}/get-candidate-by-postion`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reqBody),
        }
      );
      const data = await response.json();
      //("API response for candidates:", data);
      if (!data || !data.data) {
        //("Unexpected response format:", data);
        return;
      }
      const completedCandidates = preprocessCandidatesData(
        data.data,
        data.company
      );
      setPositionCandidates(completedCandidates);
      const filterRecommended = (candidate) =>
        parseFloat(candidate.score) >= 7 && parseFloat(candidate.score) <= 10;
      const filterQualified = (candidate) =>
        parseFloat(candidate.score) >= 5 && parseFloat(candidate.score) < 7;
      const filterNotEligible = (candidate) => parseFloat(candidate.score) < 5;
      setRecommendedCand(completedCandidates.filter(filterRecommended));
      setQualifiedCand(completedCandidates.filter(filterQualified));
      setNotEligibleCand(completedCandidates.filter(filterNotEligible));
      //("Filtered candidates:", completedCandidates);
    } catch (err) {
      //("Error fetching candidates:", err);
    }
  }

  const { activeItem } = useActiveItem();
  const [showOverlay, setShowOverlay] = useState(false);
  const [showPaymentOverlay, setShowPaymentOverlay] = useState(false);
  const [reportOverlay, setReportOverlay] = useState(false);
  const [jobOverlay, setJobOverlay] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [message, setMessage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const {
    isTestRequired,
    setIsTestRequired,
    isArabicChosen,
    setIsArabicChosen,
  } = useTestState();

  const showError = () => {
    setShowErrorMessage(true);

    setTimeout(() => {
      setShowErrorMessage(false);
    }, 3000);
  };

  const showSuccess = () => {
    setShowSuccessMessage(true);

    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  const stages = {
    ADD_SKILL: "ADD_SKILL",
    JOB_TYPE: "JOB_TYPE",
    AI_ASSESSMENT: "AI_ASSESSMENT",
    SHARE_LINK: "SHARE_LINK",
  };

  const stageHeadings = {
    ADD_SKILL: "Add Skills",
    JOB_TYPE: "Enter Job Details",
    AI_ASSESSMENT: "Your Job Is Created Successfully",
    SHARE_LINK: "Share the link with candidates",
  };

  const toggleOverlay = () => {
    setShowOverlay(!showOverlay);
  };
  const togglePaymentOverlay = () => {
    setShowPaymentOverlay(!showPaymentOverlay);
  };

  const toggleReportOverlay = () => {
    setReportOverlay(!reportOverlay);
  };

  const toggleJobOverlay = () => {
    setJobOverlay(!jobOverlay);
  };

  const getActiveComponent = () => {
    switch (activeItem) {
      case "Dashboard":
        return (
          <>
            <SuperComponent
              selectedCandidate={selectedCandidate}
              selectedJob={selectedJob}
              companyId={id}
              setIsLoading={setIsLoading}
              isLoading={isLoading}
              candidateReps={preprocessedCandidates}
              data={finalData}
              setJobOverlay={setJobOverlay}
              jobOverlay={jobOverlay}
              setReportOverlay={setReportOverlay}
              reportOverlay={reportOverlay}
              setSelectedCandidate={setSelectedCandidate}
              setSelectedJob={setSelectedJob}
              positionCandidates={positionCandidates}
            />
            <RightComponent
              activeItem={activeItem}
              preprocessedCandidates={preprocessedCandidates}
              setShowOverlay={setShowOverlay}
              showOverlay={showOverlay}
              interviewCount={interviewCount}
            />
          </>
        );
      case "AllJobs":
        return (
          <Super
            companyId={id}
            setSelectedCandidate={setSelectedCandidate}
            setSelectedJob={setSelectedJob}
            selectedCandidate={selectedCandidate}
            selectedJob={selectedJob}
            setReportOverlay={setReportOverlay}
            setJobOverlay={setJobOverlay}
            reportOverlay={jobOverlay}
            finalData={allJobData}
            toggleOverlay={toggleOverlay}
          />
        );
      case "Active":
        return (
          <Super
            companyId={id}
            setReportOverlay={setReportOverlay}
            setSelectedCandidate={setSelectedCandidate}
            setSelectedJob={setSelectedJob}
            selectedCandidate={selectedCandidate}
            selectedJob={selectedJob}
            setJobOverlay={setJobOverlay}
            reportOverlay={jobOverlay}
            activeJobsData={activeJobsData}
            toggleOverlay={toggleOverlay}
          />
        );
      case "Closed":
        return (
          <Super
            companyId={id}
            setReportOverlay={setReportOverlay}
            setSelectedCandidate={setSelectedCandidate}
            setSelectedJob={setSelectedJob}
            selectedCandidate={selectedCandidate}
            selectedJob={selectedJob}
            setJobOverlay={setJobOverlay}
            reportOverlay={jobOverlay}
            closedJobsData={closedJobsData}
            toggleOverlay={toggleOverlay}
          />
        );
      case "All":
        return (
          <Super
            setJobOverlay={setJobOverlay}
            selectedCandidate={selectedCandidate}
            companyId={id}
            setSelectedCandidate={setSelectedCandidate}
            setSelectedJob={setSelectedJob}
            selectedJob={selectedJob}
            setReportOverlay={setReportOverlay}
            reportOverlay={reportOverlay}
            allCandidates={preprocessedCandidates}
            toggleOverlay={toggleOverlay}
          />
        );
      case "Recommended":
        return (
          <Super
            setJobOverlay={setJobOverlay}
            selectedCandidate={selectedCandidate}
            companyId={id}
            setSelectedCandidate={setSelectedCandidate}
            setSelectedJob={setSelectedJob}
            selectedJob={selectedJob}
            setReportOverlay={setReportOverlay}
            reportOverlay={reportOverlay}
            recommendedCandidates={recommendedCand}
            toggleOverlay={toggleOverlay}
          />
        );
      case "Qualified":
        return (
          <Super
            setJobOverlay={setJobOverlay}
            selectedCandidate={selectedCandidate}
            companyId={id}
            setSelectedCandidate={setSelectedCandidate}
            setSelectedJob={setSelectedJob}
            selectedJob={selectedJob}
            setReportOverlay={setReportOverlay}
            reportOverlay={reportOverlay}
            qualifiedCandidates={qualifiedCand}
            toggleOverlay={toggleOverlay}
          />
        );
      case "NotEligible":
        return (
          <Super
            setJobOverlay={setJobOverlay}
            selectedCandidate={selectedCandidate}
            companyId={id}
            setSelectedCandidate={setSelectedCandidate}
            setSelectedJob={setSelectedJob}
            selectedJob={selectedJob}
            setReportOverlay={setReportOverlay}
            reportOverlay={reportOverlay}
            notEligibleCandidates={notEligibleCand}
            toggleOverlay={toggleOverlay}
          />
        );

      case "position":
        return (
          <Super
            setJobOverlay={setJobOverlay}
            selectedCandidate={selectedCandidate}
            companyId={id}
            setSelectedCandidate={setSelectedCandidate}
            setSelectedJob={setSelectedJob}
            selectedJob={selectedJob}
            setReportOverlay={setReportOverlay}
            reportOverlay={reportOverlay}
            positionCandidates={positionCandidates}
            toggleOverlay={toggleOverlay}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className={styles.clientPortal}>
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
        <FormProvider>
          {showOverlay && (
            <Overlay
              isArabicChosen={isArabicChosen}
              setIsArabicChosen={setIsArabicChosen}
              isTestRequired={isTestRequired}
              setIsTestRequired={setIsTestRequired}
              showError={showError}
              showErrorMessage={showErrorMessage}
              showSuccessMessage={showSuccessMessage}
              setMessage={setMessage}
              showSuccess={showSuccess}
              message={message}
              token={token}
              set
              onClose={toggleOverlay}
              showOverlay={showOverlay}
              stages={stages}
              stageHeadings={stageHeadings}
              interviewCount={interviewCount}
            />
          )}
        </FormProvider>
        {reportOverlay && (
          <ReportOverlay
            isAdmin={false}
            showError={showError}
            showErrorMessage={showErrorMessage}
            showSuccessMessage={showSuccessMessage}
            onClose={toggleReportOverlay}
            reportOverlay={reportOverlay}
            selectedCandidate={selectedCandidate}
          />
        )}
        {jobOverlay && (
          <JobOverlay
            getCandidatesByPosition={getCandidatesByPosition}
            isTestRequired={isTestRequired}
            setIsTestRequired={setIsTestRequired}
            message={message}
            showError={showError}
            showErrorMessage={showErrorMessage}
            showSuccessMessage={showSuccessMessage}
            setMessage={setMessage}
            showSuccess={showSuccess}
            token={token}
            onClose={toggleJobOverlay}
            jobOverlay={jobOverlay}
            selectedJob={selectedJob}
            interviewCount={interviewCount}
          />
        )}
        {showPaymentOverlay && currentPackage && (
          <PaymentOverlay
            onClose={togglePaymentOverlay}
            showPaymentOverlay={showPaymentOverlay}
            companyEmail={companyEmail}
            currentPackage={currentPackage}
          />
        )}
        {/* <div className={styles.clientPortal}> */}
        <SideNavbar
          name={allCandidatesReports?.data?.company_name}
          showOverlay={showOverlay}
          setShowOverlay={setShowPaymentOverlay}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
        {getActiveComponent()}
      </div>
    </>
  );
}
