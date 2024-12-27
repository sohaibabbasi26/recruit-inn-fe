import Image from "next/image";
import { useEffect, useRef, useState } from "react";

function LandingFourth() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef([]);

  const sections = [
    {
      text: "Real-time interviews, instant evaluations, seamless scheduling and all automated for you!",
      image: "/Rectangle1.png",
    },
    {
      text: "Objectively assess every candidate, gain actionable insights, decide effortlessly!",
      image: "/Rectangle2.png",
    },
    {
      text: "Spanning a spectrum of expertise to suit your every need and project demand.",
      image: "/Rectangle3.png",
    },
  ];

  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       entries.forEach((entry) => {
  //         const index = sectionRefs.current.indexOf(entry.target);
  //         if (entry.isIntersecting && index !== -1) {
  //           setActiveIndex(index);
  //         }
  //       });
  //     },
  //     { threshold: 0.25 } // Adjust threshold to control sensitivity
  //   );

  //   sectionRefs.current.forEach((ref) => ref && observer.observe(ref));
  //   return () => observer.disconnect();
  // }, []);

  useEffect(() => {
    const handleScroll = () => {
      const offsets = sectionRefs.current.map(
        (ref) => ref?.getBoundingClientRect().top
      );
      const windowHeight = window.innerHeight;

      const newIndex = offsets.findIndex(
        (offset) => offset >= -windowHeight / 4 && offset <= windowHeight / 2
      );

      if (newIndex !== -1 && newIndex !== activeIndex) {
        setActiveIndex(newIndex);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeIndex]);

  return (
    <div className="relative mt-16 w-90p mx-auto">
      {/* <div className="sticky top-1/4 left-10 transform -translate-y-1/2 flex flex-col items-center justify-center h-screen"> */}
      <div className="flex flex-col mb-8 items-center justify-center ">
        {sections.map((section, index) => (
          <p
            key={index}
            className={`text-3xl font-bold text-center transition-opacity duration-500 ${
              index === activeIndex ? "opacity-100" : "opacity-30"
            }`}
          >
            {section.text}
          </p>
        ))}
      </div>

      {/* <div className="sticky top-[70%] transform -translate-y-1/2 h-screen flex items-center justify-center"> */}
      <div className="sticky top-0 h-[64rem] flex items-center justify-center">
        {/* <img
          src={sections[activeIndex]?.image}
          alt={`Section ${activeIndex + 1}`}
          className="w-3/4 transition-opacity duration-1000 object-cover h-auto"
        /> */}
        <div className="relative size-full">
          <Image
            src={sections[activeIndex]?.image}
            fill
            className="w-3/4 transition-opacity duration-1000 object-cover size-full"
            alt={`Section ${activeIndex + 1}`}
            quality={80}
          />
        </div>
      </div>

      <div className="relative h-[300vh]">
        {sections.map((_, index) => (
          <div
            key={index}
            ref={(el) => (sectionRefs.current[index] = el)}
            className="h-screen"
          ></div>
        ))}
      </div>
    </div>
  );
}

export default LandingFourth;
