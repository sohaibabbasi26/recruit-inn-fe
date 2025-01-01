
import styles from "./TechstackOne.module.css";
import Image from "next/image";
import { useTheme } from "next-themes";

const TechstackOne = () => {
  const { theme } = useTheme();
  const images = [
    "/graphql.svg",
    "/c++.svg",
    "/reactjs.svg",
    "/typescript.svg",
  ];

  return (
    <div
      className={`${styles.container} h-[50%] w-[100%] rounded-lg mb-[0.5rem] flex justify-center`}
    >
      <div
        className={`${styles.logos} h-[16rem] w-80p flex justify-center`}
      >
        <div
          className={`${styles["logos-slide"]} h-[100%] gap-10`}
        >
          {images.map((src, index) => (
            <div
              key={index}
              className={`${
                styles.imageWrapper
              } border-2 border-solid ${
                theme === "dark"
                  ? "border-themePurple bg-smallDiv"
                  : "border-themePurple bg-white"
              }`}
            >
              <Image
                src={src}
                alt="Tech Logo"
                width={240}
                height={240}
                className={styles.img}
              />
            </div>
          ))}
          {/* Duplicate logos */}
          {images.map((src, index) => (
            <div
              key={`duplicate-${index}`}
              className={`${
                styles.imageWrapper
              } border-2 border-solid ${
                theme === "dark"
                  ? "border-themePurple bg-smallDiv"
                  : "border-themePurple bg-white"
              }`}
            >
              <Image
                src={src}
                alt="Tech Logo"
                width={240}
                height={240}
                className={styles.img}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechstackOne;
