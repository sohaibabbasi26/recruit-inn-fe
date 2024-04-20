import Image from "next/image";
import ContentEditor from "../../components-landing/ContentEditor";
import { useEffect, useState } from "react";
import CodingChild from "../../components-landing/ChildCodingComp";
import { useRouter } from "next/router";

const CodingExcersice = () => {

    const [Code, setCode] = useState(null);
    const [language, setLanguage] = useState(null);
    const [output, setOutput] = useState();
    const [question, setQuestion] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [constraints, setConstraints] = useState();
    const router = useRouter();
    const [timeLeft, setTimeLeft] = useState(600);
    const {cid} = router?.query;

    async function executeCode() {
        const reqBody = {
            language: language,
            versionIndex: 1,
            script: Code
        }

        console.log("req body:", reqBody)
        setIsLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_REMOTE_URL}/execute-code`, {
            method: 'POST',
            body: JSON.stringify(reqBody),
            headers: { 'Content-type': 'application/json' }
        });
        const data = await response.json();
        console.log('response: ', data);
        setOutput(data?.data?.data?.output);
        setIsLoading(false);
    }
    
    async function codeSubmitHandler(){

        setIsLoading(true);

        const reqBody = {
            code : Code,
            exercise : question,
            output : output,
            constraints : constraints,
            candidate_id : cid
        };

        // useEffect(() => {
        //     if (timeLeft > 0) {
        //         const timerId = setInterval(() => {
        //             setTimeLeft(timeLeft - 1);
        //         }, 1000);
        //         return () => clearInterval(timerId);
        //     } else {
        //         console.log('Timer finished');
        //     }
        // }, [timeLeft]);
        // const getActiveComponent = () => {
        //     const activeFlow = localStorage.getItem('activeFlow');
        //     console.log("Current active flow:", activeFlow);
        //     switch (activeFlow) {
        //         case 'Candidate':
        //             return `/candidate/${candidateId}`;
        //         case 'Client':
        //             return `/`;
        //         default:
        //             return null;
        //     }
        // };

        const response = await fetch(`${process.env.NEXT_PUBLIC_REMOTE_URL}/get-code-submit`, {
            method: 'POST',
            body: JSON.stringify(reqBody),
            headers: { 'Content-type': 'application/json' }
        });

        const data = await response.json();
        console.log('response: ', data);
        setIsLoading(false);
        router.push('/test-submit-completion');
    }

    const formatTime = () => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <>
            <CodingChild formatTime={formatTime}  codeSubmitHandler={codeSubmitHandler} constraints={constraints} setConstraints={setConstraints} question={question} setQuestion={setQuestion} isLoading={isLoading} setIsLoading={setIsLoading} output={output} executeCode={executeCode} code={Code} language={language} setCode={setCode} setLanguage={setLanguage} />
        </>
    )
}

export default CodingExcersice;