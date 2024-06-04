import { useState } from "react";
import styles from "../components/SideNavbar.module.css";
import Image from "next/image";
import { useActiveItem } from "../src/contexts/ActiveItemContext";
import { useRouter } from "next/router";
import Logo from "./Logo";
import LogoutSvg from "./LogoutSvg";
import UpgradeSvg from "./UpgradeSvg";

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
    console.log("clicking button");
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
  //     console.log("clicking button");
  // };

  return (
    <>
      <div className={styles.masterContainer}>
        <Logo />
        <div className={styles.mainContainer}>
          <div
            className={
              activeItem === "Dashboard"
                ? `${styles.dashboardButton} ${styles.active}`
                : `${styles.dash}`
            }
            onClick={() => handleItemClick("Dashboard")}
          >
            Dashboard
            <Image src="/Feed.svg" width={listItemSize} height={listItemSize} />
          </div>

          <div className={styles.listContainer}>
            <div className={styles.list}></div>
          </div>
        </div>
        <div
          className={`${styles.newprofnameback} ${styles.focus} ${
            showupgrade ? styles.open : ""
          }`}
        >
          {/* {showupgrade &&

                        <div>
                            <button className={styles.btnset} onClick={openAddJobHandler}>
                                Setting <Image src="/Bolt.png" alt="Upgrade" width="24" height="24" />
                            </button>
                        </div>} */}
          {showupgrade && (
            <>
              <div>
                <button
                  className={`${styles.profileBtn} ${styles.btnup}`}
                  onClick={openAddJobHandler}
                >
                  Upgrade{" "}
                  {/* <Image src="/Bolt.png" alt="Upgrade" width="24" height="22" /> */}
                  <UpgradeSvg />
                </button>
              </div>
              <div>
                <button
                  className={`${styles.profileBtn} ${styles.btnlog}`}
                  onClick={logoutHandler}
                >
                  Logout{" "}
                  {/* <Image
                    src="/Vector.png"
                    alt="Upgrade"
                    width="18"
                    height="18"
                    style={{ color: "#FF0000" }}
                  /> */}
                  <LogoutSvg />
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
            {/* <div className={styles.textContent}>
              <span style={{ color: "#4A525D" }}>Hello</span>
              <h4>{name}</h4>
            </div> */}
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
    </>
  );
};

export default CandidateSideNavbar;
