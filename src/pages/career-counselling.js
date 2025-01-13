import React, { useState } from "react";
import style from "./career-counselling.module.css";
import CareerCounsellingQuestionBox from "../../components/CareerCounsellingQuestionBox";

function CareerCounselling() {
  const questions = [
    {
      question_id: 1,
      question: "What are your technical and/or professional skills?",
    },
    {
      question_id: 2,
      question: "In which professional career do you want to pursue?",
    },
  ];
  const hasStarted = true;
  const [isLoading, setIsLoading] = useState(false);
  

  return (
    <>
      <div className={style.superContainer}>
        <CareerCounsellingQuestionBox
          questions={questions}
          hasStarted={hasStarted}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      </div>
    </>
  );
}

export default CareerCounselling;
