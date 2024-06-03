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
            <h2 className="text-4xl font-sans font-semibold">FAQs</h2>
            <p className="text-sm mt-3 text-smallText">
              Answers to the most frequently asked questions.
            </p>
          </div>
          <div className="w-[50%] h-[70%] mt-[1rem] max-md:w-[90%]">
            <ul className="w-[100%] ">
              <li
                onClick={toggleDropDown}
                className="cursor-pointer py-4  w-[100%] flex flex-col border-b-[1px] border-darkPurple"
              >
                <div className=" w-[100%] flex justify-between items-center gap-2">
                  <span className="text-lg tracking-wide font-semibold font-sans">
                    What is recruitinn?
                  </span>
                  {/* <Image
                    onClick={toggleDropDown}
                    src="/dropdown-white.svg"
                    width={15}
                    height={15}
                  /> */}
                  <ChevronDown
                    classes={`w-7 h-7 transition-transform duration-300 ${
                      dropDownState && "rotate-180"
                    } ${theme == "light" ? "opacity-80" : ""}`}
                  />
                </div>
                {dropDownState && (
                  <p className="text-sm  text-smallText mt-3">
                    Recruitinn is a advance recruitment platform that connects
                    businesses with top engineers and developers. Our advanced
                    AI-driven technology streamlines the hiring process by
                    offering comprehensive assessment tests and personalized
                    matching, ensuring that you find the perfect candidates for
                    your specific needs.
                  </p>
                )}
              </li>
              <li
                onClick={toggleSecondDropDown}
                className="cursor-pointer py-4 w-[100%] flex flex-col border-b-[1px] border-darkPurple"
              >
                <div className=" w-[100%] flex justify-between">
                  <span className="text-lg tracking-wide font-semibold font-sans">
                    How does the Free trial work?
                  </span>
                  {/* <Image
                    onClick={toggleSecondDropDown}
                    src="/dropdown-white.svg"
                    width={15}
                    height={15}
                  /> */}
                  <ChevronDown
                    classes={`w-7 h-7 transition-transform duration-300 ${
                      secondDropDownState && "rotate-180"
                    } ${theme == "light" ? "opacity-80" : ""}`}
                  />
                </div>
                {secondDropDownState && (
                  <p className="text-sm  text-smallText mt-3">
                    Our free trial allows you to experience Recruitinn's
                    features and services without any commitment. Sign up,
                    define your requirements, and start connecting with top
                    talent. You'll have access to a limited number of candidate
                    matches and assessment tools to evaluate our platform's
                    effectiveness.
                  </p>
                )}
              </li>
              <li
                onClick={toggleThirdDropDown}
                className="cursor-pointer py-4 w-[100%] flex flex-col border-b-[1px] border-darkPurple"
              >
                <div className=" w-[100%] flex justify-between">
                  <span className="text-lg tracking-wide font-semibold font-sans">
                    How does billing work?
                  </span>
                  {/* <Image src="/dropdown-white.svg" width={15} height={15} /> */}
                  <ChevronDown
                    classes={`w-7 h-7 transition-transform duration-300 ${
                      thirdDropDownState && "rotate-180"
                    } ${theme == "light" ? "opacity-80" : ""}`}
                  />
                </div>
                {thirdDropDownState && (
                  <p className="text-sm  text-smallText mt-3">
                    Billing is straightforward and transparent. After selecting
                    a pricing plan that fits your needs, you'll be billed on a
                    monthly or annual basis, depending on your preference. Our
                    flexible payment options ensure that you only pay for the
                    services you use, with no hidden fees or unexpected charges.
                  </p>
                )}
              </li>
              <li
                onClick={toggleFourthDropDown}
                className="cursor-pointer py-4 w-[100%] flex flex-col border-b-[1px] border-darkPurple"
              >
                <div className=" w-[100%] flex justify-between">
                  <span className="text-lg tracking-wide font-semibold font-sans">
                    How are you different?
                  </span>
                  {/* <Image
                    onClick={toggleFourthDropDown}
                    src="/dropdown-white.svg"
                    width={15}
                    height={15}
                  /> */}
                  <ChevronDown
                    classes={`w-7 h-7 transition-transform duration-300 ${
                      fourthDropDownState && "rotate-180"
                    } ${theme == "light" ? "opacity-80" : ""}`}
                  />
                </div>
                {fourthDropDownState && (
                  <p className="text-sm  text-smallText mt-3">
                    Recruitinn stands out by combining advanced AI technology
                    with a personalized touch. Our platform not only matches you
                    with top candidates based on your specific requirements but
                    also offers comprehensive assessment tools and seamless
                    integration processes. This ensures that you find the right
                    talent quickly and efficiently, saving you time and
                    resources.
                  </p>
                )}
              </li>
              <li
                onClick={toggleFifthDropDown}
                className="cursor-pointer py-4 w-[100%] flex flex-col border-b-[1px] border-darkPurple"
              >
                <div className=" w-[100%] flex justify-between">
                  <span className="text-lg tracking-wide font-semibold font-sans">
                    How does Recruitinn help you find the best candidate?
                  </span>
                  {/* <Image
                    onClick={toggleFifthDropDown}
                    src="/dropdown-white.svg"
                    width={15}
                    height={15}
                  /> */}
                  <ChevronDown
                    classes={`w-7 h-7 transition-transform duration-300 ${
                      fifthDropDownState && "rotate-180"
                    } ${theme == "light" ? "opacity-80" : ""}`}
                  />
                </div>
                {fifthDropDownState && (
                  <p className="text-sm  text-smallText mt-3">
                    Recruitinn uses advanced AI to match your specific
                    requirements with top talent. You define your needs, and our
                    platform curates a list of qualified candidates. With
                    detailed assessments and live interviews, you receive
                    real-time evaluations to identify top performers, ensuring
                    you find the perfect fit quickly and efficiently.
                  </p>
                )}
              </li>
              {/* <li
                onClick={toggleSixthDropDown}
                className="py-4 w-[100%] flex flex-col border-b-[1px] border-darkPurple"
              >
                <div className=" w-[100%] flex justify-between">
                  <span className="text-lg tracking-wide font-semibold font-sans">
                    What technologies do recruitinn developers know?
                  </span>
                  <Image
                    onClick={toggleSixthDropDown}
                    src="/dropdown-white.svg"
                    width={15}
                    height={15}
                  />
                </div>
                {sixthDropDownState && (
                  <p className="text-sm  text-smallText mt-3">
                    We help companies hire world-class engineers through our
                    talent pool of vetted engineers, micro1 Talent, and our
                    software development agency, microLab. We're also building
                    gpt-vetting, an AI tool for vetting top talent.
                  </p>
                )}
              </li> */}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingFAQs;
