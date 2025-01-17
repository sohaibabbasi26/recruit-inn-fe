import React, { useEffect, useRef, useState } from "react";
import style from "./career-counselling.module.css";
import CareerCounsellingQuestionBox from "../../components/CareerCounsellingQuestionBox";
import CameraAccessInstruction from "../../components/CameraAccess";
import { useRouter } from "next/router";
import TestInstruction from "../../components/TestInstruction";

function CareerCounselling() {
  const router = useRouter();
  const { token } = router?.query;
  const [email, setEmail] = useState(null);
  console.log(token);

  useEffect(() => {
    const verifyToken = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_REMOTE_URL}/verify-token`,
        {
          method:"POST",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      if (response?.ok) {
        const data = await response?.json();
        setEmail(data?.data?.email);
      }
    };
    verifyToken();
  }, [router?.isReady]);

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
  const [instructionsPopup, setInstructionsPopup] = useState(false);
  const [cameraAccessInstructionPopup, setCameraAccessInstructionPopup] =
    useState(true);
  const [isLoading, setIsLoading] = useState(false);
  //const { language } = useRouter().query;
  const videoRef = useRef(null);

  const onCameraClosePopup = () => {
    setCameraAccessInstructionPopup(false);
    setInstructionsPopup(true);
  };

  const closePopup = () => {
    setInstructionsPopup(false);
  };

  const instructions = [
    "Make sure your connection is stable.",
    "Your score will reflect on your profile.",
    "Avoid refreshing your page during the interview.",
    `Give your answers in English`,
    "Make sure there’s no background noise while answering the questions.",
  ];

  if (!email) {
    return <div></div>;
  }

  return (
    <>
      {cameraAccessInstructionPopup && (
        <CameraAccessInstruction
          ref={videoRef}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          onClose={onCameraClosePopup}
        />
      )}
      {instructionsPopup && (
        <TestInstruction
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          onClose={closePopup}
          options={instructions}
        />
      )}
      {!instructionsPopup && !cameraAccessInstructionPopup && (
        <div className={style.superContainer}>
          <CareerCounsellingQuestionBox
            email={email}
            questions={questions}
            hasStarted={!instructionsPopup}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            hasVideoStarted={!instructionsPopup}
          />
        </div>
      )}
    </>
  );
}

export default CareerCounselling;
