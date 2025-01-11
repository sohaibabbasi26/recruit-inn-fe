import React, { useEffect, useRef, useState } from "react";
import styles from "./CareerCounsellingQuestionBox.module.css";
import Image from "next/image";
import ErrorIndicator from "./ErrorIndicator";

function CareerCounsellingQuestionBox({ questions, hasStarted }) {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [message, setMessage] = useState(null);
  const isLastQuestion = currentQuestion === questions?.length;
  const [recordingDone, setRecordingDone] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioUUID, setAudioUUID] = useState(null);
  const [audioURL, setAudioURL] = useState(null);
  const [hasAudioEnded, setHasAudioEnded] = useState(false);
  const audioRef = useRef(null);
  const currentRecordingQuestionIndexRef = useRef(currentQuestion);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);
  const [answers, setAnswers] = useState([]);
  const language= "English";

  const startRecording = () => {
    if (mediaRecorderRef.current) {
      //cancel();
      audioRef?.current?.pause();
      setHasAudioEnded(true);
      mediaRecorderRef.current.start();
      setIsRecording(true);
      setRecordingDone(true);
      currentRecordingQuestionIndexRef.current = currentQuestion;
      console.log("Recording started");
    }
  };

  const showError = (message) => {
    setMessage(message);
    setShowErrorMessage(true);

    setTimeout(() => {
      setShowErrorMessage(false);
    }, 3000);
  };

  const generateAudio = async (ques) => {
    const question = questions[ques];
    if (question) {
      try {
        //console.log(`${process.env.NEXT_PUBLIC_REMOTE_URL}/save-tts`)
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_REMOTE_URL}/save-tts`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ text: question, language }),
          }
        );
        const data = await response.json();
        console.log(data);

        if (response.ok) {
          const url = `${process.env.NEXT_PUBLIC_REMOTE_URL}/audio?uuid=${data?.data?.uuid}`;
          console.log(url);
          setAudioUUID(data?.data?.uuid);
          setAudioURL(url);
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  useEffect(() => {
    if (hasAudioEnded) {
      deleteAudio();
    }
  }, [hasAudioEnded]);

  const playAudio = async () => {
    const audio = new Audio(audioURL);
    audioRef.current = audio;
    audioRef.current.play();
    audioRef.current.onended = () => {
      setHasAudioEnded(true);
    };

    // if(audio.ended){
    //   setHasAudioEnded(true);
    //   // await deleteAudio()
    //   // setAudioUUID(null)
    // }
  };

  useEffect(() => {
    if (audioUUID) {
      playAudio();
    }
  }, [audioUUID]);

  const deleteAudio = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_REMOTE_URL}/delete-audio`,
        {
          body: JSON.stringify({
            uuid: audioUUID?.toString(),
          }),
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        console.log("audio deleted successfully");
        setAudioUUID(null);
        setAudioURL(null);
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (questions && hasStarted) {
      console.log("value of has started", hasStarted);
      setIsFirstQues(true);
      generateAudio(currentQuestion);
    }
  }, [hasStarted]);

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
      setIsRecordingPopupVisible(false);
    }
  };

  const toggleComponent = async () => {
    setIsLoading(true);
    try {
      if (isLastQuestion) return;
  
      if (!recordingDone && recordedChunksRef.current.length === 0) {
        const silentBase64Wav =
          "UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAIA+AAACABAAZGF0YQAAAAA=";
        setAnswers((prevAnswers) =>
          prevAnswers.some(
            (ans) =>
              ans.question === newQuestions[currentQuestion - 1]?.question
          )
            ? prevAnswers
            : [
                ...prevAnswers,
                {
                  question: newQuestions[currentQuestion - 1]?.question,
                  answer: silentBase64Wav,
                },
              ]
        );
        console.log("No recording made, adding silent audio blob as answer.");
        showError("No answer was provided, moving on to next question.");
        setCurrentQuestion((prevCurrent) => prevCurrent + 1);
        //setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setCompletedQuestions((prevCompleted) => [
          ...prevCompleted,
          currentQuestion,
        ]);
        setIsLoading(false);
      } else {
        await stopAndHandleRecording();
      }
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setIsFirstQues(false);
      //setIsLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      {showErrorMessage && (
        <ErrorIndicator showErrorMessage={showErrorMessage} msgText={message} />
      )}
      <div className={styles.topContainer}>
        <div className={styles.questionNoList}>
          <ul>
            {questions?.map((question, index) => {
              return (
                <>
                  <li
                    key={question.question_id}
                    style={{
                      backgroundColor:
                        currentQuestion === question.question_id
                          ? "#6137db"
                          : "#f0edfc",
                      color:
                        currentQuestion === question.question_id
                          ? "white"
                          : "black",
                    }}
                  >
                    {question.question_id}
                  </li>
                </>
              );
            })}
          </ul>
        </div>
        {/* <span>
        {" "}
        <Image src="/timer.svg" width={20} height={20} />
        {minutes}:
        {remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}
      </span> */}

        <div
          //dir={language === "Arabic" ? "rtl" : "ltr"}
          className={styles.questionContainer}
        >
          {questions && questions.length > 0 && (
            <span>
              {/* {isFirstQues
                ? removeNumericPrefix(questions[currentQuestion - 1]?.question)
                :  */}
              {questions[currentQuestion - 1]?.question}
            </span>
          )}
        </div>

        <button
          style={{
            borderColor: recordingDone ? "#808080" : "",
            color: recordingDone ? "#808080" : "",
          }}
          className={styles.recordBtn}
          onClick={isRecording ? stopRecording : startRecording}
          disabled={isRecording}
        >
          <Image
            src={recordingDone ? "/mic-disabled.svg" : "/mic.svg"}
            width={20}
            height={20}
          />
          {isRecording ? "Click To Record Answer" : "Click To Record Answer"}
        </button>
        {/*lower container */}
        <div className={styles.lowerContainer}>
          <button
            onClick={isLastQuestion ? submitInterview : toggleComponent}
            disabled={!recordingDone || isSubmitted || isLoading}
          >
            {isLastQuestion ? "Submit Test" : "Next Question"}
            <Image src="/Forward.svg" width={20} height={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CareerCounsellingQuestionBox;
