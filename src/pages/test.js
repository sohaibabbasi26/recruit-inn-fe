import QuestionBox from "../../components/QuestionBox";
import TestInstruction from "../../components/TestInstruction";
import styles from "./test.module.css";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import CameraAccessInstruction from "../../components/CameraAccess";

const test = () => {
  const [instructionsPopup, setInstructionsPopup] = useState(false);
  const [hasAssessmentStarted, setHasAssessmentStarted] = useState(false);
  const [hasGivenCameraPermission, setHasGivenPermissionForCamera] =
    useState(false);
  const [cameraAccessInstructionPopup, setCameraAccessInstructionPopup] =
    useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { language } = useRouter().query;
  const videoRef = useRef(null);
  //const [invisibilityCounter, setInvisibilityCounter] = useState(0);

  useEffect(() => {
    const forceFullscreen = () => {
      if (!document.fullscreenElement) {
        document.documentElement
          .requestFullscreen()
          ?.then(() => {
            console.log("donneee");
          })
          .catch((err) => {
            console.log("err");
          });
      }
    };

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        //setInvisibilityCounter(counter=>counter+1);
        //if(invisibilityCounter>1){
        window.location.href = "/blocked";
        //}
      }
    });

    document.addEventListener("fullscreenchange", forceFullscreen);
    forceFullscreen();

    return () => {
      document.removeEventListener("fullscreenchange", forceFullscreen);
    };
  }, []);

  const onCameraClosePopup = () => {
    setCameraAccessInstructionPopup(false);
    setInstructionsPopup(true);
  };

  const closePopup = () => {
    setInstructionsPopup(false);
    setHasAssessmentStarted(true);
  };

  const instructions = [
    "Make sure your connection is stable.",
    "Your score will reflect on your profile.",
    "Avoid refreshing your page during the interview.",
    `Give your answers in ${language}`,
    "Leaving the interview screen, switching tabs, or opening any software will result in immediate disqualification.",
    "Make sure there’s no background noise while answering the questions.",
  ];

  const router = useRouter();

  return (
    <>
      {cameraAccessInstructionPopup && (
        <CameraAccessInstruction
          setHasGivenPermissionForCamera={setHasGivenPermissionForCamera}
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
      <div className={styles.superContainer}>
        <QuestionBox
          hasGivenPermissionForCamera={hasGivenCameraPermission}
          ref={videoRef}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          hasStarted={hasAssessmentStarted}
          client_id={router.query.client_id}
        />
      </div>
    </>
  );
};

export default test;
