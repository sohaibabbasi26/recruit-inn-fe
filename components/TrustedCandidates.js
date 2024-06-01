import { useTheme } from "next-themes";
import styles from "./TrustedCandidates.module.css";
import Image from "next/image";

const TrustedCandidates = () => {
  const { theme } = useTheme();
  return (
    <div
      className={`container max-width:  w-[50%] max-md:w-[100%] rounded-lg mb-[3rem]`}
    >
      <span className="text-smallText dark:text-steel text-sm">
        Trusted by many companies around the world.
      </span>
      <div className={styles.logos}>
        <div className={styles["logos-slide"]}>
          <Image
            src={theme === "dark" ? "/companyOne.svg" : "/companyOneDark.svg"}
            alt="client"
            width={120}
            height={80}
            className={styles.img}
          />
          <Image
            src={theme === "dark" ? "/companyTwo.svg" : "/companyTwoDark.svg"}
            alt="client"
            width={120}
            height={80}
            className={styles.img}
          />
          <Image
            src={theme === "dark" ? "/companyOne.svg" : "/companyOneDark.svg"}
            alt="client"
            width={120}
            height={80}
            className={styles.img}
          />
          <Image
            src={theme === "dark" ? "/companyTwo.svg" : "/companyTwoDark.svg"}
            alt="client"
            width={120}
            height={80}
            className={styles.img}
          />
          <Image
            src={theme === "dark" ? "/companyOne.svg" : "/companyOneDark.svg"}
            alt="client"
            width={120}
            height={80}
            className={styles.img}
          />
          <Image
            src={theme === "dark" ? "/companyTwo.svg" : "/companyTwoDark.svg"}
            alt="client"
            width={120}
            height={80}
            className={styles.img}
          />
          <Image
            src={theme === "dark" ? "/companyOne.svg" : "/companyOneDark.svg"}
            alt="client"
            width={120}
            height={80}
            className={styles.img}
          />
          <Image
            src={theme === "dark" ? "/companyTwo.svg" : "/companyTwoDark.svg"}
            alt="client"
            width={120}
            height={80}
            className={styles.img}
          />
          <Image
            src={theme === "dark" ? "/companyOne.svg" : "/companyOneDark.svg"}
            alt="client"
            width={120}
            height={80}
            className={styles.img}
          />
          <Image
            src={theme === "dark" ? "/companyTwo.svg" : "/companyTwoDark.svg"}
            alt="client"
            width={120}
            height={80}
            className={styles.img}
          />
          <Image
            src={theme === "dark" ? "/companyOne.svg" : "/companyOneDark.svg"}
            alt="client"
            width={120}
            height={80}
            className={styles.img}
          />
          <Image
            src={theme === "dark" ? "/companyTwo.svg" : "/companyTwoDark.svg"}
            alt="client"
            width={120}
            height={80}
            className={styles.img}
          />
        </div>
      </div>
    </div>
  );
};
export default TrustedCandidates;
