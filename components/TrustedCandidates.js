import { useTheme } from "next-themes";
import styles from "./TrustedCandidates.module.css";
import Image from "next/image";

const TrustedCandidates = () => {
  const { theme } = useTheme();

  // List of logos for easy duplication
  const logos = [
    "/company1.svg",
    "/company2.svg",
    "/company3.svg",
    "/company4.svg",
    "/company5.svg",
    "/company6.svg",
  ];

  return (
    <div className="relative flex flex-col w-[80%] max-md:w-[100%] rounded-lg mb-[3rem] justify-center items-center">
      <span className="text-smallText dark:text-steel text-md text-center">
        Used by
      </span>
      <div className={styles.logos}>
        <div className={styles["logos-slide"]}>
          {/* Original and duplicate logos for smooth animation */}
          {[...logos, ...logos].map((logo, index) => (
            <Image
              key={index}
              src={logo}
              alt="client"
              width={114}
              height={24}
              className={styles.img}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustedCandidates;
