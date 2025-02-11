import Image from "next/image";
import { checkout } from "@/util/Checkout";
import "tailwindcss/tailwind.css";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";

const PaymentCard = ({
  bgColor,
  headingColor,
  smallTextColor,
  borderColor,
  shadowColor,
  bg,
  priceColor,
  packageType,
  price,
  duration,
  t,
}) => {
  const img1 = "/checkAI.png";
  const img2 = "/crossAI.png";

  const router = useRouter();

  const { theme } = useTheme();
  const { i18n } = useTranslation(); // Get i18n instance
  const isRTL = i18n.dir() === "rtl";


  return (
    <>
      <div className="w-[90%] max-md:w-[100%] h-[100%] flex justify-center items-center mb-5 ">
        <div
          dir={isRTL ? "rtl" : "ltr"}
          className={`w-[90%] py-4 px-4 max-md:w-[100%] h-[100%] text-white border-[1px]  ${borderColor} ${shadowColor} rounded-3xl ${bgColor}`}
        >
          <div className={`border-b-[1px] py-3 ${borderColor}`}>
            <span
              className={`${smallTextColor}  text-lg font-semibold ${headingColor}`}
            >
              {packageType}
            </span>
            {/* <p className="text-steel dark:text-smallText text-sm font-semibold">
              {t("Packages.P1_heading")}
            </p> */}
            <div className="flex gradient-text max-lg:justify-center gap-2">
              <h2
                className={`text-4xl font-sans mt-3  font-bold gradient-text  ${priceColor}`}
              >
                ${price}
              </h2>
              <span className={`gradient-text mt-3 ${priceColor}`}>
                {duration}
              </span>
            </div>
          </div>

          <div
            className="box-border pt-4"
            style={{ boxSizing: "border-box", paddingTop: "1rem" }}
          >
            <div className="">
              <span className="text-gray-500 text-sm">{t("Packages.WhatsIncluded")}</span>
              <ul>
                {price == 0 ? (
                  <li className={`flex py-3 text-sm gap-2  ${smallTextColor}`}>
                    <Image src={`${img1}`} width={20} height={20} /> {t("Packages.P1_reports")}
                  </li>
                ) : (
                  ""
                )}
                {price == 0 ? (
                  <li className={`flex py-3 text-sm gap-2  ${smallTextColor}`}>
                    <Image src={`${img1}`} width={20} height={20} />
                    {t("Packages.P1_dashboard")}
                  </li>
                ) : (
                  ""
                )}
                {price == 0 ? (
                  <li className={`flex py-3 text-sm gap-2 text-gray-500`}>
                    <Image
                      src={`${img2}`}
                      width={20}
                      height={20}
                      alt="Feature icon"
                      style={{opacity: 0}}
                    />

                    {/* {t("Packages.P1_support")} */}

                      


                  </li>
                ) : (
                  ""
                )}

                {price == 75 ? (
                  <li className={`flex py-3 text-sm gap-2  ${smallTextColor}`}>
                    <Image src={`${img1}`} width={20} height={20} />
                    {t("Packages.P2_reports")}
                  </li>
                ) : (
                  ""
                )}
                {price == 75 ? (
                  <li className={`flex py-3 text-sm gap-2  ${smallTextColor}`}>
                    <Image src={`${img1}`} width={20} height={20} />
                    {t("Packages.P2_dashboard")}
                  </li>
                ) : (
                  ""
                )}
                {price == 75 ? (
                  <li className={`flex py-3 text-sm gap-2 text-gray-500`}>
                    <Image
                      src={`${img2}`}
                      width={20}
                      height={20}
                      alt="Feature icon"
                      style={{opacity: 0}}
                    />
                    {/* {t("Packages.P2_support")} */}
                  </li>
                ) : (
                  ""
                )}
                {price == 250 ? (
                  <li className={`flex py-3 text-sm gap-2  ${smallTextColor}`}>
                    <Image src={`${img1}`} width={20} height={20} />
                    {t("Packages.P3_reports")}
                  </li>
                ) : (
                  ""
                )}
                {price == 250 ? (
                  <li className={`flex py-3 text-sm gap-2  ${smallTextColor}`}>
                    <Image src={`${img1}`} width={20} height={20} />
                    {t("Packages.P3_dashboard")}
                  </li>
                ) : (
                  ""
                )}
                {price == 250 ? (
                  <li className={`flex py-3 text-sm gap-2  ${smallTextColor}`}>
                    <Image src={`${img1}`} width={20} height={20} />
                    {t("Packages.P3_support")}
                  </li>
                ) : (
                  ""
                )}
                {price == 500 ? (
                  <li className={`flex py-3 text-sm gap-2  ${smallTextColor}`}>
                    <Image src={`${img1}`} width={20} height={20} />
                    {t("Packages.P4_reports")}
                  </li>
                ) : (
                  ""
                )}
                {price == 500 ? (
                  <li className={`flex py-3 text-sm gap-2  ${smallTextColor}`}>
                    <Image src={`${img1}`} width={20} height={20} />
                    {t("Packages.P4_dashboard")}
                  </li>
                ) : (
                  ""
                )}
                {price == 500 ? (
                  <li className={`flex py-3 text-sm gap-2  ${smallTextColor}`}>
                    <Image src={`${img1}`} width={20} height={20} />
                    {t("Packages.P4_support")}
                  
                  </li>
                ) : (
                  ""
                )}
              </ul>
            </div>

            <button
              className={`${bg} mt-[4rem] w-[100%] py-2 rounded-3xl text-sm font-semibold font-sans`}
              onClick={() => {
                // checkout({
                //   lineItems: [
                //     { price: "price_1QaDZmCtLGKA7fQGcVUeXm7i", quantity: 1 },
                //   ],
                // }

                // );
                localStorage.setItem("clickedPackage", true);
                router.push(`${process.env.NEXT_PUBLIC_URL}/client-login`);
              }}
            >
              {t("Packages.P_btn")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentCard;
