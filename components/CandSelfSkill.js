import { getSvg } from "@/util/helpers";
import styles from "./AddSkillForm.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";

const CandSelfSkill = ({ setTechStack, isTestRequired, setIsTestRequired }) => {
  const iconSize = 25;

  console.log("Is test Required:", isTestRequired);

  const [skill1, setSkill1] = useState("");
  const [skill2, setSkill2] = useState("");

  const [level1, setLevel1] = useState("");
  const [level2, setLevel2] = useState("");

  useEffect(() => {
    const skills = [
      { skill: skill1, level: level1 },
      { skill: skill2, level: level2 },
    ];

    const filledSkills = skills.filter((skillObj) => skillObj.skill);

    setTechStack(filledSkills);
  }, [skill1, skill2, level1, level2]);

  const handleTestRequirementChange = (event) => {
    console.log("clicked", event.target.checked);
    setIsTestRequired(event.target.checked);
    console.log("Is test Required:", isTestRequired);
  };

  useEffect(() => {
    console.log("is test req from use effect:",isTestRequired);
  },[isTestRequired])

  return (
    <>
      <form className={styles.addSkillFormContainer}>
        <div className={styles.inputField}>
          <div className={styles.wrapper}>
            <Image
              className={styles.img}
              //   src="/award.svg"
              src={getSvg(skill1)}
              width={iconSize}
              height={iconSize}
            />
            <input
              type="text"
              placeholder="Add Required Skill"
              onChange={(e) => {
                setSkill1(e.target.value);
              }}
            />
          </div>

          <select
            placeholder="Choose level of difficulty"
            defaultValue="no-value"
            onChange={(e) => {
              setLevel1(e.target.value);
            }}
          >
            <option value="no-value" disabled>
              Choose level of difficulty
            </option>
            <option value="beginner">Beginnner</option>
            <option value="intermediate">Intermediate</option>
            <option value="expert">Expert</option>
          </select>
        </div>

        <div className={styles.inputField}>
          <div className={styles.wrapper}>
            <Image
              className={styles.img}
              //   src="/award.svg"
              src={skill2.length > 1 ? getSvg(skill2) : "/Award.svg"}
              width={iconSize}
              height={iconSize}
            />
            <input
              type="text"
              placeholder="Add Required Skill"
              onChange={(e) => {
                setSkill2(e.target.value);
              }}
            />
          </div>

          <select
            placeholder="Choose level of difficulty"
            defaultValue="no-value"
            onChange={(e) => {
              setLevel2(e.target.value);
            }}
          >
            <option value="no-value" disabled>
              Choose level of difficulty
            </option>
            <option value="beginner">Beginnner</option>
            <option value="intermediate">Intermediate</option>
            <option value="expert">Expert</option>
          </select>
        </div>

        <div>
          <label>Would you like to add a coding assignment too?</label>
          <input
            type="checkbox"
            checked={isTestRequired}
            onChange={handleTestRequirementChange}
          />
        </div>
      </form>
    </>
  );
};

export default CandSelfSkill;
