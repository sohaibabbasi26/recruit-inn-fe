import styles from "./TechstackTwo.module.css";
import Image from "next/image";
import { useTheme } from "next-themes";
const TechstackTwo = () => {
  const { theme } = useTheme();
  const images = [
    "/rails.svg",
    "/swift.svg",
    "/nextii.png",
    "/ruby.svg",
    
    
   
  ];

  return (
    <div
      className={`container h-[50%] w-[100%]  rounded-lg mb-[0.5rem] flex justify-center`}
    >
      <div className={`${styles.logos} h-[16rem] w-80p flex justify-center`}>
        <div className={`${styles["logos-slide"]} h-[100%] gap-10 `}>
          {/* <Image src='/cplusplus.png' alt="client" width={1240} height={1240} className={styles.img} />
                    <Image src='/python.png' alt="client" width={240} height={240} className={styles.img} />
                    <Image src='/cplusplus.png' alt="client" width={240} heigh={240} className={styles.img} />
                    <Image src='/python.png' alt="client" width={240} height={240} className={styles.img} />
                    <Image src='/cplusplus.png' alt="client" width={240} height={240} className={styles.img} />
                    <Image src='/python.png' alt="client" width={240} height={240} className={styles.img} />
                    <Image src='/cplusplus.png' alt="client" width={240} height={240} className={styles.img} />
                    <Image src='/python.png' alt="client" width={240} height={240} className={styles.img} />
                    <Image src='/cplusplus.png' alt="client" width={240} height={240} className={styles.img} />
                    <Image src='/python.png' alt="client" width={240} height={240} className={styles.img} />
                    <Image src='/cplusplus.png' alt="client" width={240} height={240} className={styles.img} />
                    <Image src='/python.png' alt="client" width={240} height={240} className={styles.img} /> */}

          {images.map((src, index) => (
             <div
             className={`${styles.imageWrapper}  border-2 border-solid    ${
               theme === "dark" ? "border-themePurple bg-smallDiv" : "border-themePurple bg-white"
             }`}
            >
            <Image
             key={index}
              src={src}
              alt="Tech Logo"
              width={240}
              height={140}
              className={styles.img}
            />
            </div>
          ))}
          {images.map((src, index) => (
             <div
             className={`${styles.imageWrapper}  border-2 border-solid    ${
               theme === "dark" ? "border-themePurple bg-smallDiv" : "border-themePurple bg-white"
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
export default TechstackTwo;
