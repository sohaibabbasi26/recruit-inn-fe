import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Token() {
    const router = useRouter();
    const { token } = router?.query;
  const [candidateId, setCandidateId] = useState(null);

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
        if (data?.data) {
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

  if (!isReportTokenValid) {
    return (
      <div>
        <h1>Invalid Token</h1>
      </div>
    );
  }

  return (
    <>
      <div className="h-[19.563rem] w-full">
        <Image
          src={"/ReportBgCandidateSelf.svg"}
          fill
          className="h-[19.563rem] w-full position-relative"
        />
      </div>
    </>
  );
}
