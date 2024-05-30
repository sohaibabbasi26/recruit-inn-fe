import QuestionBox from "../../components/QuestionBox";
import TestInstruction from "../../components/TestInstruction";
import styles from "./test.module.css";
import { useState } from "react";

const test = () => {
  const [instructionsPopup, setInstructionsPopup] = useState(true);

  const closePopup = () => {
    setInstructionsPopup(false);
  };

  const instructions = [
    "Make sure your connection is stable.",
    "Your score will reflect on your profile.",
    "Avoid Refreshing your page during interview",
    "Give your answers in English",
    `Make sure there’s no background noise while answering the
  questions.`,
  ];

  return (
    <>
      {instructionsPopup && (
        <TestInstruction onClose={closePopup} options={instructions} />
      )}
      <div className={styles.superContainer}>
        <QuestionBox hasStarted={!instructionsPopup} />
      </div>
    </>
  );
};

export default test;
