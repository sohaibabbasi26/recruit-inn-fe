function leftLineLgSvg({ className, id }) {
  return (
    <svg
      id={id}
      className={`${className} size-full line-one w-max`}
      viewBox="0 0 376 62"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
    >
      <path
        d="M1 0V21C1 29.8366 8.16345 37 17 37H367C371.418 37 375 40.5817 375 45V62"
        stroke="url(#paint0_linear_18883_5168)"
      />

      <defs>
        <linearGradient
          id="paint0_linear_18883_5168"
          x1="375"
          y1="62"
          x2="-3"
          y2="5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#FFB384" />
          <stop offset="0.572035" stop-color="#F9DAC6" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default leftLineLgSvg;
