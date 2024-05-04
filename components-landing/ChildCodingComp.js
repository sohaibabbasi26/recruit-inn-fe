
import CodingLeftComponent from "./CodingLeftComponent";
import Image from "next/image";
import 'tailwindcss/tailwind.css';
import styles from "./styles.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


const CodingChild = ({ formatTime, timeLeft, question, setQuestion, codeSubmitHandler, constraints, setConstraints, setIsLoading, isLoading, output, executeCode, code, language, setCode, setLanguage }) => {

    const router = useRouter();
    const [requestBody, setRequestBody] = useState();
    const [actvFlow, setActvflow] = useState();

    const { cid, a_id, pid } = router?.query;
    console.log('cid:', cid, 'a_id:',a_id, 'pid:',pid);

    useEffect(() => {
        console.log("a_id", a_id);
        console.log('router:', router?.query);
    }, [a_id])

    const getActiveComponent = () => {
        const activeFlow = localStorage.getItem('activeFlow');
        setActvflow(activeFlow)
        console.log("Current active flow:", activeFlow);
        switch (activeFlow) {
            case 'Candidate_self':
                return `/get-coding-assessment-self`;
            case 'Client':
                return `/get-coding-assessment`;
            default:
                return null;
        }
    };

    useEffect(() => {

        async function fetchCodingQues() {
            if (!router.isReady) return;

            const rBody = {
                assessment_id: a_id,
                position_id: pid,
                candidate_id : cid
            }

            console.log("API WE ARE GONNA SMASHHHHH:HHH", `${process.env.NEXT_PUBLIC_REMOTE_URL}${getActiveComponent()}`);
            console.log("req body:", requestBody)
            const response = await fetch(`${process.env.NEXT_PUBLIC_REMOTE_URL}${getActiveComponent()}`, {
                method: 'POST',
                body: JSON.stringify(rBody), 
                headers: { 'Content-type': 'application/json' }
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const contentType = response.headers.get('content-type');

            const data = await response.json();
            setQuestion(data?.data?.assesment);
            setConstraints(data?.data?.assesment?.constraints);
            console.log('response of coding Question  : ', data);
        }
        fetchCodingQues();
    }, [router?.isReady]);


    const formattedTime = formatTime(timeLeft);
    return (
        <>
            <div className="w-full h-screen bg-[#F5F5F5] justify-center items-center flex overflow-hidden">
                <div className="w-[98%] h-[100%] items-center flex justify-between">
                    <CodingLeftComponent question={question} />

                    <div className="w-[70%] h-[95%] flex flex-col justify-between ">
                        <div className="w-[100%] flex flex-col items-center h-[63%] rounded-2xl bg-[#fff]">
                            <div className="w-[100%] h-[4rem] flex justify-center">
                                <div className="w-[95%] h-[100%] border-b-[1px] border-[#EBEBEB] flex items-center gap-2">
                                    <span className="bg-[#F0EDFC] py-[0.25rem] px-3 rounded-2xl text-sm font-semibold text-[#6137DB]">Code</span>
                                    <select onChange={(e) => setLanguage(e.target.value)} className="bg-[#F0EDFC] py-[0.35rem] px-3 rounded-2xl text-sm font-semibold text-[#4A525D]">
                                        <option value="" >Select programming language</option>
                                        <option value="python3">
                                            Python
                                        </option>
                                        <option value="java">
                                            Java
                                        </option>
                                        <option value="nodejs">
                                            Node JS
                                        </option>
                                        <option value="c">
                                            C
                                        </option>
                                    </select>
                                    <span className="bg-[#6137DB] py-[0.25rem] flex items-center px-3 rounded-2xl text-sm font-semibold text-[#F0EDFC] gap-2"><Image src='/timer.svg' height={12} width={12} />{formattedTime}</span>
                                </div>
                            </div>

                            <div className="h-[80%] w-[95%] flex flex-col items-center">
                                <textarea onChange={(e) => setCode(e.target.value)} className="h-[85%] max-h-[90%] w-[100%] outline-none">

                                </textarea>
                                {/* <ContentEditor /> */}

                                <div className="w-[100%] h-[20%] flex justify-end items-center gap-4">
                                    <button onClick={executeCode} className="flex items-center gap-3 py-4 px-4 bg-[#F8F7FA] rounded-3xl font-semibold font-sans"><Image src='/playBlack.svg' height={15} width={15} />Run</button>
                                    <button onClick={codeSubmitHandler} className="flex w-[20%] justify-between items-center gap-3 rounded-3xl py-4 px-4 font-sans font-semibold  text-white bg-[#6137DB]">Submit <Image src='/Tick.svg' height={15} width={15} /></button>
                                </div>
                            </div>
                        </div>

                        <div className="w-[100%] h-[35%] rounded-2xl bg-[#fff]">
                            <div className="w-[95%] h-[4rem] flex justify-center">
                                <div className="w-[95%] h-[100%] border-b-[1px] border-[#EBEBEB] flex items-center">
                                    <span className="bg-[#F0EDFC] py-1 px-3 rounded-2xl text-sm font-semibold text-[#6137DB]">Test Result</span>
                                </div>
                            </div>

                            <div className="ml-[1.2rem] w-[100%] h-[80%] ">
                                {
                                    isLoading ? (
                                        <>
                                            <div className="w-[100%] h-[100%] flex justify-center items-center">
                                                <div className={styles.loader}></div>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            {output}
                                        </>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CodingChild;