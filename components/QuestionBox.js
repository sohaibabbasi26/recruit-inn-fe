import styles from "./QuestionBox.module.css";
import Image from "next/image";
import { useState, useEffect, useRef, useCallback, forwardRef } from "react";
// import { dummyQuestions } from "@/data/dummyQuestions";
import { useRouter } from "next/router";
// import { useTest } from "@/contexts/QuestionsContent";
// import { useSpeechSynthesis } from "react-speech-kit";
import ErrorIndicator from "./ErrorIndicator";
import VideoComponent from "./VideoComponent";
import blobToBase64 from "@/util/blobToBase64";
//import Script from "next/script";

const QuestionBox = //forwardRef(
  (
    {
      hasStarted,
      setIsLoading,
      isLoading,
      hasGivenPermissionForCamera,
      // selectedLanguage = "ar-SA",
      client_id,
    } //,
  ) =>
    //ref
    {
      // const { test } = useTest();x
      const router = useRouter();
      const [currentQuestion, setCurrentQuestion] = useState(1);
      const [completedQuestions, setCompletedQuestions] = useState([]);
      const [timeLeft, setTimeLeft] = useState(130);
      const [newQuestions, setNewQuestions] = useState(null);
      const [isRecording, setIsRecording] = useState(false);
      const mediaRecorderRef = useRef(null);
      const recordedChunksRef = useRef([]);
      const [answers, setAnswers] = useState([]);
      const { cid, qid, pid, a_id, test_req, language } = router?.query;
      const [recordingDone, setRecordingDone] = useState(false);
      // const [isLoading, setIsLoading] = useState(false);
      // const [disableRecordingButton, setDisableRecordingButton] = useState(false);
      const [questions, setQuestions] = useState();
      //const { speak, cancel, voices } = useSpeechSynthesis();
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
      const [isRecordingPopupVisible, setIsRecordingPopupVisible] =
        useState(false);
      const minutes = Math.floor(timeLeft / 60);
      const remainingSeconds = timeLeft % 60;
      const [expertise, setExpertise] = useState();
      const [isTestRequired, setIsTestRequired] = useState();
      const [assessmentId, setAssessmentId] = useState();
      const [codeQues, setCodeQues] = useState();
      const [isFirstQues, setIsFirstQues] = useState(true);
      const [candidateExpertise, setCandidateExpertise] = useState();
      const [audioUUID, setAudioUUID] = useState(null);
      const [audioURL, setAudioURL] = useState(null);
      const [hasAudioEnded, setHasAudioEnded] = useState(false);
      const [hasVoiceGenerated, setHasVoiceGenerated] = useState(false);
      const audioRef = useRef(null);
      const videoRef = useRef(null);
      const [isTestGenerated, setIsTestGenerated] = useState(false);

      // //("audio UUID: ",audioUUID);
      // //("audio URL: ",audioURL);

      // const [isFirstQues, setIsFirstQues] = useState(0);

      //const arabicVoice = voices.find((voice) => voice.lang === selectedLanguage);

      const generateAudio = async (ques) => {
        const question = ques?.question;
        if (question && isTestGenerated) {
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
              setHasVoiceGenerated(true);
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
        audioRef.current.onpause = () => {
          setHasAudioEnded(true);
        };
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
            setHasAudioEnded(false);
            //setHasVoiceGenerated(false);
          } else {
            console.error(data.error);
            setAudioUUID(null);
            setAudioURL(null);
            setHasAudioEnded(false);
            //setHasVoiceGenerated(false);
          }
        } catch (error) {
          console.error("Error:", error);
          setAudioUUID(null);
          setAudioURL(null);
          setHasAudioEnded(false);
          //setHasVoiceGenerated(false);
        }
      };

      // const speakQuestion = async(questionobj) => {
      //   const question = questionobj.question;
      //   // //(question);
      //   // //(voices);
      //   // cancel();
      //   // speak({ text: question, voices: "ar-SA", lang: "ar-SA" });

      //   await generateAudio(question);
      //   if(audioUUID){
      //     playAudio();
      //   }
      // };

      useEffect(() => {
        //("answers:", answers);
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
        const reqBody = {
          candidate_id: cid,
        };
        //("candidate_id in question box is : ", cid);

        const fetchCandidateExpertise = async () => {
          if (cid) {
            try {
              const response = await fetch(
                `${process.env.NEXT_PUBLIC_REMOTE_URL}/get-one-candidate-self`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(reqBody),
                }
              );
              const data = await response.json();
              //("data from fetching a candidate:", data);
              setCandidateExpertise(data?.data?.expertise);
            } catch (err) {
              //("ERROR WHILE FETCHING:", err);
            }
          }
        };
        fetchCandidateExpertise();
      }, [router?.isReady]);

      useEffect(() => {
        async function getTestForCandidateSelf() {
          if (candidateExpertise) {
            //("heyy from the if condition");
            const requestBody = {
              expertise: candidateExpertise,
              position_id: pid,
              isArabic: language === "Arabic" ? true : false,
            };
            //("req body: ", requestBody);
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
              const dataOne = await response.json();
              setNewQuestions(dataOne?.data?.message?.question);

              setIsLoading(false);
              if (test_req === "true") {
                //("hey i am in test req");
                try {
                  setIsLoading(true);
                  const req = {
                    codingExpertise: dataOne?.data?.expertise,
                    position_id: pid,
                  };

                  //("hey i am in test req try block");
                  const response = await fetch(
                    `${process.env.NEXT_PUBLIC_REMOTE_URL}/get-coding-question`,
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(req),
                    }
                  );
                  //("data fetched");
                  const data = await response.json();
                  setCodeQues(data);
                  //("data for coding assessment:", data);
                  setAssessmentId(data?.data?.assessment_id);
                  //("assessment id:", assessmentId);
                  //("code question data:", data);
                  setIsLoading(false);
                } catch (err) {
                  console.error("ERROR:", err);
                }
              }
            } catch (error) {
              console.error("Error submitting form:", error);
            } finally {
              setIsLoading(false);
            }
          }
        }
        getTestForCandidateSelf();
      }, [candidateExpertise]);

      useEffect(() => {
        async function getTestQuestionsForInvitedCandidate() {
          try {
            setIsLoading(true);
            const reqBody = {
              position_id: pid,
            };
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
            setExpertise(data?.data?.expertise || candidateExpertise);

            if (data?.data?.expertise || candidateExpertise) {
              const requestBody = {
                expertise: data?.data?.expertise || candidateExpertise,
                position_id: pid,
                isArabic: language === "Arabic",
              };

              try {
                const response = await fetch(
                  `${process.env.NEXT_PUBLIC_REMOTE_URL}/prepare-test`,
                  {
                    method: "POST",
                    credentials: "include",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(requestBody),
                  }
                );
                const dataOne = await response.json();

                // Ensure newQuestions are set before marking test as generated
                setNewQuestions(dataOne?.data?.message?.question);

                if (dataOne?.data?.message?.question?.length > 0) {
                  setIsTestGenerated(true); // Move this inside after setting questions
                }

                if (test_req === "true") {
                  try {
                    setIsLoading(true);
                    const req = {
                      codingExpertise: dataOne?.data?.expertise,
                      position_id: pid,
                    };
                    const response = await fetch(
                      `${process.env.NEXT_PUBLIC_REMOTE_URL}/get-coding-question`,
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify(req),
                      }
                    );
                    const data = await response.json();
                    setCodeQues(data);
                    setAssessmentId(data?.data?.assessment_id);
                    setIsLoading(false);
                  } catch (err) {
                    console.error("ERROR:", err);
                  }
                }
              } catch (error) {
                console.error("Error submitting form:", error);
              } finally {
                setIsLoading(false);
              }
            }
          } catch (err) {
            console.error("ERROR:", err);
          }
        }
        // }
        getTestQuestionsForInvitedCandidate();
      }, [pid]);


      useEffect(() => {
        if (newQuestions && hasStarted && isTestGenerated) {
          setIsFirstQues(true);
          generateAudio(currentQuestion);
        }
      }, [hasStarted, isTestGenerated, newQuestions]);


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
          .catch((err) =>
            console.error("Error accessing the microphone:", err)
          );
      }, [currentQuestion]);

      const startRecording = () => {
        if (mediaRecorderRef.current) {
          //cancel();
          audioRef?.current?.pause();
          audioRef.current.onpause = () => {
            setHasAudioEnded(true);
          };
          setHasAudioEnded(true);
         mediaRecorderRef.current.state !== 'recording' && mediaRecorderRef.current.start();
          // console.log(mediaRecorderRef.current.state);
          setIsRecording(true);
          setRecordingDone(true);
          currentRecordingQuestionIndexRef.current = currentQuestion;
          setIsRecordingPopupVisible(true);
          //("Recording started");
        }
      };

      const stopRecording = () => {
        if (
          mediaRecorderRef.current &&
          mediaRecorderRef.current.state !== "inactive"
        ) {
          mediaRecorderRef.current.stop();
          setIsRecordingPopupVisible(false);
        }
      };
      useEffect(() => {
        let timeoutId;

        if (isRecording) {
          setIsRecordingPopupVisible(true);

          timeoutId = setTimeout(() => {
            if (isRecording) {
              setIsRecordingPopupVisible(false);
            }
          }, 5000);
        } else {
          setIsRecordingPopupVisible(false);
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
          router.push(`/test-submit-completion/${cid}?client_id=${client_id}`);
        }
      }, [router]);

      useEffect(() => {
        //("Assessment ID:", assessmentId);
      }, [assessmentId]);

      const submitTestHandler = async () => {
        //("Submit test handler called. Assessment ID:", assessmentId);
        localStorage.setItem("testcompleted", "true");
        if (isSubmitted) return;
        setIsSubmitted(true);
        setIsGeneratingResult(true);
        setIsLoading(true);
        setIsTestCompleted(true);

        // //(
        //   "candidate_id in question box in take test method is : ",
        //   cid
        // );

        let requestBody;
        const userFlow = localStorage.getItem("activeFlow");

        if (userFlow === "Candidate_self") {
          requestBody = {
            user_role: "Candidate_self",
            candidate_id: cid,
            question_answer: answers,
            position_id: pid,
          };
        } else if (userFlow === "Client") {
          requestBody = {
            user_role: "Client",
            candidate_id: cid,
            question_answer: answers,
            position_id: pid,
            language,
            expertise,
          };
        }

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
          //("take-test api response:", data);
          //("value in test_req state:", test_req);
          //("test_req state = ", test_req === "true");
          //("a_ID:", a_id);

          const rBody = {
            position_id: pid,
          };

          if (test_req === "true" && a_id) {
            if (assessmentId) {
              //(
              //   "Routing to coding exercise with assessment ID:",
              //   assessmentId
              // );
              router.push(
                `/coding-excercise?a_id=${assessmentId}&pid=${pid}&cid=${cid}&client_id=${client_id}`
              );
            } else {
              console.error("Assessment ID is not available.");
            }
          } else {
            const rBody = {
              position_id: pid,
            };
            try {
              // if(response?.ok){
              //   const response = await fetch(
              //     `${process.env.NEXT_PUBLIC_REMOTE_URL}/set-candidate-count`,
              //     {
              //       method: "POST",
              //       headers: {
              //         "Content-Type": "application/json",
              //       },
              //       body: JSON.stringify(rBody),
              //     }
              //   );
              //   const data = await response.json();
              //   //("data fetched after setting the candidate count:", data);
              // }
            } catch (err) {
              //("err:", err);
            }
            router.push(
              `/test-submit-completion/${cid}?client_id=${client_id}`
            );
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
            //(
            //   "No recording made, adding silent audio blob as answer."
            // );
            showError("No answer was provided, moving on to next question.");
            setCurrentQuestion((prevCurrent) => prevCurrent + 1);
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
            setCompletedQuestions((prevCompleted) => [
              ...prevCompleted,
              currentQuestion,
            ]);
            setIsLoading(false);
            setHasVoiceGenerated(false);
          } else {
            await stopAndHandleRecording();
          }
        } catch (err) {
          console.error("Error:", err);
        } finally {
          setIsFirstQues(false);
          //setIsLoading(false);
        }
      };

      useEffect(() => {

        if(isTestGenerated){
          //speakQuestion(currentQuestion);
          generateAudio(currentQuestion);
          //("line 688: speakQuestion called");
          setTimeLeft(130);
        }
       
      }, [currentQuestion, isTestGenerated]);

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
          setCompletedQuestions((prevCompleted) => [
            ...prevCompleted,
            currentQuestion,
          ]);
          if (currentQuestionIndex < newQuestions.length - 1) {
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
            //(
            //   "currentQuestion State inside if condition:",
            //   currentQuestion
            // );
            //(
            //(
            //   "state of currentQuestionIndex:",
            //   currentQuestionIndex
            // )
            // );
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

      useEffect(() => {
        //(
        //   "useeffect wala currentQuestionIndex: ",
        //   currentQuestionIndex
        // );
        if (currentQuestionIndex < newQuestions?.length && hasStarted && isTestGenerated) {
          generateAudio(newQuestions[currentQuestionIndex]);
          //speakQuestion(newQuestions[currentQuestionIndex]);
          //("line 806: generateAudio called");
        }
        // if(currentQuestionIndex <= newQuestions?.length+1 && hasStarted && currentQuestionIndex > 0){
        //   generateAudio(newQuestions[currentQuestionIndex-1]);
        //   //speakQuestion(newQuestions[currentQuestionIndex]);
        //   //("line 811: generateAudio called");
        // }
      }, [currentQuestionIndex, hasStarted, isTestGenerated]);

      const showError = (message) => {
        setMessage(message);
        setShowErrorMessage(true);

        setTimeout(() => {
          setShowErrorMessage(false);
        }, 3000);
      };

      const removeNumericPrefix = (question) => {
        return question.substring(2);
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

                <div
                  dir={language === "Arabic" ? "rtl" : "ltr"}
                  className={styles.questionContainer}
                >
                  {newQuestions && newQuestions.length > 0 && (
                    <span>
                      {isFirstQues
                        ? removeNumericPrefix(
                            newQuestions[currentQuestion - 1]?.question
                          )
                        : newQuestions[currentQuestion - 1]?.question}
                    </span>
                  )}
                </div>
                {/*Record button */}

                <button
                  style={{
                    borderColor: recordingDone ? "#808080" : "",
                    color: recordingDone ? "#808080" : "",
                  }}
                  className={styles.recordBtn}
                  onClick={!hasVoiceGenerated ? stopRecording : startRecording}
                  disabled={!hasVoiceGenerated}
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
                    onClick={
                      isLastQuestion ? submitTestHandler : toggleComponent
                    }
                    disabled={!recordingDone || isSubmitted || isLoading}
                  >
                    {isLastQuestion ? "Submit Test" : "Next Question"}
                    <Image src="/Forward.svg" width={20} height={20} />
                  </button>
                </div>
              </>
            )}
          </div>

          {/* <h3>Live Camera Feed:</h3> */}
          {videoRef !== null && hasGivenPermissionForCamera && (
            <VideoComponent hasStarted={!hasStarted} ref={videoRef} />
          )}
        </>
      );
    };
//);

export default QuestionBox;
