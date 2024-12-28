import styles from "./TechstackOne.module.css";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

const TechstackThree = () => {
  const { theme } = useTheme();
  const images = [
    "/graphql.svg",
    "/c++.svg",
    "/reactjs.svg",
    "/typescript.svg",
  ];
  const [currentImages, setCurrentImages] = useState(images);
  return (
    <div
      className={`container h-[50%] w-[100%]  rounded-lg  flex justify-center`}
    >
      <div className={`${styles.logos} h-[16rem] w-80p flex justify-center `}>
        <div className={`${styles["logos-slide"]} h-[100%] gap-10  `}>
        
          {images.map((src, index) => (
            <div
              className={`${styles.imageWrapper}  border-2 border-solid  ${
                theme === "dark"
                  ? " bg-smallDiv"
                  : " bg-white"
              }`}
            >
              <Image
                key={index}
                src={src}
                alt="Tech Logo"
                width={240}
                height={240}
                className={styles.img}
              />
            </div>
          ))}
          {images.map((src, index) => (
            <div
              className={`${styles.imageWrapper}  border-2 border-solid   ${
                theme === "dark"
                  ? "border-themePurple bg-smallDiv"
                  : "border-themePurple bg-white"
              }`}
            >
              <Image
                key={`duplicate-${index}`}
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
export default TechstackThree;
