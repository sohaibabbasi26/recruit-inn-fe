import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../components/SideNavbar.module.css";
import Image from "next/image";
import { useActiveItem } from "../src/contexts/ActiveItemContext";

const AdminSideNavbar = ({ name }) => {
  const router = useRouter();
  const [showUpgrade, setShowUpgrade] = useState(false);
  const { activeItem, setActiveItem } = useActiveItem();
  const [clickedItem, setClickedItem] = useState("");
  const [isDropDownClientsToggle, setIsDropDownClientsToggle] = useState(true);
  const [isDropDownCandidatesToggle, setIsDropDownCandidatesToggle] =
    useState(true);

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
    setClickedItem(itemName);
    localStorage.setItem("activeItem", itemName);
    setTimeout(() => setClickedItem(""), 200);
  };

  const handleDropDownClientsToggle = () => {
    setIsDropDownClientsToggle(!isDropDownClientsToggle);
  };

  const handleDropDownCandidatesToggle = () => {
    setIsDropDownCandidatesToggle(!isDropDownCandidatesToggle);
  };

  const logoutHandler = () => {
    localStorage.clear();
    router.push("/admin-login");
  };

  const listItemSize = 28;

  return (
    <div className={styles.masterContainer}>
      <div className={styles.sidenavTop}>
        <Image src="/logo.svg" alt="Logo" width={50} height={50} />
        <h2>recruitinn.ai</h2>
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
            <Image src="/Feed.svg" width={listItemSize} height={listItemSize} />
          </h2>

          <div className={styles.listContainer}>
            <div className={styles.list}>
              <h3
                className={` ${styles.dashboardHeading} ${styles.dropdownHeading} `}
                onClick={handleDropDownClientsToggle}
              >
                Clients
                <Image
                  src="/dropdown.svg"
                  alt="Dropdown"
                  width={20}
                  height={20}
                />
              </h3>
              {isDropDownClientsToggle && (
                <ul>
                  <li
                    className={`${styles.dropdownList} ${
                      activeItem === "AllClients" ? styles.active : ""
                    }`}
                    onClick={() => handleItemClick("AllClients")}
                  >
                    All Clients
                    <Image
                      src="/All.svg"
                      width={listItemSize}
                      height={listItemSize}
                    />
                  </li>

                  {/* <li
                    className={`${styles.dropdownList} ${
                      activeItem === "Request" ? styles.active : ""
                    }`}
                    onClick={() => handleItemClick("Request")}
                  >
                    Request
                    <Image
                      src="/Request.svg"
                      width={listItemSize}
                      height={listItemSize}
                    />
                  </li> */}

                  <li
                    className={`${styles.dropdownList} ${
                      activeItem === "Active" ? styles.active : ""
                    }`}
                    onClick={() => handleItemClick("Active")}
                  >
                    Active
                    <Image
                      src="/Active.svg"
                      width={listItemSize}
                      height={listItemSize}
                    />
                  </li>

                  <li
                    className={`${styles.dropdownList} ${
                      activeItem === "In-Active" ? styles.active : ""
                    }`}
                    onClick={() => handleItemClick("In-Active")}
                  >
                    In-Active
                    <Image
                      src="/In-Active.svg"
                      width={listItemSize}
                      height={listItemSize}
                    />
                  </li>
                </ul>
              )}
            </div>

            <div className={styles.list}>
              <h3
                className={` ${styles.dashboardHeading} ${styles.dropdownHeading} `}
                onClick={handleDropDownCandidatesToggle}
              >
                Candidates
                <Image
                  src="/dropdown.svg"
                  alt="Dropdown"
                  width={20}
                  height={20}
                />
              </h3>
              {isDropDownCandidatesToggle && (
                <ul>
                  <li
                    className={`${styles.dropdownList} ${
                      activeItem === "All" ? styles.active : ""
                    }`}
                    onClick={() => handleItemClick("All")}
                  >
                    All Candidates
                    <Image
                      src="/All.svg"
                      width={listItemSize}
                      height={listItemSize}
                    />
                  </li>
                  <li
                    className={`${styles.dropdownList} ${
                      activeItem === "Recommended" ? styles.active : ""
                    }`}
                    onClick={() => handleItemClick("Recommended")}
                  >
                    Recommended
                    <Image
                      src="/recommended.svg"
                      width={listItemSize}
                      height={listItemSize}
                    />
                  </li>
                  <li
                    className={`${styles.dropdownList} ${
                      activeItem === " Qualified" ? styles.active : ""
                    }`}
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
                    className={`${styles.dropdownList} ${
                      activeItem === "NotEligible" ? styles.active : ""
                    }`}
                    onClick={() => handleItemClick("NotEligible")}
                  >
                    NotEligible
                    <Image
                      src="/Close.svg"
                      width={listItemSize}
                      height={listItemSize}
                    />
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.profileTab}>
        <Image
          src="/dp.svg"
          height={38}
          width={38}
          className={styles.profileImage}
        />
        <div className={styles.textContent}>
          <span>Hello</span>
          <h4>Bruce Wayne</h4>
        </div>
        <Image
          src="/rightArrow.svg"
          width={listItemSize}
          height={listItemSize}
        />
      </div>
    </div>
  );
};

export default AdminSideNavbar;
