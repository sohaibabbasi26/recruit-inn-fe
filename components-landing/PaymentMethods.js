"use client";
import "tailwindcss/tailwind.css";
import PaymentCard from "../components/PaymentCard";
import styles from "./PaymentMethods.module.css";
import Image from "next/image";
import { useState } from "react";
import style from "./styles.module.css";
import { useTheme } from "next-themes";
// import './landingGlobal.css';

// import { checkout } from "@/Checkout";
export default function PaymentMethods({t}) {
  const [selectedOption, setSelectedOption] = useState("monthly");
  const { theme } = useTheme();
 
  return (
    <div className="w-[100%] h-[100%] flex flex-col items-center max-md:text-center">
      <div className="w-9/10 max-md:w-[90%] h-1/2 mb-4">
        <h1 className="text-center text-5xl font-bold text-gray-900">
          {t("Packages.P_heading")}
        </h1>
        <p className="text-center text-md text-gray-500 mt-2">
        {t("Packages.P_subheading")}

        </p>
        <div className="text-center mt-4   ">
          {/* <div
            className={`inline-block relative w-[61%] py-1  bg-white dark:bg-[#141414] text-black dark:text-white max-md:mb-4 border border[#F0EDFC] dark:border-black rounded-full  ${
              selectedOption === "monthly" ? "text-white" : ""
            }`}
          >
            <input
              type="radio"
              name="duration"
              value="monthly"
              id="monthly"
              className="sr-only  "
              checked={selectedOption === "monthly"}
              onChange={() => setSelectedOption("monthly")}
            />
            <label
              htmlFor="monthly"
              className={`text-sm font-sans inline-block w-30 h-10 leading-10 cursor-pointer z-10 ${
                selectedOption === "monthly"
                  ? "w-60p bg-gradient-to-r from-[#6137DB] to-[#220772] rounded-full relative right-[3px] "
                  : ""
              }`}
            >
               Monthly Billing
            </label>

            <input
              type="radio"
              name="duration"
              value="yearly"
              id="yearly"
              className="sr-only"
              checked={selectedOption === "yearly"}
              onChange={() => setSelectedOption("yearly")}
            />
            <label
              htmlFor="yearly"
              className={`inline-block font-sans text-sm text-black dark:text-white w-30 h-10  mr-1 leading-10 cursor-pointer  z-10 ${
                selectedOption === "yearly"
                  ? "w-60p bg-gradient-to-r from-[#6137DB] to-[#220772] rounded-full"
                  : ""
              } ${selectedOption === "yearly" ? "text-white" : ""} `}
            >
              Yearly Billing
            </label>
          </div> */}
          
        </div>
      </div>
      
      <div className="flex h-[100%] w-[90%] mb-[3rem] max-md:hidden ">
        <PaymentCard
        t={t}
          bgColor={theme === "dark" ? "bg-black" : "bg-white"}
          headingColor={"text-lightPurpleText"}
          // smallTextColor={"text-lightText"}
          smallTextColor={"text-primary"}
          borderColor={theme === "dark" ? "border-somePurple" : "white"}
          bg={
            theme === "dark"
              ? "bg-darkPaymentPurple"
              : "text-primary bg-light-purple-shade "
          }
        
          // priceColor={style["gradient-text"]}
          priceColor={theme === "dark" ? "text-white" : "text-black"}
          duration={selectedOption === "monthly" ? t("Packages.P_month") : "/year"}
          packageType= {t("Packages.P1_packageType")}
          price= {t("Packages.P1_price")}
        />
        <PaymentCard
        t={t}
          bgColor={theme === "dark" ? "bg-black" : "bg-white"}
          headingColor={"text-lightPurpleText"}
          // smallTextColor={"text-lightText"}
          smallTextColor={"text-primary"}
        
          borderColor={theme === "dark" ? "border-somePurple" : "#F0EDFC"}
          bg={
            theme === "dark"
              ? "bg-darkPaymentPurple"
              : "text-primary bg-light-purple-shade "
          }
         
          // priceColor={style["gradient-text"]}
          duration={selectedOption === "monthly" ? t("Packages.P_month") : "/year"}
          priceColor={theme === "dark" ? "text-white" : "text-black"}
          packageType={t("Packages.P2_packageType")}
          price= {t("Packages.P2_price")}
        />
        <PaymentCard
        t={t}
          bgColor={
            theme === "dark" ? style["payment-pro-gradient"] : "bg-white"
          }
          headingColor={"text-lightPurpleText"}
          // smallTextColor={"text-lightText"}
          smallTextColor={"text-primary"}
          borderColor={theme === "dark" ? "border-somePurple" : "border-black"}
          bg={
            theme === "dark"
              ? style["payment-card-pro-button"]
              : "text-white bg-primary"
          }
         
          duration={selectedOption === "monthly" ? t("Packages.P_month") : "/year"}
          // priceColor={style["gradient-text"]}
          priceColor={theme === "dark" ? "text-white" : "text-black"}
          packageType= {t("Packages.P3_packageType")}
          price= {t("Packages.P3_price")}
        />
       
        <PaymentCard
        t={t}
          bgColor={
            theme === "dark" ? style["payment-enterprise-gradient"] : "bg-white"
          }
          headingColor={"text-lightPurpleText"}
          smallTextColor={"text-lightPurpleText"}
          borderColor={"border-lightPurpleText"}
          shadowColor={"shadow-2xl-purple"}
          bg={
            theme === "dark"
              ? style["btn-golden"]
              : style["payment-card-pro-button"]
          }
          duration={selectedOption === "monthly" ? t("Packages.P_month") : "/year"}
         
          // priceColor={style["golden-gradient-text"]}
          priceColor="text-lightPurpleText"
          packageType= {t("Packages.P4_packageType")}
          price= {t("Packages.P4_price")}
        />
      </div>
      {/* mobile screnn */}
      <div className="hidden w-[90%]  max-md:block">
        <div className="flex h-[100%] w-[100%] flex-col items-center mb-[3rem] max-md:text-center">
          <PaymentCard
          t={t}
            bgColor={theme === "dark" ? "bg-black" : "bg-white"}
            headingColor={"text-lightPurpleText"}
            // smallTextColor={"text-lightText"}
            smallTextColor={"text-primary"}
            borderColor={"border-somePurple"}
            bg={
              theme === "dark"
                ? "bg-darkPaymentPurple"
                : "text-primary bg-light-purple-shade "
            }
            img={"/included.png"}
            packageType= {t("Packages.P1_packageType")}
            price= {t("Packages.P1_price")}
            // priceColor={style["gradient-text"]}
            priceColor={theme === "dark" ? "text-white" : "text-black"}
            duration={selectedOption === "monthly" ? t("Packages.P_month") : "/year"}
          />
        </div>
        <div className="flex h-[100%] w-[100%] flex-col  mb-[3rem] items-center max-md:text-center">
          <PaymentCard
          t={t}
            bgColor={theme === "dark" ? "bg-black" : "bg-white"}
            headingColor={"text-lightPurpleText"}
            // smallTextColor={"text-lightText"}
            smallTextColor={"text-primary"}
            borderColor={"border-somePurple"}
            bg={
              theme === "dark"
                ? "bg-darkPaymentPurple"
                : "text-primary bg-light-purple-shade "
            }
            img={"/included.png"}
            packageType= {t("Packages.P2_packageType")}
             price= {t("Packages.P2_price")}
            // priceColor={style["gradient-text"]}
            priceColor={theme === "dark" ? "text-white" : "text-black"}
            duration={selectedOption === "monthly" ? t("Packages.P_month") : "/year"}
          />
        </div>
        <div className="flex h-[100%] w-[100%] flex-col  mb-[3rem] items-center max-md:text-center">
          <PaymentCard
          t={t}
            bgColor={
              theme === "dark" ? style["payment-pro-gradient"] : "bg-white"
            }
            headingColor={"text-lightPurpleText"}
            // smallTextColor={"text-lightText"}
            smallTextColor={"text-primary"}
            borderColor={"border-somePurple"}
            bg={
              theme === "dark"
                ? style["payment-card-pro-button"]
                : "text-white bg-primary"
            }
            img={"/included.png"}
             packageType= {t("Packages.P3_packageType")}
             price= {t("Packages.P3_price")}
            // priceColor={style["gradient-text"]}
            priceColor={theme === "dark" ? "text-white" : "text-black"}
            duration={selectedOption === "monthly" ? t("Packages.P_month") : "/year"}
          />
        </div>
        <div className="flex h-[100%] w-[100%] flex-col  mb-[3rem] items-center max-md:text-center">
          <PaymentCard
          t={t}
            bgColor={
              theme === "dark"
                ? style["payment-enterprise-gradient"]
                : "bg-white"
            }
            headingColor={"text-goldenTextColor"}
            smallTextColor={"text-goldenLightText"}
            borderColor={"border-goldenTextColor"}
            // bg={"btn-golden"}
            bg={
              theme === "dark"
                ? style["btn-golden"]
                : style["payment-card-pro-button"]
            }
            img={"/Gold-Include.png"}
             packageType= {t("Packages.P4_packageType")}
             price= {t("Packages.P4_price")}
            // priceColor={style["golden-gradient-text"]}
            priceColor="text-lightPurpleText"
            duration={selectedOption === "monthly" ? t("Packages.P_month") : "/year"}
          />
        </div>
      </div>
    </div>
  );
}
