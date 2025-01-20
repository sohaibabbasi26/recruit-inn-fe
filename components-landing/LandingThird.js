import CardDiv from "../components/CardDiv";
import TechstackOne from "../components/TechstackOne";
import TechstackTwo from "../components/TechstackTwo";
import { useTheme } from "next-themes";

import style from "./styles.module.css";
import "tailwindcss/tailwind.css";
import Image from "next/image";
import TechstackThree from "../components/TechstackThree";
import styles from "./LandingThird.module.css";
import TechstackFour from "../components/TechstackFour";

const LandingThird = () => {
  const { theme } = useTheme();
  return (
    <>
      <div className="h-[800px] max-md:h-80p  max-lg:h-100p w-full flex justify-center mb-[2rem]">
        <div className="w-90p max-lg:items-center max-lg:flex-col max-lg:h-[100%] flex justify-between items-center gap-5 ">
          <div
            className={`${
              theme === "dark"
                ? style["right-dv-gradient"]
                : "bg-white border-2 border-solid border-[#F0EDFC] transition-all hover:border-lightPurpleText hover:shadow-lg hover:shadow-indigo-500/40"
            } w-[50%]  max-lg:w-[100%] max-lg:h-[100%] h-100p rounded-3xl flex flex-col items-center overflow-hidden relative`}
          >
            <div className="w-80p h-50p max-xl:h-[70vh]  max-sm:mt-1 mt-[58px] flex justify-center items-center relative">
              <div className="absolute">
                <Image
                  src="/recruitlogo.png"
                  alt="Central Logo"
                  width={50}
                  height={50}
                />
              </div>

              <div className="absolute w-[267px] h-[267px] max-sm:h-[200px] max-sm:w-[200px] border-dashed border-2 border-gray-300 rounded-full z-0"></div>
              <div className="absolute w-[327px] h-[327px] max-sm:h-[250px] max-sm:w-[250px]  border-dashed border-2 border-gray-300 rounded-full z-0"></div>
              <div className="absolute w-[380px] h-[385px] max-sm:h-[300px] max-sm:w-[300px]  border-dashed border-2 border-gray-300 rounded-full z-0"></div>

              <div className={`absolute ${styles.rotate_center} `}>
                <Image
                  src="/avatar1.png"
                  alt="Avatar 1"
                  width={30}
                  height={30}
                />
              </div>

              {/* Avatar 2 */}
              {/* <div className={`absolute ${styles.rotate_center1}`}>
                <Image
                  src="/avatar2.png"
                  alt="Avatar 2"
                  width={30}
                  height={30}
                />
              </div> */}

              {/* Avatar 3 */}
              <div className={`absolute ${styles.rotate_center2}`}>
                <Image
                  src="/avatar3.png"
                  alt="Avatar 3"
                  width={30}
                  height={30}
                />
              </div>

              {/* Avatar 4 */}
              {/* <div className={`absolute ${styles.rotate_center3}`}>
                <Image
                  src="/avatar4.png"
                  alt="Avatar 4"
                  width={30}
                  height={30}
                />
              </div> */}

              {/* Avatar 5 */}
              <div className={`absolute ${styles.rotate_center4}`}>
                <Image
                  src="/avatar5.png"
                  alt="Avatar 5"
                  width={30}
                  height={30}
                />
              </div>

              {/* Avatar 6 */}
              {/* <div className={`absolute ${styles.rotate_center5}`}>
                <Image
                  src="/avatar6.png"
                  alt="Avatar 6"
                  width={30}
                  height={30}
                />
              </div> */}
            </div>

            <div className="w-80p h-50p flex flex-col justify-center mt-5 max-sm:mt-0">
              <span className="text-lightPurpleText font-semibold text-lg">
                TALENTS
              </span>
              <h3 className="text-black dark:text-white text-4xl font-semibold mb-[2rem] gradient-text">
                Connect with the Best Engineers Worldwide
              </h3>
              <p className="text-steel dark:text-white max-lg:mb-[1rem] text-justify">
                Are you struggling to find top engineering talent? RecruitInn.ai
                makes it simple to connect with experienced professionals who
                can bring your vision to life. Whether you’re building an
                innovative product, scaling your development team, or need
                expertise in a specific technology stack, we match you with
                engineers who deliver results. Stop wasting time on endless
                searches—start creating impactful solutions today with trusted,
                highly skilled software engineers.
              </p>
            </div>
          </div>

          <div
            className={`${
              theme === "dark"
                ? ""
                : "border-2 border-solid border-[#F0EDFC] transition-all hover:border-lightPurpleText hover:shadow-lg hover:shadow-indigo-500/40 "
            } w-[50%]   max-lg:w-[100%] max-lg:h-[100%]  h-[100%]  bg-white dark:bg-elementGradOne  rounded-3xl flex flex-col items-center`}
          >
            <div className=" w-[100%] max-h-[520px] overflow-hidden flex flex-col justify-center items-center relative">
              <div className=" max-md:mt-[90px] mt-[120px]">
                {" "}
                <TechstackOne />
              </div>
              <div>
                {" "}
                <TechstackTwo />
              </div>
              <div>
                {" "}
                <TechstackFour />
              </div>
              <div className="opacity-25 mt-6 max-md:hidden">
                {" "}
                <TechstackThree />
              </div>
              <div className="absolute h-full left-0 w-32 bg-gradient-to-r from-white  from-40%  to-transparent to-90% rounded-t-3xl "></div>
              <div className="absolute h-full right-0 w-32  bg-gradient-to-l from-white  from-40%  to-transparent to-90% rounded-t-3xl "></div>
            </div>

            <div className="w-80p h-50p max-md:mt-[20px]  max-lg:mt-[40px] mt-4   flex flex-col justify-center">
              <span className="text-lightPurpleText font-semibold text-lg">
                TECH STACKS
              </span>
              <h3 className="text-black dark:text-white text-4xl font-semibold mb-[2rem] gradient-text">
                Hire Experts in Today’s Most In-Demand Technologies
              </h3>
              <p className="text-steel dark:text-white max-md:mb-[1rem] max-lg:mb-[1rem] text-justify">
                Hire Experts in Today’s Most In-Demand Technologies The tech
                industry evolves fast, and having access to the right talent is
                essential for staying ahead. At RecruitInn.ai, we connect you
                with specialists skilled in JavaScript, Python, Flutter,
                Node.js, Kubernetes, and more. Whether you're looking for mobile
                app developers, cloud engineers, or full-stack experts, we
                ensure you find professionals who align perfectly with your
                project needs. With RecruitInn.ai, hiring top-tier talent with
                the latest skills has never been easier.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingThird;
