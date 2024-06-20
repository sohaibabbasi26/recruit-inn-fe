import styles from "./CandidatesHub.module.css";
import Image from "next/image";
import { useState } from "react";
import { getSvg } from "@/util/helpers";
import { average } from "@/util/average";

const CandidatesHub = ({
  heading,
  data,
  setReportOverlay,
  setSelectedCandidate,
}) => {
  console.log("data in candidates Hub:", data);

  console.log(data[0]?.results);
  console.log(data[0]?.score);

  const sortData = [...data];
  // const sortedData = sortData.sort(
  //   (a, b) => parseFloat(b.score) - parseFloat(a.score)
  // );

  const sortedData = sortData.sort(
    (a, b) =>
      (isNaN(parseFloat(b.score)) ? 0 : parseFloat(b.score)) -
      (isNaN(parseFloat(a.score)) ? 0 : parseFloat(a.score))
  );

  const iconSize = 25;
  const goToAllIconSize = 18;
  const statusSize = 10;

  const hasData = data && data.length > 0;

  const getBackgroundColor = (score) => {
    if (score >= 7 && score <= 10) {
      return "#E7FFE0";
    } else if (score >= 5 && score < 7) {
      return "#F0F3FF";
    } else {
      return "#FFE6E6";
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
              sortedData?.map((item) => (
                <div
                  onClick={() => {
                    cardClickHandler(item);
                  }}
                  className={styles.reportsCard}
                  key={item.candidate_id}
                >
                  <div className={styles.topContainer}>
                    <div className={styles.leftTop}>
                      <Image
                        src="/Emoji.svg"
                        width={iconSize}
                        height={iconSize}
                        alt="emoji icon"
                      />
                      <div className={styles.basicInfo}>
                        <h4>{item?.name}</h4>
                        <span>{item?.inferredPosition}</span>
                      </div>
                    </div>
                    <div className={styles.rightTop}>
                      <span
                        style={{
                          backgroundColor: getBackgroundColor(
                            Math.round(item.score)
                          ),
                        }}
                      >
                        {Math.round(item.score)}/10
                      </span>
                      <Image
                        src="/rightArrow.svg"
                        height={iconSize}
                        width={iconSize}
                        alt="right arrow icon"
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
                              alt="skill icon"
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
              ))
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
