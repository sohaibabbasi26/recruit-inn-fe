import { useFormContext } from "@/contexts/FormContext";
import styles from "./AddSkillForm.module.css";
import Image from "next/image";
import { forwardRef, useState, useEffect } from "react";
// import { getSvg } from "@/util/helpers";

// useFormContext
const AddSkillForm = forwardRef(
  ({
    codingExpertise,
    setCodingExpertise,
    setTechStack,
    isTestRequired,
    setIsTestRequired,
  }) => {
    const handleTestRequirementChange = (event) => {
      console.log("clicked", event.target.checked);
      setIsTestRequired(event.target.checked);
    };

    const iconSize = 25;

    const [skill1, setSkill1] = useState("");
    const [skill2, setSkill2] = useState("");
    const [skill3, setSkill3] = useState("");
    const [skill4, setSkill4] = useState("");
    const [codingSkill, setCodingSkill] = useState("");

    // const [level1, setLevel1] = useState();
    // const [level2, setLevel2] = useState();
    // const [level3, setLevel3] = useState();
    // const [level4, setLevel4] = useState();

    const [level1, setLevel1] = useState("");
    const [level2, setLevel2] = useState("");
    const [level3, setLevel3] = useState("");
    const [level4, setLevel4] = useState("");
    const [codingLevel, setCodingLevel] = useState("beginner");

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

      // console.log('')
    }, [codingSkill, codingLevel]);

    return (
      <>
        <form className={styles.addSkillFormContainer}>
          <div className={styles.inputField}>
            <div className={styles.wrapper}>
              <Image
                className={styles.img}
                src="/Award.svg"
                // src={skill1.length > 1 ? getSvg(skill1) : "/Award.svg"}
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

            {/* <select
              placeholder="Choose level of difficulty"
              value={level1}
              onChange={(e) => setLevel1(e.target.value)}
            >
              <option value="beginner">Choose level of difficulty</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="expert">Expert</option>
            </select> */}

            <select
              value={level1 || ""} // Fallback to empty string if level1 is undefined or null
              onChange={(e) => setLevel1(e.target.value)}
            >
              <option value="" disabled>Choose level of difficulty</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="expert">Expert</option>
            </select>
          </div>

          <div className={styles.inputField}>
            <div className={styles.wrapper}>
              <Image
                className={styles.img}
                src="/Award.svg"
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
              <option value="" disabled>Choose level of difficulty</option>
              <option value="beginner">Beginnner</option>
              <option value="intermediate">Intermediate</option>
              <option value="expert">Expert</option>
            </select>
          </div>

          <div className={styles.inputField}>
            <div className={styles.wrapper}>
              <Image
                className={styles.img}
                src="/Award.svg"
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
              <option value="" disabled>Choose level of difficulty</option>
              <option value="beginner">Beginnner</option>
              <option value="intermediate">Intermediate</option>
              <option value="expert">Expert</option>
            </select>
          </div>

          <div className={styles.inputField}>
            <div className={styles.wrapper}>
              <Image
                className={styles.img}
                src="/Award.svg"
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
              <option value="" disabled>Choose level of difficulty</option>
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
  }
);

export default AddSkillForm;
