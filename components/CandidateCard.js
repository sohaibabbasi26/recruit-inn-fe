import { getSvg } from "@/util/helpers";
import Image from "next/image";
import Average from "./Average";
import styles from "./CandidateCard.module.css";
const iconSize = 25;

function CandidateCard({ data: candidate = {}, onClick }) {
  return (
    <div className={styles.reportsCard} onClick={onClick}>
      {/*top container */}
      <div className={styles.candidateCard}>
        <div className={styles.headingWrapper}>
          <div className={styles.avatarWrapper}>
            <Image className={styles.avatar} src="/Emoji.svg" fill />
          </div>
          <div className={styles.basicInfo}>
            <h4>{candidate?.name}</h4>
            <span>{candidate?.position}</span>
          </div>
          <div className={styles.rightTop}>
            <Average
              numbers={[
                candidate?.results?.technicalRating,
                candidate?.results?.softskillRating,
              ]}
              outOf={10}
            />
            <Image
              src="/job-arrow-right.png"
              height={24}
              width={24}
              alt="Right arrow icon"
            />
          </div>
        </div>

        {/* techstack Conatiner */}

        <div className={styles.techStack}>
          <ul>
            {candidate?.expertise?.map((skill) => {
              return (
                <>
                  <li>
                    <div className={styles.basic}>
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
                      <span>{skill.skill}</span>
                    </div>
                    {/* <p>3+ Years</p> */}
                  </li>
                </>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CandidateCard;
