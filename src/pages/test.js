import QuestionBox from "../../components/QuestionBox";
import TestInstruction from "../../components/TestInstruction";
import styles from "./test.module.css";
import { useState } from "react";
import { useRouter } from "next/router";

const test = () => {
  const [instructionsPopup, setInstructionsPopup] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const {language} = useRouter().query;
  const closePopup = () => {
    setInstructionsPopup(false);
  };

  const instructions = [
    "Make sure your connection is stable.",
    "Your score will reflect on your profile.",
    "Avoid Refreshing your page during interview",
    `Give your answers in ${language}`,
    `Make sure there’s no background noise while answering the
  questions.`,
  ];

  const router = useRouter();
  return (
    <>
      {instructionsPopup && (
        <TestInstruction
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          onClose={closePopup}
          options={instructions}
        />
      )}
      <div className={styles.superContainer}>
        <QuestionBox
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          hasStarted={!instructionsPopup}
          client_id={router.query.client_id}
        />
      </div>
    </>
  );
};

export default test;
