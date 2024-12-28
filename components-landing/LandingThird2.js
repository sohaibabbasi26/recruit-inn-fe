import Image from "next/image";
import style from "./styles.module.css";
import "tailwindcss/tailwind.css";
import NodeCard from "./NodeCard";
import MainCard from "./MainCard";
import { useTheme } from "next-themes";
const LandingThird2 = () => {
  const { theme } = useTheme();

  return (
    <div className="h-[1000px] max-lg:h-100p w-full flex justify-center mb-[2rem]  ">
      <div className="w-90p max-lg:items-center max-lg:flex-col max-lg:h-[100%] bg-light-purple-shade rounded-2xl border-2 ">
        <MainCard />

        <div className="flex justify-center items-center max-xsm:gap-2 max-sm:gap-4 sm:gap-5 md:gap-6 lg:gap-8   overflow-hidden ">
          <div className="flex justify-center flex-col overflow-hidden relative bottom-6  ">
            <NodeCard
              name="Ethan Clarke"
              title=" Product Manager"
              avatar="/avt1.png"
              className="opacity-20 border-b-[2px] border-solid border-themePurple"
            />

            <div className="flex justify-center ">
              <Image
                src="/union.png"
                alt="Central Logo"
                width={10}
                height={10}
              />
            </div>
          </div>
          <div className="flex justify-center flex-col overflow-hidden relative bottom-6 ">
            <NodeCard
              name="Mia Turner"
              title="Lead Data Scientist"
              avatar="/avt3.png"
              className="opacity-20 border-b-[2px] border-solid border-themePurple"
            />

            <div className="flex justify-center">
              <Image
                src="/union.png"
                alt="Central Logo"
                width={10}
                height={10}
              />
            </div>
          </div>
          <div className="flex justify-center flex-col overflow-hidden relative bottom-6 ">
            <NodeCard
              name="Ava Mitchell"
              title=" Full-Stack Developer"
              avatar="/avt2.png"
              className="opacity-20 border-b-[2px] border-solid border-themePurple"
            />

            <div className="flex justify-center">
              <Image
                src="/union.png"
                alt="Central Logo"
                width={10}
                height={10}
              />
            </div>
          </div>
          <div className="sm:hidden max-xsm:hidden xsm:hidden md:block flex justify-center flex-col overflow-hidden relative bottom-6 ">
            <NodeCard
              name="Lucas Bailey"
              title="Lead AI Researcher"
              avatar="/avt4.png"
              className="opacity-20 border-b-[2px] border-solid border-themePurple"
            />

            <div className="flex justify-center">
              <Image
                src="/union.png"
                alt="Central Logo"
                width={10}
                height={10}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center max-xsm:gap-2 max-sm:gap-4 sm:gap-5 md:gap-6 lg:gap-8 relative bottom-5 ">
          <NodeCard
            name="Ethan Clarke"
            title=" Product Manager"
            avatar="/avt1.png"
            className="border-[2px] border-black-300"
          />

          <NodeCard
            name="Mia Turner"
            title="Lead Data Scientist"
            avatar="/avt3.png"
            className="border-[2px] border-black-300"
          />
          <NodeCard
            name="Ava Mitchell"
            title=" Full-Stack Developer"
            avatar="/avt2.png"
            className="border-[2px] border-black-300"
          />

          <div className=" max-xsm:hidden xsm:hidden sm:hidden md:block">
            <NodeCard
              name="Lucas Bailey"
              title="Lead AI Researcher"
              avatar="/avt4.png"
              className="border-[2px] border-black-300"
            />
          </div>
        </div>

        <div className="items-center mt-16 flex justify-center relative">
          {/* Gradient shadow under the box */}
          <div className="absolute  left-1/2 -translate-x-1/2 -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-[162px] w-[162px] rounded-2xl blur-md "></div>

          {/* Outer div with gradient border */}
          <div className="flex justify-center items-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-[162px] w-[162px] rounded-2xl p-[2px] relative">
            {/* Inner div for the white background and image */}
            <div className="flex justify-center items-center bg-white rounded-2xl h-full w-full">
              <Image
                src="/recruitlogo.png"
                alt="Central Logo"
                width={50}
                height={50}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <Image src="/union.png" alt="Central Logo" width={15} height={15} />
        </div>

        {/* Second Level */}
        <div className="flex  justify-center  mb-8">
          <div className="flex justify-center flex-col">
            <div className="flex  justify-center gap-5 p-4 border-t-[2px]  border-b-[1px] border-x-[2px] border-black-300 rounded-3xl">
              <NodeCard
                name="Mia Turner"
                title="Lead Data Scientist"
                avatar="/avt3.png"
              />
              <NodeCard
                name="Lucas Bailey"
                title="Lead AI Researcher"
                avatar="/avt4.png"
              />
            </div>
            <div className="flex justify-center">
              <Image
                src="/union.png"
                alt="Central Logo"
                width={15}
                height={15}
              />
            </div>
          </div>
        </div>

        {/* Third Level */}
        <div className="flex justify-center items-center relative bottom-8">
          <div className="flex gap-3 p-4 bg-white  rounded-xl w-auto ">
            <div className="">
              <Image
                src="/avt5.png"
                alt="Central Logo"
                width={40}
                height={40}
              />
            </div>
            <div className="mt-[18px]">
              <Image
                src="/avt6.png"
                alt="Central Logo"
                width={20}
                height={20}
              />
            </div>
            <div className="">
              <Image
                src="/avt3.png"
                alt="Central Logo"
                width={40}
                height={40}
              />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-800 dark:text-white">
                Mia Turner
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Lead Data Scientist
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingThird2;
