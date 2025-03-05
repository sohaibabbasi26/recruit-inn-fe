import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./CareerCounsellingQuestionBox.module.css";
import Image from "next/image";
import ErrorIndicator from "./ErrorIndicator";
import blobToBase64 from "@/util/blobToBase64";
import { useRouter } from "next/router";
import VideoComponent from "./VideoComponent";

function CareerCounsellingQuestionBox({
  student_id,
  instructor_id,
  email,
  questions,
  hasStarted,
  setIsLoading,
  hasVideoStarted,
  isLoading,
}) {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(130);
  const minutes = Math.floor(timeLeft / 60);
  const remainingSeconds = timeLeft % 60;
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [message, setMessage] = useState(null);
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
  //const [isLoading, setIsLoading] = useState(false);
  const newQuestions = questions;
  const language = "English";
  const isLastQuestion = currentQuestion === newQuestions?.length;
  const [isGeneratingResult, setIsGeneratingResult] = useState(false);
  const [isTranscriptionComplete, setIsTranscriptionComplete] = useState();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isTestCompleted, setIsTestCompleted] = useState(false);
  const isProcessingRef = useRef();
  const videoRef = useRef(null);
  const [shouldSubmitTest, setShouldSubmitTest] = useState(false);

  const submitTestHandler = async () => {
    if (isSubmitted) return;
    await stopAndHandleRecording();
    setIsSubmitted(true);
    setIsGeneratingResult(true);
    setIsLoading(true);
    setIsTestCompleted(true);
    setShouldSubmitTest(true);
  };

  const stopCamera = () => {
    navigator.mediaDevices.getUserMedia();
  };

  useEffect(() => {
    const subT = async () => {
      if (shouldSubmitTest) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_REMOTE_URL}/generate-career-counselling-report`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              question_answer: answers,
              email,
              student_id,
              instructor_id
            }),
          }
        );

        const response = await res.json();

        //("response: ", response);
        if (response.code !== 200) {
          //(`Error: ${response}`);
        } else {
          window.location.href=`${process.env.NEXT_PUBLIC_SKILLBUILDER_FRONTEND_URL}/schedule-session`
        }
      }
    };
    subT();
  }, [shouldSubmitTest]);

  const processRecording = async (blob, questionIndex) => {
    const base64Data = await blobToBase64(blob);
    saveAnswer(questionIndex, base64Data);
  };

  const saveAnswer = (questionIndex, answerData) => {
    setAnswers((prev) => [
      ...prev,
      { question: questionIndex, answer: answerData },
    ]);
  };

  useEffect(() => {
    //("answers:", answers);
  }, [answers]);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        mediaRecorderRef.current = new MediaRecorder(stream);

        mediaRecorderRef.current.ondataavailable = (event) => {
          if (event.data.size > 0) {
            recordedChunksRef.current.push(event.data);
            //("Chunk recorded:", event.data.size);
          }
        };

        mediaRecorderRef.current.onstop = async () => {
          const blob = new Blob(recordedChunksRef.current, {
            type: "audio/wav",
          });
          recordedChunksRef.current = [];

          isProcessingRef.current = true;
          await processRecording(
            blob,
            currentRecordingQuestionIndexRef.current
          );
          isProcessingRef.current = false;
        };
      })
      .catch((err) => console.error("Error accessing the microphone:", err));
  }, [currentQuestion]);

  async function sendAudioToServer(base64Data) {
    try {
      setIsLoading(true);
      setIsTranscriptionComplete(true);
      //("send audio to server:", base64Data);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_REMOTE_URL}/speech-to-text`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ audio: base64Data, language }),
        }
      );
      const data = await response.json();
      //("audio response:", data.data.transcriptionResult);
      setIsTranscriptionComplete(false);
      setCurrentQuestion((prevCurrent) => prevCurrent + 1);
      //("currentQuestion State:", currentQuestion);
      setIsRecording(false);
      setRecordingDone(false);
      if (currentQuestionIndex < newQuestions.length - 1) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        //(
        //   "currentQuestion State inside if condition:",
        //   currentQuestion
        // );
        //(
          //("state of currentQuestionIndex:", currentQuestionIndex)
        //);
        setIsLoading(false);
      }
      setAnswers((prev) => [
        ...prev,
        {
          question: newQuestions[currentQuestion - 1]?.question,
          answer: data?.data?.transcriptionResult,
        },
      ]);
      return data;
    } catch (error) {
      console.error("Error sending audio to server:", error);
      return "Error in transcription";
    }
  }

  const stopAndHandleRecording = async () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      await new Promise((resolve) => {
        mediaRecorderRef.current.onstop = resolve;
        mediaRecorderRef.current.stop();
      });
      setIsRecording(false);
      let blob;
      if (recordedChunksRef.current.length > 0) {
        blob = new Blob(recordedChunksRef.current, { type: "audio/wav" });
        const newAudioURL = URL.createObjectURL(blob);
        //("new audio url:", newAudioURL);
        recordedChunksRef.current = [];
        const base64Data = await blobToBase64(blob);
        //(
        //   "base64Data",
        //   base64Data,
        //   "=============== END OF DATA ================="
        // );
        const questionBeingAnswered = currentQuestion;
        const finalData = await sendAudioToServer(base64Data);

        if (!isTranscriptionComplete) {
          return;
        }

        if (currentRecordingQuestionIndexRef.current === currentQuestion) {
          setAnswers((prev) => [
            ...prev,
            {
              question: newQuestions[currentQuestion - 1]?.question,
              answer: finalData.data.transcriptionResult,
            },
          ]);
        }
      } else {
        const silentBase64Wav =
          "UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAIA+AAACABAAZGF0YQAAAAA=";
        if (currentRecordingQuestionIndexRef.current === currentQuestion) {
          setAnswers((prev) => [
            ...prev,
            {
              question: newQuestions[currentQuestion - 1]?.question,
              answer: silentBase64Wav,
            },
          ]);
        }
      }
      //setIsLoading(false);
    } else {
      console.error("Recorder not active or already stopped.");
    }
    recordedChunksRef.current = [];
  };

  const startRecording = () => {
    if (mediaRecorderRef.current) {
      //cancel();
      audioRef?.current?.pause();
      setHasAudioEnded(true);
      mediaRecorderRef.current.start();
      setIsRecording(true);
      setRecordingDone(true);
      currentRecordingQuestionIndexRef.current = currentQuestion;
      //("Recording started");
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
    const question = ques?.question;
    if (question) {
      try {
        ////(`${process.env.NEXT_PUBLIC_REMOTE_URL}/save-tts`)
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
        //(data);

        if (response.ok) {
          const url = `${process.env.NEXT_PUBLIC_REMOTE_URL}/audio?uuid=${data?.data?.uuid}`;
          //(url);
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
        //("audio deleted successfully");
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
    if (newQuestions && hasStarted) {
      //("value of has started", hasStarted);
      //setIsFirstQues(true);
      generateAudio(currentQuestion);
    }
  }, [hasStarted]);

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
      //setIsRecordingPopupVisible(false);
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
        showError("No answer was provided, moving on to next question.");
        setCurrentQuestion((prevCurrent) => prevCurrent + 1);
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        // setCompletedQuestions((prevCompleted) => [
        //   ...prevCompleted,
        //   currentQuestion,
        // ]);
        setIsLoading(false);
      } else {
        await stopAndHandleRecording();
      }
    } catch (err) {
      console.error("Error:", err);
    } finally {
      //setIsFirstQues(false);
      //setIsLoading(false);
    }
  };

  useEffect(() => {
    //("useeffect wala currentQuestionIndex: ", currentQuestionIndex);
    if (currentQuestionIndex < newQuestions?.length && hasStarted) {
      generateAudio(newQuestions[currentQuestionIndex]);
      //speakQuestion(newQuestions[currentQuestionIndex]);
      //("line 806: generateAudio called");
    }
    // if(currentQuestionIndex <= newQuestions?.length+1 && hasStarted && currentQuestionIndex > 0){
    //   generateAudio(newQuestions[currentQuestionIndex-1]);
    //   //speakQuestion(newQuestions[currentQuestionIndex]);
    //   //("line 811: generateAudio called");
    // }
  }, [currentQuestionIndex, hasStarted]);

  useEffect(() => {
    let timeoutId;

    if (isRecording) {
      //setIsRecordingPopupVisible(true);

      timeoutId = setTimeout(() => {
        // if (isRecording) {
        //   setIsRecordingPopupVisible(false);
        // }
      }, 5000);
    } else {
      //setIsRecordingPopupVisible(false);
      clearTimeout(timeoutId);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isRecording]);

  useEffect(() => {
    if (!hasStarted || isTestCompleted) {
      return;
    }
    const intervalId = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft > 1) {
          return prevTimeLeft - 1;
        } else {
          clearInterval(intervalId);
          if (isLastQuestion && !isSubmitted) {
            setIsSubmitted(true);
            submitTestHandler();
          } else if (!isLastQuestion) {
            toggleComponent();
          }
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [hasStarted, isLastQuestion, timeLeft, isSubmitted, isTestCompleted]);

  const stopMediaStreamTracks = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stream
        .getTracks()
        .forEach((track) => track.stop());
    }
  };

  useEffect(() => {
    return () => {
      stopMediaStreamTracks();
    };
  }, []);

  useEffect(() => {
    const testcomplete = localStorage.getItem("testcompleted");
    if (testcomplete && assessmentId) {
      router.push(`/test-submit-completion`);
    }
  }, [router]);

  return (
    <>
      <div className={styles.container}>
        {/*top container*/}
        {isLoading ? (
          <>
            <div className={styles.loader}></div>
            {isGeneratingResult && (
              <div className={styles.generatingResultText}>
                Please wait, it might take some time, AI is generating your
                result.
              </div>
            )}
          </>
        ) : (
          <>
            {showErrorMessage && (
              <ErrorIndicator
                showErrorMessage={showErrorMessage}
                msgText={message}
              />
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
              <span>
                {" "}
                <Image src="/timer.svg" width={20} height={20} />
                {minutes}:
                {remainingSeconds < 10
                  ? `0${remainingSeconds}`
                  : remainingSeconds}
              </span>
            </div>
            {/* Recording Popup */}
            {/* {isRecordingPopupVisible && ( */}
            {isRecording && (
              <div className={styles.recordingPopup}>
                Recording in progress...
              </div>
            )}

            {/* question container */}

            <div
              dir={language === "Arabic" ? "rtl" : "ltr"}
              className={styles.questionContainer}
            >
              {questions && questions.length > 0 && (
                <span>{newQuestions[currentQuestion - 1]?.question}</span>
              )}
            </div>
            {/*Record button */}

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
              {isRecording
                ? "Click To Record Answer"
                : "Click To Record Answer"}
            </button>
            {/*lower container */}
            <div className={styles.lowerContainer}>
              <button
                onClick={isLastQuestion ? submitTestHandler : toggleComponent}
                disabled={!recordingDone || isSubmitted || isLoading}
              >
                {isLastQuestion ? "Submit Test" : "Next Question"}
                <Image src="/Forward.svg" width={20} height={20} />
              </button>
            </div>
          </>
        )}
      </div>
      {videoRef !== null && (
        <VideoComponent
          hasStarted={hasVideoStarted}
          hasMeetingEnded={shouldSubmitTest}
          ref={videoRef}
        />
      )}
    </>
  );
}

export default CareerCounsellingQuestionBox;
