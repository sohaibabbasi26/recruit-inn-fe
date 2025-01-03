import { calculateCenterDistance } from "@/util/domCalculations";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";

function LeftLineMdSvg({ className, id }) {
  const [xValue, setXValue] = useState(107);
  const svgRef = useRef(null);

  useGSAP(
    () => {
      const updatePath = () => {
        const logo = document.querySelector(".logo");
        const cardTwo = document.querySelectorAll(
          ".animate-cards-wrapper .animate-card"
        )[1];
        if (!logo || !cardTwo) return;

        const distance = calculateCenterDistance(cardTwo, logo);
        setXValue(distance);

        const path = svgRef.current.querySelector("path");
        gsap.to(path, {
          attr: {
            d: `M1 0V9C1 17.8366 8.16345 25 17 25H${distance}C${
              distance + 8.837
            } 25 ${distance + 16} 32.1634 ${distance + 16} 41V62`,
          },
          // onUpdate: () => {
          //   console.log("update");
          // },
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

  return (
    <svg
      ref={svgRef}
      id={id}
      className={className}
      viewBox="0 0 149 62"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
    >
      <path
        d={`M1 0V9C1 17.8366 8.16345 25 17 25H${xValue}C115.837 25 ${
          xValue + 16
        } 32.1634 ${xValue + 16} 41V62`}
        stroke="url(#paint0_linear_18883_5169)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_18883_5169"
          x1="1"
          y1="0"
          x2="150"
          y2="66.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#B7E8AB" />
          <stop offset="1" stopColor="#8CDF78" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default LeftLineMdSvg;
