

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
      className={`container h-[50%] w-[100%] rounded-lg flex justify-center overflow-hidden`}
    >
      <div className={`${styles.logos}`}>
        <div className={`${styles["logos-slide"]} gap-10`}>
          {/* Render images twice for seamless scrolling */}
          {[...images, ...images].map((src, index) => (
            <div
              key={index}
              className={`${styles.imageWrapper} border-2 border-solid ${
                theme === "dark" ? "bg-smallDiv" : "bg-white"
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
