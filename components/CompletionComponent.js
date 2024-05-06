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

  const finishTestHandler = () => {
    const route = getActiveComponent();
    if (route) {
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
