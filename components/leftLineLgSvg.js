import { calculateCenterDistance } from "@/util/domCalculations";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";

function LeftLineLgSvg({ className, id }) {
  const [xValue, setXValue] = useState(367);
  const svgRef = useRef(null);

  useGSAP(
    () => {
      const updatePath = () => {
        const logo = document.querySelector(".logo");
        const cardOne = document.querySelectorAll(
          ".animate-cards-wrapper .animate-card"
        )[0];
        if (!logo || !cardOne) return;

        const distance = calculateCenterDistance(cardOne, logo) + 30; // add 30 for now, should be calculated
        setXValue(distance);

        const path = svgRef.current.querySelector("path");
        gsap.to(path, {
          attr: {
            d: `M1 0V21C1 29.8366 8.16345 37 17 37H${distance}C${
              distance + 4.418
            } 37 ${distance + 8} 40.5817 ${distance + 8} 45V62`,
          },
        });
      };
      updatePath();

      window.addEventListener("resize", updatePath);
      // useGsap cleans event listeners on unmount i think, adding a cleanup function for now to be sure
      return () => {
        window.removeEventListener("resize", updatePath);
      };
    },
    { scope: svgRef.current }
  );

  const pathData = `M1 0V21C1 29.8366 8.16345 37 17 37H${xValue}C${
    xValue + 4.418
  } 37 ${xValue + 8} 40.5817 ${xValue + 8} 45V62`;

  return (
    <svg
      ref={svgRef}
      id={id}
      className={className}
      viewBox="0 0 376 62"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
    >
      <path d={pathData} stroke="url(#paint0_linear_18883_5168)" />
      <defs>
        <linearGradient
          id="paint0_linear_18883_5168"
          x1="375"
          y1="62"
          x2="-3"
          y2="5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFB384" />
          <stop offset="0.572035" stopColor="#F9DAC6" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default LeftLineLgSvg;
