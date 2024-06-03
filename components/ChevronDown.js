function ChevronDown({ classes }) {
  //   return (
  //     <svg
  //       fill="currentColor"
  //       height="15px"
  //       width="16px"
  //       viewBox="0 0 407.437 407.437"
  //       xmlns="http://www.w3.org/2000/svg"
  //       xmlnsXlink="http://www.w3.org/1999/xlink"
  //       aria-label="Chevron Down"
  //       className={classes}
  //     >
  //       <polygon points="386.258,91.567 203.718,273.512 21.179,91.567 0,112.815 203.718,315.87 407.437,112.815" />
  //     </svg>
  //   );

  return (
    <svg
      width="16px"
      height="15px"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
    >
      <path
        d="M10 14a.997.997 0 01-.707-.293l-5-5a.999.999 0 111.414-1.414L10 11.586l4.293-4.293a.999.999 0 111.414 1.414l-5 5A.997.997 0 0110 14z"
        fill="currentcolor"
      />
    </svg>
  );
}

export default ChevronDown;
