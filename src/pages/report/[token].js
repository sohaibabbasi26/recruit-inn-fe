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
        if (data?.data?.statusCode === 200) {
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
        <button className={styles.download_report_button}>
          <svg
            width="35"
            height="36"
            viewBox="0 0 35 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M28.998 17.125C28.998 16.5727 28.5503 16.125 27.998 16.125C27.4458 16.125 26.998 16.5727 26.998 17.125H28.998ZM7.99805 17.125C7.99805 16.5727 7.55033 16.125 6.99805 16.125C6.44576 16.125 5.99805 16.5727 5.99805 17.125H7.99805ZM9.8646 27.0528L10.3186 26.1618H10.3186L9.8646 27.0528ZM7.57026 24.7585L6.67926 25.2124H6.67926L7.57026 24.7585ZM27.4258 24.7585L26.5348 24.3045V24.3045L27.4258 24.7585ZM25.1315 27.0528L25.5855 27.9438L25.1315 27.0528ZM18.498 8.375C18.498 7.82272 18.0503 7.375 17.498 7.375C16.9458 7.375 16.498 7.82272 16.498 8.375H18.498ZM17.498 21.5L16.7909 22.2071C16.9785 22.3946 17.2328 22.5 17.498 22.5C17.7633 22.5 18.0176 22.3946 18.2052 22.2071L17.498 21.5ZM21.7052 18.7071C22.0957 18.3166 22.0957 17.6834 21.7052 17.2929C21.3146 16.9024 20.6815 16.9024 20.2909 17.2929L21.7052 18.7071ZM14.7052 17.2929C14.3146 16.9024 13.6815 16.9024 13.2909 17.2929C12.9004 17.6834 12.9004 18.3166 13.2909 18.7071L14.7052 17.2929ZM26.998 17.125V19.225H28.998V17.125H26.998ZM19.598 26.625H15.398V28.625H19.598V26.625ZM7.99805 19.225V17.125H5.99805V19.225H7.99805ZM15.398 26.625C13.9114 26.625 12.8566 26.6242 12.0313 26.5568C11.2177 26.4903 10.7156 26.3641 10.3186 26.1618L9.41061 27.9438C10.1366 28.3137 10.9311 28.4736 11.8684 28.5502C12.794 28.6258 13.9444 28.625 15.398 28.625V26.625ZM5.99805 19.225C5.99805 20.6786 5.99727 21.829 6.07289 22.7546C6.14947 23.6919 6.30935 24.4865 6.67926 25.2124L8.46127 24.3045C8.25896 23.9074 8.13273 23.4054 8.06625 22.5918C7.99882 21.7665 7.99805 20.7116 7.99805 19.225H5.99805ZM10.3186 26.1618C9.5189 25.7543 8.86873 25.1042 8.46127 24.3045L6.67926 25.2124C7.27846 26.3885 8.23459 27.3446 9.41061 27.9438L10.3186 26.1618ZM26.998 19.225C26.998 20.7116 26.9973 21.7665 26.9298 22.5918C26.8634 23.4054 26.7371 23.9074 26.5348 24.3045L28.3168 25.2124C28.6867 24.4865 28.8466 23.6919 28.9232 22.7546C28.9988 21.829 28.998 20.6786 28.998 19.225H26.998ZM19.598 28.625C21.0517 28.625 22.2021 28.6258 23.1277 28.5502C24.065 28.4736 24.8595 28.3137 25.5855 27.9438L24.6775 26.1618C24.2805 26.3641 23.7784 26.4903 22.9648 26.5568C22.1395 26.6242 21.0847 26.625 19.598 26.625V28.625ZM26.5348 24.3045C26.1274 25.1042 25.4772 25.7543 24.6775 26.1618L25.5855 27.9438C26.7615 27.3446 27.7176 26.3885 28.3168 25.2124L26.5348 24.3045ZM16.498 8.375V21.5H18.498V8.375H16.498ZM18.2052 22.2071L21.7052 18.7071L20.2909 17.2929L16.7909 20.7929L18.2052 22.2071ZM18.2052 20.7929L14.7052 17.2929L13.2909 18.7071L16.7909 22.2071L18.2052 20.7929Z"
              fill="white"
            />
          </svg>
          download report
        </button>
      </div>

      <div className={styles.overall_report_wrapper}>
        <ReportSection heading="Overall Report">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
            dolorum illum soluta maxime veritatis consectetur laborum ducimus.
            Non dolore saepe optio, fugit voluptatibus enim sit a, recusandae
            iusto reprehenderit dolorem nulla quisquam, veniam corrupti nihil
            nostrum sunt. Exercitationem commodi quo distinctio! Eos, nemo.
            Ducimus aliquam, odit cupiditate vel nisi eaque, ab blanditiis ad
            veritatis eum sapiente repellendus perferendis. Velit libero
            consectetur non dolorem fugit provident. Perferendis, ex? Unde
            voluptatibus laudantium corporis natus tempora provident quisquam
            quae suscipit inventore, vel error hic repellendus eum saepe
            asperiores impedit ratione? Consectetur, unde. Impedit minima
            repellat esse quisquam voluptatem pariatur hic temporibus incidunt
            nemo.
          </p>
        </ReportSection>

        <ReportSection heading="Technical">
          <>
            <h3>Technical Summary</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
              iusto magnam ullam sed quod sint dignissimos qui nulla incidunt
              aperiam rerum consequatur quos illum totam necessitatibus vero,
              provident at distinctio. Nesciunt maiores nobis, error cumque
              labore tempora architecto porro, nisi in vitae, fugiat vero. Ut,
              ipsa! Quis velit optio voluptates.
            </p>
          </>
        </ReportSection>
        <ReportSection heading="Coding Assessment">
          <>
            <h3>Coding Summary</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error in
              ab tenetur voluptates! Officiis ex ipsa sunt aspernatur fugiat
              dolore corrupti voluptates. Dolorum, accusamus illum eum
              recusandae dolore sequi laudantium.
            </p>
          </>
        </ReportSection>
        <ReportSection heading="Soft Skill">
          <>
            <h3>Soft Skill Summary</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
              autem error, cumque quis minima veniam vero officia consectetur
              officiis dolorem, repellendus saepe at atque dolor ullam ducimus
              excepturi fugit illo. Incidunt modi inventore tempore sequi!
              Explicabo distinctio accusantium neque. Rem culpa vero sequi illo
              incidunt?
            </p>
          </>
        </ReportSection>
        <ReportSection
          headerClassName="second_color"
          heading="Our AI Interviewer has identified areas where your skills can be enhanced."
        >
          <div className={styles.enhance_skills}>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum
              repellat cupiditate possimus molestias amet eius, impedit ducimus
              ad saepe veniam.
            </p>
            <div className={styles.enhance_skills_image}>
              <Image
                height={261.06}
                width={421.85}
                src="/character_1.png"
                alt="enhance skills image"
              />
            </div>
          </div>
        </ReportSection>
        <ReportSection
          headerClassName="second_color"
          heading="Career Counseling and Skillbuilder Recommendations."
        >
          <div className={styles.career_counseling}>
            <div className={styles.career_counseling_image}>
              <Image
                height={261.06}
                width={421.85}
                src="/character_2.png"
                alt="Career Counseling Image"
              />
            </div>
            <div className={styles.career_counseling_content}>
              <h3>Career Counseling</h3>
              <p>
                Offer Professional career guidance to help the candidate
                navigate challenges and strategize for improvement
              </p>
            </div>
          </div>
        </ReportSection>
      </div>
    </div>
  );
}

function Item({ keyy, value }) {
  return (
    <div className={styles.items}>
      <p>{keyy}</p>
      <p>{value}</p>
    </div>
  );
}

function ReportSection({ headerClassName, heading, children }) {
  return (
    <div className={styles.overall_report}>
      <div
        className={`${styles.overall_report_header} ${styles[headerClassName]}`}
      >
        <h2>{heading}</h2>
      </div>

      <div className={styles.report_content}>{children}</div>
    </div>
  );
}
