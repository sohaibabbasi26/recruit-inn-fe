import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "./token.module.css";
import reportShowcaseImage from "../../../public/ReportBgCandidateSelf.png";

const details = [
  { key: "phone", value: "+92 304 2324115" },
  { key: "date", value: "15 Dec 2023" },
  { key: "job type", value: "remote" },
  { key: "applied for", value: "self" },
  { key: "email", value: "bruce.wayne@gmail.com" },
];

export default function Token() {
  const router = useRouter();
  const { token } = router?.query;
  const [candidateId, setCandidateId] = useState(null);
  const [results, setResults] = useState([]);

  const [isReportTokenValid, setIsReportTokenValid] = useState(false);

  useEffect(() => {
    async function checkToken() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_REMOTE_URL}/verify-report-token`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: token }),
          }
        );
        const data = await response.json();
        if (data?.data?.statusCode===200) {
          setCandidateId(data?.data?.candidate_id);
          setIsReportTokenValid(true);
        }
      } catch (err) {
        console.log("err:", err);
      }
    }
    checkToken();
  }, [token]);

  useEffect(() => {
    async function fetchResults() {
      const reqBody = {
        candidate_id: candidateId,
      };
      try {
        if (id) {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_REMOTE_URL}/result-by-cand-id-self`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(reqBody),
            }
          );
          const data = await response.json();
          if (data?.data) {
            setResults([data?.data]);
            console.log("one candidate result details: ", results);
          }
          console.log("Expertise in fetch company details:", expertise);
        }
      } catch (err) {
        console.log("err:", err);
      }
    }
    //setIsLoading(true);
    fetchResults();
  }, [router?.isReady, candidateId]);

  // if (!isReportTokenValid) {
  //   return (
  //     <div>
  //       <h1>Invalid Token</h1>
  //     </div>
  //   );
  // }

  return (
    <div className={styles.reportTokenContainer}>
      <div className={styles.reportImageBg}></div>
      <div className={styles.report_header}>
        <div className={styles.report_header_inner}>
          <div className={styles.report_header_image}>
            <div className={styles.report_header_candidate_image}>
              <Image src={"/report-self-avatar.png"} height={84} width={65} />
            </div>
          </div>
          <div className={styles.report_header_title}>
            <h2>Jacob Jones</h2>
            <p>Front-end developer</p>
            <div className={styles.report_header_score}>
              <span>Recommended</span>
              <span className="dot"></span>
            </div>
          </div>
        </div>
        <div className={styles.how_we}>
          {" "}
          <span>How score is calculated?</span>{" "}
          <Image height={28} width={28} src={"/warning2.svg"} />
        </div>
      </div>

      <div className={styles.report_details}>
        <div className={styles.details}>
          {" "}
          {details.map((it, i) => (
            <Item key={i} keyy={it.key} value={it.value} />
          ))}{" "}
        </div>
        <button className="download_bitton">download report</button>
      </div>
    </div>
  );
}

function Item({ keyy, value }) {
  return (
    <div className={styles.flex}>
      <p>{keyy}</p>
      <p>{value}</p>
    </div>
  );
}
