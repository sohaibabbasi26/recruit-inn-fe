import { calculateCenterDistance } from "@/util/domCalculations";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";

function RightLineLgSvg({ className, id }) {
  const [xValue, setXValue] = useState(375);

  const svgRef = useRef(null);

  useGSAP(() => {
    const updatePath = () => {
      const logo = document.querySelector(".logo");
      const cardFour = document.querySelectorAll(
        ".animate-cards-wrapper .animate-card"
      )[3];
      if (!logo || !cardFour) return;

      const distance = calculateCenterDistance(logo, cardFour);
      setXValue(distance);

      const path = svgRef.current.querySelector("path");
      gsap.to(path, {
        attr: {
          d: `M${distance} 0V21C${distance} 29.8366 ${distance - 8.837} 37 ${
            distance - 16
          } 37H9C4.58172 37 1 40.5817 1 45V62`,
        },
      });
    };

    updatePath();
  }, []);

  return (
    <svg
      ref={svgRef}
      id={id}
      className={className}
      viewBox="0 0 376 62"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
    >
      <path
        d={`M${xValue} 0V21C${xValue} 29.8366 ${xValue - 8.837} 37 ${
          xValue - 16
        } 37H9C4.58172 37 1 40.5817 1 45V62`}
        stroke="url(#paint0_linear_18883_5173)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_18883_5173"
          x1="1"
          y1="62"
          x2="379"
          y2="5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#8CDF78" />
          <stop offset="0.572035" stopColor="#B7E8AB" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default RightLineLgSvg;
