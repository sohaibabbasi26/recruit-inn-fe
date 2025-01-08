function RoundedProgress({ score = 0 }) {
  return (
    <>
      <svg viewBox="0 0 36 36" className={styles.circular}>
        <path
          className={styles.background}
          d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <path
          className={styles.foreground}
          d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
          style={{ strokeDasharray: `${percentage}, 100` }}
        />
      </svg>
      <div className={styles.value}>{normalizedValue} / 10</div>
    </>
  );
}

export default RoundedProgress;
