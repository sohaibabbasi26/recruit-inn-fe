import Image from "next/image";
import { checkout } from "@/util/Checkout";
import "tailwindcss/tailwind.css";
import { useRouter } from "next/router";

const  PaymentCard = ({
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
}) => {

   const img1="/checkAI.png"
   const  img2="/crossAI.png"
 

   const router = useRouter();

  return (
    <>
      <div className="w-[90%] max-md:w-[100%] h-[100%] flex justify-center items-center mb-5 ">
        <div
          className={`w-[90%] py-4 px-4 max-md:w-[100%] h-[100%] text-white border-[1px]  ${borderColor} ${shadowColor} rounded-3xl ${bgColor}`}
        >
          <div className={`border-b-[1px] py-3 ${borderColor}`}>
            <span
              className={`${smallTextColor} text-lg font-semibold ${headingColor}`}
            >
              {packageType}
            </span>
            <p className="text-steel dark:text-smallText text-sm font-semibold">
              Everything you need to supercharge your productivity
            </p>
            <div className="flex gradient-text max-lg:justify-center gap-2">
              <h2
                className={`text-3xl font-sans  font-bold gradient-text  ${priceColor}`}
              >
                ${price}
              </h2>
              <span className={`gradient-text mt-3 ${priceColor}`}>{duration}</span>
            </div>
          </div>

          <div
            className="box-border pt-4"
            style={{ boxSizing: "border-box", paddingTop: "1rem" }}
          >
            <div className="">
              <span className="text-gray-500 text-sm">What’s included</span>
              <ul>
                
              {price == 0 ? (
                <li className={`flex py-3 text-sm gap-2  ${smallTextColor}`}>
                  <Image src={`${img1}`} width={20} height={20} />
                  4 reports of candidates
                </li>
                ) : ""}
              {price == 0 ? (
                <li className={`flex py-3 text-sm gap-2  ${smallTextColor}`}>
                  <Image src={`${img1}`} width={20} height={20} />
                  Basic analytics dashboard
                </li>
                ) : ""}
              {price == 75 ? (
                <li className={`flex py-3 text-sm gap-2  ${smallTextColor}`}>
                  <Image src={`${img1}`} width={20} height={20} />
                  25 reports of candidates  
                </li>
                ) : ""}
              {price == 75 ? (
                <li className={`flex py-3 text-sm gap-2  ${smallTextColor}`}>
                  <Image src={`${img1}`} width={20} height={20} />
                  Advanced analytics dashboard
                </li>
                ) : ""}
              {price == 75 ? (
                <li className={`flex py-3 text-sm gap-2  ${smallTextColor}`}>
                  <Image src={`${img1}`} width={20} height={20} />
                  Email support
                </li>
                ) : ""}
              {price == 250 ? (
                <li className={`flex py-3 text-sm gap-2  ${smallTextColor}`}>
                  <Image src={`${img1}`} width={20} height={20} />
                  100 reports of candidates
                </li>
                ) : ""}
              {price == 250 ? (
                <li className={`flex py-3 text-sm gap-2  ${smallTextColor}`}>
                  <Image src={`${img1}`} width={20} height={20} />
                  Advanced analytics dashboard
                </li>
                ) : ""}
              {price == 250 ? (
                <li className={`flex py-3 text-sm gap-2  ${smallTextColor}`}>
                  <Image src={`${img1}`} width={20} height={20} />
                  Priority email support
                </li>
                ) : ""}
              {price == 500 ? (
                <li className={`flex py-3 text-sm gap-2  ${smallTextColor}`}>
                  <Image src={`${img1}`} width={20} height={20} />
                  250 reports of candidates
                </li>
                ) : ""}
              {price == 500 ? (
                <li className={`flex py-3 text-sm gap-2  ${smallTextColor}`}>
                  <Image src={`${img1}`} width={20} height={20} />
                  Priority phone and email support
                </li>
                ) : ""}
              {price == 500 ? (
                <li className={`flex py-3 text-sm gap-2  ${smallTextColor}`}>
                  <Image src={`${img1}`} width={20} height={20} />
                  Dedicated account manager
                </li>
                ) : ""}
              
             
                
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
                router.push(`${process.env.NEXT_PUBLIC_URL}/client-login`)
              }}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentCard;
