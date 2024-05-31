import styles from "./CandidatesHub.module.css";
import TopNavbar from "./TopNavbar";
import Image from "next/image";
import { useState } from "react";

import SearchEmpty from "../public/SearchEmpty.gif";
import { getSvg } from "@/util/helpers";
import Average from "./Average"

const CandidatesHub = ({
  heading,
  data,
  reportOverlay,
  setReportOverlay,
  setSelectedCandidate,
}) => {
  // const newData = data?.map()
  console.log("data in candidates Hub:", data);

  // const calculateCumulativeMean = (val1, val2, val3) => {
  //   console.log("val1:", val1, "val2:", val2);

  //   let total = 0;
  //   let count = 0;

  //   if (val1) {
  //     total += Math.round(val1);
  //     count += 1;
  //   }

  //   if (val2) {
  //     total += Math.round(val2);
  //     count += 1;
  //   }

  //   if (val3) {
  //     total += Math.round(parseInt(val3));
  //     count += 1;
  //   }

  //   if (count === 0) return 0;

  //   return (total / count).toFixed(1);
  // };
  const calculateCumulativeMean = (val1, val2) => {
    let total = 0;
    let count = 0;
    if (val1) {
      total += val1;
      count += 1;
    }
    if (val2) {
      total += val2;
      count += 1;
    }
    if (count === 0) return 0;
  
    return (total / count).toFixed(1);
  };  
  
  const [recommended, setRecommended] = useState("Recommended");
  const iconSize = 25;
  const goToAllIconSize = 18;
  const statusSize = 10;

  const hasData = data && data.length > 0;

  // const getBackgroundColor = (score) => {
  //   if (score >= 7 && score <= 10) {
  //     return "#E7FFE0";
  //   } else if (score >= 5 && score <= 6) {
  //     return "#F0F3FF";
  //   } else {
  //     return "#FFE6E6";
  //   }
  // };

  // const getFilter = (score) => {
  //   if (score >= 7 && score <= 10) {
  //     return "Recommended";
  //   } else if (score >= 5 && score <= 6) {
  //     return "Qualified";
  //   } else {
  //     return "Not Eligible";
  //   }
  // };
  // const getStatusSymbol = (score) => {
  //   if (score >= 7 && score <= 10) {
  //     return "/activeStatus.svg";
  //   } else if (score >= 5 && score <= 6) {
  //     return "/qualified.svg";
  //   } else {
  //     return "/noteligible.svg";
  //   }
  // };
 const getBackgroundColor = (score) => {
  if (score >= 7 && score <= 10) {
    return "#E7FFE0";
  } else if (score >= 5 && score < 7) { // Fixed the condition to be less than 7
    return "#F0F3FF";
  } else {
    return "#FFE6E6";
  }
};

const getFilter = (score) => {
  if (score >= 7 && score <= 10) {
    return "Recommended";
  } else if (score >= 5 && score < 7) { // Fixed the condition to be less than 7
    return "Qualified";
  } else {
    return "Not Eligible";
  }
};

const getStatusSymbol = (score) => {
  if (score >= 7 && score <= 10) {
    return "/activeStatus.svg";
  } else if (score >= 5 && score < 7) { // Fixed the condition to be less than 7
    return "/qualified.svg";
  } else {
    return "/noteligible.svg";
  }
};

  

  const cardClickHandler = (candidate) => {
    setSelectedCandidate(candidate);
    setReportOverlay(true);
  };

  return (
    <>
      <div className={styles.parentContainer}>
        <div className={styles.superContainer}>
          <div className={styles.headingContainer}>
            <div className={styles.heading}>
              <h3>{heading}</h3>
              <span>
                <span>
                  {!data?.length
                    ? 0
                    : data?.length <= 9
                    ? `0${data?.length}`
                    : data?.length}
                </span>{" "}
              </span>
            </div>
          </div>
  
          <div className={styles.subContainer}>
            {hasData ? (
              data?.map((item) => {
                const technicalRating = item?.results?.technicalRating;
                const softskillRating = item?.results?.softskillRating;
                const cumulativeMean = calculateCumulativeMean(
                  technicalRating,
                  softskillRating
                );
  
                return (
                  <div
                    onClick={() => {
                      cardClickHandler(item);
                    }}
                    className={styles.reportsCard}
                    key={item.id}
                  >
                    <div className={styles.topContainer}>
                      <div className={styles.leftTop}>
                        <Image
                          src="/Emoji.svg"
                          width={iconSize}
                          height={iconSize}
                        />
                        <div className={styles.basicInfo}>
                          <h4>{item?.name}</h4>
                          <span>{item?.position}</span>
                        </div>
                      </div>
                      <div className={styles.rightTop}>
                      <span
                        style={{ backgroundColor: getBackgroundColor(Math.round(cumulativeMean)) }}
                      >
                        {Math.round(cumulativeMean)}/10
                      </span>

                        {/* <Average
                          numbers={[technicalRating, softskillRating]}
                          outOf={10}
                        /> */}
{/*   
                        <span
                          style={{
                            backgroundColor: getBackgroundColor(
                              Math.round(cumulativeMean)
                            ),
                          }}
                        >
                          {getFilter(Math.round(cumulativeMean))}
                          <Image
                            src={getStatusSymbol(Math.round(cumulativeMean))}
                            width={statusSize}
                            height={statusSize}
                          />
                        </span> */}
                        {/* <span
                            style={{
                              backgroundColor: getBackgroundColor(
                                Math.ceil(calculateCumulativeMean(
                                  item?.results?.technicalRating || item?.results[0]?.result?.technicalRating,
                                  item?.results?.softskillRating || item?.results[0]?.result?.softskillRating
                                ))
                              ),
                            }}
                          >
                            {Math.ceil(calculateCumulativeMean(
                              item?.results?.technicalRating || item?.results[0]?.result?.technicalRating,
                              item?.results?.softskillRating || item?.results[0]?.result?.softskillRating
                            ))}
                            /10
                          </span> */}
                        <Image
                          src="/rightArrow.svg"
                          height={iconSize}
                          width={iconSize}
                        />
                      </div>
                    </div>
                    <div className={styles.techStack}>
                      <ul>
                        {item?.expertise?.map((skill) => (
                          <li key={skill.skill}>
                            <div className={styles.basic}>
                              <span>{skill.skill}</span>
                              <Image
                                className={styles.django}
                                src={getSvg(skill.skill)}
                                height={
                                  getSvg(skill.skill) === "/python.svg" ||
                                  getSvg(skill.skill) === "/html5.svg" ||
                                  getSvg(skill.skill) === "/css3.svg"
                                    ? 20
                                    : iconSize
                                }
                                width={
                                  getSvg(skill.skill) === "/python.svg" ||
                                  getSvg(skill.skill) === "/html5.svg" ||
                                  getSvg(skill.skill) === "/css3.svg"
                                    ? 20
                                    : iconSize
                                }
                              />
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className={styles.lowerContainer}>
                      <h4 className={styles.jobType}>
                        <Image
                          src="/JOB_TYPE-active.svg"
                          width={goToAllIconSize}
                          height={goToAllIconSize}
                        />{" "}
                        {item?.jobType}
                      </h4>
                      <span>
                        <h4>Experience:</h4> {item?.overAllExperience}
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className={styles.tempContainer}>
                <Image src="/SearchEmpty.gif" width={300} height={300} />
                <h3>You don't have {heading} yet...</h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
  
};

export default CandidatesHub;