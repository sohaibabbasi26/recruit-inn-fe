import { getSvg } from "@/util/helpers";
import Average from "./Average";
import styles from "./CandidateCard.module.css";
import Image from "next/image";
const iconSize = 25;

function CandidateCard({ data: candidate = {}, onClick, isFor }) {
  return (
    <div
      className={styles.reportsCard}
      //   onClick={() => {
      //     cardClickHandler(candidate);
      //   }}
      onClick={onClick}
    >
      {/*top container */}
      <div className={styles.topContainer}>
        <div className={styles.leftTop}>
          <Image src="/Emoji.svg" width={iconSize} height={iconSize} />
          <div className={styles.basicInfo}>
            <h4>{candidate?.name}</h4>
            <span>{candidate?.position}</span>
          </div>
        </div>
        <div className={styles.rightTop}>
          <Average
            numbers={[
              candidate?.results?.technicalRating,
              candidate?.results?.softskillRating,
            ]}
            outOf={10}
          />
          <Image />
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
  );
}

export default CandidateCard;
