import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import Logo from "../components/Logo";
import styles from "./LandingNavbar.module.css";
import { PopupModal, useCalendlyEventListener } from "react-calendly";
import i18n from "@/i18n/config";
const LandingNavbar = ({
  scrollToRef,
  featuresRef,
  pricingRef,
  testimonialsRef,
  LandingThirdRef,
  HeroRef,
  t,
}) => {
  const [menu, setMenu] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef(null);

  const getEventDetails = async (eventUri) => {
    try {
      const response = await fetch(eventUri, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_CALENDLY_TOKEN}`, // Replace with your actual API key
        },
      });
      const data = await response.json();
      console.log("Event Details:", data);
      // Access the date and time from the response, e.g., data.start_time
    } catch (error) {
      console.error("Error fetching event details:", error);
    }
  };

  useCalendlyEventListener({
    onEventScheduled: (e) => {
      console.log("Fetching event details from:", e.data.payload.event.uri);
      getEventDetails(e.data.payload.event.uri);
    },
  });

  return (
    <>
      {/* leptup sacreen */}
      <>
        <div
          className=" max-sm:hidden bg-white dark:bg-black"
          id="scheduleCallBtn"
        >
          <div className="h-[10vh] w-full flex bg-white dark:bg-black justify-center max-lg:hidden z-50 fixed">
            <div className="w-90p h-full flex justify-between items-center text-black dark:text-white">
              <div className="flex w-50p gap-20 items-center">
                <h2
                  onClick={() => scrollToRef(HeroRef)}
                  className="max-lg:text-sm  items-center justify-center max-xl:text-xl  text-3xl font-bold font-poppins flex gap-3 cursor-pointer"
                >
                  <Image src="/logo (3).png" height={30} width={30} />
                  Recruitinn.ai
                </h2>

                <ul className="flex text-steel mt-1 dark:text-white gap-10 max-xl:gap-3 max-xl:w-[70%]">
                  <li
                    onClick={() => scrollToRef(featuresRef)}
                    className="text-md font-semibold max-xl:text-sm cursor-pointer "
                  >
                    {t("Navbar.N_process")}
                  </li>
                  <li
                    onClick={() => scrollToRef(pricingRef)}
                    className="text-md font-semibold max-xl:text-sm cursor-pointer "
                  >
                    {t("Navbar.N_pricing")}
                  </li>
                  <li
                    onClick={() => scrollToRef(testimonialsRef)}
                    className="text-md font-semibold max-xl:text-sm cursor-pointer "
                  >
                    {t("Navbar.N_testimonials")}
                  </li>
                </ul>
              </div>
              <div className="w-60p items-center flex justify-end gap-6 max-xl:gap-2">
                {/* <span className="px-12 py-3.5 bg-[#F0F3FF] text-[#170D23]  dark:text-white text-md max-xl:text-sm btn-gradient cursor-pointer rounded-3xl font-semibold hover:transition hover:duration-300 hover:delay-300 hover:ease-in-out hover:text-white hover:bg-[#6137DB] hover:scale-105">
                  <a href={`${process.env.NEXT_PUBLIC_URL}/candidate-self`}>
                    {" "}
                    Apply for jobs
                  </a> 
                </span> */}
                <span
                  ref={buttonRef}
                  onClick={() => setIsOpen(true)}
                  className="px-14 py-3.5 bg-[#F0F3FF] text-[#170D23]  dark:text-white text-md max-xl:text-sm btn-gradient cursor-pointer rounded-3xl font-semibold hover:transition hover:duration-300 hover:delay-300 hover:ease-in-out hover:text-white hover:bg-[#6137DB] hover:scale-105"
                >
                  {t("Navbar.N_btn_demo")}
                </span>
                <div className="flex gap-2 max-xl:gap-2">
                  <a
                    href={`${process.env.NEXT_PUBLIC_URL}/client-signup`}
                    className="px-10 py-3.5 bg-gradient-to-r from-[#220772] to-[#6137DB] text-white  dark:text-white text-md max-xl:text-sm btn-gradient rounded-3xl font-semibold hover:transition hover:delay-500 duration-300 hover:ease-in-out  hover:bg-gradient-to-r hover:from-[#D8DEFF] hover:to-[#6137DB] hover:scale-105"
                  >
                    {t("Navbar.N_btn_recruit")}
                  </a>
                  {/* <a href="https://app.recruitinn.ai/client-signup">
                    <button
                      className="px-10 py-3.5 text-steel dark:text-white text-md max-xl:text-sm btn-gradient rounded-3xl font-semibold"
                      style={{
                        transition: "background-color 0.3s, color 0.3s", // Add transition for smooth hover effect
                        backgroundColor: "#6137db",
                        color: "#fff",
                        border: "none",
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
                  </a> */}
                  {/* <div
                    className={`${styles.dropdown}  text-[white] px-10 py-3.5 text-mnmd max-xl:text-sm bg-darkPurple rounded-3xl fnt-semibold`}
                  >
                    Login
                    <ul className={styles.dropdown_menu}>
                      <li>
                        <a href="https://app.recruitinn.ai/candidate-login">
                          Candidate
                        </a>
                      </li>
                      <li>
                        <a href="https://app.recruitinn.ai/client-login">
                          Client
                        </a>
                      </li>
                    </ul>
                  </div> */}
                  <div
                    className={`${styles.dropdown}  text-[#170D23] font-bold  flex px-10  text-mnmd max-xl:text-sm bg-transparent rounded-3xl fnt-semibold`}
                  >
                    <span className="mt-3"> {t("Navbar.N_btn_login")}</span>
                    <Image src="/Arrow.svg" height={30} width={30} />

                    <ul className={styles.dropdown_menu}>
                      <li>
                        <a href={`${process.env.NEXT_PUBLIC_URL}/client-login`}>
                          {t("Navbar.N_company")}
                        </a>
                      </li>
                      {/* <li>
                        <a
                          href={`${process.env.NEXT_PUBLIC_URL}/candidate-login`}
                        >
                          {t("Navbar.N_candidates")}
                        </a>
                      </li> */}
                    </ul>
                  </div>
                  <div
                    className={`${styles.dropdown} flex items-center bg-[#F5F5FC] rounded-lg px-4 py-2 relative`}
                  >
                    {/* Display selected language */}
                    <div className="flex items-center gap-2 pr-2 justify-center cursor-pointer">
                      <Image src="/language.svg" height={20} width={20} />
                    </div>
                    <span className="text-[#170D23] font-semibold text-base">
                      {i18n.language === "en" ? "English" : "عربى"}
                    </span>

                    {/* Dropdown Menu */}
                    <ul
                      className={`${styles.dropdown_menu} absolute top-full left-0 mt-2 bg-white shadow-lg rounded-lg w-full`}
                    >
                      <li className="px-4 py-2 hover:bg-[#F5F5FC] rounded-lg cursor-pointer"  onClick={() => changeLanguage("en")}>
                        <a
                         
                          className="text-[#170D23] font-semibold text-base"
                        >
                          English
                        </a>
                      </li>
                      <li className="px-4 py-2 hover:bg-[#F5F5FC] rounded-lg cursor-pointer"
                          onClick={() => changeLanguage("ar")}
                      
                      >
                        <a
                          className="text-[#170D23] font-semibold text-base"
                        >
                     {i18n.language === "en" ? "Arabic" : "عربى"}
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* <ThemeSwitch /> */}
            </div>
          </div>
        </div>
      </>
      {/* mobile de screen buthur */}
      <div className="h-[10vh] bg-white dark:bg-black">
        <div className="h-[10vh] bg-white dark:bg-black z-50 w-full  max-lg:items-center max-lg:justify-center hidden max-lg:flex fixed ">
          <div className="w-100p h-[2rem] flex flex-col max-sm:justify-between max-sm:items-center  text-white ">
            <div className="flex w-[100%] justify-between items-center">
              <div className="flex items-center gap-3 max-lg:ml-[1.5rem] max-sm:ml-[1rem]">
                {/* <Image src="/logoo.svg" height={30} width={30} alt="logo" />
                <h2 className="text-2xl max-sm:text-xl font-bold font-poppins">
                  recruitinn.ai
                </h2> */}
                <Logo />
              </div>
              {/* <ThemeSwitch /> */}
              <div
                className="max-lg:flex hidden max-lg:mr-[1.5rem] max-sm:mr-[1rem] text-black dark:text-white"
                onClick={() => setMenu(!menu)}
              >
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
                <a href={`${process.env.NEXT_PUBLIC_URL}/candidate-self`}>
                  <button className="px-10 py-3.5 max-lg:py-2 max-lg:border-b max-lg:border-darkPurple text-sm bg-transparent font-semibold max-lg:block hidden">
                    Apply As An Engineer
                  </button>
                </a>
                <a href={`${process.env.NEXT_PUBLIC_URL}/client-signup`}>
                  <button className="px-10 py-3.5 max-lg:py-2 text-sm bg-transparent max-lg:border-b max-lg:border-darkPurple font-semibold max-lg:block hidden">
                    {t("Navbar.N_btn_recruit")}
                  </button>
                </a>
                <a href={`${process.env.NEXT_PUBLIC_URL}/client-login`}>
                  <button className="px-10 py-3.5 max-lg:py-2 max-lg:border-b max-lg:border-darkPurple text-sm bg-transparent font-semibold max-lg:block hidden">
                    {t("Navbar.N_btn_loginasClient")}
                  </button>
                </a>
                <a href={`${process.env.NEXT_PUBLIC_URL}/candidate-login`}>
                  <button className="px-10 py-3.5 max-lg:py-2 max-lg:border-b max-lg:border-darkPurple text-sm bg-transparent font-semibold max-lg:block hidden">
                    {t("Navbar.N_btn_loginasCandidate")}
                  </button>
                </a>

                <ul className="flex flex-col items-center gap-4">
                  <li
                    onClick={() => scrollToRef(featuresRef)}
                    className="text-sm font-semibold    cursor-pointer p-2 max-lg:border-b max-lg:border-darkPurple"
                  >
                    {t("Navbar.N_process")}
                  </li>
                  <li
                    onClick={() => scrollToRef(pricingRef)}
                    className="text-sm font-semibold cursor-pointer p-2 max-lg:border-b max-lg:border-darkPurple"
                  >
                    {t("Navbar.N_pricing")}
                  </li>
                  <li
                    onClick={() => scrollToRef(testimonialsRef)}
                    className="text-sm font-semibold cursor-pointer p-2 max-lg:border-b max-lg:border-darkPurple"
                  >
                    {t("Navbar.N_testimonials")}
                  </li>
                  <li
                  
                                              onClick={() => i18n.language == "en" ?  changeLanguage("ar") : changeLanguage("en")}

                    className="text-sm font-semibold cursor-pointer p-2 max-lg:border-b max-lg:border-darkPurple"
                  >
                   {i18n.language === "en" ?   "عربى" : "English"}
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      <PopupModal
        url="https://calendly.com/taha-recruitinn/30min"
        rootElement={document.body}
        text="Schedule Call"
        textColor="#fff"
        color="#000"
        height="200px"
        overflow="hidden"
        onModalClose={() => setIsOpen(false)}
        open={isOpen}
      />
    </>
  );
};

export const changeLanguage = (language) => {
  i18n.changeLanguage(language);
  localStorage.setItem("language", language);
};

export default LandingNavbar;
