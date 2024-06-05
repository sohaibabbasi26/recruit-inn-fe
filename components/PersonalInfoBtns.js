// import { useRouter } from "next/router";
import styles from "./RightBottomBtns.module.css";
// import Link from "next/link";
import Image from "next/image";

const PersonalInfoBtns = ({ onContinue, setCurrentStage, stages }) => {
  const navigationIconSize = 30;
  const forwardIconSize = 20;
  // const router = useRouter();
  const handleContinue = async () => {
    await onContinue();
  };
  const backHandler = () => {
    // router.push("http://app.recruitinn.ai/");
    setCurrentStage(stages.JOB_DETAIL);
  };
  return (
    <>
      <div className={styles.btnsContainer}>
        <button id={styles.backBtn} onClick={backHandler}>
          <Image
            src="/backward.svg"
            width={navigationIconSize}
            height={navigationIconSize}
          />
          Back
        </button>
        <button id={styles.forwardBtn} onClick={handleContinue}>
          Continue{" "}
          <Image
            src="/Forward.svg"
            width={forwardIconSize}
            height={forwardIconSize}
          />
        </button>
      </div>
    </>
  );
};

export default PersonalInfoBtns;
