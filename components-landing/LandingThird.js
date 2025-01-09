import CardDiv from "../components/CardDiv";
import TechstackOne from "../components/TechstackOne";
import TechstackTwo from "../components/TechstackTwo";
import { useTheme } from "next-themes";

import style from "./styles.module.css";
import "tailwindcss/tailwind.css";
import Image from "next/image";
import TechstackThree from "../components/TechstackThree";
import styles from "./LandingThird.module.css";

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
              {/* Central Logo */}
              <div className="absolute">
                <Image
                  src="/recruitlogo.png"
                  alt="Central Logo"
                  width={50}
                  height={50}
                />
              </div>

              {/* Circles */}
              <div className="absolute w-[267px] h-[267px] max-sm:h-[200px] max-sm:w-[200px] border-dashed border-2 border-gray-300 rounded-full z-0"></div>
              <div className="absolute w-[327px] h-[327px] max-sm:h-[250px] max-sm:w-[250px]  border-dashed border-2 border-gray-300 rounded-full z-0"></div>
              <div className="absolute w-[380px] h-[385px] max-sm:h-[300px] max-sm:w-[300px]  border-dashed border-2 border-gray-300 rounded-full z-0"></div>

              {/* Avatars */}
              {/* Avatar 1 */}
              <div
                className={`absolute ${styles.rotate_center} `}
               
              >
                <Image
                  src="/avatar1.png"
                  alt="Avatar 1"
                  width={30}
                  height={30}
                  className=""
                />
              </div>

              {/* Avatar 2 */}
              <div
                className={`absolute ${styles.rotate_center1}`}
               
              >
                <Image
                  src="/avatar2.png"
                  alt="Avatar 2"
                  width={30}
                  height={30}
                />
              </div>

              {/* Avatar 3 */}
              <div
                className={`absolute ${styles.rotate_center2}`}
                
              >
                <Image
                  src="/avatar3.png"
                  alt="Avatar 3"
                  width={30}
                  height={30}
                />
              </div>

              {/* Avatar 4 */}
              <div
                className={`absolute ${styles.rotate_center3}`}
              
              >
                <Image
                  src="/avatar4.png"
                  alt="Avatar 4"
                  width={30}
                  height={30}
                />
              </div>

              {/* Avatar 5 */}
              <div
                className={`absolute ${styles.rotate_center4}`}
              
              >
                <Image
                  src="/avatar5.png"
                  alt="Avatar 5"
                  width={30}
                  height={30}
                />
              </div>

              {/* Avatar 6 */}
              <div
                className={`absolute ${styles.rotate_center5}`}
                  
              >
                <Image
                  src="/avatar6.png"
                  alt="Avatar 6"
                  width={30}
                  height={30}
                />
              </div>
            </div>

            <div className="w-80p h-50p flex flex-col justify-center mt-5 max-sm:mt-0">
              <span className="text-lightPurpleText font-semibold text-lg">
                TALENTS
              </span>
              <h3 className="text-black dark:text-white text-4xl font-semibold mb-[2rem] gradient-text">
                GET INTO TOUCH WITH WORLD’S BEST ENGINEERS
              </h3>
              <p className="text-steel dark:text-white max-lg:mb-[1rem]">
              Finding the right engineers can be tough but it doesn’t have to be. 
              At RecruitInn.ai, we connect you with some of the best engineering talent out there. 
              Whether you’re building a new product, scaling your team, 
              or need help with a specific tech stack, we’ll match you with the 
              right people who can get the job done. Stop wasting time on endless 
              searches. Start building something great with top software engineers 
              ready to make an impact.
              </p>
            </div>
          </div>

          <div
            className={`${
              theme === "dark"
                ? ""
                : "border-2 border-solid border-[#F0EDFC] transition-all hover:border-lightPurpleText hover:shadow-lg hover:shadow-indigo-500/40 "
            } w-[50%] max-lg:mb-[1rem]  max-lg:w-[100%] max-lg:h-[100%]  h-[100%]  bg-white dark:bg-elementGradOne  rounded-3xl flex flex-col items-center`}
          >
            <div className="w-[100%] max-h-[320px] overflow-hidden flex flex-col justify-center items-center relative mb-[1.5rem]">
              <div className=" max-md:mt-[100px] mt-[150px]">
                {" "}
                <TechstackOne />
              </div>
              <div>
                {" "}
                <TechstackTwo />
              </div>
               <div className="opacity-30  max-md:hidden">
                {" "}
                <TechstackThree />
              </div>
              <div className="absolute h-full left-0 w-32 bg-gradient-to-r from-white  from-40%  to-transparent to-90% rounded-t-3xl "></div>
              <div className="absolute h-full right-0 w-32  bg-gradient-to-l from-white  from-40%  to-transparent to-90% rounded-t-3xl "></div>
            </div>
        
            <div className="w-80p h-50p max-md:mt-[20px]  max-lg:mt-[40px] mt-[100px]  flex flex-col justify-center">
              <span className="text-lightPurpleText font-semibold text-lg">
                SKILLS
              </span>
              <h3 className="text-black dark:text-white text-4xl font-semibold mb-[2rem] gradient-text">
                IN DEMAND SKILLS FOR MODERN TECHNOLOGIES
              </h3>
              <p className="text-steel dark:text-white max-md:mb-[1rem] max-lg:mb-[1rem]">
              Tech is evolving fast, and you need people with the right skills to keep up. 
              That’s where we come in. We’ve got experts in React, TypeScript, Swift, GraphQL, 
              Ruby on Rails, and more. Whether you’re looking for a frontend specialist or a full-stack pro, 
              we’ll help you find someone who fits your project perfectly. With RecruitInn.ai, 
              you’ll always have access to top talent with the skills that matter most for your business.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingThird;
