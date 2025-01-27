import styles from "./CompletionComponent.module.css";
import Image from "next/image";

import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import NameContext from "@/contexts/NameContext";
import { useCameraContext } from "@/contexts/CameraContext";

const CompletionComponent = ({ getActiveComponent }) => {
  const [candidateNameTemp, setCandidateNameTemp] = useState(undefined);
  const [jobCandidateName, setJobCandidateName] = useState(undefined);
  const [interviewCount, setInterviewCount] = useState(null);
  const { turnOffCamera } = useCameraContext();
  // const { name } = useContext(NameContext);
  const imagsSize = 130;
  const iconSize = 20;
  const router = useRouter();

  const [clientId, setClientId] = useState(null);
  const [companyEmail, setCompanyEmail] = useState(null);
  const [companyName, setCompanyName] = useState(null);

  // trying this weird way to get candidate name [not recommended]
  useEffect(function () {
    setCandidateNameTemp(localStorage.getItem("candidateNameForNow"));
  }, []);
  // trying this weird way to get candidate name [not recommended]
  useEffect(function () {
    setJobCandidateName(localStorage.getItem("jobCandidateNameForNow"));
  }, []);

  // const finishTestHandler = () =>  {
  //     router.push(getActiveComponent());
  // }

  useEffect(() => {
    if (router.query.client_id !== undefined) {
      console.log("client id1: ", router.query.client_id);
      setClientId(router.query.client_id);
    }
  }, [router.query.client_id]);

  async function decrementTest() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_REMOTE_URL}/decrement-test`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ client_id: clientId }),
        }
      );
      const data = await response.json();
      console.log("decrement test response:", data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  async function fetchClientSubscription() {
    if (clientId === undefined) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_REMOTE_URL}/get-client-subscription?company_id=${clientId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setInterviewCount(data?.data?.test_count);
    }
  }

  async function getCompanyDetails() {
    if (interviewCount === 0 && interviewCount !== null) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_REMOTE_URL}/get-one-company`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: clientId,
            }),
          }
        );

        const data = await response.json();
        console.log("company details response:", data?.data?.email);
        setCompanyEmail(data?.data?.email);
        setCompanyName(data?.data?.company_name);
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  }

  async function sendEmailtoClient() {
    if (companyEmail && companyName) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_REMOTE_URL}/sendMail`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              to: companyEmail,
              subject: "Your Interview Limit Ended",
              text: `Dear ${companyName}, Your interview limit has ended. Candidates will not be able to take the test until the subscription is renewed.`,
            }),
          }
        );
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  }

  useEffect(() => {
    if (interviewCount === 0 && clientId) {
      getCompanyDetails();
    }
  }, [interviewCount, clientId]);
  useEffect(() => {
    if (interviewCount === 0 && clientId) {
      sendEmailtoClient();
    }
  }, [companyName, companyEmail]);

  const finishTestHandler = async () => {
    turnOffCamera();
    localStorage.removeItem("testcompleted");
    localStorage.removeItem("codingtestcompleted");

    const route = getActiveComponent();
    if (route && clientId) {
      await decrementTest();
      await fetchClientSubscription();
      window.location.href = route;
      // router.push(route);
    } else {
      console.error("Undefined route from getActiveComponent");
    }
  };

  console.log(candidateNameTemp);
  console.log(jobCandidateName);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.topContainer}>
          <Image src="/completion.svg" width={imagsSize} height={imagsSize} />
          <h3>
            Congratulations{" "}
            {candidateNameTemp !== "undefined" ? candidateNameTemp : ""}
            {jobCandidateName !== "undefinde" ? jobCandidateName : ""}.
          </h3>
          <p>You've successfully completed your assessment</p>
        </div>

        <div className={styles.feedbackContainer}>
          <textarea placeholder="If you’ve any feedback regarding to our AI Assessment process feel free to let us know."></textarea>
        </div>

        <div className={styles.lowerContainer}>
          <button onClick={finishTestHandler}>
            Finish{" "}
            <Image src="/Forward.svg" width={iconSize} height={iconSize} />
          </button>
        </div>
      </div>
    </>
  );
};

export default CompletionComponent;
