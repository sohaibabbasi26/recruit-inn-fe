import styles from "./QuestionBox.module.css";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { dummyQuestions } from "@/data/dummyQuestions";
import { useRouter } from "next/router";
import { useTest } from "@/contexts/QuestionsContent";
import { useSpeechSynthesis } from "react-speech-kit";
import ErrorIndicator from "./ErrorIndicator";

const QuestionBox = ({ hasStarted, setIsLoading, isLoading }) => {
  // const { test } = useTest();x
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [completedQuestions, setCompletedQuestions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(130);
  const [newQuestions, setNewQuestions] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioURLs, setAudioURLs] = useState({});
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);
  const [answers, setAnswers] = useState([]);
  const { cid, qid, pid, a_id, test_req } = router?.query;
  const [recordingDone, setRecordingDone] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  const [disableRecordingButton, setDisableRecordingButton] = useState(false);
  const [questions, setQuestions] = useState();
  const { speak, cancel } = useSpeechSynthesis();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isTestCompleted, setIsTestCompleted] = useState(false);
  const currentRecordingQuestionIndexRef = useRef(currentQuestion);
  const [message, setMessage] = useState(null);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [isGeneratingResult, setIsGeneratingResult] = useState(false);
  const [isTranscriptionComplete, setIsTranscriptionComplete] = useState();
  const isProcessingRef = useRef();
  const isLastQuestion = currentQuestion === newQuestions?.length;
  const [isRecordingPopupVisible, setIsRecordingPopupVisible] = useState(false);
  const minutes = Math.floor(timeLeft / 60);
  const remainingSeconds = timeLeft % 60;
  const [expertise, setExpertise] = useState();
  // const [newQuestions,setNewQuestions] = useState();
  // useEffect(() => {
  //   const fetchQuestions = async () => {
  //     setIsLoading(true);

  //     const reqBody = {
  //       question_id: qid,
  //     };

  //     if (pid) {
  //       reqBody.position_id = pid;
  //     }
  //     const apiEndpoint = pid
  //       ? `${process.env.NEXT_PUBLIC_REMOTE_URL}/get-q-from-position`
  //       : `${process.env.NEXT_PUBLIC_REMOTE_URL}/get-question-generated`;

  //     console.log("API ENDPOINT CURRENT:", apiEndpoint);

  //     try {
  //       const response = await fetch(apiEndpoint, {
  //         method: "POST",
  //         body: JSON.stringify(reqBody),
  //         headers: { "Content-type": "application/JSON" },
  //       });

  //       const data = await response.json();
  //       console.log("questions:", data);
  //       if (data && data?.code === 200 && data?.data[0] && hasStarted) {
  //         console.log(hasStarted);
  //         setQuestions(data?.data[0]?.question);
  //         console.log("there?", data?.data[0]?.question[0].question);
  //         speakQuestion(data?.data[0]?.question[0]);
  //         console.log("questions:", questions);
  //       }
  //     } catch (err) {
  //       console.error("Error fetching questions:", err);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchQuestions();
  // }, [qid, pid, hasStarted]);

  const speakQuestion = (questionobj) => {
    const question = questionobj.question;
    console.log(question);
    cancel();
    speak({ text: question });
  };

  // useEffect(() => {
  //   const storedTestData = localStorage.getItem("testData");
  //   if (storedTestData) {
  //     const testData = JSON.parse(storedTestData);
  //     console.log("test", testData);
  //     setNewQuestions(testData);
  //   }
  // }, []);

  useEffect(() => {
    console.log("answers:", answers);
  }, [answers]);

  useEffect(() => {
    localStorage.setItem("candidate-id", cid);
  }, [cid]);

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
    async function getTestQuestions() {
      if (pid) {
        try {
          setIsLoading(true);
          const reqBody = {
            position_id: pid
          }
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_REMOTE_URL}/get-one-positions`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(reqBody),
            }
          );
          const data = await response.json();
          console.log("data fetched for a position:", data);
          setExpertise(data?.data?.expertise);
          if (data?.data?.expertise) {
            const requestBody = {
              expertise: data?.data?.expertise,
              position_id: pid,
            };
            console.log("req body: ", requestBody);
            try {

              const response = await fetch(
                `${process.env.NEXT_PUBLIC_REMOTE_URL}/prepare-test`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(requestBody),
                }
              );
              const data = await response.json();

              console.log("response data of a test creation:", data);
              setNewQuestions(data?.data?.message?.question);
              console.log("data:", newQuestions);
              // setQuestionId(data?.data?.message?.question_id);
              console.log("question id:");
              setIsLoading(false);
              setMessage("Successfully created a test for your job!");
              showSuccess();
              console.log(data);
              setIsLoading(false)
            } catch (error) {
              console.error("Error submitting form:", error);
            }
            finally {
              setIsLoading(false);
            }
          }
        }
        catch (err) {
          console.log("ERROR:", err);
        }
      }

      // const requestBody = {
      //   expertise: techStack,
      //   position_id: positionId,
      // };
      // console.log("req body : ", requestBody);
      // try {
      //   setIsLoading(true);
      //   const response = await fetch(
      //     `${process.env.NEXT_PUBLIC_REMOTE_URL}/prepare-test`,
      //     {
      //       method: "POST",
      //       headers: {
      //         "Content-Type": "application/json",
      //         Authorization: `Bearer ${token}`,
      //       },
      //       body: JSON.stringify(requestBody),
      //     }
      //   );
      //   const data = await response.json();
      //   console.log("response data of a test creation:", data);
      //   setNewQuestions(data.data);
      //   // setQuestionId(data?.data?.message?.question_id);
      //   console.log("question id:");
      //   setIsLoading(false);
      //   setMessage("Successfully created a test for your job!");
      //   showSuccess();
      //   console.log(data);
      // } catch (error) {
      //   console.error("Error submitting form:", error);
      // }
      // console.log("required:", isTestRequired);
      // if (isTestRequired === true) {
      //   try {
      //     setIsLoading(true);
      //     const req = {
      //       codingExpertise: codingExpertise,
      //       position_id: positionId,
      //     };

      //     const response = await fetch(
      //       `${process.env.NEXT_PUBLIC_REMOTE_URL}/get-coding-question`,
      //       {
      //         method: "POST",
      //         headers: {
      //           "Content-Type": "application/json",
      //           Authorization: `Bearer ${token}`,
      //         },
      //         body: JSON.stringify(req),
      //       }
      //     );
      //     const data = await response.json();
      //     setCodeQues(data);
      //     setAssessmentId(data?.data?.assessment_id);
      //     console.log("assessment id:", assessmentId);
      //     console.log("code question data:", data);
      //     setIsLoading(false);
      //     try {
      //       const body = {
      //         position_id: positionId,
      //         is_test_req: isTestRequired,
      //       };

      //       console.log("body data sent in setPositionTestReq:", body);
      //       const response = await fetch(
      //         `${process.env.NEXT_PUBLIC_REMOTE_URL}/set-position-test-req`,
      //         {
      //           method: "POST",
      //           headers: {
      //             "Content-Type": "application/json",
      //             Authorization: `Bearer ${token}`,
      //           },
      //           body: JSON.stringify(body),
      //         }
      //       );
      //       const data = await response.json();
      //       setCodeQues(data);
      //     } catch (err) {
      //       console.log("ERROR:", err);
      //     }
      //   } catch (err) {
      //     console.error("ERROR:", err);
      //   }
      // }
    };

    // if (hasStarted) {
    //   getTestQuestions();
    // }
    getTestQuestions();
  }, [pid])

  useEffect(() => {
    if (newQuestions) {
      console.log("value of has started" ,  hasStarted);
      // console.log(hasStarted);
      // setQuestions(data?.data[0]?.question);
      // console.log("there?", data?.data[0]?.question[0].question);
      speakQuestion(currentQuestion);
      console.log("questions:", questions);
    }
  },[hasStarted])

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        mediaRecorderRef.current = new MediaRecorder(stream);

        mediaRecorderRef.current.ondataavailable = (event) => {
          if (event.data.size > 0) {
            recordedChunksRef.current.push(event.data);
            console.log("Chunk recorded:", event.data.size);
          }
        };

        mediaRecorderRef.current.onstop = async () => {
          const blob = new Blob(recordedChunksRef.current, {
            type: "audio/wav",
          });
          recordedChunksRef.current = [];
          const audioURL = URL.createObjectURL(blob);
          setAudioURLs((prevURLs) => ({
            ...prevURLs,
            [currentQuestion]: audioURL,
          }));

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

  const startRecording = () => {
    if (mediaRecorderRef.current) {
      cancel();
      mediaRecorderRef.current.start();
      setIsRecording(true);
      setRecordingDone(true);
      currentRecordingQuestionIndexRef.current = currentQuestion;
      setIsRecordingPopupVisible(true); // Show recording popup
      console.log("Recording started");
    }
  };

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop(); // This asynchronously triggers the onstop event
      setIsRecordingPopupVisible(false); // Hide recording popup
    }
  };
  useEffect(() => {
    let timeoutId;

    if (isRecording) {
      setIsRecordingPopupVisible(true); // Show the popup when recording starts
      // Set a timeout to hide the popup after 5 seconds
      timeoutId = setTimeout(() => {
        if (isRecording) {
          // Check if still recording before hiding the popup
          setIsRecordingPopupVisible(false);
        }
      }, 5000);
    } else {
      setIsRecordingPopupVisible(false); // Hide the popup immediately when recording stops
      clearTimeout(timeoutId); // Clear the timeout when recording stops to prevent it from firing
    }

    return () => {
      clearTimeout(timeoutId); // Ensure the timeout is cleared when the component unmounts or the effect re-runs
    };
  }, [isRecording]); // This useEffect runs whenever the isRecording state changes

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
    // Check if user is logged in
    const testcomplete = localStorage.getItem("testcompleted");
    if (testcomplete) {
      router.push(`/test-submit-completion/${cid}`);
    }
  }, [router]);

  const submitTestHandler = async () => {
    localStorage.setItem("testcompleted", "true");
    if (isSubmitted) return;
    setIsSubmitted(true);
    setIsGeneratingResult(true);
    setIsLoading(true);
    setIsTestCompleted(true);

    const requestBody = {
      candidate_id: cid,
      question_answer: answers,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_REMOTE_URL}/take-test`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );
      const data = await response.json();
      console.log("take-test api response:", data);
      console.log("value in test_req state:", test_req);
      console.log("test_req state = ", test_req === "true");
      console.log("a_ID:", a_id);
      if (test_req === "true" && a_id) {
        const rBody = {
          position_id: pid,
        };
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_REMOTE_URL}/set-candidate-count`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(rBody),
            }
          );
          const data = await response.json();
          console.log("data fetched after setting the candidate count:", data);
        } catch (err) {
          console.log("err:", err);
        }
        router.push(`/coding-excercise?a_id=${a_id}&pid=${pid}&cid=${cid}`);
      } else {
        const rBody = {
          position_id: pid,
        };
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_REMOTE_URL}/set-candidate-count`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(rBody),
            }
          );
          const data = await response.json();
          console.log("data fetched after setting the candidate count:", data);
        } catch (err) {
          console.log("err:", err);
        }
        router.push(`/test-submit-completion/${cid}`);
        setIsLoading(false);
      }
    } catch (err) {
      console.error("Failed to submit test:", err);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 7000);
    }
  };

  const toggleComponent = async () => {
    setIsLoading(true);

    try {
      if (isLastQuestion) return;

      if (!isLastQuestion) {
        if (!recordingDone && recordedChunksRef.current.length === 0) {
          const silentBase64Wav =
            "UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAIA+AAACABAAZGF0YQAAAAA=";
          setAnswers((prevAnswers) => {
            return prevAnswers.some(
              (ans) => ans.question === newQuestions[currentQuestion - 1]?.question
            )
              ? prevAnswers
              : [
                ...prevAnswers,
                {
                  question: newQuestions[currentQuestion - 1]?.question,
                  answer: silentBase64Wav,
                },
              ];
          });
          console.log("No recording made, adding silent audio blob as answer.");
          showError("No answer was provided, moving on to next question.");
          setCurrentQuestion((prevCurrent) => prevCurrent + 1);
          setIsRecording(false);
          setRecordingDone(false);
          setCompletedQuestions((prevCompleted) => [
            ...prevCompleted,
            currentQuestion,
          ]);
          // if (data && data?.code === 200 && data?.data[0] && hasStarted) {
          //   //         console.log(hasStarted);
          //   //         setQuestions(data?.data[0]?.question);
          //   //         console.log("there?", data?.data[0]?.question[0].question);
          //   //         speakQuestion(data?.data[0]?.question[0]);
          //   //         console.log("questions:", questions);
          //   //       }
          if (currentQuestionIndex < newQuestions.length - 1 && hasStarted) {
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
            speakQuestion(newQuestions[currentQuestionIndex + 1]);
            setIsLoading(false);
          }
        } else {
          await stopAndHandleRecording();
        }
        console.log("completed questions:", completedQuestions);
        console.log("current questions:", currentQuestion);
      }
    } catch (err) {
      console.log("ERR:", err);
    } finally {
    }
  };

  useEffect(() => {
    speakQuestion(currentQuestion);
    setTimeLeft(130);
  }, [currentQuestion]);

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
        console.log("new audio url:", newAudioURL);
        // Clear the recorded chunks immediately after creating the blob
        recordedChunksRef.current = [];
        const base64Data = await blobToBase64(blob);
        console.log(
          "base64Data",
          base64Data,
          "=============== END OF DATA ================="
        );
        const questionBeingAnswered = currentQuestion;
        const finalData = await sendAudioToServer(base64Data);

        if (!isTranscriptionComplete) {
          return;
        }

        if (currentRecordingQuestionIndexRef.current === currentQuestion) {
          // setAudioURLs(prevURLs => ({ ...prevURLs, [currentQuestion]: newAudioURL }));
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
      setIsLoading(false);
    } else {
      console.error("Recorder not active or already stopped.");
    }
    recordedChunksRef.current = [];
  };

  async function sendAudioToServer(base64Data) {
    try {
      setIsLoading(true);
      setIsTranscriptionComplete(true);
      console.log("send audio to server:", base64Data);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_REMOTE_URL}/speech-to-text`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ audio: base64Data }),
        }
      );
      const data = await response.json();
      console.log("audio response:", data.data.transcriptionResult);
      setIsTranscriptionComplete(false);
      setCurrentQuestion((prevCurrent) => prevCurrent + 1);
      console.log("currentQuestion State:", currentQuestion);
      setIsRecording(false);
      setRecordingDone(false);
      setCompletedQuestions((prevCompleted) => [
        ...prevCompleted,
        currentQuestion,
      ]);
      if (currentQuestionIndex < newQuestions.length - 1) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        console.log(
          "currentQuestion State inside if condition:",
          currentQuestion
        );
        console.log(
          console.log("state of currentQuestionIndex:", currentQuestionIndex)
        );
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

  function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64data = reader.result.split(",")[1];
        console.log("Converted Base64 Length:", base64data.length);
        resolve(base64data);
      };
      reader.onerror = reject;
    });
  }

  useEffect(() => {
    if (currentQuestionIndex < newQuestions?.length && hasStarted) {
      speakQuestion(newQuestions[currentQuestionIndex]);
    }
  }, [currentQuestionIndex, newQuestions , hasStarted]);

  const showError = (message) => {
    setMessage(message);
    setShowErrorMessage(true);

    setTimeout(() => {
      setShowErrorMessage(false);
    }, 3000);
  };

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
                  {newQuestions?.map((question, index) => {
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

            <div className={styles.questionContainer}>
              {newQuestions && newQuestions.length > 0 && (
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
    </>
  );
};

export default QuestionBox;
