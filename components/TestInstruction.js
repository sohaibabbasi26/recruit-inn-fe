import Button from "./Button";
import styles from "./TestInstruction.module.css";
import Image from "next/image";

const TestInstruction = ({
  instructionsPopups,
  isLoading,
  setIsLoading,
  onClose,
  heading,
  options = ["No options provided"],
}) => {
  return (
    <>
      <div className={styles.backDropContainer}>
        {
          isLoading ? (
            <>
            <div className={styles.loader}></div>
            <h2>Assessment is being prepared, make sure to read all the instructions before starting it!</h2>
            </>
          ) : (
            <div className={styles.instructionsBox}>
              <h3>{heading ? heading : "Assesment Instructions"} </h3>
              <div className={`${styles.instructions} scroll`}>
                <ul>
                  {options.map((option) => (
                    <li>
                      {" "}
                      <span className={styles.period}></span> {option}
                    </li>
                  ))}
                </ul>
              </div>
              <Button onClick={onClose} isFor="next">
                Let's Start
              </Button>
            </div>
          )
        }
      </div >
    </>
  );
};

export default TestInstruction;
