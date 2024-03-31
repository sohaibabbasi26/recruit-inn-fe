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
    


    async function executeCode() {
        const reqBody = {
            language: language,
            versionIndex: 1,
            script: Code
        }

        console.log("req body:", reqBody)

        const response = await fetch(`${process.env.NEXT_PUBLIC_REMOTE_URL}/execute-code`, {
            method: 'POST',
            body: JSON.stringify(reqBody),
            headers: { 'Content-type': 'application/json' }
        });
        const data = await response.json();
        console.log('response: ', data)
        setOutput(data?.data?.data?.output);
    }

    return (
        <>
            <CodingChild output={output} executeCode={executeCode} code={Code} language={language} setCode={setCode} setLanguage={setLanguage} />
        </>
    )
}

export default CodingExcersice;