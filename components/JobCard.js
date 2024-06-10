import { getSvg } from "@/util/helpers";
import Image from "next/image";
import styles from "./JobCard.module.css";

const getBackgroundColor = (status) => {
  if (status === "Active") {
    return "#E7FFE0";
  } else {
    return "#FFE6E6";
  }
};

const getStatusSymbol = (status) => {
  if (status === "Active") {
    return "/activeStatus.svg";
  } else {
    return "/noteligible.svg";
  }
};

const iconSize = 20;
const statusSize = 10;
function JobCard({ data: job = {}, onClick, isFor }) {
  return (
    <div className={styles.jobCard} onClick={() => onClick(job)}>
      <div className={styles.heading_wrapper}>
        <h3>{job?.position}</h3>
        <div className={styles.heading_right}>
          <p>
            {job?.applied_candidates_count === 0
              ? "No Candidates Yet"
              : job?.applied_candidates_count === 1
              ? job?.applied_candidates_count + " Candidate"
              : job?.applied_candidates_count + " Candidates"}
          </p>
          <Image
            src="/job-arrow-right.png"
            height={20}
            width={20}
            alt="Right arrow icon"
          />
        </div>
      </div>
      <ul className={styles.skills}>
        {job?.expertise?.map((skill) => (
          <li key={job.skill}>
            <Image
              src={getSvg(skill.skill)}
              width={
                getSvg(skill.skill) === "/python.svg" ||
                getSvg(skill.skill) === "/html5.svg" ||
                getSvg(skill.skill) === "/css3.svg"
                  ? 20
                  : iconSize
              }
              height={
                getSvg(skill.skill) === "/python.svg" ||
                getSvg(skill.skill) === "/html5.svg" ||
                getSvg(skill.skill) === "/css3.svg"
                  ? 20
                  : iconSize
              }
            />
            <span> {skill.skill} </span>
          </li>
        ))}
      </ul>
      {isFor === "jobs" && (
        <div className={styles.stats}>
          <p className={styles.location}> {job?.location} </p>

          {/* active / close */}
          {/* for the time being */}
          <p
            className={styles.status}
            style={{
              backgroundColor: getBackgroundColor(job?.status),
            }}
          >
            {job?.status}
            <Image
              src={getStatusSymbol(job?.status)}
              width={statusSize}
              height={statusSize}
            />
          </p>
        </div>
      )}
    </div>
  );
}

export default JobCard;
