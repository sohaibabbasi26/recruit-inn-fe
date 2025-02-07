import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import styles from "./token.module.css";
import reportShowcaseImage from "../../../public/ReportBgCandidateSelf.png";
import CourseLevelSvg from "../../../components/CourseLevelSvg";
import InvitedCandidateProgressSvg from "../../../components/InvitedCandidateProgressSvg";
import SelfReportScores from "../../../components/SelfReportScores";
import { formatDate } from "@/util/formatDate";
import generatePDF from "@/util/generatePDF";

const students = [
  { image: "/recommended_course.png" },
  { image: "/recommended_course.png" },
  { image: "/recommended_course.png" },
];

export default function Token() {
  const router = useRouter();
  const { token } = router?.query;
  const [candidateId, setCandidateId] = useState(null);
  const [results, setResults] = useState([]);
  const [recommendedCourse, setRecommendedCourse] = useState(null);
  const [codingResult, setCodingResult] = useState();
  const [candidateInfo, setCandidateInfo] = useState(null);
  const [isCodingAssessment, setIsCodingAssessment] = useState(false);
  const [candidateDetails, setDetails] = useState([]);
  const [isPdfLoading, setIsPdfLoading] = useState(false);
  const contentRef = useRef(null);
  const [isReportTokenValid, setIsReportTokenValid] = useState(false);

  const weakSkill = results?.result?.weakSkill || null;

  // Scores
  const softSkillRating = results?.result?.softskillRating || 0;
  const technicalRating = results?.result?.technicalRating || 0;
  const overallRating = Math.round((softSkillRating + technicalRating) / 2);
  const codeRating = codingResult?.result?.technicalRating || 0;
  const candidateStatus =
    overallRating < 5
      ? "not eligible"
      : overallRating < 7
      ? "qualified"
      : "recommended";
  const candidateStatusClass =
    overallRating < 5
      ? "not_eligible"
      : overallRating < 7
      ? "qualified"
      : "recommended";
  const details = [
    {
      key: "phone",
      value: results?.candidate_info?.contact_no || "+92 304 2324115",
    },
    {
      key: "date",
      value: formatDate(
        new Date(results?.candidate_info?.createdAt) || new Date()
      ),
    },

    { key: "job type", value: results?.candidate_info?.job_type || "remote" },
    { key: "applied for", value: "self" },
    {
      key: "email",
      value: results?.candidate_info?.email || "bruce.wayne@gmail.com",
    },
  ];

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
          setCandidateInfo(data?.data?.candidate_info);
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
      try {
        if (candidateId) {
          const reqBody = {
            candidate_id: candidateId,
          };
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_REMOTE_URL}/result-by-cand-id`,
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
            setResults(data?.data);
          }
        }
      } catch (err) {
        console.log("err:", err);
      }
    }
    //setIsLoading(true);
    if (isReportTokenValid) {
      fetchResults();
    }
  }, [router?.isReady, candidateId, token]);

  useEffect(() => {
    async function fetchCandidatesCodingResult() {
      //setIsLoading(true);
      const requestBody = {
        candidate_id: candidateId,
      };
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_REMOTE_URL}/get-code-analysis-candidate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      const data = await response.json();
      console.log("data response:", data);
      setCodingResult(data?.data);
      //
      //setIsLoading(false);
      if (data && data?.data && data?.data?.result) {
        setIsCodingAssessment(true);
      } else {
        setIsCodingAssessment(false);
      }
    }
    fetchCandidatesCodingResult();
  }, [candidateId]);

  const fetchRecommendedCourses = useCallback(async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SKILLBUILDER_URL}/search?value=${weakSkill}&searchBy=course`
    );
    const data = await response.json();

    if (data?.status !== 200) {
      setRecommendedCourse(null);
    }
    setRecommendedCourse(data?.data);
  }, [recommendedCourse]);

  useEffect(() => {
    if (weakSkill && !recommendedCourse) {
      fetchRecommendedCourses();
    }
  }, [recommendedCourse, weakSkill]);

  // if (!isReportTokenValid) {
  //   return (
  //     <div>
  //       <h1>Invalid Token</h1>
  //     </div>
  //   );
  // }

  return (
    <div className={styles.reportTokenContainer} ref={contentRef}>
      <div className={styles.reportImageBg}></div>
      <div className={styles.report_header}>
        <div className={styles.report_header_inner}>
          <div className={styles.report_header_image}>
            {/* Progress */}
            {/* <InvitedCandidateProgressSvg className={"yoyo"} /> */}
            <div className={styles.report_header_candidate_image}>
              <Image src={"/report-self-avatar.png"} height={84} width={65} />
            </div>
          </div>
          <div className={styles.report_header_title}>
            <h2> {results?.candidate_info?.name || "John"} </h2>
            <p> {results?.candidate_info?.position || "Dev"} </p>
            <div
              className={`${styles.report_header_score} ${styles[candidateStatusClass]}`}
            >
              <span>{candidateStatus}</span>
              <span
                className={`${styles.dot} ${styles[candidateStatusClass]}`}
              ></span>
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
        <button
          onClick={async () => {
            await generatePDF({
              setIsPdfLoading,
              contentRef,
              selectedCandidate: candidateInfo,
            });
          }}
          className={`${styles.download_report_button} ${styles.button}`}
        >
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
        <ReportSection score={overallRating || 0} heading="Overall Report">
          <p>{results?.result?.overallAssessment}</p>
        </ReportSection>

        <ReportSection score={technicalRating || 0} heading="Technical">
          <>
            <h3>Technical Summary</h3>
            <p>{results?.result?.technicalAssessment}</p>
          </>
        </ReportSection>
        {codingResult ? (
          <ReportSection
            score={codeRating ? codeRating : 0}
            heading="Coding Assessment"
          >
            <>
              <h3>Coding Summary</h3>
              <p>{codingResult?.result?.technicalSummary}</p>
            </>
          </ReportSection>
        ) : null}

        <ReportSection score={softSkillRating || 0} heading="Soft Skill">
          <>
            <h3>Soft Skill Summary</h3>
            <p>{results?.result?.softskillAssessment}</p>
          </>
        </ReportSection>
        <ReportSection
          variant="two"
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
          variant="two"
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
              <div className={styles.career_counseling_content_details}>
                <p>
                  By <span>Aahil Alwani</span>
                </p>
                <p>Premium</p>
              </div>
              <div className={styles.career_counseling_description}>
                <p>
                  {" "}
                  View description{" "}
                  <svg
                    width="24"
                    height="18"
                    viewBox="0 0 24 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.04012 10.9939L1.37781 11.5267L2.04012 10.9939ZM2.04012 7.00608L1.37781 6.4733L2.04012 7.00608ZM21.2932 10.9939L21.9555 11.5267L21.2932 10.9939ZM21.2932 7.00608L21.9555 6.4733L21.2932 7.00608ZM22.3333 9L23.1833 9L22.3333 9ZM20.6309 10.4611C19.7034 11.6142 18.3808 13.0537 16.8107 14.1987C15.2346 15.348 13.4789 16.15 11.6667 16.15V17.85C13.9779 17.85 16.0824 16.8337 17.8123 15.5723C19.548 14.3066 20.977 12.7431 21.9555 11.5267L20.6309 10.4611ZM11.6667 16.15C9.85442 16.15 8.09871 15.348 6.52268 14.1987C4.95249 13.0537 3.62994 11.6142 2.70243 10.4611L1.37781 11.5267C2.35635 12.7431 3.78535 14.3066 5.52106 15.5723C7.25093 16.8337 9.35547 17.85 11.6667 17.85V16.15ZM2.70243 7.53885C3.62994 6.38584 4.95249 4.94628 6.52268 3.80129C8.09871 2.65204 9.85442 1.85 11.6667 1.85V0.15C9.35547 0.15 7.25093 1.16627 5.52106 2.4277C3.78535 3.69339 2.35635 5.25686 1.37781 6.4733L2.70243 7.53885ZM11.6667 1.85C13.4789 1.85 15.2346 2.65204 16.8107 3.80129C18.3808 4.94628 19.7034 6.38584 20.6309 7.53885L21.9555 6.4733C20.977 5.25686 19.548 3.69339 17.8123 2.4277C16.0824 1.16627 13.9779 0.15 11.6667 0.15V1.85ZM2.70243 10.4611C1.96022 9.53849 1.85 9.34666 1.85 9H0.15C0.15 10.0552 0.733196 10.7254 1.37781 11.5267L2.70243 10.4611ZM1.37781 6.4733C0.733196 7.27464 0.15 7.94481 0.15 9H1.85C1.85 8.65334 1.96022 8.46151 2.70243 7.53885L1.37781 6.4733ZM21.9555 11.5267C22.6001 10.7254 23.1833 10.0552 23.1833 9L21.4833 9C21.4833 9.34666 21.3731 9.53849 20.6309 10.4611L21.9555 11.5267ZM20.6309 7.53885C21.3731 8.46151 21.4833 8.65334 21.4833 9L23.1833 9C23.1833 7.94481 22.6001 7.27464 21.9555 6.4733L20.6309 7.53885ZM13.8368 9C13.8368 10.1821 12.8705 11.15 11.6667 11.15V12.85C13.7987 12.85 15.5368 11.1316 15.5368 9H13.8368ZM11.6667 11.15C10.4628 11.15 9.49657 10.1821 9.49657 9H7.79657C7.79657 11.1316 9.53463 12.85 11.6667 12.85V11.15ZM9.49657 9C9.49657 7.81793 10.4628 6.85 11.6667 6.85V5.15C9.53463 5.15 7.79657 6.86836 7.79657 9H9.49657ZM11.6667 6.85C12.8705 6.85 13.8368 7.81793 13.8368 9H15.5368C15.5368 6.86836 13.7987 5.15 11.6667 5.15V6.85Z"
                      fill="#1b003c"
                    />
                  </svg>
                </p>
              </div>
              <div className={styles.career_counseling_students}>
                <p>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.63411 9.05964C7.55078 9.0513 7.45078 9.0513 7.35911 9.05964C5.37578 8.99297 3.80078 7.36797 3.80078 5.36797C3.80078 3.3263 5.45078 1.66797 7.50078 1.66797C9.54245 1.66797 11.2008 3.3263 11.2008 5.36797C11.1924 7.36797 9.61745 8.99297 7.63411 9.05964Z"
                      stroke="#1b003c"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M13.6747 3.33203C15.2914 3.33203 16.5914 4.64036 16.5914 6.2487C16.5914 7.8237 15.3414 9.10703 13.7831 9.16536C13.7164 9.15703 13.6414 9.15703 13.5664 9.16536"
                      stroke="#1b003c"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M3.46758 12.132C1.45091 13.482 1.45091 15.682 3.46758 17.0237C5.75924 18.557 9.51758 18.557 11.8092 17.0237C13.8259 15.6737 13.8259 13.4737 11.8092 12.132C9.52591 10.607 5.76758 10.607 3.46758 12.132Z"
                      stroke="#1b003c"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M15.2832 16.668C15.8832 16.543 16.4499 16.3013 16.9165 15.943C18.2165 14.968 18.2165 13.3596 16.9165 12.3846C16.4582 12.0346 15.8999 11.8013 15.3082 11.668"
                      stroke="#1b003c"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  112 Watching
                </p>
              </div>

              <button
                onClick={() =>
                  window.open(
                    `https://app.skillbuilder.online/career-counseling`,
                    "_blank"
                  )
                }
                className={`${styles.career_counseling_cta} ${styles.button}`}
              >
                Book a Career Counseling Session with SkillBuilder.
                {/* ICON */}
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.91602 18.334H17.0827"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M15.834 2.91797L4.16732 14.5846"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M15.834 11.4763V2.91797H7.27565"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </ReportSection>

        {/* course recommendations */}
        {recommendedCourse?.title ? (
          <ReportSection
            variant="two"
            headerClassName="second_color"
            heading="Skill-Specific Courses"
          >
            <div className={`${styles.career_counseling} ${styles.course}`}>
              <div className={styles.course_recommendation_card}>
                <div className={styles.course_recommendation_card_image}>
                  <Image
                    height={261.06}
                    width={421.85}
                    src={`/${process.env.NEXT_PUBLIC_SKILLBUILDER_URL}/media/course/${recommendedCourse?.image}`}
                    alt="Recommended Course Image"
                  />
                </div>
                <div className={styles.course_recommendation_card_content}>
                  <h3>{recommendedCourse?.title}</h3>
                  <p>
                    {/* Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Doloremque aliquam cum fugit. */}
                    {recommendedCourse?.learning_outcomes}
                  </p>
                  <p
                    className={
                      styles.course_recommendation_card_content_instructor
                    }
                  >
                    By{" "}
                    <span>
                      {recommendedCourse?.instructor?.user?.first_name}
                    </span>
                  </p>
                  <p
                    className={styles.course_recommendation_card_content_level}
                  >
                    <CourseLevelSvg />
                    Level: <span>beginner</span>
                  </p>
                  <p
                    className={styles.course_recommendation_card_content_price}
                  >
                    <span>${recommendedCourse?.amount} </span>
                    <span>&#45;</span>
                    <span>
                      {" "}
                      ${recommendedCourse?.amount - recommendedCourse?.discount}
                    </span>
                  </p>

                  <div
                    className={
                      styles.course_recommendation_card_content_enrolled
                    }
                  >
                    {/* students */}
                    {students.map((student, i) => (
                      <EnrolledImage key={i} student={student} />
                    ))}
                  </div>
                </div>
              </div>
              <div className={styles.course_recommendation_content}>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste
                  nihil distinctio omnis assumenda facere voluptates officia
                  iure neque id libero!
                </p>
              </div>
            </div>
          </ReportSection>
        ) : null}
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

function ReportSection({
  score,
  headerClassName,
  heading,
  children,
  variant = "one",
}) {
  return (
    <div className={styles.overall_report}>
      <div
        className={`${styles.overall_report_header} ${styles[headerClassName]}`}
      >
        <h2>{heading}</h2>
        {variant === "one" ? (
          <SelfReportScores score={score ? score : 0} />
        ) : null}
      </div>

      <div className={styles.report_content}>{children}</div>
    </div>
  );
}

function EnrolledImage({ student }) {
  const imageSrc = student?.image || "/.avatar3";
  return (
    <div className={styles.enrolled_image}>
      <Image src={imageSrc} height={36.5} width={36.5} />
    </div>
  );
}
