import { useState } from "react";
import Image from "next/image";
import styles from "./LandingNavbar.module.css";
import ThemeSwitch from "./ThemeSwitch";
import Logo from "../components/Logo";

const LandingNavbar = ({
  scrollToRef,
  howItWorksRef,
  LandingThirdRef,
  HeroRef,
}) => {
  const [menu, setMenu] = useState(false);

  return (
    <>
      {/* leptup sacreen */}
      <>
        <div className=" max-sm:hidden bg-white dark:bg-black">
          <div className="h-[10vh] w-full flex bg-white dark:bg-black justify-center max-lg:hidden z-50 fixed">
            <div className="w-90p h-full flex justify-between items-center text-black dark:text-white">
              <div className="flex w-50p gap-20 items-center">
                <h2
                  onClick={() => scrollToRef(HeroRef)}
                  className="max-lg:text-sm max-xl:text-xl  text-3xl font-bold font-poppins flex gap-3 cursor-pointer"
                >
                  <Image src="/logo (3).png" height={30} width={30} />
                  recruitinn.ai
                </h2>

                <ul className="flex text-steel dark:text-white gap-10 max-xl:gap-3 max-xl:w-[70%]">
                  <li
                    onClick={() => scrollToRef(howItWorksRef)}
                    className="text-md font-semibold max-xl:text-sm cursor-pointer "
                  >
                    How It Works
                  </li>
                  <li
                    onClick={() => scrollToRef(LandingThirdRef)}
                    className="text-md font-semibold max-xl:text-sm cursor-pointer "
                  >
                    About Us
                  </li>
                </ul>
              </div>
              <div className="w-60p items-center flex justify-end gap-4 max-xl:gap-2">
                <span className="text-steel dark:text-white text-md max-xl:text-sm font-semibold cursor-pointer">
                  <a href="https://app.recruitinn.ai/candidate-self">
                    {" "}
                    Apply As A Candidate
                  </a>
                </span>
                <div className="flex gap-8 max-xl:gap-2">
                  <div
                    className={`${styles.dropdown}  text-white px-10 py-3.5 text-mnmd max-xl:text-sm bg-darkPurple rounded-3xl fnt-semibold`}
                  >
                    Login
                    <ul className={styles.dropdown_menu}>
                      <li>
                        <a href="https://app.recruitinn.ai/candidate-login">
                          Login As Candidate
                        </a>
                      </li>
                      <li>
                        <a href="https://app.recruitinn.ai/client-login">
                          Login As Client
                        </a>
                      </li>
                    </ul>
                  </div>
                  <a href="https://app.recruitinn.ai/client-signup">
                    <button
                      className="px-10 py-3.5 text-steel dark:text-white text-md max-xl:text-sm btn-gradient rounded-3xl font-semibold"
                      style={{
                        transition: "background-color 0.3s, color 0.3s", // Add transition for smooth hover effect
                        backgroundColor: "#6137db", // Default background color hello
                        color: "#fff", // Default text color
                        border: "none", // Remove default button border
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = "#D3CFFC"; // Change background color on hover
                        e.target.style.color =
                          "rgb(0 1 0 / var(--tw-text-opacity))"; // Change text color on hover
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = ""; // Restore default background color
                        e.target.style.color = ""; // Restore default text color
                      }}
                    >
                      Recruit A Talent
                    </button>
                  </a>{" "}
                </div>
              </div>

              <ThemeSwitch />
            </div>
          </div>
        </div>
      </>
      {/* mobile de screen buthur */}
      <div className="h-[10vh] bg-white dark:bg-black">
        <div className="h-[10vh] bg-white dark:bg-black z-50 w-full flex max-lg:items-center max-lg:justify-center hidden max-lg:flex fixed ">
          <div className="w-100p h-[2rem] flex flex-col max-sm:justify-between max-sm:items-center  text-white ">
            <div className="flex w-[100%] justify-between items-center">
              <div className="flex items-center gap-3 max-lg:ml-[1.5rem] max-sm:ml-[1rem]">
                {/* <Image src="/logoo.svg" height={30} width={30} alt="logo" />
                <h2 className="text-2xl max-sm:text-xl font-bold font-poppins">
                  recruitinn.ai
                </h2> */}
                <Logo />
              </div>
              <div
                className="max-lg:flex hidden max-lg:mr-[1.5rem] max-sm:mr-[1rem] text-black dark:text-white"
                onClick={() => setMenu(!menu)}
              >
                <ThemeSwitch />

                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  ></path>
                </svg>
              </div>
            </div>

            <div
              className={`flex items-center gap-8 ${
                menu ? "flex" : "hidden"
              } max-lg:hidden`}
            >
              <span className="text-sm font-semibold">
                Apply As An Engineer
              </span>
              <div className="flex gap-8">
                <button className="px-10 py-3.5 text-sm bg-darkPurple font-semibold sm:rounded-3xl">
                  Login
                </button>
                <button className="px-10 py-3.5 text-sm btn-gradient font-semibold sm:rounded-3xl">
                  Recruit A Talent
                </button>
              </div>
            </div>

            {menu && (
              <div className="absolute top-[100%] text-black dark:text-white  z-50  flex flex-col justify-center items-center gap-4 max-lg:flex w-full  left-0 bg-white dark:bg-black py-4">
                {/* <span className="text-sm font-semibold max-lg:py-2 max-lg:border-b max-lg:border-darkPurple">
                Apply As An Engineer
                </span> */}
                <a href="https://app.recruitinn.ai/candidate-self">
                  <button className="px-10 py-3.5 max-lg:py-2 max-lg:border-b max-lg:border-darkPurple text-sm bg-transparent font-semibold max-lg:block hidden">
                    Apply As An Engineer
                  </button>
                </a>
                <a href="https://app.recruitinn.ai/client-signup">
                  <button className="px-10 py-3.5 max-lg:py-2 text-sm bg-transparent max-lg:border-b max-lg:border-darkPurple font-semibold max-lg:block hidden">
                    Recruit A Talent
                  </button>
                </a>
                <a href="https://app.recruitinn.ai/client-login">
                  <button className="px-10 py-3.5 max-lg:py-2 max-lg:border-b max-lg:border-darkPurple text-sm bg-transparent font-semibold max-lg:block hidden">
                    Login as client
                  </button>
                </a>
                <a href="https://app.recruitinn.ai/candidate-login">
                  <button className="px-10 py-3.5 max-lg:py-2 max-lg:border-b max-lg:border-darkPurple text-sm bg-transparent font-semibold max-lg:block hidden">
                    Login as candidate
                  </button>
                </a>

                <ul className="flex flex-col items-center gap-4">
                  <li
                    onClick={() => scrollToRef(howItWorksRef)}
                    className="text-sm font-semibold    p-2 max-lg:border-b max-lg:border-darkPurple"
                  >
                    How It Works
                  </li>
                  <li
                    onClick={() => scrollToRef(LandingThirdRef)}
                    className="text-sm font-semibold p-2 max-lg:border-b max-lg:border-darkPurple"
                  >
                    About Us
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingNavbar;
