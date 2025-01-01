import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useRef } from "react";
import "tailwindcss/tailwind.css";
import LeftLineLgSvg from "../components/leftLineLgSvg";
import LeftLineMdSvg from "../components/leftLineMdSvg";
import RightLineLgSvg from "../components/RightLineLgSvg";
import RightLineMdSvg from "../components/RightLineMdSvg";

import {
  calculateCenterDistance,
  getElementCenters,
} from "@/util/domCalculations";
import MainCard from "./MainCard";
import NodeCard from "./NodeCard";
gsap.registerPlugin(ScrollTrigger);

function InterviewSection() {
  const { theme } = useTheme();
  const interviewSectionRef = useRef(null);
  const lineAnimationsRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        duration: 1,
        ease: "power3.out",
      });
      const logo = document.querySelector(".logo");
      const nodeCards = gsap.utils.toArray(
        ".animate-cards-wrapper .animate-card"
      );

      const [cardOneCenter, cardTwoCenter, cardThreeCenter, cardFourCenter] =
        getElementCenters(nodeCards);

      const lineSvgs = gsap.utils.toArray(".connect-lines svg");
      const svgPaths = lineSvgs.map((svg) => svg.querySelector("path"));
      const svgPathLengths = svgPaths.map((path) => path.getTotalLength());
      const [svgOnePath, svgTwoPath, svgThreePath, svgFourPath] = svgPaths;
      const [
        svgOnePathLength,
        svgTwoPathLength,
        svgThreePathLength,
        svgFourPathLength,
      ] = svgPathLengths;

      const howFar = calculateCenterDistance(nodeCards[0], logo);
      console.log("How far", howFar);

      tl.addLabel("setLines");
      tl.set(".left-line-lg", { x: cardOneCenter.x }, "setLines");
      tl.set(".left-line-md", { x: cardTwoCenter.x }, "setLines");
      tl.set(
        ".right-line-md",
        {
          x: cardThreeCenter.x - lineSvgs[2].getBoundingClientRect().width,
        },
        "setLines"
      );
      tl.set(
        ".right-line-lg",
        {
          x: cardFourCenter.x - lineSvgs[3].getBoundingClientRect().width,
        },
        "setLines"
      );
      tl.set(
        [svgOnePath, svgTwoPath],
        {
          strokeDasharray: svgOnePathLength + " " + svgOnePathLength,
          strokeDashoffset: svgOnePathLength,
        },
        "setLines"
      );
      tl.set(
        svgThreePath,
        {
          strokeDasharray: svgThreePathLength + " " + svgThreePathLength,
          strokeDashoffset: svgThreePathLength,
        },
        "setLines"
      );
      tl.set(
        svgFourPath,
        {
          strokeDasharray: svgFourPathLength + " " + svgFourPathLength,
          strokeDashoffset: svgFourPathLength,
        },
        "setLines"
      );

      tl.addLabel("animateLines");
      tl.fromTo(
        svgOnePath,
        {
          strokeDasharray: svgOnePathLength,
          strokeDashoffset: svgOnePathLength,
        },
        { strokeDashoffset: 0, duration: 1.5, ease: "power3.out" },
        "animateLines"
      );
      tl.fromTo(
        svgTwoPath,
        {
          strokeDasharray: svgTwoPathLength,
          strokeDashoffset: svgTwoPathLength,
        },
        { strokeDashoffset: 0, duration: 1.05, ease: "power3.out" },
        "animateLines"
      );
      tl.fromTo(
        svgThreePath,
        {
          strokeDasharray: svgThreePathLength,
          strokeDashoffset: svgThreePathLength,
        },
        { strokeDashoffset: 0, duration: 1.05, ease: "power3.out" },
        "animateLines"
      );
      tl.fromTo(
        svgFourPath,
        {
          strokeDasharray: svgFourPathLength,
          strokeDashoffset: svgFourPathLength,
        },
        { strokeDashoffset: 0, duration: 2, ease: "power3.out" },
        "animateLines"
      );

      tl.pause();

      ScrollTrigger.create({
        trigger: interviewSectionRef.current,
        start: "top center",
        onEnter: () => {
          console.log("Restart the timeline");
          tl.restart();
        },
        once: true,
        markers: true,
      });
    },
    { scope: interviewSectionRef }
  );

  return (
    // <div className="h-[1000px] max-lg:h-100p w-full flex justify-center mb-[2rem]  ">
    <div className="w-full interview-section">
      <div
        ref={interviewSectionRef}
        className="w-90p mx-auto bg-[#FBFBFC] rounded-3xl border border-darkPurple"
      >
        {/* <div className="w-90p max-lg:items-center max-lg:flex-col max-lg:h-[100%] bg-light-purple-shade rounded-2xl border-2 "> */}
        <MainCard />

        <div className="flex justify-center items-center max-xsm:gap-2 max-sm:gap-4 sm:gap-5 md:gap-6 lg:gap-8   overflow-hidden ">
          <div className="flex justify-center flex-col overflow-hidden relative   ">
            <NodeCard
              name="Ethan Clarke"
              title=" Product Manager"
              avatar="/avt1.png"
              className="opacity-20 border-b-[2px] border-solid border-themePurple"
            />

            <div className="flex justify-center ">
              <Image
                src="/Union.png"
                alt="Central Logo"
                width={10}
                height={10}
              />
            </div>
          </div>
          <div className="flex justify-center flex-col overflow-hidden relative  ">
            <NodeCard
              name="Ava Mitchell"
              title=" Full-Stack Developer"
              avatar="/avt2.png"
              className="opacity-20 border-b-[2px] border-solid border-themePurple"
            />

            <div className="flex justify-center">
              <Image
                src="/Union.png"
                alt="Central Logo"
                width={10}
                height={10}
              />
            </div>
          </div>
          <div className="flex justify-center flex-col overflow-hidden relative  ">
            <NodeCard
              name="Mia Turner"
              title="Lead Data Scientist"
              avatar="/avt3.png"
              className="opacity-20 border-b-[2px] border-solid border-themePurple"
            />

            <div className="flex justify-center">
              <Image
                src="/Union.png"
                alt="Central Logo"
                width={10}
                height={10}
              />
            </div>
          </div>

          <div className="sm:hidden max-xsm:hidden xsm:hidden md:block flex justify-center flex-col overflow-hidden relative  ">
            <NodeCard
              name="Lucas Bailey"
              title="Lead AI Researcher"
              avatar="/avt4.png"
              className="opacity-20 border-b-[2px] border-solid border-themePurple"
            />

            <div className="flex justify-center">
              <Image
                src="/Union.png"
                alt="Central Logo"
                width={10}
                height={10}
              />
            </div>
          </div>
        </div>

        <div
          ref={lineAnimationsRef}
          className="animate-cards-wrapper flex justify-center items-center max-xsm:gap-2 max-sm:gap-4 sm:gap-5 md:gap-6 lg:gap-8 relative"
        >
          <NodeCard
            name="Ethan Clarke"
            title=" Product Manager"
            avatar="/avt1.png"
            className="border-[2px] border-black-300 animate-card"
          />
          <NodeCard
            name="Ava Mitchell"
            title=" Full-Stack Developer"
            avatar="/avt2.png"
            className="border-[2px] border-black-300 animate-card"
          />
          <NodeCard
            name="Mia Turner"
            title="Lead Data Scientist"
            avatar="/avt3.png"
            className="border-[2px] border-black-300 animate-card"
          />

          <div className=" max-xsm:hidden xsm:hidden sm:hidden md:block">
            <NodeCard
              name="Lucas Bailey"
              title="Lead AI Researcher"
              avatar="/avt4.png"
              className="border-[2px] border-black-300 animate-card"
            />
          </div>
        </div>

        <div className="connect-lines relative h-14">
          <LeftLineLgSvg className="size-full left-line-lg w-max absolute inset-0" />
          <LeftLineMdSvg className="size-full left-line-md w-max absolute inset-0" />
          <RightLineMdSvg className="size-full right-line-md w-max absolute inset-0" />
          <RightLineLgSvg className="size-full right-line-lg w-max absolute inset-0" />
        </div>

        <div className=" flex items-center justify-center relative">
          {/* Gradient shadow under the box */}
          <div className="logo absolute  left-1/2 -translate-x-1/2 -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-[162px] w-[162px] rounded-2xl blur-md "></div>

          {/* Outer div with gradient border */}
          <div className="flex justify-center items-center bg-gradient-to-r from-primary via-purple-500 to-darkOrenge h-[162px] w-[162px] rounded-2xl p-[2px] relative">
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
          <Image src="/Union.png" alt="Central Logo" width={15} height={15} />
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
                src="/Union.png"
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
}

export default InterviewSection;
