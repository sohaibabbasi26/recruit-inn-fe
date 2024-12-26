// import Image from "next/image";
// import { useState } from "react";
// import CheckIconSvg from "../components/CheckIconSvg";
// import bestTalents from "../public/best-talents.png";
// import createAJob from "../public/create-a-job.png";
// import generateAiAssessment from "../public/generate-ai-assessment.png";
// import takeAssessment from "../public/take-assessment.png";

// const content = [
//   {
//     title: "Create a Job",
//     para: "Where you can specify your required skills & expertise",
//   },
//   {
//     title: "Generate AI Assessment",
//     para: "Where you can specify your required skills & expertise",
//   },
//   {
//     title: "Take Assessment",
//     para: "Where you can specify your required skills & expertise",
//   },
//   {
//     title: "Get The Best Talents",
//     para: "Where you can specify your required skills & expertise",
//   },
// ];
// function FeaturesSection() {
//   const [current, setCurrent] = useState(0);
//   return (
//     <section className="my-12 mx-auto w-full features text-center">
//       <div className="w-90p mx-auto space-y-4 mb-12 heading">
//         <h2 className=" text-neutral-dark text-4xl  font-bold text-">
//           Recruitinn’s Way
//         </h2>
//         <p className="text-center text-steel text-sm">
//           Access a pool of meticulously vetted, highly skilled candidates ready
//           <br /> to meet your needs and exceed your expectations
//         </p>
//       </div>
//       <div className="w-90p max-xl:flex max-xl:items-center max-xl:justify-center grid grid-cols-[max-content_1fr] gap-8 pt-12 pl-12 max-xl:pl-0 mx-auto rounded-3xl carousel bg-white border border-[#F0EDFC]">
//         <div className="titles pb-12">
//           {content.map((c, i) => (
//             <AccordianItem
//               current={current}
//               setCurrent={setCurrent}
//               content={c}
//               key={i}
//               num={i}
//               isLast={content.length === i + 1}
//             />
//           ))}
//         </div>
//         <div className="images max-xl:hidden relative overflow-hidden pl-3 pt-3 rounded-tl-[3rem] w-full border-l border-t border-[#F0EDFC]">
//           {/* <div className="create-a-job size-full transition duration-1000 rounded-tl-[2rem] overflow-hidden max-2xl:max-h-[28.375rem]"> */}
//           <div className="relative w-full h-full">
//             <Image
//               src={createAJob}
//               className={`absolute inset-0 transition-all duration-1000 ${
//                 current === 0 ? "opacity-100 visible" : "opacity-0 invisible"
//               }`}
//               alt="Create a job placeholder image"
//               placeholder="blur"
//               quality={80}
//             />
//             <Image
//               src={generateAiAssessment}
//               className={`absolute inset-0 transition-all duration-1000 ${
//                 current === 1 ? "opacity-100 visible" : "opacity-0 invisible"
//               }`}
//               alt="Generate AI Assessment placeholder image"
//               placeholder="blur"
//               quality={80}
//             />
//             <Image
//               src={takeAssessment}
//               className={`absolute inset-0 transition-all duration-1000 ${
//                 current === 2 ? "opacity-100 visible" : "opacity-0 invisible"
//               }`}
//               alt="Take Assessment placeholder image"
//               placeholder="blur"
//               quality={80}
//             />
//             <Image
//               src={bestTalents}
//               className={`absolute inset-0 transition-all duration-1000 ${
//                 current === 3 ? "opacity-100 visible" : "opacity-0 invisible"
//               }`}
//               alt="Best Talents placeholder image"
//               placeholder="blur"
//               quality={80}
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default FeaturesSection;

// function AccordianItem({ content, num, isLast, current, setCurrent }) {
//   const isCur = num === current;
//   const isActive = current > num;
//   return (
//     <div className="text-left gap-6 title flex items-start justify-start">
//       <div className="progress">
//         <div
//           className={`${isCur ? "border-primary !text-primary" : " "}
//             ${isActive ? "bg-primary border-primary !text-white" : ""}
//           icon size-14 rounded-full border border-[#EBEBEB] text-transparent flex items-center justify-center transition duration-500 ease-in-out`}
//         >
//           <CheckIconSvg />
//         </div>
//         {!isLast ? (
//           <div
//             className={` ${
//               isActive
//                 ? "!bg-primary bg-gradient-to-b from-primary to-primary "
//                 : ""
//             }
//                 ${isCur ? "bg-gradient-to-b from-primary to-[#EBEBEB] " : " "}

//             line h-16 w-[1.5px] bg-[#EBEBEB] mx-auto `}
//           ></div>
//         ) : null}
//       </div>
//       <div className="text" onClick={() => setCurrent(num)}>
//         <h3
//           className={`transition-all duration-300 ${
//             isCur
//               ? "!text-neutral-dark"
//               : isActive
//               ? "!text-primary"
//               : "text-steel"
//           } font-bold text-3xl`}
//         >
//           {content.title}
//         </h3>
//         <p
//           className={`transition-all duration-300 ${
//             isCur ? "text-steel" : "text-[#ACA7BA]"
//           } font-xm`}
//         >
//           {content.para}
//         </p>
//       </div>
//     </div>
//   );
// }

import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";
import { useRef, useState } from "react";
import CheckIconSvg from "../components/CheckIconSvg";
import bestTalents from "../public/best-talents.png";
import createAJob from "../public/create-a-job.png";
import generateAiAssessment from "../public/generate-ai-assessment.png";
import takeAssessment from "../public/take-assessment.png";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const content = [
  {
    title: "Create a Job",
    para: "Where you can specify your required skills & expertise",
  },
  {
    title: "Generate AI Assessment",
    para: "Where you can specify your required skills & expertise",
  },
  {
    title: "Take Assessment",
    para: "Where you can specify your required skills & expertise",
  },
  {
    title: "Get The Best Talents",
    para: "Where you can specify your required skills & expertise",
  },
];

function FeaturesSection() {
  const [current, setCurrent] = useState(0);
  const container = useRef(null);
  console.log("Current", current);

  useGSAP(
    () => {
        
      const images = gsap.utils.toArray(".images img");
      const titles = gsap.utils.toArray(".titles .title");

      images.forEach((img, i) => {
        ScrollTrigger.create({
          trigger: img,
          start: "top 55%",
          end: "bottom 55%",
          // Set to false on production
          //   markers: true,
          onEnter: () => setCurrent(i),
          onEnterBack: ({ progress, direction, isActive }) => {
            setCurrent(i);
          },
          // For ref
          onLeave: ({ progress, direction, isActive }) => {},
          onLeaveBack: () => setCurrent(i),
        });
      });

      ScrollTrigger.create({
        trigger: ".titles",
        start: "center center",
        endTrigger: "#end",
        end: "center center",
        pin: true,
        scrub: true,
        // set to false on production
        // markers: true,
        // animation: tl,
      });
    },
    { dependencies: current, scope: container }
  );

  return (
    <section className="my-12 mx-auto w-full features text-center">
      <div className="w-90p mx-auto space-y-4 mb-12 heading">
        <h2 className="text-neutral-dark text-4xl font-bold">
          Recruitinn’s Way
        </h2>
        <p className="text-center text-steel text-sm">
          Access a pool of meticulously vetted, highly skilled candidates ready
          <br /> to meet your needs and exceed your expectations
        </p>
      </div>
      <div
        ref={container}
        className="w-90p relative max-xl:flex max-xl:items-center max-xl:justify-center grid grid-cols-[max-content_1fr] gap-8 pt-12 pl-12 max-xl:pl-0 mx-auto rounded-3xl carousel bg-white border border-[#F0EDFC]"
      >
        <div className={`titles h-max`}>
          {content.map((c, i) => (
            <AccordianItem
              current={current}
              setCurrent={setCurrent}
              content={c}
              key={i}
              num={i}
              isLast={content.length === i + 1}
            />
          ))}
        </div>
        <div className="images max-xl:hidden relative overflow-hidden pl-3 pt-3 rounded-tl-[3rem] w-full border-l border-t border-[#F0EDFC]">
          <div className="relative w-full h-full space-y-24">
            <Image
              src={createAJob}
              className={`h-[29.5rem] block`}
              alt="Create a job placeholder image"
              placeholder="blur"
              quality={80}
            />
            <Image
              src={generateAiAssessment}
              className={`h-[29.5rem] block`}
              alt="Create a job placeholder image"
              placeholder="blur"
              quality={80}
            />
            <Image
              src={takeAssessment}
              className={`h-[29.5rem] block`}
              alt="Create a job placeholder image"
              placeholder="blur"
              quality={80}
            />
            <Image
              id="end"
              src={bestTalents}
              className={`h-[29.5rem] block`}
              alt="Create a job placeholder image"
              placeholder="blur"
              quality={80}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;

function AccordianItem({ content, num, isLast, current, setCurrent }) {
  const isCur = num === current;
  const isActive = current > num;
  return (
    <div className="text-left gap-6 title flex items-start justify-start">
      <div className="progress">
        <div
          className={`${isCur ? "border-primary !text-primary" : " "} 
            ${isActive ? "bg-primary border-primary !text-white" : ""} 
          icon size-14 rounded-full border border-[#EBEBEB] text-transparent flex items-center justify-center transition duration-500 ease-in-out`}
        >
          <CheckIconSvg />
        </div>
        {!isLast ? (
          <div
            className={` ${
              isActive
                ? "!bg-primary bg-gradient-to-b from-primary to-primary"
                : ""
            } 
                ${isCur ? "bg-gradient-to-b from-primary to-[#EBEBEB]" : ""} 
            line h-16 w-[1.5px] bg-[#EBEBEB] mx-auto`}
          ></div>
        ) : null}
      </div>
      <div className="text" onClick={() => setCurrent(num)}>
        <h3
          className={`transition-all duration-300 ${
            isCur
              ? "!text-neutral-dark"
              : isActive
              ? "!text-primary"
              : "text-steel"
          } font-bold text-3xl`}
        >
          {content.title}
        </h3>
        <p
          className={`transition-all duration-300 ${
            isCur ? "text-steel" : "text-[#ACA7BA]"
          } font-xm`}
        >
          {content.para}
        </p>
      </div>
    </div>
  );
}
