import CardDiv from "../components/CardDiv";
import TechstackOne from "../components/TechstackOne";
import TechstackTwo from "../components/TechstackTwo";
import { useTheme } from "next-themes";
// import './landingGlobal.css';
// import './styles.css';
import style from "./styles.module.css";
import "tailwindcss/tailwind.css";
import Image from "next/image";
import TechstackThree from "../components/TechstackThree";

const LandingThird = () => {
  const { theme } = useTheme();
  return (
    <>
      <div className="h-[100vh] max-lg:h-100p w-full flex justify-center mb-[2rem]">
        <div className="w-90p max-lg:items-center max-lg:flex-col max-lg:h-[100%] flex justify-between items-center gap-5 ">
          <div
            className={`${
              theme === "dark"
                ? style["right-dv-gradient"]
                : "bg-white border-2 border-solid border-[#F0EDFC] transition-all hover:border-lightPurpleText hover:shadow-lg hover:shadow-indigo-500/40"
            } w-[50%] max-lg:w-[100%] max-lg:h-[100%] h-100p rounded-3xl flex flex-col items-center overflow-hidden relative`}
          >
            <div className="w-80p h-50p max-xl:h-[70vh] mt-[58px] flex justify-center items-center relative">
              <div className="relative flex items-center justify-center h-screen w-screen">
                {/* Central Logo */}
                <div className="absolute">
                  <Image
                    src="/recruitlogo.png"
                    alt="Central Logo"
                    width={50}
                    height={50}
                  />
                </div>

                {/* Dotted Circles */}
                <div className="absolute w-[267px] h-[267px] border-dashed border-2 border-gray-300 rounded-full"></div>
                <div className="absolute w-[327px] h-[327px] border-dashed border-2 border-gray-300 rounded-full"></div>
                <div className="absolute w-[387px] h-[387px] border-dashed border-2 border-gray-300 rounded-full"></div>

                {/* Avatars */}
                <div className="absolute  top-[25%] left-[50%] md:top-[15%] transform -translate-x-1/2 -translate-y-1/2">
                  <Image
                    src="/avatar1.png"
                    alt="Avatar"
                    width={40}
                    height={40}
                  />
                </div>
                <div className="absolute top-[35%] left-[85%] transform -translate-x-1/2 -translate-y-1/2">
                  <Image
                    src="/avatar2.png"
                    alt="Avatar"
                    width={40}
                    height={40}
                  />
                </div>
                <div className="absolute bottom-[59%] left-[25%] transform -translate-x-1/2 translate-y-1/2">
                  <Image
                    src="/avatar3.png"
                    alt="Avatar"
                    width={40}
                    height={40}
                  />
                </div>
                <div className="absolute top-[60%] left-[73%] transform -translate-x-1/2 -translate-y-1/2">
                  <Image
                    src="/avatar4.png"
                    alt="Avatar"
                    width={40}
                    height={40}
                  />
                </div>
                <div className="absolute top-[62%] right-[80%] transform -translate-x-1/2 -translate-y-1/2">
                  <Image
                    src="/avatar5.png"
                    alt="Avatar"
                    width={40}
                    height={40}
                  />
                </div>
                <div className="absolute top-[75%] right-[42%] transform -translate-x-1/2 -translate-y-1/2">
                  <Image
                    src="/avatar6.png"
                    alt="Avatar"
                    width={40}
                    height={40}
                  />
                </div>
              </div>
            </div>

            <div className="w-80p h-50p flex flex-col justify-center">
              <span className="text-lightPurpleText font-semibold text-lg">
                TALENTS
              </span>
              <h3 className="text-black dark:text-white text-4xl font-semibold mb-[2rem] gradient-text">
                GET INTO TOUCH WITH WORLD’S BEST ENGINEERS
              </h3>
              <p className="text-steel dark:text-white max-md:mb-[1rem]">
                Forge connections with leading engineers for cutting-edge
                innovation and expertise. This collaboration unlocks visionary
                solutions, propelling you to the forefront of engineering
                excellence for unparalleled success.
              </p>
            </div>
          </div>

          <div
            className={`${
              theme === "dark"
                ? ""
                : "border-2 border-solid border-[#F0EDFC] transition-all hover:border-lightPurpleText hover:shadow-lg hover:shadow-indigo-500/40 "
            } w-[50%] max-lg:mb-[1rem]  max-lg:w-[100%] max-lg:h-[100%] h-100p bg-white dark:bg-elementGradOne  rounded-3xl flex flex-col items-center`}
          >
            <div className="w-[100%] h-50p overflow-hidden flex flex-col justify-center items-center relative mb-[1.5rem]">
              <div className="mt-50" > <TechstackOne /></div>
              <div> <TechstackTwo /></div>
              <div className="" > <TechstackThree /></div>
              <div className="absolute h-full left-0 w-32 bg-gradient-to-r from-white  from-40%  to-transparent to-90% rounded-t-3xl " ></div>
              <div className="absolute h-full right-0 w-32  bg-gradient-to-l from-white  from-40%  to-transparent to-90% rounded-t-3xl " ></div>


            </div>

            <div className="w-80p h-50p flex flex-col justify-center">
              <span className="text-lightPurpleText font-semibold text-lg">
                SKILLS
              </span>
              <h3 className="text-black dark:text-white text-4xl font-semibold mb-[2rem] gradient-text">
                IN DEMAND SKILLS FOR MODERN TECHNOLOGIES
              </h3>
              <p className="text-steel dark:text-white max-sm:mb-[1rem]">
                Forge connections with leading engineers for cutting-edge
                innovation and expertise. This collaboration unlocks visionary
                solutions, propelling you to the forefront of engineering
                excellence for unparalleled success.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingThird;
