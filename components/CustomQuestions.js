import React from "react";
import styles from "./CustomQuestions.module.css";

function CustomQuestions() {
  return (
    <div className={styles.infoField}>
      <Image src="/smiley.svg" width={iconSize} height={iconSize} />
      <input
        type="text"
        placeholder="Add Job Title"
        value={position}
        ref={positionRef}
      />
    </div>
  );
}

export default CustomQuestions;
