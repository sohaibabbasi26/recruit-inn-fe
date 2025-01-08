import styles from "./RightComponent.module.css";
import Image from "next/image";
import Socials from "./Socials";
import dynamic from "next/dynamic";
import { Grenze } from "next/font/google";

const Graph = dynamic(() => import("../components/Graph"), { ssr: false });
const RightComponent = ({
  activeItem,
  preprocessedCandidates,
  setShowOverlay,
  interviewCount,
}) => {
  const iconSize = 13;
  // const bellIconSize = 30;
  const openAddJobHandler = () => {
    setShowOverlay(true);
  };
  const onDashboard = activeItem === "Dashboard" ? "dashboard" : "";

  function getInterviewCountColor(interviewCount) {
    if (interviewCount <= 5) {
      return "red";
    } else if (interviewCount >= 6 && interviewCount < 15) {
      return "#FAD02C";
    } else {
      return "green";
    }
  }

  return (
    <>
      <div className={` ${styles.superContainer}`}>
        <div className={`${styles.masterContainer} ${styles[onDashboard]}`}>
          <div className={styles.btnsDiv}>
            <button className={styles.addJobBtn} onClick={openAddJobHandler}>
              <Image src="/Add.svg" width={iconSize} height={iconSize} /> Create
              a Job
            </button>
            {/* <button className={styles.notificationsBtn}>
              <Image
                src="/BellIcon.svg"
                width={bellIconSize}
                height={bellIconSize}
              />
            </button> */}
          </div>
          <div>
            <div className={styles.countContainer}>
              Interviews Remaining:{" "}
              <span style={{ color: getInterviewCountColor(interviewCount) }}>
                {interviewCount}
              </span>
            </div>
          </div>
          <Graph preprocessedCandidates={preprocessedCandidates} />
          <Socials />
        </div>
      </div>
    </>
  );
};
export default RightComponent;
