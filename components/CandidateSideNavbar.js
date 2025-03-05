import { useState } from "react";
import styles from "../components/SideNavbar.module.css";
import Image from "next/image";
import { useActiveItem } from "../src/contexts/ActiveItemContext";
import { useRouter } from "next/router";
import Logo from "./Logo";
import LogoutSvg from "./LogoutSvg";
import UpgradeSvg from "./UpgradeSvg";
import { DM_Sans } from "next/font/google";
import FeedSvg from "./FeedSvg";

const dmSans = DM_Sans({ subsets: ["latin"], display: "swap" });

const CandidateSideNavbar = ({
  name,
  navbarIte,
  showOverlay1,
  setShowOverlay,
}) => {
  const router = useRouter();
  const [showupgrade, setshowupgrade] = useState(false);
  const { activeItem, setActiveItem } = useActiveItem();
  const [clickedItem, setClickedItem] = useState("");

  const [isDropDownJobsToggle, setIsDropDownJobsToggle] = useState(false);
  const [isDropDownCandidatesToggle, setIsDropDownJobsCandidatesToggle] =
    useState(false);

  const upgradeHandler = () => {
    setshowupgrade(!showupgrade);
  };

  const openAddJobHandler = () => {
    setShowOverlay(true);
    //("clicking button");
  };

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
    setClickedItem(itemName);
    setTimeout(() => setClickedItem(""), 200);
  };

  const handleDropDownJobsToggle = () => {
    setIsDropDownJobsToggle(!isDropDownJobsToggle);
  };

  const handleDropDownCandidatesToggle = () => {
    setIsDropDownJobsCandidatesToggle(!isDropDownCandidatesToggle);
  };

  const logoutHandler = () => {
    localStorage.removeItem("client-token");
    localStorage.removeItem("isLoggedInCandidate");
    localStorage.removeItem("clientId");

    router.push("/candidate-login");
  };

  const listItemSize = 28;
  const logoSize = 30;

  // const openAddJobHandler = () => {
  //     setShowOverlay(true);
  //     //("clicking button");
  // };

  return (
    <div className={`${dmSans.className}  ${styles.masterContainer}`}>
      <div className={styles.sidenavTop}>
        <Logo />
      </div>
      <div className={styles.mainContainer}>
        <div className={styles.dashboardWrapper}>
          <h2
            className={`${styles.dashboardHeading} ${
              activeItem === "Dashboard" ? styles.active : ""
            } `}
            onClick={() => handleItemClick("Dashboard")}
          >
            Dashboard
            <FeedSvg />
          </h2>

          <div className={styles.listContainer}>
            <div className={styles.list}></div>
          </div>
        </div>
      </div>
      <div
        className={`${styles.newprofnameback} ${styles.focus} ${
          showupgrade ? styles.open : ""
        }`}
      >
        {showupgrade && (
          <>
            <div>
              <button
                className={`${styles.profileBtn} ${styles.btnup}`}
                onClick={openAddJobHandler}
              >
                Upgrade <UpgradeSvg />
              </button>
            </div>
            <div>
              <button
                className={`${styles.profileBtn} ${styles.btnlog}`}
                onClick={logoutHandler}
              >
                Logout <LogoutSvg />
              </button>
            </div>

            <hr />
          </>
        )}

        <div className={styles.clientInfo} onClick={upgradeHandler}>
          <Image
            src="/Emoji.svg"
            height={50}
            width={50}
            className="profileImage"
          />
          <div className={styles.clientName}>
            <p style={{ color: "#4A525D" }}>Hello</p>
            <h4>{name}</h4>
          </div>{" "}
          <Image
            src="/rightArrow.svg"
            width={listItemSize}
            height={listItemSize}
            style={{ marginLeft: "auto" }}
          />
        </div>
      </div>
    </div>
  );
};

export default CandidateSideNavbar;
