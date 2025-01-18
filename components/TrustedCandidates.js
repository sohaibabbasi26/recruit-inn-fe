import { useTheme } from "next-themes";
import styles from "./TrustedCandidates.module.css";
import Image from "next/image";

const TrustedCandidates = () => {
  const { theme } = useTheme();

  const logos = [
    "/cvt.png",
    "/360.png",
    "/skillbuilder.png",
    "/ut.png",
    "company4.svg",
    "/linkify.png",
  ];

  return (
    <div className="relative flex flex-col w-[90%] max-w-[100%] overflow-hidden rounded-lg mb-[3rem] justify-center items-center">
      <span className="text-smallText dark:text-steel text-md text-center">
        Used by
      </span>
      <div className={styles.logos}>
        <div className={styles["logos-slide"]}>
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
