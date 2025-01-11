import React from "react";
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
    },
  ];
  const hasStarted= true;
  return (
    <>
      <div className={style.superContainer}>
        <CareerCounsellingQuestionBox questions={questions} />
      </div>
    </>
  );
}

export default CareerCounselling;
