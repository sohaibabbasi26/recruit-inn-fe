import styles from "./RightBottomBtns.module.css";
import Image from "next/image";

const RightBottomBtns = ({
  stages,
  currentStage,
  onContinue,
  onBack,
  setCompletedStages,
  completedStages,
  onClose,
}) => {
  const navigationIconSize = 25;

  return (
    <>
      <div className={styles.btnsContainer}>
        {currentStage !== stages.ADD_SKILL && (
          <button id={styles.backBtn} onClick={onClose}>
            <Image
              src="/backward.svg"
              width={navigationIconSize}
              height={navigationIconSize}
            />
            Back
          </button>
        )}
        <button id={styles.forwardBtn} onClick={onContinue}>
          Continue{" "}
          <Image src="/Forward.svg" width={20} height={navigationIconSize} />
        </button>
      </div>
    </>
  );
};

export default RightBottomBtns;