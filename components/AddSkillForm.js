import { useFormContext } from "@/contexts/FormContext";
import styles from "./AddSkillForm.module.css";
import Image from "next/image";
import { forwardRef, useState, useEffect } from "react";
import { getSvg } from "@/util/helpers";

// useFormContext
const AddSkillForm = forwardRef(
  ({
    isArabicChosen,
    setIsArabicChosen,
    skill1,
    setSkill1,
    skill2,
    setSkill2,
    skill3,
    setSkill3,
    skill4,
    setSkill4,
    level1,
    setLevel1,
    level2,
    setLevel2,
    level3,
    setLevel3,
    level4,
    setLevel4,
    setCodingExpertise,
    setTechStack,
    isTestRequired,
    setIsTestRequired,
  }) => {
    const [codingSkill, setCodingSkill] = useState("");
    const [codingLevel, setCodingLevel] = useState("beginner");
    const [queryIcons, setQueryIcons] = useState([]);

    //("Icons state", queryIcons);

    useEffect(() => {
      const FormSubmissionHandler = (e) => {
        const skills = [
          { skill: skill1, level: level1 },
          { skill: skill2, level: level2 },
          { skill: skill3, level: level3 },
          { skill: skill4, level: level4 },
        ];

        const filledSkills = skills.filter((skillObj) => skillObj.skill);
        setTechStack(filledSkills);
      };

      FormSubmissionHandler();
    }, [skill1, skill2, skill3, skill4, level1, level2, level3, level4]);

    useEffect(() => {
      const skills = [{ skill: codingSkill, level: codingLevel }];

      const filledSkills = skills.filter((skillObj) => skillObj.skill);
      setCodingExpertise(filledSkills);
    }, [codingSkill, codingLevel]);

    const handleTestRequirementChange = (event) => {
      //("clicked", event.target.checked);
      setIsTestRequired(event.target.checked);
    };

    const handleArabicChooseChange = (event) => {
      //("clicked", event.target.checked);
      setIsArabicChosen(event.target.checked);
    };

    const iconSize = 25;

    return (
      <>
        <form className={styles.addSkillFormContainer}>
          <div
            className={`${styles.inputField} ${skill1 ? styles.filled : ""}`}
          >
            <div className={styles.wrapper}>
              <Image
                className={styles.img}
                src={skill1.length > 1 ? getSvg(skill1) : "/Award.svg"}
                width={iconSize}
                height={iconSize}
              />
              <input
                type="text"
                value={skill1}
                placeholder="Add Required Skill"
                onChange={(e) => setSkill1(e.target.value)}
              />
            </div>

            <select
              value={level1 || ""} // Fallback to empty string if level1 is undefined or null
              onChange={(e) => setLevel1(e.target.value)}
            >
              <option value="" disabled>
                Choose level of difficulty
              </option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="expert">Expert</option>
            </select>
          </div>

          <div
            className={`${styles.inputField} ${skill2 ? styles.filled : ""}`}
          >
            <div className={styles.wrapper}>
              <Image
                className={styles.img}
                // src="/Award.svg"
                src={skill2.length > 1 ? getSvg(skill2) : "/Award.svg"}
                width={iconSize}
                height={iconSize}
              />
              <input
                type="text"
                value={skill2}
                placeholder="Add Required Skill"
                onChange={(e) => setSkill2(e.target.value)}
              />
            </div>

            <select
              placeholder="Choose level of difficulty"
              value={level2}
              onChange={(e) => setLevel2(e.target.value)}
            >
              <option value="" disabled>
                Choose level of difficulty
              </option>
              <option value="beginner">Beginnner</option>
              <option value="intermediate">Intermediate</option>
              <option value="expert">Expert</option>
            </select>
          </div>

          <div
            className={`${styles.inputField} ${skill3 ? styles.filled : ""}`}
          >
            <div className={styles.wrapper}>
              <Image
                className={styles.img}
                // src="/Award.svg"
                src={skill3.length > 1 ? getSvg(skill3) : "/Award.svg"}
                width={iconSize}
                height={iconSize}
              />
              <input
                type="text"
                value={skill3}
                placeholder="Add Required Skill"
                onChange={(e) => setSkill3(e.target.value)}
              />
            </div>

            <select
              placeholder="Choose level of difficulty"
              value={level3}
              onChange={(e) => setLevel3(e.target.value)}
            >
              <option value="" disabled>
                Choose level of difficulty
              </option>
              <option value="beginner">Beginnner</option>
              <option value="intermediate">Intermediate</option>
              <option value="expert">Expert</option>
            </select>
          </div>

          <div
            className={`${styles.inputField} ${skill4 ? styles.filled : ""}`}
          >
            <div className={styles.wrapper}>
              <Image
                className={styles.img}
                // src="/Award.svg"
                src={skill4.length > 1 ? getSvg(skill4) : "/Award.svg"}
                width={iconSize}
                height={iconSize}
              />
              <input
                type="text"
                placeholder="Add Required Skill"
                value={skill4}
                onChange={(e) => setSkill4(e.target.value)}
              />
            </div>

            <select
              placeholder="Choose level of difficulty"
              value={level4}
              onChange={(e) => setLevel4(e.target.value)}
            >
              <option value="" disabled>
                Choose level of difficulty
              </option>
              <option value="beginner">Beginnner</option>
              <option value="intermediate">Intermediate</option>
              <option value="expert">Expert</option>
            </select>
          </div>

          <div>
            <input
              type="checkbox"
              className={styles.codeAssignment}
              id="code-assignment"
              checked={isTestRequired}
              onChange={handleTestRequirementChange}
            />
            <label htmlFor="code-assignment">
              Would you want to include coding assessment as well?{" "}
            </label>
          </div>

          <div>
            <input
              type="checkbox"
              className={styles.codeAssignment}
              id="code-assignment1"
              checked={isArabicChosen}
              onChange={handleArabicChooseChange}
            />
            <label htmlFor="code-assignment1">
              Would you like to conduct the interview in Arabic?{" "}
            </label>
          </div>
        </form>
      </>
    );
  }
);

export default AddSkillForm;
