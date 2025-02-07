import styles from "./CandidateSelfHub.module.css";
import Image from "next/image";
import { useState } from "react";

import { getSvg } from "@/util/helpers";
import Average from "./Average";
import { useRouter, useSearchParams } from "next/navigation";
import { useRouter as nextRouter } from "next/router";

const CandidatesSelfHub = ({
  contact,
  candidateId,
  isDisable,
  name,
  expertise,
  results,
  isLoading,
  generateTestAndRedirect,
  heading,
  reportOverlay,
  setReportOverlay,
  setSelectedCandidate,
  appliedThrough,
  experience,
}) => {
  console.log("data in candidates Hub:", results);

  const [recommended, setRecommended] = useState("Recommended");
  const navigationRouter = useRouter();
  const [data, setData] = useState([]);
  const iconSize = 25;
  const goToAllIconSize = 18;
  const statusSize = 10;

  const hasData = results && results?.length > 0;
  console.log("hasData:", hasData);

  const getBackgroundColor = (score) => {
    if (score >= 7 && score <= 10) {
      return "#E7FFE0";
    } else if (score >= 5 && score <= 6) {
      return "#F0F3FF";
    } else {
      return "#FFE6E6";
    }
  };

  const getFilter = (score) => {
    if (score >= 7 && score <= 10) {
      return "Recommended";
    } else if (score >= 5 && score <= 6) {
      return "Qualified";
    } else {
      return "Not Eligible";
    }
  };
  const getStatusSymbol = (score) => {
    if (score >= 7 && score <= 10) {
      return "/activeStatus.svg";
    } else if (score >= 5 && score <= 6) {
      return "/qualified.svg";
    } else {
      return "/noteligible.svg";
    }
  };

  const cardClickHandler = (candidate) => {
    setSelectedCandidate(candidate);
    navigationRouter?.push(`report/${candidateId}`);
  };

  async function getRedirected() {
    await generateTestAndRedirect();
  }

  return (
    <>
      <div className={styles.parentContainer}>
        {isLoading ? (
          <>
            <div className={styles.loader}></div>
          </>
        ) : (
          <div className={styles.superContainer}>
            {hasData ? (
              <div className={styles.headingContainer}>
                <div className={styles.heading}>
                  <h3>{heading}</h3>
                  <span>
                    {!results?.length
                      ? 0
                      : results?.length <= 9
                      ? `0${results?.length}`
                      : results?.length}
                  </span>
                </div>

                {!isDisable && (
                  <button onClick={generateTestAndRedirect}>
                    {isLoading ? (
                      <>
                        <div className={styles.loaderContainer}>
                          <div className={styles.loader}></div>
                        </div>
                      </>
                    ) : (
                      <>
                        Evaluate Yourself{" "}
                        <Image src="/spark.svg" height={30} width={30} />
                      </>
                    )}{" "}
                  </button>
                )}
              </div>
            ) : null}

            <div className={styles.subContainer}>
              {hasData ? (
                results?.map((item) => {
                  return (
                    <>
                      <div
                        onClick={() => {
                          cardClickHandler(item);
                        }}
                        className={styles.reportsCard}
                      >
                        {/*top container */}
                        <div className={styles.topContainer}>
                          <div className={styles.leftTop}>
                            <Image
                              src="/Emoji.svg"
                              width={iconSize}
                              height={iconSize}
                            />
                            <div className={styles.basicInfo}>
                              <h4>{name}</h4>
                              <span>{item?.position}</span>
                            </div>
                          </div>
                          <div className={styles.rightTop}>
                            {/* <span
                              style={{
                                backgroundColor: getBackgroundColor(
                                  Math.ceil(item?.result?.technicalRating)
                                ),
                              }}
                            >
                              {Math.ceil(item?.result?.technicalRating)}/10
                            </span> */}

                            <Average
                              numbers={[item?.result?.technicalRating]}
                              outOf={10}
                            />
                            <span
                              style={{
                                backgroundColor: getBackgroundColor(
                                  Math.ceil(item?.result?.technicalRating)
                                ),
                              }}
                            >
                              {getFilter(
                                Math.ceil(item?.result?.technicalRating)
                              )}
                              <Image
                                src={getStatusSymbol(
                                  Math.ceil(item?.result?.technicalRating)
                                )}
                                width={statusSize}
                                height={statusSize}
                              />{" "}
                            </span>
                            <Image
                              src="/rightArrow.svg"
                              height={iconSize}
                              width={iconSize}
                            />
                          </div>
                        </div>
                        {/* techstack Conatiner */}

                        <div className={styles.techStack}>
                          <ul>
                            {expertise?.map((skill) => {
                              return (
                                <>
                                  <li>
                                    <div className={styles.basic}>
                                      <Image
                                        className={styles.django}
                                        src={getSvg(skill.skill)}
                                        width={iconSize}
                                        height={iconSize}
                                      />
                                      <span>{skill.skill}</span>
                                    </div>
                                  </li>
                                </>
                              );
                            })}
                          </ul>
                        </div>

                        <div className={styles.lowerContainer}>
                          <h4 className={styles.jobType}>
                            <Image
                              src="/JOB_TYPE-active.svg"
                              width={goToAllIconSize}
                              height={goToAllIconSize}
                            />
                            {appliedThrough}
                          </h4>
                          <span>
                            <h4>Experience:</h4> {experience}
                          </span>
                        </div>
                      </div>
                    </>
                  );
                })
              ) : (
                <div className={styles.tempContainer}>
                  <div>
                    <h1>Here’s Where Your Journey Begins</h1>

                    <div className={styles.candidateDefault}>
                      <Image
                        className={styles.avatar}
                        src="/avatarDefault.svg"
                        width={77}
                        height={100}
                      />
                      <h2>Welcome, {name} </h2>
                      <p>
                        Are you ready to take the AI Interview to stand out
                        amongst other candidates?
                      </p>
                      {!isDisable && (
                        <button onClick={generateTestAndRedirect}>
                          {isLoading ? (
                            <>
                              <div className={styles.loaderContainer}>
                                <div className={styles.loader}></div>
                              </div>
                            </>
                          ) : (
                            <>
                              Evaluate Yourself{" "}
                              <Image src="/spark.svg" height={30} width={30} />
                            </>
                          )}{" "}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CandidatesSelfHub;
