import { Finlandica, Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useState, useEffect } from "react";
import Overlay from "../../../components/Overlay";
import { useActiveItem } from "../../contexts/ActiveItemContext";
import JobOverlay from "../../../components/JobOverlay";
import { useRouter } from "next/router";
import SuccessIndicator from "../../../components/SuccessIndicator";
import ErrorIndicator from "../../../components/ErrorIndicator";
import PaymentOverlay from "../../../components/PaymentOverlay";
import { FormProvider } from "@/contexts/FormContext";
import CandidateSideNavbar from "../../../components/CandidateSideNavbar";
import CandidateSuper from "../../../components/CandidateSuper";
import { useActiveFlow } from "@/contexts/ActiveFlowContext";
import SelfReportOverlay from "../../../components/SelfReportOverlay";

export default function Candidate() {
  const router = useRouter();
  const { id } = router?.query;
  const [token, setToken] = useState(null);
  const [expertise, setExpertise] = useState();
  const [questionId, setQuestionId] = useState();
  const [results, setResults] = useState([]);
  const [testReq, setTestReq] = useState();
  const [candidateId, setCandidateId] = useState();
  const [codeQues, setCodeQues] = useState();
  const [assessmentId, setAssessmentId] = useState();
  // const [contact, setContact] = useState()
  const [isLoading, setIsLoading] = useState(false);
  const { activeItem } = useActiveItem();
  const { setActiveFlow, activeFlow } = useActiveFlow();
  const [showOverlay, setShowOverlay] = useState(false);
  const [showPaymentOverlay, setShowPaymentOverlay] = useState(false);
  const [reportOverlay, setReportOverlay] = useState(false);
  const [jobOverlay, setJobOverlay] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [message, setMessage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [candName, setCandName] = useState();
  const [experience, setExperience] = useState();
  const [appliedThrough, setAppliedThrough] = useState();
  const [contact, setContact] = useState();
  const [date, setDate] = useState();
  const [jobtype, setJobType] = useState();
  const [email, setEmail] = useState();
  const [isDisable, setIsDisable] = useState(false);

  useEffect(() => {
    localStorage.setItem("activeFlow", "Candidate_self");
  }, []);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedInCandidate");
    if (!isLoggedIn) {
      router.push("/candidate-login");
    }
  }, [router]);

  useEffect(() => {
    async function fetchCompanyDetails() {
      const reqBody = {
        candidate_id: id,
      };

      try {
        if (id) {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_REMOTE_URL}/get-one-candidate-self`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(reqBody),
            }
          );
          const data = await response.json();
          //("one candidate details: ", data);
          setExpertise(data?.data?.expertise);
          setCandName(data?.data?.name);
          setExperience(data?.data?.over_all_exp);
          setContact(data?.data?.contact_no);
          setTestReq(data?.data?.is_test_req);
          setCandidateId(data?.data?.candidate_id);
          const date = new Date(data?.data?.createdAt);
          setDate(date.toDateString());
          setEmail(data?.data?.email);
          setJobType(data?.data?.job_type);
          setAppliedThrough(data?.data?.applied_through);
          //("Expertise in fetch company details:", expertise);
        }
      } catch (err) {
        //("err:", err);
      }
    }
    fetchCompanyDetails();
  }, [router?.isReady]);

  useEffect(() => {
    async function fetchResults() {
      const reqBody = {
        candidate_id: id,
      };
      try {
        if (id) {
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
            setResults([data?.data]);
            //("one candidate result details: ", results);
          }
          //("Expertise in fetch company details:", expertise);
        }
      } catch (err) {
        //("err:", err);
      } finally {
        setIsLoading(false);
      }
    }
    setIsLoading(true);
    fetchResults();
  }, [router?.isReady, id]);

  useEffect(() => {
    setActiveFlow("candidate-self");
    //("current flow:", activeFlow);
  }, []);

  const generateTestAndRedirect = async () => {
    const reqBody = {
      expertise: expertise,
    };

    //("generate test and redirect:", reqBody);

    try {
      //("running test");
      setIsLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_REMOTE_URL}/prepare-test`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reqBody),
        }
      );
      //("after test");
      const data = await response.json();
      localStorage.setItem("testData", JSON.stringify(data));
      setQuestionId(data?.data?.message?.question_id);
      //("question id", data?.data?.message?.question_id);
      //("question id:", questionId);
      //("data in test preparation:", data);
      setIsLoading(false);

      if (testReq === true) {
        try {
          setIsLoading(true);
          const req = {
            codingExpertise: expertise,
            candidate_id: candidateId,
          };
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
          const dataTwo = await response.json();
          //("code data:", dataTwo);
          if (dataTwo?.data) {
            setCodeQues(dataTwo);
            setAssessmentId(dataTwo?.data?.assessment_id);
          }
          //("Data is here:", codeQues);
          //("assessment id:", assessmentId);
          if (data?.data?.assessment_id) {
            setTestReq(true);
          }

          //("assessment id:", assessmentId);
          //("code question data:", data);

          if (dataTwo?.data?.assessment_id) {
            //("inside redirect logic");
            //(
            //   `/test?cid=${id}&qid=${data?.data?.message?.question_id}&a_id=${dataTwo?.data?.assessment_id}&test_req=${testReq}`
            // );
            router.push(
              `/test?cid=${id}&qid=${data?.data?.message?.question_id}&a_id=${dataTwo?.data?.assessment_id}&test_req=${testReq}`
            );
          }
        } catch (err) {
          console.error("ERROR:", err);
        }
      } else {
        router.push(`/test?cid=${id}&qid=${data?.data?.message?.question_id}`);
      }
    } catch (err) {
      setIsLoading(false);
      //("error:", err);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 7000);
    }
  };

  // trying this weird way to get candidate name [not recommended]
  useEffect(
    function () {
      localStorage.removeItem("jobCandidateNameForNow");
      localStorage.setItem("candidateNameForNow", candName);
    },
    [candName]
  );

  useEffect(() => {
    if (results?.length > 0) {
      setIsDisable(true);
    }
  }, [results]);

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
            <CandidateSuper
              candidateId={id}
              isLoading={isLoading}
              contact={contact}
              isDisable={isDisable}
              setReportOverlay={setReportOverlay}
              setSelectedCandidate={setSelectedCandidate}
              appliedThrough={appliedThrough}
              experience={experience}
              name={candName}
              expertise={expertise}
              results={results}
              generateTestAndRedirect={generateTestAndRedirect}
            />
          </>
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
            />
          )}
        </FormProvider>
        {/* {reportOverlay && (
          // <SelfReportOverlay
          //   contact={contact}
          //   jobType={jobtype}
          //   experience={experience}
          //   candName={candName}
          //   email={email}
          //   jobtype={jobtype}
          //   date={date}
          //   showError={showError}
          //   showErrorMessage={showErrorMessage}
          //   showSuccessMessage={showSuccessMessage}
          //   onClose={toggleReportOverlay}
          //   reportOverlay={reportOverlay}
          //   selectedCandidate={selectedCandidate}
          // />
          router?.push(`/candidate/report/${id}`)
        )} */}
        {jobOverlay && (
          <JobOverlay
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
          />
        )}
        {showPaymentOverlay && (
          <PaymentOverlay
            onClose={togglePaymentOverlay}
            showPaymentOverlay={showPaymentOverlay}
          />
        )}
        <CandidateSideNavbar
          name={candName}
          showOverlay={showOverlay}
          setShowOverlay={setShowPaymentOverlay}
        />
        {getActiveComponent()}
      </div>
    </>
  );
}
