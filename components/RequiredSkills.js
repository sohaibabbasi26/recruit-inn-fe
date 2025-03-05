import { getSvg } from "@/util/helpers";
import styles from "./RequiredSkills.module.css";
import Image from "next/image";

// Utility function to convert a string to PascalCase
const toPascalCase = (str) => {
  if (typeof str !== "string") return "";
  return str
    .toLowerCase()
    .trim()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
};

const RequiredSkills = ({ expertise }) => {
  //("expertise in required skills:", expertise);

  return (
    <>
      <div className={styles.superContainer}>
        {expertise?.map((item, index) => (
          <div className={styles.listItem} key={index}>
            <div className={styles.techContainer}>
              <Image
                src={getSvg(item?.skill)}
                width={20}
                height={20}
                alt={item?.skill || "Skill Icon"}
              />
              <span>{item?.skill}</span>
            </div>

            <span>{toPascalCase(item?.level)}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default RequiredSkills;

