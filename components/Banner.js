import styles from "./Banner.module.css";
import Image from "next/image";

const Banner = () => {
  const successIndicatorSize = 50;
  const rightImg = 200;

  return (
    <div className={styles.nBanner}>
      <Image height={50} width={50} src="/successIndicator.svg" />
      <h1>
        Click on <span>Generate Test</span> to create <br /> AI Interview for
        candidate
      </h1>
    </div>
  );

  //   return (
  //     <>
  //       <div className={styles.bannerContainer}>
  //         <div className={styles.container}>
  //           <div className={styles.leftContent}>
  //             <img
  //               src="/successIndicator.svg"
  //               width={successIndicatorSize}
  //               height={successIndicatorSize}
  //               className="successIndicator"
  //             />
  //             <p>
  //               Click on <span>Generate Test</span> to create AI Assessment for
  //               candidate
  //             </p>
  //           </div>

  //           <div className={styles.rightContent}>
  //             <Image src="/Element.png" width={160} height={160} />
  //           </div>
  //         </div>
  //       </div>
  //     </>
  //   );
};

export default Banner;
