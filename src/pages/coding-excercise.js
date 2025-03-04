import Image from "next/image";
import ContentEditor from "../../components-landing/ContentEditor";
import { useEffect, useState } from "react";
import CodingChild from "../../components-landing/ChildCodingComp";
import { useRouter } from "next/router";
import ErrorIndicator from "../../components/ErrorIndicator";
import TestInstruction from "../../components/TestInstruction";
import styles from "./coding-excercise.module.css";

const CodingExcersice = () => {
  const [Code, setCode] = useState(null);
  const [language, setLanguage] = useState(null);
  const [output, setOutput] = useState();
  const [question, setQuestion] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [constraints, setConstraints] = useState();
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(600);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [message, setMessage] = useState(false);
  const [instructionsPopup, setInstructionsPopup] = useState(true);
  const { cid } = router?.query;
  const { client_id } = router?.query;


  const closePopup = () => {
    setInstructionsPopup(false);
  };

  const showError = (message) => {
    setMessage(message);
    setShowErrorMessage(true);

    setTimeout(() => {
      setShowErrorMessage(false);
    }, 3000);
  };

  async function executeCode() {
    const reqBody = {
      language: language,
      versionIndex: 1,
      script: Code,
    };
    if (!language) {
      //("Please select a programming language.");
      showError("Please select a programming language.");
      return;
    }
    //("req body:", reqBody);
    setIsLoading(true);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_REMOTE_URL}/execute-code`,
      {
        method: "POST",
        body: JSON.stringify(reqBody),
        headers: { "Content-type": "application/json" },
      }
    );
    const data = await response.json();
    //("response: ", data);
    setOutput(data?.data?.data?.output);
    setIsLoading(false);
  }
  useEffect(() => {
    // Check if user is logged in
    const testcomplete = localStorage.getItem("codingtestcompleted");
    if (testcomplete) {
      router.push(`/test-submit-completion/${cid}?client_id=${client_id}`);
    }
  }, [router]);

  async function codeSubmitHandler() {
    setIsLoading(true);
    localStorage.setItem("codingtestcompleted", "true");
    const reqBody = {
      code: Code,
      exercise: question,
      output: output,
      constraints: constraints,
      candidate_id: cid,
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_REMOTE_URL}/get-code-submit`,
      {
        method: "POST",
        body: JSON.stringify(reqBody),
        headers: { "Content-type": "application/json" },
      }
    );

    const data = await response.json();
    router.push(`/test-submit-completion/${cid}?client_id=${client_id}`);
    //("response: ", data);
    setIsLoading(false);
  }

  const formatTime = (timeLeft) => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  useEffect(() => {
    if (instructionsPopup) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          clearInterval(timer);
          codeSubmitHandler();
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [instructionsPopup]);

  const instructions = [
    "Please select the programming language first.",
    "For the questions requiring input, code a hardcoded input in available instead of input function call.",
    // "For queries that require input, use a hardcoded input instead of calling the input function.",
  ];

  return (
    <div className={styles.codingExcercise}>
      {showErrorMessage && (
        <ErrorIndicator showErrorMessage={showErrorMessage} msgText={message} />
      )}
      {instructionsPopup && (
        <TestInstruction
          onClose={closePopup}
          heading="Coding Instructions"
          options={instructions}
        />
      )}
      <CodingChild
        cid={cid}
        formatTime={formatTime}
        timeLeft={timeLeft}
        codeSubmitHandler={codeSubmitHandler}
        constraints={constraints}
        setConstraints={setConstraints}
        question={question}
        setQuestion={setQuestion}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        output={output}
        executeCode={executeCode}
        code={Code}
        language={language}
        setCode={setCode}
        setLanguage={setLanguage}
      />
    </div>
  );
};
export default CodingExcersice;
