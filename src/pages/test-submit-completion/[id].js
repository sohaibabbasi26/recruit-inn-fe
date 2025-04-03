import CompletionComponent from "../../../components/CompletionComponent";
import styles from "../test.module.css";
import { useActiveFlow } from "@/contexts/ActiveFlowContext";
import { useEffect, useState } from "react";
// import Router from "next/router";
import { useRouter } from "next/router";

const testSumitCompletion = () => {
  const { activeFlow } = useActiveFlow();
  const [candidateId, setCandidateId] = useState("");
  const [candidateName, setCandidateName] = useState();
  const router = useRouter();
  const id = router?.id;
  const client_id = router?.query?.client_id
  //("candidate:");

  useEffect(() => {
    async function fetchCandidateInfo() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_REMOTE_URL}/get-one-candidate`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ audio: base64Data }),
          }
        );
        const data = await response.json();
        //("candidate data:", data);
      } catch (err) {
        //("ERR:", err);
      }
    }

    fetchCandidateInfo();
  }, [router?.isReady, id]);

  useEffect(() => {
    const storedTestData = localStorage.getItem("candidate-id");
    const candidateNameForTimeBeing = localStorage.getItem(
      "candidateNameForTimeBeing"
    );

    if (storedTestData) {
      setCandidateId(storedTestData);
      //("candidate id:", candidateId);
    }

    //(candidateNameForTimeBeing);
  }, [candidateId]);

  const getActiveComponent = () => {
    const activeFlow = localStorage.getItem("activeFlow");
    //("client_id iss:", client_id);
    //("Current active flow:", activeFlow);
    switch (activeFlow) {
      case "Candidate_self":
        //(`/candidate/${candidateId}`);
        return `/candidate/${candidateId}`;
      case "Client":
        return `/`;
      default:
        return null;
    }
  };
  return (
    <>
      <div className={styles.superContainer}>
        <CompletionComponent
          candidateId={candidateId}
          getActiveComponent={getActiveComponent}
        />
      </div>
    </>
  );
};

export default testSumitCompletion;
