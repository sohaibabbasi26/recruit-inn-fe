import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";
import { useRef, useState } from "react";
import rectangle1 from "../public/Rectangle1.png";
import rectangle2 from "../public/Rectangle2.png";
import rectangle3 from "../public/Rectangle3.png";
import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";


gsap.registerPlugin(ScrollTrigger);

const images = [rectangle1, rectangle2, rectangle3];

function RecruitInnProcess({t}) {
  
  const { theme } = useTheme();
  const { i18n } = useTranslation(); // Get i18n instance
  const isRTL = i18n.dir() === "rtl";

  const [activeIndex, setActiveIndex] = useState(0);
  const container2 = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container2.current,
          pin: true,
          start: "top 100",
          end: "+=1500",
          scrub: 1,
          delay: 0,
          // Set to false on production
          // markers: true,
        },
      });

      // Define normalized start points
      const firstAnimationStart = 500 / 1500;
      const secondAnimationStart = firstAnimationStart + 0.33;
      const thirdAnimationStart = secondAnimationStart + 0.33;

      tl.addLabel("img1Start", firstAnimationStart)
        .fromTo(
          ".img1",
          { y: 0, scale: 1, opacity: 1, autoAlpha: 1 },
          {
            scale: 0.95,
            opacity: 0,
            autoAlpha: 0,
            duration: 0.5,
            ease: "power1.out",
          },
          "img1Start"
        )
        .addLabel("img2Start", secondAnimationStart)
        .to(".image-1-text", { opacity: 0.2, scale: 0.9 }, "img2Start")
        .to(".image-2-text", { opacity: 1, scale: 1 }, "img2Start")
        .fromTo(
          ".img2",
          { scale: 0.95, opacity: 0, autoAlpha: 0 },
          {
            scale: 1,
            autoAlpha: 1,
            opacity: 1,
            duration: 0.1,
            ease: "power1.in",
          },
          "img2Start"
        )
        .addLabel("img3Start", thirdAnimationStart)
        .to(
          ".img2",
          { scale: 0.95, opacity: 0, autoAlpha: 0, duration: 0.2 },
          "img3Start"
        )
        .to(".image-2-text", { opacity: 0.2, scale: 0.9 }, "img3Start")
        .to(".image-3-text", { opacity: 1, scale: 1 }, "img3Start")
        .fromTo(
          ".img3",
          { scale: 0.95, opacity: 0, autoAlpha: 0 },
          {
            scale: 1,
            opacity: 1,
            autoAlpha: 1,
            duration: 0.2,
            ease: "power1.in",
          },
          "img3Start"
        );

      // text styles
      //   tl.to(".image-1-text", { opacity: 0.3 }, "img2Start");
      //   tl.to(".image-2-text", { opacity: 1 }, "img2Start");
    },
    { scope: container2 }
  );

  return (
    <div
      ref={container2}
      className="section4 relative space-y-8 mt-16 w-90p mx-auto  max-md:hidden md:block"
    >
      <h2 className="heading text-3xl font-bold text-center block leading-[unset] transition-opacity duration-500">
        {" "}
        <span dir={isRTL ? "rtl" : "ltr"} className="image-1-text">
          {t("RecruitInnProcess.RP_txt1")}
        </span>
        &nbsp;&nbsp;
        <span dir={isRTL ? "rtl" : "ltr"} className="image-2-text opacity-30">
        {t("RecruitInnProcess.RP_txt2")}

        </span>
        &nbsp;&nbsp;
        <span  dir={isRTL ? "rtl" : "ltr"} className="image-3-text opacity-30">
        {t("RecruitInnProcess.RP_txt3")}
          
        </span>
      </h2>

      <div className="landing-fourth-images space-y-8 relative">
        <div className="h-[41rem] relative overflow-hidden w-2/3 mx-auto relative-space-y-8">
          <Image
            src={rectangle1}
            className={`img1 z-[3] relative size-full`}
            alt={`Section image-1`}
            placeholder="blur"
            quality={80}
          />
          <Image
            src={rectangle2}
            className={`img2 z-[2] size-full absolute top-0 `}
            alt={`Section image-2`}
            placeholder="blur"
            quality={80}
          />
          <Image
            src={rectangle3}
            className={`img3 z-[1] size-full absolute top-0`}
            alt={`Section image-3`}
            placeholder="blur"
            quality={80}
          />
        </div>
        {/* {images.map((image, i) => (
          <div key={i} className="relative-space-y-8">
            <Image
              src={image}
              className={`img${i + 1} h-[40rem] w-2/3 mx-auto`}
              alt={`Section image ${i}`}
              placeholder="blur"
              quality={80}
            />
          </div>
        ))} */}
      </div>
    </div>
  );
}

export default RecruitInnProcess;
