import { useState, useEffect } from "react";
import styles from "../components/SideNavbar.module.css";
import Image from "next/image";
import { useActiveItem } from "../src/contexts/ActiveItemContext";
import { useRouter } from "next/router";
import Logo from "./Logo";
import LogoutSvg from "./LogoutSvg";

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

  // useEffect(() => {
  //   setIsLoading(true)
  //   try {
  //     const savedActiveItem = localStorage.getItem('activeItem');
  //     if (savedActiveItem) {
  //       setActiveItem(savedActiveItem);
  //     }
  //   } catch (err) {
  //     console.log('ERROR:',err);
  //   }finally {
  //     setIsLoading(false)
  //   }
  // }, [setActiveItem]);

  useEffect(() => {
    setIsLoading(true);

    const timer = setTimeout(() => {
      try {
        const savedActiveItem = localStorage.getItem("activeItem");
        if (savedActiveItem) {
          setActiveItem(savedActiveItem);
        }
      } catch (err) {
        console.log("ERROR:", err);
      } finally {
        setIsLoading(false); // Turn off the loader after 2 seconds or when the process is done, whichever is later
      }
    }, 2000);

    // Cleanup function to clear the timeout if the component unmounts within 2 seconds
    return () => clearTimeout(timer);
  }, [setActiveItem]);

  const [isDropDownJobsToggle, setIsDropDownJobsToggle] = useState(true);
  const [isDropDownCandidatesToggle, setIsDropDownJobsCandidatesToggle] =
    useState(true);

  const upgradeHandler = () => {
    // if (isDropDownJobsToggle) setIsDropDownJobsToggle(false);
    // if (isDropDownCandidatesToggle) setIsDropDownJobsCandidatesToggle(false);

    setshowupgrade(!showupgrade);
  };

  const openAddJobHandler = () => {
    setShowOverlay(true);
    console.log("clicking button");
  };

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
    setClickedItem(itemName);
    localStorage.setItem("activeItem", itemName);
    localStorage.setItem("currentPage", itemName);
    setTimeout(() => setClickedItem(""), 200);
  };

  const handleDropDownJobsToggle = () => {
    // if (setshowupgrade) setshowupgrade(false);

    setIsDropDownJobsToggle(!isDropDownJobsToggle);
  };

  const handleDropDownCandidatesToggle = () => {
    // if (setshowupgrade) setshowupgrade(false);

    setIsDropDownJobsCandidatesToggle(!isDropDownCandidatesToggle);
  };

  useEffect(() => {
    const savedActiveItem = localStorage.getItem("activeItem");
    if (savedActiveItem) {
      setActiveItem(savedActiveItem);
    }
  }, [setActiveItem]);

  // // Handle item click
  // const handleItemClick = (itemName) => {
  //   setActiveItem(itemName);
  //   localStorage.setItem("activeItem", itemName); // Save active item to localStorage
  //   // Perform actions based on the item clicked, such as opening overlays or other logic
  // };

  const logoutHandler = () => {
    localStorage.removeItem("client-token");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("clientId");
    localStorage.clear(); // Optionally clear all local storage
    router.push("/client-login"); // Adjust this to your login path
  };

  const listItemSize = 28;
  const logoSize = 30;

  return (
    <>
      <div className={styles.masterContainer}>
        <Logo />
        <div className={styles.mainContainer}>
          {/* Try */}
          <div className={styles.dashboardWrapper}>
            <div
              className={
                activeItem === "Dashboard"
                  ? `${styles.dashboardButton} ${styles.active}`
                  : `${styles.dash}`
              }
              onClick={() => handleItemClick("Dashboard")}
            >
              Dashboard
              <Image
                src="/Feed.svg"
                width={listItemSize}
                height={listItemSize}
              />
            </div>

            <div className={styles.listContainer}>
              <div className={styles.list}>
                <h4 onClick={handleDropDownJobsToggle}>
                  Jobs <Image src="/dropdown.svg" width={15} height={15} />
                </h4>
                {isDropDownJobsToggle && (
                  <ul>
                    <li
                      className={
                        activeItem === "AllJobs"
                          ? `${styles.dashboardButton} ${styles.active}`
                          : ""
                      }
                      onClick={() => handleItemClick("AllJobs")}
                    >
                      All{" "}
                      <Image
                        src="/Apps.svg"
                        width={listItemSize}
                        height={listItemSize}
                      />
                    </li>
                    <li
                      className={
                        activeItem === "Active"
                          ? `${styles.dashboardButton} ${styles.active}`
                          : ""
                      }
                      onClick={() => handleItemClick("Active")}
                    >
                      Active
                      <Image
                        src="/CheckAlt.svg"
                        width={listItemSize}
                        height={listItemSize}
                      />
                    </li>
                    <li
                      className={
                        activeItem === "Closed"
                          ? `${styles.dashboardButton} ${styles.active}`
                          : ""
                      }
                      onClick={() => handleItemClick("Closed")}
                    >
                      Closed
                      <Image
                        src="/crossAlt.svg"
                        width={listItemSize}
                        height={listItemSize}
                      />
                    </li>
                  </ul>
                )}
              </div>

              <h4 onClick={handleDropDownCandidatesToggle}>
                Candidates <Image src="/dropdown.svg" width={15} height={15} />
              </h4>
              {isDropDownCandidatesToggle && (
                <ul>
                  <li
                    className={
                      activeItem === "All"
                        ? `${styles.dashboardButton} ${styles.active}`
                        : ""
                    }
                    onClick={() => handleItemClick("All")}
                  >
                    All
                    <Image
                      src="/Apps.svg"
                      width={listItemSize}
                      height={listItemSize}
                    />
                  </li>
                  <li
                    className={
                      activeItem === "Recommended"
                        ? `${styles.dashboardButton} ${styles.active}`
                        : ""
                    }
                    onClick={() => handleItemClick("Recommended")}
                  >
                    Recommended
                    <Image
                      src="/Star.svg"
                      width={listItemSize}
                      height={listItemSize}
                    />
                  </li>
                  <li
                    className={
                      activeItem === "Qualified"
                        ? `${styles.dashboardButton} ${styles.active}`
                        : ""
                    }
                    onClick={() => handleItemClick("Qualified")}
                  >
                    Qualified
                    <Image
                      src="/Like.svg"
                      width={listItemSize}
                      height={listItemSize}
                    />
                  </li>
                  <li
                    className={
                      activeItem === "NotEligible"
                        ? `${styles.dashboardButton} ${styles.active}`
                        : ""
                    }
                    onClick={() => handleItemClick("NotEligible")}
                  >
                    Not Eligible
                    <Image
                      src="/Restrict.svg"
                      width={listItemSize}
                      height={listItemSize}
                    />
                  </li>
                </ul>
              )}
            </div>
          </div>
          {/* End */}
        </div>
        {/* old */}
        {/* <div className={`${styles.profnameback} ${styles.focus}`}>
          {showupgrade && (
            <div>
              <button className={styles.btnup} onClick={openAddJobHandler}>
                Upgrade{" "}
                <Image src="/Bolt.png" alt="Upgrade" width="24" height="22" />
              </button>
            </div>
          )}
          {showupgrade && (
            <div>
              <button className={styles.btnlog} onClick={logoutHandler}>
                Logout{" "}
                <Image
                  src="/Vector.png"
                  alt="Upgrade"
                  width="18"
                  height="18"
                  style={{ color: "#FF0000" }}
                />
              </button>
            </div>
          )}

          <div className={styles.profileTab} onClick={upgradeHandler}>
            <Image
              src="/Emoji.svg"
              height={50}
              width={50}
              className="profileImage"
            />
            <div className={styles.textContent}>
              <span style={{ color: "#4A525D" }}>Hello</span>
              <h4>{name}</h4>
            </div>
            <Image
              src="/rightArrow.svg"
              width={listItemSize}
              height={listItemSize}
              style={{ marginLeft: "-10px", marginRight: "-10px" }}
            />
          </div>

          
        </div> */}
        {/* try this */}

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
                  <Image src="/Bolt.png" alt="Upgrade" width="24" height="22" />
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
            <div className={styles.clientName}>
              <p style={{ color: "#4A525D" }}>Hello</p>
              <h4>{name}</h4>
            </div>{" "}
            <Image
              src="/rightArrow.svg"
              width={listItemSize}
              height={listItemSize}
              // style={{ marginLeft: "-10px", marginRight: "-10px" }}
              style={{ marginLeft: "auto" }}
            />{" "}
          </div>
        </div>
      </div>
    </>
  );
};

export default SideNavbar;
