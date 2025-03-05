import AdminSideNavbar from "../../components/AdminSideNavbar";
import AdminSuperComponent from "../../components/AdminSuperComponent";
import RightComponent from "../../components/RightComponent";
import styles from "./admin-dashboard.module.css";
import { useActiveItem } from "../contexts/ActiveItemContext";
import AdminSuper from "../../components/AdminSuper";
import {
  reqdata,
  allClientsData,
  activeClientsData,
  inActiveClientsData,
} from "@/data/dummyClientReq";
import {
  allCandidates,
  notEligibleCandidates,
  recommendedCandidates,
  qualifiedCandidates,
} from "@/data/candDummyData";
import { useState, useEffect } from "react";
import ReportOverlay from "../../components/ReportOverlay";
import { individualData } from "@/data/jobsDummyData";
import JobOverlay from "../../components/JobOverlay";
import AdminOverlay from "../../components/AdminOverlay";
import AdminRightComponent from "../../components/AdminRightComponent";
import SuccessIndicator from "../../components/SuccessIndicator";
import ErrorIndicator from "../../components/ErrorIndicator";
import ClientSignup from "./client-signup";
import { useTestState } from "@/contexts/TestRequirementContext";

const Admin = ({}) => {
  const [activeClientsData, setActiveClientsData] = useState(null);
  const [inActiveClientsData, setInActiveClientsData] = useState(null);
  const [requestedClientsData, setRequestedClientsData] = useState(null);
  const [preprocessedCandidates, setPreprocessedCandidates] = useState(null);
  const [recommendedCand, setRecommendedCand] = useState([]);
  const [qualifiedCand, setQualifiedCand] = useState([]);
  const [notEligibleCand, setNotEligibleCand] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [adminnToken, setAdminToken] = useState("");
  const [allClients, setAllClients] = useState();
  const [allResults, setAllResults] = useState();
  const [positionCandidates, setPositionCandidates] = useState([]);
  const {
    isTestRequired,
    setIsTestRequired,
    isArabicChosen,
    setIsArabicChosen,
  } = useTestState();

  const showError = (message) => {
    setMessage(message);
    setShowErrorMessage(true);

    setTimeout(() => {
      setShowErrorMessage(false);
    }, 3000);
  };

  const showSuccess = (message) => {
    setMessage(message);
    setShowSuccessMessage(true);

    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  useEffect(() => {
    // const adminToken = localStorage.getItem("admin-token");
    // const adminToken = document.cookie.get("loginToken")?.value || null;
    // const adminToken = document.cookies.get("loginToken")?.value || null;
    const adminToken =
      document.cookie
        .split("; ")
        .find((row) => row.startsWith("loginToken="))
        ?.split("=")[1] || null;
    //("ADMIN TOKEN", adminToken);
    setAdminToken(adminToken);
  });

  useEffect(() => {
    if (Array.isArray(allClients?.data)) {
      const filterRequestsData = (client) => client?.status === "Request";
      const filterActiveData = (client) => client?.status === "Active";
      const filterInActiveData = (client) => client?.status === "In-Active";

      setActiveClientsData(allClients?.data?.filter(filterActiveData));
      setInActiveClientsData(allClients?.data?.filter(filterInActiveData));
      setRequestedClientsData(allClients?.data?.filter(filterRequestsData));
    } else {
      //("allClients is not an array:", allClients);
    }
  }, [allClients]);

  // async function getCandidatesByPosition(position_id) {
  //   try {
  //     const reqBody = { position_id };
  //     const response = await fetch(
  //       `${process.env.NEXT_PUBLIC_REMOTE_URL}/get-candidate-by-postion`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${adminnToken}`,
  //         },
  //         body: JSON.stringify(reqBody),
  //       }
  //     );
  //     const data = await response.json();
  //     //("API response for candidates:", data);

  //     if (data?.data) {
  //       setPositionCandidates(data.data);
  //     } else {
  //       setPositionCandidates([]);
  //       showError("No candidates found for this position.");
  //     }
  //   } catch (err) {
  //     //("Error fetching candidates:", err);
  //     showError("Failed to fetch candidates.");
  //   }
  // }

  async function getCandidatesByPosition(position_id) {
    try {
      const reqBody = { position_id };
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_REMOTE_URL}/get-candidate-by-postion`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${adminnToken}`,
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

  const preprocessCandidatesData = (candidates) => {
    try {
      if (!candidates) {
        console.error("Candidates is undefined or null:", candidates);
        // handle the error or return a default value
        return [];
      }
      //("in pre processing method:", candidates);
      return candidates?.map((candidate) => {
        let latestResult = {
          softskillRating: 0,
          technicalRating: 0,
          softskillAssessment: "",
          technicalAssessment: "",
          createdAt: null,
        };
        if (candidate.results && candidate.results.length > 0) {
          const sortedResults = candidate.results.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          latestResult = sortedResults[0].result || latestResult;
          latestResult.createdAt = sortedResults[0].createdAt;
        }
        const score =
          (latestResult.softskillRating + latestResult.technicalRating) / 2;
        const formattedDate = latestResult.createdAt
          ? new Date(latestResult.createdAt).toLocaleDateString()
          : "N/A";
        let expertiseTechStack = [];
        let jobType = "N/A";
        let position = "N/A";
        if (Array.isArray(candidate.expertise)) {
          expertiseTechStack = candidate.expertise.map((e) => ({
            skill: e.skill,
            level: e.level,
          }));
        } else if (
          candidate.expertise &&
          typeof candidate.expertise === "object"
        ) {
          expertiseTechStack = candidate.expertise.techStack || [];
          jobType = candidate.expertise.jobtype || "N/A";
          position = candidate.expertise.position || "N/A";
        }
        return {
          candidate_id: candidate.candidate_id,
          name: candidate.name,
          email: candidate.email,
          position: position,
          score: score.toFixed(1),
          contactNo: candidate.contact_no,
          date: formattedDate,
          expertise: expertiseTechStack,
          jobType: jobType,
          position: position,
          overAllExperience: candidate.over_all_exp || "N/A",
          results: latestResult,
          company: candidate.company || null,
          appliedThrough: candidate?.company?.company_name || "Self",
          companyId: candidate?.company?.company_id,
          position: candidate?.position,
          job_type: candidate?.job_type,
        };
      });
    } catch (err) {
      //("ERROR:", err);
    }
  };

  //("checking:", allResults?.data?.candidates);

  useEffect(() => {
    if (allResults?.data) {
      const processedData = preprocessCandidatesData(
        allResults?.data,
        allResults?.data
      );
      setPreprocessedCandidates(processedData);
      //("pre processed data:", processedData);

      const filterRecommended = (candidate) =>
        Math.ceil(candidate?.results?.technicalRating) >= 7 &&
        Math.ceil(candidate?.results?.technicalRating) <= 10;
      const filterQualified = (candidate) =>
        Math.ceil(candidate?.results?.technicalRating) >= 5 &&
        Math.ceil(candidate?.results?.technicalRating) < 7;
      const filterNotEligible = (candidate) =>
        Math.ceil(candidate?.results?.technicalRating) < 5;

      setRecommendedCand(processedData?.filter(filterRecommended));
      setQualifiedCand(processedData?.filter(filterQualified));
      setNotEligibleCand(processedData?.filter(filterNotEligible));
    }
  }, [allResults]);

  useEffect(() => {
    //("Recommended Candidate:", recommendedCand);
    //("Qualified Candidate:", qualifiedCand);
    //("Not Eligible Candidate:", notEligibleCand);
  }, [recommendedCand, qualifiedCand, notEligibleCand]);

  useEffect(() => {
    //("pre processed data:", preprocessedCandidates);
  }, [preprocessedCandidates]);

  //("all clients :", allClients);
  //("all results :", allResults);

  const [reportOverlay, setReportOverlay] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [viewListing, setViewListing] = useState(false);
  const { activeItem } = useActiveItem();
  const [jobOverlay, setJobOverlay] = useState(false);
  const [data, setData] = useState(null);
  const [message, setMessage] = useState(null);

  const stages = {
    CLIENT_INFO: "CLIENT_INFO",
  };

  const stageHeadings = {
    CLIENT_INFO: "Adding A Client",
  };

  const toggleJobList = () => {
    setViewListing(!viewListing);
  };

  const toggleJobOverlay = () => {
    setJobOverlay(!jobOverlay);
  };

  useEffect(() => {
    //("show success msg state:", showSuccessMessage);
  }, [showSuccessMessage]);

  const getActiveComponent = () => {
    switch (activeItem) {
      case "Dashboard":
        return (
          <>
            <AdminSuperComponent
              setMessage={setMessage}
              showSuccessMessage={showSuccessMessage}
              showSuccess={showSuccess}
              adminToken={adminnToken}
              data={data}
              setData={setData}
              setShowOverlay={setShowOverlay}
              showError={showError}
              allCandidates={preprocessedCandidates}
              setSelectedCandidate={setSelectedCandidate}
              allClients={allClients?.data}
              setReportOverlay={setReportOverlay}
              reportOverlay={reportOverlay}
              onOpen={toggleJobList}
              selectedCandidate={selectedCandidate}
              getCandidatesByPosition={getCandidatesByPosition}
            />
            <AdminRightComponent
              setShowOverlay={setShowOverlay}
              showOverlay={showOverlay}
            />
          </>
        );

      case "AllClients":
        return (
          <AdminSuper
            showError={showError}
            showSuccess={showSuccess}
            adminToken={adminnToken}
            data={data}
            setData={setData}
            setShowOverlay={setShowOverlay}
            onOpen={toggleJobList}
            allClients={allClients?.data}
            getCandidatesByPosition={getCandidatesByPosition}
          />
        );
      // case "Request":
      //   return (
      //     <AdminSuper
      //       showError={showError}
      //       showSuccess={showSuccess}
      //       adminToken={adminnToken}
      //       data={data}
      //       setData={setData}
      //       setShowOverlay={setShowOverlay}
      //       onOpen={toggleJobList}
      //       reqData={requestedClientsData}
      //       getCandidatesByPosition={getCandidatesByPosition}
      //     />
      //   );
      case "Active":
        return (
          <AdminSuper
            showError={showError}
            showSuccess={showSuccess}
            adminToken={adminnToken}
            data={data}
            setData={setData}
            setShowOverlay={setShowOverlay}
            onOpen={toggleJobList}
            activeClientsData={activeClientsData}
            getCandidatesByPosition={getCandidatesByPosition}
          />
        );
      case "In-Active":
        return (
          <AdminSuper
            showError={showError}
            showSuccess={showSuccess}
            adminToken={adminnToken}
            data={data}
            setData={setData}
            setShowOverlay={setShowOverlay}
            onOpen={toggleJobList}
            inActiveClientsData={inActiveClientsData}
            getCandidatesByPosition={getCandidatesByPosition}
          />
        );
      case "All":
        return (
          <AdminSuper
            showError={showError}
            selectedCandidate={selectedCandidate}
            showSuccess={showSuccess}
            adminToken={adminnToken}
            setShowOverlay={setShowOverlay}
            reportOverlay={reportOverlay}
            setReportOverlay={setReportOverlay}
            setSelectedCandidate={setSelectedCandidate}
            allCandidates={preprocessedCandidates}
            getCandidatesByPosition={getCandidatesByPosition}
          />
        );
      case "Recommended":
        return (
          <AdminSuper
            showError={showError}
            selectedCandidate={selectedCandidate}
            showSuccess={showSuccess}
            adminToken={adminnToken}
            setShowOverlay={setShowOverlay}
            reportOverlay={reportOverlay}
            setReportOverlay={setReportOverlay}
            setSelectedCandidate={setSelectedCandidate}
            recommendedCandidates={recommendedCand}
            getCandidatesByPosition={getCandidatesByPosition}
          />
        );
      case "Qualified":
        return (
          <AdminSuper
            showError={showError}
            selectedCandidate={selectedCandidate}
            showSuccess={showSuccess}
            adminToken={adminnToken}
            setShowOverlay={setShowOverlay}
            reportOverlay={reportOverlay}
            setReportOverlay={setReportOverlay}
            setSelectedCandidate={setSelectedCandidate}
            qualifiedCandidates={qualifiedCand}
            getCandidatesByPosition={getCandidatesByPosition}
          />
        );
      case "NotEligible":
        return (
          <AdminSuper
            showError={showError}
            selectedCandidate={selectedCandidate}
            showSuccess={showSuccess}
            setShowOverlay={setShowOverlay}
            reportOverlay={reportOverlay}
            setReportOverlay={setReportOverlay}
            setSelectedCandidate={setSelectedCandidate}
            notEligibleCandidates={notEligibleCand}
          />
        );
      case "position":
        return (
          <AdminSuper
            setJobOverlay={setJobOverlay}
            selectedCandidate={selectedCandidate}
            setSelectedCandidate={setSelectedCandidate}
            setSelectedJob={setSelectedJob}
            selectedJob={selectedJob}
            setReportOverlay={setReportOverlay}
            reportOverlay={reportOverlay}
            positionCandidates={positionCandidates}
            toggleOverlay={toggleOverlay}
          />
        );
      case "viewJobListing":
        return (
          <AdminSuper
            showError={showError}
            selectedCandidate={selectedCandidate}
            showSuccess={showSuccess}
            adminToken={adminnToken}
            data={data}
            setData={setData}
            setShowOverlay={setShowOverlay}
            onOpen={toggleJobList}
            setSelectedJob={setSelectedJob}
            setJobOverlay={setJobOverlay}
            jobOverlay={jobOverlay}
            getCandidatesByPosition={getCandidatesByPosition}
          />
        );

      default:
        return null;
    }
  };

  const toggleReportOverlay = () => {
    setReportOverlay(!reportOverlay);
  };

  const toggleOverlay = () => {
    setShowOverlay(!showOverlay);
  };

  useEffect(() => {
    async function clientDataFetch() {
      const adminToken = localStorage.getItem("admin-token");
      setAdminToken(adminToken);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_REMOTE_URL}/get-companies`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );

      const data = await response.json();
      //("companies fetched:", data);
      setAllClients(data);
    }

    clientDataFetch();
  }, []);

  useEffect(() => {
    async function reportDataFetch() {
      const adminToken = localStorage.getItem("admin-token");
      setAdminToken(adminToken);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_REMOTE_URL}/get-all-results`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );
      const data = await response.json();
      //("companies fetched:", data);
      setAllResults(data);
    }
    reportDataFetch();
  }, []);

  //     useEffect(() => {
  //         //("show success msg state:", showSuccessMessage)
  //     }, [showSuccessMessage])

  //       const data = await response.json();
  //       //("companies fetched:", data);
  //       setAllResults(data);
  //     }

  //     reportDataFetch();
  //   }, []);

  //("active clients data:", activeClientsData);
  //("in active clients data:", inActiveClientsData);
  //("requetsed Clients data", requestedClientsData);

  return (
    <>
      {showErrorMessage && (
        <ErrorIndicator showErrorMessage={showErrorMessage} msgText={message} />
      )}
      {showSuccessMessage && (
        <SuccessIndicator
          showSuccessMessage={showSuccessMessage}
          msgText={message}
        />
      )}
      {showOverlay && (
        <AdminOverlay
          adminToken={adminnToken}
          showError={showError}
          showErrorMessage={showErrorMessage}
          message={message}
          setMessage={setMessage}
          showSuccessMessage={showSuccessMessage}
          showSuccess={showSuccess}
          showOverlay={showOverlay}
          onClose={toggleOverlay}
          stages={stages}
          stageHeadings={stageHeadings}
        />
      )}
      {/* {jobOverlay && <JobOverlay onClose={toggleJobOverlay} jobOverlay={jobOverlay} selectedJob={selectedJob} />} */}

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
          adminToken={adminnToken}
          onClose={toggleJobOverlay}
          jobOverlay={jobOverlay}
          selectedJob={selectedJob}
          positionCandidates={positionCandidates}
        />
      )}
      {reportOverlay && (
        <ReportOverlay
          onClose={toggleReportOverlay}
          reportOverlay={reportOverlay}
          selectedCandidate={selectedCandidate}
        />
      )}
      <div className={styles.adminPortal}>
        <AdminSideNavbar />
        {getActiveComponent()}
      </div>
    </>
  );
};

export default Admin;

export const getServerSideProps = async ({ req }) => {
  try {
    const cookies = req.headers.cookie;
    const adminToken =
      cookies
        ?.split("; ")
        .find((cookie) => cookie.startsWith("loginToken="))
        ?.split("=")[1] || null;
    // const adminToken = localStorage.getItem("admin-token");

    //("************** ADMIND TOKEN *****************");
    //("LOGGGGG12", adminToken);

    const response = await fetch("http://localhost:3002/v1/get-companies", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    });
    //("response: ", response);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    //("jsonified response: ", data);

    const responseTwo = await fetch(
      `${process.env.NEXT_PUBLIC_REMOTE_URL}/get-all-results`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }
    );
    //("response: ", response);
    if (!responseTwo.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const dataTwo = await responseTwo.json();
    //("jsonified response: ", dataTwo);
    return {
      props: {
        allClients: data,
        allResults: dataTwo,
      },
    };
  } catch (error) {
    console.error("Failed to fetch companies:", error);
    return {
      props: {
        error: "Failed to fetch data",
      },
    };
  }
};
