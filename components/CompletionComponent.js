import styles from "./CompletionComponent.module.css";
import Image from "next/image";

import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import NameContext from "@/contexts/NameContext";

const CompletionComponent = ({ getActiveComponent }) => {
  const [candidateNameTemp, setCandidateNameTemp] = useState(undefined);
  const [jobCandidateName, setJobCandidateName] = useState(undefined);
  // const { name } = useContext(NameContext);
  const imagsSize = 130;
  const iconSize = 20;
  const router = useRouter();

  const [clientId, setClientId] = useState(null);


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
    if (router.query.client_id) {
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
          body: JSON.stringify({ client_id:clientId }),
        }
      );
      const data = await response.json();
      console.log("decrement test response:", data);
      
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }


  const finishTestHandler = async () => {
    localStorage.removeItem("testcompleted");
    localStorage.removeItem("codingtestcompleted");
   
    const route = getActiveComponent();
    if (route && clientId) {
      await decrementTest();
      router.push(route);
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
