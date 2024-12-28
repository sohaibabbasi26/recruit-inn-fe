import Image from "next/image";
import { useState } from "react";
// import './landingGlobal.css';
// import './styles.css';
import style from "./styles.module.css";
import ChevronDown from "../components/ChevronDown";
import { useTheme } from "next-themes";

const LandingFAQs = () => {
  const [dropDownState, setDropDownState] = useState(false);
  const [secondDropDownState, setSecondDropDownState] = useState(false);
  const [thirdDropDownState, setThirdDropDownState] = useState(false);
  const [fourthDropDownState, setFourthDropDownState] = useState(false);
  const [fifthDropDownState, setFifthDropDownState] = useState(false);
  const [sixthDropDownState, setSixthDropDownState] = useState(false);
  const [seventhDropDownState, setSevethDropDownState] = useState(false);
  const { theme } = useTheme();

  const toggleDropDown = () => {
    setDropDownState(!dropDownState);
  };

  const toggleSecondDropDown = () => {
    setSecondDropDownState(!secondDropDownState);
  };

  const toggleThirdDropDown = () => {
    setThirdDropDownState(!thirdDropDownState);
  };

  const toggleFourthDropDown = () => {
    setFourthDropDownState(!fourthDropDownState);
  };

  const toggleFifthDropDown = () => {
    setFifthDropDownState(!fifthDropDownState);
  };

  const toggleSixthDropDown = () => {
    setSixthDropDownState(!sixthDropDownState);
  };

  return (
    <>
      <div className="h-auto w-[100%]  max-md:items-center flex justify-center text-white items-center flex-col">
        <div className="h-100p w-100p mb-[2rem] flex justify-center text-black dark:text-white items-center flex-col ">
          <div className="h-[20%] w-[90%] flex flex-col items-center justify-center">
            <h1 className="text-center text-5xl font-bold text-gray-900">
              FAQs
            </h1>
            <p className="text-center text-md text-gray-500 mt-2">
              Answers to the most frequently asked questions.
            </p>
          </div>
          <div className="w-[50%] h-[70%] mt-[1rem] max-md:w-[90%]">
            <ul className="w-[100%] ">
              <li
                onClick={toggleDropDown}
                className={`cursor-pointer py-4 w-full flex flex-col border-b-2 
                  ${
                    !dropDownState ? "border-gray-200" : "relative border-white"
                  }`}
              >
                <div className="w-full flex justify-between items-center gap-2">
                  <span className="text-lg tracking-wide font-semibold font-sans">
                    What is recruitinn?
                  </span>
                  <ChevronDown
                    classes={`w-7 h-7 transition-transform duration-300 ${
                      dropDownState && "rotate-180"
                    } ${theme == "light" ? "opacity-80" : ""}`}
                  />
                </div>

                {/* Dropdown content */}
                {dropDownState && (
                  <p className="text-sm text-smallText mt-3">
                    Recruitinn is an advanced recruitment platform that connects
                    businesses with top engineers and developers. Our advanced
                    AI-driven technology streamlines the hiring process by
                    offering comprehensive assessment tests and personalized
                    matching, ensuring that you find the perfect candidates for
                    your specific needs.
                  </p>
                )}

                {/* Add a fading effect when the dropdown is closed */}
                {dropDownState && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-lightPurpleText to-transparent" />
                )}
              </li>

              <li
                onClick={toggleSecondDropDown}
                className={`cursor-pointer py-4 w-full flex flex-col border-b-2 
                  ${
                    !secondDropDownState
                      ? "border-gray-200"
                      : "relative border-white"
                  }`}
              >
                <div className="w-full flex justify-between items-center gap-2">
                  <span className="text-lg tracking-wide font-semibold font-sans">
                    What is recruitinn?
                  </span>
                  <ChevronDown
                    classes={`w-7 h-7 transition-transform duration-300 ${
                      secondDropDownState && "rotate-180"
                    } ${theme == "light" ? "opacity-80" : ""}`}
                  />
                </div>

                {/* Dropdown content */}
                {secondDropDownState && (
                  <p className="text-sm text-smallText mt-3">
                    Recruitinn is an advanced recruitment platform that connects
                    businesses with top engineers and developers. Our advanced
                    AI-driven technology streamlines the hiring process by
                    offering comprehensive assessment tests and personalized
                    matching, ensuring that you find the perfect candidates for
                    your specific needs.
                  </p>
                )}

                {/* Add a fading effect when the dropdown is closed */}
                {secondDropDownState && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-lightPurpleText to-transparent" />
                )}
              </li>
              <li
                onClick={toggleThirdDropDown}
                className={`cursor-pointer py-4 w-full flex flex-col border-b-2 
                  ${
                    !dropDownState ? "border-gray-200" : "relative border-white"
                  }`}
              >
                <div className="w-full flex justify-between items-center gap-2">
                  <span className="text-lg tracking-wide font-semibold font-sans">
                    What is recruitinn?
                  </span>
                  <ChevronDown
                    classes={`w-7 h-7 transition-transform duration-300 ${
                      thirdDropDownState && "rotate-180"
                    } ${theme == "light" ? "opacity-80" : ""}`}
                  />
                </div>

                {/* Dropdown content */}
                {thirdDropDownState && (
                  <p className="text-sm text-smallText mt-3">
                    Recruitinn is an advanced recruitment platform that connects
                    businesses with top engineers and developers. Our advanced
                    AI-driven technology streamlines the hiring process by
                    offering comprehensive assessment tests and personalized
                    matching, ensuring that you find the perfect candidates for
                    your specific needs.
                  </p>
                )}

                {/* Add a fading effect when the dropdown is closed */}
                {thirdDropDownState && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-lightPurpleText to-transparent" />
                )}
              </li>
              <li
                onClick={toggleFourthDropDown}
                className={`cursor-pointer py-4 w-full flex flex-col border-b-2 
                  ${
                    !fourthDropDownState
                      ? "border-gray-200"
                      : "relative border-white"
                  }`}
              >
                <div className="w-full flex justify-between items-center gap-2">
                  <span className="text-lg tracking-wide font-semibold font-sans">
                    What is recruitinn?
                  </span>
                  <ChevronDown
                    classes={`w-7 h-7 transition-transform duration-300 ${
                      fourthDropDownState && "rotate-180"
                    } ${theme == "light" ? "opacity-80" : ""}`}
                  />
                </div>

                {/* Dropdown content */}
                {fourthDropDownState && (
                  <p className="text-sm text-smallText mt-3">
                    Recruitinn is an advanced recruitment platform that connects
                    businesses with top engineers and developers. Our advanced
                    AI-driven technology streamlines the hiring process by
                    offering comprehensive assessment tests and personalized
                    matching, ensuring that you find the perfect candidates for
                    your specific needs.
                  </p>
                )}

                {/* Add a fading effect when the dropdown is closed */}
                {fourthDropDownState && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-lightPurpleText to-transparent" />
                )}
              </li>
              <li
                onClick={toggleFifthDropDown}
                className={`cursor-pointer py-4 w-full flex flex-col border-b-2 
                  ${
                    !fifthDropDownState
                      ? "border-gray-200"
                      : "relative border-white"
                  }`}
              >
                <div className="w-full flex justify-between items-center gap-2">
                  <span className="text-lg tracking-wide font-semibold font-sans">
                    What is recruitinn?
                  </span>
                  <ChevronDown
                    classes={`w-7 h-7 transition-transform duration-300 ${
                      fifthDropDownState && "rotate-180"
                    } ${theme == "light" ? "opacity-80" : ""}`}
                  />
                </div>

                {/* Dropdown content */}
                {fifthDropDownState && (
                  <p className="text-sm text-smallText mt-3">
                    Recruitinn is an advanced recruitment platform that connects
                    businesses with top engineers and developers. Our advanced
                    AI-driven technology streamlines the hiring process by
                    offering comprehensive assessment tests and personalized
                    matching, ensuring that you find the perfect candidates for
                    your specific needs.
                  </p>
                )}

                {/* Add a fading effect when the dropdown is closed */}
                {fifthDropDownState && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-lightPurpleText to-transparent" />
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingFAQs;
