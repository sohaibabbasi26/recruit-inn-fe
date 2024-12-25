import Image from "next/image";
import { useState } from "react";
import CheckIconSvg from "../components/CheckIconSvg";
import bestTalents from "../public/best-talents.png";
import createAJob from "../public/create-a-job.png";
import generateAiAssessment from "../public/generate-ai-assessment.png";
import takeAssessment from "../public/take-assessment.png";

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
  return (
    <section className="my-12 mx-auto w-full features text-center">
      <div className="w-90p mx-auto space-y-4 mb-12 heading">
        <h2 className=" text-neutral-dark text-4xl  font-bold text-">
          Recruitinn’s Way
        </h2>
        <p className="text-center text-steel text-sm">
          Access a pool of meticulously vetted, highly skilled candidates ready
          <br /> to meet your needs and exceed your expectations
        </p>
      </div>
      <div className="w-90p grid grid-cols-[max-content_1fr] gap-8 pt-12 pl-12 mx-auto rounded-3xl carousel bg-white border border-[#F0EDFC]">
        <div className="titles pb-12">
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
        <div className="images pl-3 pt-3 rounded-tl-[3rem] w-full border-l border-t border-[#F0EDFC]">
          <div className="create-a-job size-full transition duration-1000 rounded-tl-[2rem] overflow-hidden max-2xl:max-h-[28.375rem]">
            <Image
              src={createAJob}
              className={`${
                current === 0
                  ? "!visible !translate-x-0 translate-y-0 !opacity-100"
                  : "invisible !size-0"
              } transition duration-1000 ease-in-out opacity-0 size-full bg-left-top translate-x-9 translate-y-9`}
              alt="Create a job placeholder image"
              placeholder="blur"
              quality={80}
            />
            <Image
              src={generateAiAssessment}
              className={`${
                current === 1
                  ? "!visible !translate-x-0 translate-y-0 !opacity-100"
                  : "invisible !size-0"
              } transition duration-1000 ease-in-out opacity-0 size-full bg-left-top translate-x-9 translate-y-9`}
              alt="Create a job placeholder image"
              placeholder="blur"
              quality={80}
            />
            <Image
              src={takeAssessment}
              className={`${
                current === 2
                  ? "!visible !translate-x-0 translate-y-0 !opacity-100"
                  : "invisible !size-0"
              } transition duration-1000 ease-in-out opacity-0 size-full bg-left-top translate-x-9 translate-y-9`}
              alt="Create a job placeholder image"
              placeholder="blur"
              quality={80}
            />
            <Image
              src={bestTalents}
              className={`${
                current === 3
                  ? "!visible !translate-x-0 translate-y-0 !opacity-100"
                  : "invisible !size-0"
              } transition duration-1000 ease-in-out opacity-0 size-full bg-left-top translate-x-9 translate-y-9`}
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
                ? "!bg-primary bg-gradient-to-b from-primary to-primary "
                : ""
            }
                ${isCur ? "bg-gradient-to-b from-primary to-[#EBEBEB] " : " "}
            
            line h-16 w-[1.5px] bg-[#EBEBEB] mx-auto `}
          ></div>
        ) : null}
      </div>
      <div className="text" onClick={() => setCurrent(num)}>
        <h3
          className={`${isActive ? "!text-primary" : ""} ${
            isCur ? "!text-neutral-dark" : ""
          } text-steel font-bold text-3xl`}
        >
          {" "}
          {content.title}{" "}
        </h3>
        <p
          className={`${
            isCur || isActive ? "text-steel" : ""
          } text-[#ACA7BA] font-xm`}
        >
          {content.para}
        </p>
      </div>
    </div>
  );
}
