import styles from './QuestionBox.module.css';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { dummyQuestions } from '@/data/dummyQuestions';
import { useRouter } from 'next/router';
import { useTest } from '@/contexts/QuestionsContent';
import { useSpeechSynthesis } from 'react-speech-kit';

const QuestionBox = ({ hasStarted }) => {
    // const { test } = useTest();
    const router = useRouter();
    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [completedQuestions, setCompletedQuestions] = useState([]);
    const [timeLeft, setTimeLeft] = useState(59);
    const [newQuestions, setNewQuestions] = useState(null);
    const [isRecording, setIsRecording] = useState(false);
    const [audioURLs, setAudioURLs] = useState({});
    const mediaRecorderRef = useRef(null);
    const recordedChunksRef = useRef([]);
    const [answers, setAnswers] = useState([]);
    const { cid, qid, pid , a_id , test_req} = router?.query;
    const [recordingDone, setRecordingDone] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [disableRecordingButton, setDisableRecordingButton] = useState(false);
    const [questions, setQuestions] = useState();
    const { speak, cancel } = useSpeechSynthesis();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const isLastQuestion = currentQuestion === questions?.length;

    useEffect(() => {
        const fetchQuestions = async () => {
            setIsLoading(true);

            const reqBody = {
                question_id: qid,
            };

            if (pid) {
                reqBody.position_id = pid;
            }
            const apiEndpoint = pid
                ? `${process.env.NEXT_PUBLIC_REMOTE_URL}/get-q-from-position`
                : `${process.env.NEXT_PUBLIC_REMOTE_URL}/get-question-generated`;

            console.log('API ENDPOINT CURRENT:', apiEndpoint);

            try {
                const response = await fetch(apiEndpoint, {
                    method: "POST",
                    body: JSON.stringify(reqBody),
                    headers: { 'Content-type': 'application/JSON' },
                });

                const data = await response.json();
                console.log("questions:", data);
                if (data && data?.code === 200 && data?.data[0]) {
                    console.log(hasStarted)
                    setQuestions(data?.data[0]?.question);
                    console.log("there?", data?.data[0]?.question[0].question);
                    speakQuestion(data?.data[0]?.question[0]);
                    console.log("questions:", questions);
                }
            } catch (err) {
                console.error('Error fetching questions:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchQuestions();
    }, [qid, pid, hasStarted]);

    const speakQuestion = (questionobj) => {
        const question = questionobj.question;
        console.log(question);
        cancel();
        speak({ text: question });
    };

    useEffect(() => {
        const storedTestData = localStorage.getItem('testData');
        if (storedTestData) {
            const testData = JSON.parse(storedTestData);
            console.log('test', testData)
            setNewQuestions(testData)
        }
    }, []);

    useEffect(() => {
        console.log('answers:', answers);
    }, [answers]);

    useEffect(() => {
        localStorage.setItem('candidate-id', cid);
    }, [cid])

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                mediaRecorderRef.current = new MediaRecorder(stream);

                mediaRecorderRef.current.ondataavailable = event => {
                    if (event.data.size > 0) {
                        recordedChunksRef.current.push(event.data);
                        console.log('Chunk recorded:', event.data.size);
                    }
                };
                mediaRecorderRef.current.onstop = () => {
                    const blob = new Blob(recordedChunksRef.current, { type: 'audio/wav' });
                    const newAudioURL = URL.createObjectURL(blob);
                    setAudioURLs(prevURLs => ({ ...prevURLs, [currentQuestion]: newAudioURL }));
                    recordedChunksRef.current = [];
                };
            })
            .catch(err => console.error('Error accessing the microphone:', err));
    }, []);

    // const startRecording = () => {
    //     if (mediaRecorderRef.current) {
    //         mediaRecorderRef.current.start();
    //         setIsRecording(true);
    //         setRecordingDone(true);
    //         console.log('Recording started');
    //     };
    // }

    const startRecording = () => {
        if (mediaRecorderRef.current) {
            cancel(); // Stops speech synthesis before starting recording
            mediaRecorderRef.current.start();
            setIsRecording(true);
            setRecordingDone(true);
            console.log('Recording started');
        };
    }

    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    useEffect(() => {
        let intervalId;
        if (hasStarted && timeLeft > 0) {
            intervalId = setInterval(() => {
                setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
            }, 1000);
        } else if (!hasStarted) {
            setTimeLeft(59);
        }

        return () => clearInterval(intervalId);
    }, [hasStarted, timeLeft]);

    useEffect(() => {
        let intervalId;

        if (hasStarted) {
            intervalId = setInterval(() => {
                setTimeLeft((prevTimeLeft) => {
                    if (prevTimeLeft > 0) {
                        return prevTimeLeft - 1;
                    } else {
                        if (isLastQuestion) {
                            submitTestHandler();
                        } else {
                            toggleComponent();
                        }
                        return 0;
                    }
                });
            }, 1000);
            return () => clearInterval(intervalId);
        }
    }, [hasStarted, timeLeft, isLastQuestion]);

    const stopMediaStreamTracks = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
            mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
        }
    };

    useEffect(() => {
        return () => {
            stopMediaStreamTracks();
        };
    }, []);


    const submitTestHandler = async () => {

        if (isSubmitted) return;
        setIsSubmitted(true);


        const requestBody = {
            candidate_id: cid,
            question_answer: answers
        }
        setIsLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_REMOTE_URL}/take-test`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },  
            body: JSON.stringify(requestBody),
        });

        const data = await response.json();
        
        console.log("take-test api response:", data);
        // router.push('/test-submit-completion')

        console.log('value in test_req state:', test_req);
        console.log('test_req state = ', test_req === 'true');
        if(test_req === 'true' && a_id){
            router.push(`/coding-excercise?a_id=${a_id}&pid=${pid}&cid=${cid}`);
            setIsLoading(false);
        }
        else{
            router.push('/test-submit-completion');
            setIsLoading(false);
        }
    }

    const toggleComponent = async () => {
        setIsLoading(true);

        if (!recordingDone && recordedChunksRef.current.length === 0) {
            const silentBase64Wav = "UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAIA+AAACABAAZGF0YQAAAAA=";
            setAnswers(prev => [...prev, {
                question: questions[currentQuestion - 1]?.question,
                answer: silentBase64Wav,
            }]);

            if (currentQuestion < questions.length) {
                setCurrentQuestion(current => current + 1);
                setRecordingDone(false);
            }

            setIsLoading(false);
            console.log("No recording made, adding silent audio blob as answer.");
            // });
        } else {
            await stopAndHandleRecording();
            setIsLoading(false);
        }
        // setCompletedQuestions(oldArray => [...oldArray, currentQuestion]);
        if (currentQuestion < questions.length) {
            setCurrentQuestion(prevCurrent => prevCurrent + 1);
            setRecordingDone(false);
            setCompletedQuestions(prevCompleted => [...prevCompleted, currentQuestion]);

            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(prevIndex => prevIndex + 1);
                speakQuestion(questions[currentQuestionIndex + 1]);
            }
        } else if (isLastQuestion) {
            await submitTestHandler();
        }
    }

    useEffect(() => {
        setTimeLeft(59)
    }, [currentQuestion])


    useEffect(() => {
        if (timeLeft === 0 && (!isLastQuestion)) {
            toggleComponent();
        }
        const intervalId = setInterval(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [timeLeft, isLastQuestion]);

    const stopAndHandleRecording = async () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
            await new Promise((resolve) => {
                mediaRecorderRef.current.onstop = resolve;
                mediaRecorderRef.current.stop();
            });
            setIsRecording(false);
            let blob;
            if (recordedChunksRef.current.length > 0) {
                blob = new Blob(recordedChunksRef.current, { type: 'audio/wav' });
                console.log(`Blob created: Size - ${blob.size}, Type - ${blob.type}`);
                const newAudioURL = URL.createObjectURL(blob);
                setAudioURLs(prevURLs => ({ ...prevURLs, [currentQuestion]: newAudioURL }));
                const base64Data = await blobToBase64(blob);
                const finalData = base64Data.length > 0 ? await sendAudioToServer(base64Data) : "";
                setAnswers(prev => [...prev, { question: questions[currentQuestion - 1]?.question, answer: finalData.data.transcriptionResult }]);
            } else {
                const silentBase64Wav = "UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAIA+AAACABAAZGF0YQAAAAA=";
                setAnswers(prev => [...prev, {
                    question: questions[currentQuestion - 1]?.question,
                    answer: silentBase64Wav,
                }]);
    
                if (currentQuestion < questions.length) {
                    setCurrentQuestion(current => current + 1);
                    setRecordingDone(false);
                }
    
                setIsLoading(false);
                console.log("No recording made, adding silent audio blob as answer.");
            }

        } else {
            console.error("Recorder not active or already stopped.");
        }
        recordedChunksRef.current = [];
    };

    async function sendAudioToServer(base64Data) {
        try {
            console.log("send audio to server:", base64Data)
            const response = await fetch(`${process.env.NEXT_PUBLIC_REMOTE_URL}/speech-to-text`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ audio: base64Data }),

            });
            const data = await response.json();
            console.log(
                'audio response:', data.data.transcriptionResult
            )
            return data;
        } catch (error) {
            console.error('Error sending audio to server:', error);
            return 'Error in transcription';
        }
    }

    function blobToBase64(blob) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
                const base64data = reader.result.split(',')[1];
                console.log("Converted Base64 Length:", base64data.length);
                resolve(base64data);
            };
            reader.onerror = reject;
        });
    }


    return (
        <>
            <div className={styles.container}>

                {/*top container*/}
                {isLoading ? (
                    <div className={styles.loader}></div>
                ) : (
                    <>
                        <div className={styles.topContainer}>
                            <div className={styles.questionNoList}>
                                <ul>
                                    {questions?.map((question, index) => {
                                        return (
                                            <>
                                                <li
                                                    key={question.question_id}
                                                    style={completedQuestions.includes(question) ?
                                                        { backgroundColor: '#F0EDFC', color: '#6137DB' } :
                                                        currentQuestion === question ?
                                                            { backgroundColor: '#6137DB', color: '#fff' } :
                                                            { backgroundColor: '#F5F5F5', color: '#4A525D' }}>{question.question_id}
                                                </li>
                                            </>
                                        )
                                    })}
                                </ul>
                            </div>
                            <span> <Image src='/timer.svg' width={20} height={20} />0:{timeLeft}</span>
                        </div>

                        {/* question container */}

                        <div className={styles.questionContainer}>
                            {questions && questions.length > 0 && (
                                <span>{questions[currentQuestion - 1]?.question}</span>
                            )}
                        </div>
                        {/*Record button */}

                        <button
                            style={{
                                borderColor: recordingDone ? '#808080' : '',
                                color: recordingDone ? '#808080' : ''
                            }}
                            className={styles.recordBtn}
                            onClick={isRecording ? stopRecording : startRecording}
                            disabled={isRecording}
                        >
                            <Image src={recordingDone ? '/mic-disabled.svg' : '/mic.svg'} width={20} height={20} />
                            {isRecording ? 'Click To Record Answer' : 'Click To Record Answer'}
                        </button>
                        {/*lower container */}
                        <div className={styles.lowerContainer}>
                            <button onClick={isLastQuestion ? submitTestHandler : toggleComponent} disabled={!recordingDone}>
                                {isLastQuestion ? 'Submit Test' : 'Next Question'}
                                <Image src='/Forward.svg' width={20} height={20} />

                            </button>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default QuestionBox;