import styles from "../src/pages/report/token.module.css";

function SelfReportScores({ score = 8, maxScore = 10, maxStars = 6 }) {
  const filledStars = Math.round((score / maxScore) * maxStars);

  return (
    <div className={styles.scores}>
      <p>
        Overall Score - {score} / {maxScore}
      </p>
      <div className={styles.stars}>
        {Array.from({ length: maxStars }).map((_, index) => (
          <div
            key={index}
            className={`${styles.point} ${
              index < filledStars ? styles.filled : ""
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default SelfReportScores;
