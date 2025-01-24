import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";
import { useRef, useState } from "react";
import CheckIconSvg from "../components/CheckIconSvg";
import bestTalents from "../public/best-talents.png";
import createAJob from "../public/create-a-job.png";
import generateAiAssessment from "../public/generate-ai-assessment.png";
import takeAssessment from "../public/take-assessment.png";

gsap.registerPlugin(ScrollTrigger);

const content = [
  {
    title: "Create a Job",
    para: "Share the details of the role and the skills you need.",
  },
  {
    title: "Generate AI Interview",
    para: "Let our AI create the perfect interview for your candidates.",
  },
  {
    title: "Conduct the Interview",
    para: "Use AI to interview and evaluate candidates with ease.",
  },
  {
    title: "Hire the Right Talent",
    para: "Choose the best candidate and grow your team effortlessly.",
  },
];

function FeaturesSection() {
  const [current, setCurrent] = useState(0);
  const container = useRef(null);

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
    <section className="my-12 mx-auto w-full features text-center ">
      <div className="w-90p mx-auto space-y-4 mb-16 heading">
        <h2 className="text-neutral-dark text-4xl font-bold">
        Effortless Hiring in Four Simple Steps
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
        <div className="line absolute -top-[3px] left-1/2 -translate-x-1/2 h-4 w-2/3 bg-gradient-to-r from-transparent via-primary to-transparent rounded-t-[50%_100%] z-[3] shadow-[0px_-30px_70px_1px_rgba(97,55,219,0.65)]"></div>
        <div className="try absolute top-0 w-90p left-1/2 -translate-x-1/2 h-[40px] bg-white z-[4] border-t-primary"></div>
        <div className={`titles h-max  ml-6 `}>
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
        <div className="images relative max-xl:hidden overflow-hidden pl-4 pr-1 pt-3 rounded-tl-[3rem] w-full border-l border-t border-[#F0EDFC]">
          <div className="relative w-full h-full space-y-24">
            <Image
              src={createAJob}
              className={`h-[29.5rem] block`}
              alt="Create a job placeholder image"
              placeholder="blur"
              quality={100}
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
