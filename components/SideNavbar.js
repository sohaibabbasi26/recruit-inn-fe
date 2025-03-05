import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useActiveItem } from "../src/contexts/ActiveItemContext";
import { DM_Sans } from "next/font/google";
import styles from "../components/SideNavbar.module.css";
import Image from "next/image";
import Logo from "./Logo";
import LogoutSvg from "./LogoutSvg";
import UpgradeSvg from "./UpgradeSvg";
import FeedSvg from "./FeedSvg";
import DownArrowSvg from "./DownArrowSvg";
import AppsSvg from "./AppsSvg";
import StarSvg from "./StarSvg";
import LikeSvg from "./LikeSvg";
import RestrictSvg from "./RestrictSvg";
import CheckSvg from "./CheckSvg";
import CrossSvg from "./CrossSvg";

const dmSans = DM_Sans({ subsets: ["latin"], display: "swap" });

const SideNavbar = ({
  name,
  navbarIte,
  showOverlay1,
  setShowOverlay,
  isLoading,
  setIsLoading,
}) => {
  const router = useRouter();
  const [showupgrade, setshowupgrade] = useState(false);
  const { activeItem, setActiveItem } = useActiveItem();
  const [clickedItem, setClickedItem] = useState("");
  const [isDropDownJobsToggle, setIsDropDownJobsToggle] = useState(true);
  const [isDropDownCandidatesToggle, setIsDropDownJobsCandidatesToggle] =
    useState(true);

  useEffect(() => {
    setIsLoading(true);

    const timer = setTimeout(() => {
      try {
        const savedActiveItem = localStorage.getItem("activeItem");
        if (savedActiveItem) {
          setActiveItem(savedActiveItem);
        }
      } catch (err) {
        //("ERROR:", err);
      } finally {
        setIsLoading(false); // Turn off the loader after 2 seconds or when the process is done, whichever is later
      }
    }, 2000);

    // Cleanup function to clear the timeout if the component unmounts within 2 seconds
    return () => clearTimeout(timer);
  }, [setActiveItem]);

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
    localStorage.setItem("activeItem", itemName);
    localStorage.setItem("currentPage", itemName);
    setTimeout(() => setClickedItem(""), 200);
  };

  const handleDropDownJobsToggle = () => {
    setIsDropDownJobsToggle(!isDropDownJobsToggle);
  };

  const handleDropDownCandidatesToggle = () => {
    setIsDropDownJobsCandidatesToggle(!isDropDownCandidatesToggle);
  };

  useEffect(() => {
    const savedActiveItem = localStorage.getItem("activeItem");
    if (savedActiveItem) {
      setActiveItem(savedActiveItem);
    }
  }, [setActiveItem]);

  const logoutHandler = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_REMOTE_URL}/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      const data = await response.json();
      if (!response.ok) {
        alert(data.message || "Logout failed");
        return;
      }

      // If API call is successful, proceed with existing logout logic
      document.cookie =
        "loginToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      localStorage.removeItem("client-token");
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("clientId");
      localStorage.clear();
      router.push("/client-login");
    } catch (err) {
      alert("Logout failed. Please try again.");
    }
  };

  const listItemSize = 28;
  const logoSize = 30;

  return (
    <>
      <div className={`${dmSans.className}  ${styles.masterContainer}`}>
        <div className={styles.sidenavTop}>
          <Logo />
        </div>
        <div className={styles.mainContainer}>
          {/* Try */}
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
              <div className={styles.list}>
                <h3
                  onClick={handleDropDownJobsToggle}
                  className={`${styles.dashboardHeading} ${styles.dropdownHeading} `}
                >
                  Jobs
                  <DownArrowSvg />
                  {/* <Image src="/dropdown.svg" width={15} height={15}  */}
                </h3>
                {isDropDownJobsToggle && (
                  <ul>
                    <li
                      className={`${styles.dropdownList} ${
                        activeItem === "AllJobs" ? styles.active : ""
                      }`}
                      onClick={() => handleItemClick("AllJobs")}
                    >
                      All <AppsSvg />
                    </li>
                    <li
                      className={`${styles.dropdownList} ${
                        activeItem === "Active" ? styles.active : ""
                      }`}
                      onClick={() => handleItemClick("Active")}
                    >
                      Active
                      <CheckSvg />
                    </li>
                    <li
                      className={`${styles.dropdownList} ${
                        activeItem === "Closed" ? styles.active : ""
                      }`}
                      onClick={() => handleItemClick("Closed")}
                    >
                      Closed
                      <CrossSvg />
                    </li>
                  </ul>
                )}
              </div>

              <h3
                onClick={handleDropDownCandidatesToggle}
                className={` ${styles.dashboardHeading} ${styles.dropdownHeading} `}
              >
                Candidates
                <DownArrowSvg />
              </h3>
              {isDropDownCandidatesToggle && (
                <ul>
                  <li
                    className={`${styles.dropdownList} ${
                      activeItem === "All" ? styles.active : ""
                    }`}
                    onClick={() => handleItemClick("All")}
                  >
                    All
                    <AppsSvg />
                  </li>
                  <li
                    className={`${styles.dropdownList} ${
                      activeItem === "Recommended" ? styles.active : ""
                    }`}
                    onClick={() => handleItemClick("Recommended")}
                  >
                    Recommended
                    <StarSvg />
                  </li>
                  <li
                    className={`${styles.dropdownList} ${
                      activeItem === "Qualified" ? styles.active : ""
                    }`}
                    onClick={() => handleItemClick("Qualified")}
                  >
                    Qualified
                    <LikeSvg />
                  </li>
                  <li
                    className={`${styles.dropdownList} ${
                      activeItem === "NotEligible" ? styles.active : ""
                    }`}
                    onClick={() => handleItemClick("NotEligible")}
                  >
                    Not Eligible
                    <RestrictSvg />
                  </li>
                </ul>
              )}
            </div>
          </div>
          {/* End */}
        </div>

        <div
          className={`${styles.newprofnameback} ${
            showupgrade ? styles.open : ""
          } ${styles.focus}`}
        >
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
            />{" "}
          </div>
        </div>
      </div>
    </>
  );
};

export default SideNavbar;
