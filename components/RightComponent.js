import styles from "./RightComponent.module.css";
import Image from "next/image";
import Socials from "./Socials";
import dynamic from "next/dynamic";
const Graph = dynamic(() => import("../components/Graph"), { ssr: false });
const RightComponent = ({ preprocessedCandidates, setShowOverlay }) => {
  const iconSize = 13;
  const bellIconSize = 30;
  const openAddJobHandler = () => {
    setShowOverlay(true);
  };

  return (
    <>
      <div className={styles.superContainer}>
        <div className={styles.masterContainer}>
          <div className={styles.btnsDiv}>
            <button className={styles.addJobBtn} onClick={openAddJobHandler}>
              <Image src="/Add.svg" width={iconSize} height={iconSize} /> create
              a job
            </button>
            <button className={styles.notificationsBtn}>
              <Image
                src="/BellIcon.svg"
                width={bellIconSize}
                height={bellIconSize}
              />
            </button>
          </div>
          <Graph preprocessedCandidates={preprocessedCandidates} />
          <Socials />
        </div>
      </div>
    </>
  );
};
export default RightComponent;
