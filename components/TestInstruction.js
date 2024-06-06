import Button from "./Button";
import styles from "./TestInstruction.module.css";
import Image from "next/image";

const TestInstruction = ({
  onClose,
  heading,
  options = ["No options provided"],
}) => {
  return (
    <>
      {/* <div className={styles.backDropContainer}>
        <div className={styles.instructionsBox}>
          <div className={styles.container}>
            <h3>{heading ? heading : "Assesment Instructions"} </h3>

            <div className={styles.instructionsContainer}>
              <ul className={styles["custom-bullets"]}>
                {options.map((option) => (
                  <li> {option}</li>
                ))}
              </ul>
            </div>

            <div className={styles.lowerContainer}>
              <button onClick={onClose}>
                Let's Start <Image src="/Forward.svg" width={15} height={15} />{" "}
              </button>
            </div>
          </div>
        </div>
      </div> */}

      <div className={styles.backDropContainer}>
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
      </div>
    </>
  );
};

export default TestInstruction;
