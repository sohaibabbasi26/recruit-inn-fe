function leftLineMdSvg({ className, id, xValue = 107 }) {
  return (
    <svg
      id={id}
      className={`${className}`}
      viewBox="0 0 149 62"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* <path
        d="M1 0V9C1 17.8366 8.16345 25 17 25H132C140.837 25 148 32.1634 148 41V62"
        stroke="url(#paint0_linear_18883_5169)"
      /> */}
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

export default leftLineMdSvg;
