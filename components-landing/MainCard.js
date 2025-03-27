import Image from "next/image";
import "tailwindcss/tailwind.css";
import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";

const MainCard = ({t}) => {
  const { theme } = useTheme();
  const { i18n } = useTranslation(); // Get i18n instance
  const isRTL = i18n.dir() === "rtl";
  return (
    <div className=" space-y-3 py-20 border-darkPurple overflow-hidden">
      {/* Flash Message */}
      <div className="flex justify-center">
        <div className="flex items-center rounded-2xl border border-darkPurple bg-white-purple-shade px-4 py-2">
          <div className="mr-2">
            <Image src="/flash.png" alt="Flash Icon" width={20} height={20} />
          </div>
          <span dir={isRTL ? "rtl" : "ltr"}  className="text-lightPurpleText text-sm">
        {t("InterviewSection.IS_title")}
            
          </span>
        </div>
      </div>

      {/* Title */}
      <h4 dir={isRTL ? "rtl" : "ltr"}  className="text-center text-black dark:text-white text-5xl font-bold">
        {t("InterviewSection.IS_heading")}
      </h4>

      {/* Subtitle */}
      <div className="w-100p flex justify-center !mt-6">
        {" "}
        <p  dir={isRTL ? "rtl" : "ltr"} className=" text-center max-xsm:w-90p xsm:w-90p sm:w-70p md:w-60p lg:w-40p ">
        {t("InterviewSection.IS_subheading")}
          
          {" "}
        </p>
      </div>
    </div>
  );
};

export default MainCard;
