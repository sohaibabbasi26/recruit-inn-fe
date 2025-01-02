import { calculateCenterDistance } from "@/util/domCalculations";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";

function RightLineMdSvg({ className, id }) {
  const [xValue, setXValue] = useState(107);
  const svgRef = useRef(null);

  useGSAP(
    () => {
      const updatePath = () => {
        const logo = document.querySelector(".logo");
        const cardThree = document.querySelectorAll(
          ".animate-cards-wrapper .animate-card"
        )[2];
        if (!logo || !cardThree) return;

        const distance = calculateCenterDistance(logo, cardThree);
        setXValue(distance);
        const aD = distance - 10;

        const path = svgRef.current.querySelector("path");
        gsap.to(path, {
          attr: {
            d: `M${aD} 0V9C${aD} 17.8366 ${aD - 8.837} 25 ${
              aD - 16
            } 25H17C8.16427 25 1.00083 32.1634 1.00083 41V62`,
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

  return (
    <svg
      ref={svgRef}
      id={id}
      className={`${className}`}
      viewBox="0 0 124 62"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* <path
        d={`M1.00083 62V41C1.00083 32.1634 8.16427 25 17.0008 25H${xValue}C${
          xValue + 8.837
        } 25 ${xValue + 16} 17.8366 ${xValue + 16} 9V0`}
        stroke="url(#paint0_linear_18883_5171)"
      /> */}
      <path
        d={`M${xValue} 0V9C${xValue} 17.8366 ${xValue - 8.837} 25 ${
          xValue - 16
        } 25H17C8.16427 25 1.00083 32.1634 1.00083 41V62`}
        stroke="url(#paint0_linear_18883_5171)"
      />
      {/* <path
        d="M123 0V9C123 17.8366 115.837 25 107 25H17C8.16427 25 1.00083 32.1634 1.00083 41V62"
        stroke="url(#paint0_linear_18883_5171)"
      /> */}

      <defs>
        <linearGradient
          id="paint0_linear_18883_5171"
          x1="123"
          y1="-3.53323e-06"
          x2="2.5"
          y2="62"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFE0ED" />
          <stop offset="1" stopColor="#E676A8" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default RightLineMdSvg;
