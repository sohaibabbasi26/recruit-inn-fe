import { current } from "@reduxjs/toolkit";
import styles from "./PackagesCards.module.css";
import Image from "next/image";
import { useRouter } from "next/router";

// packages
const packages = {
  availableOptions: [
    "4 Reports of candidates",
    "Add upto 4 skills",
    "4 Reports of candidates",
    "Add upto 4 skills",
    "4 Reports of candidates",
    "Add upto 4 skills",
  ],
  availablePackages: [
    {
      buttonText: "select",
      name: "free",
      price: "0",
      options: ["4 Reports of candidates", "Add upto 4 skills"],
      plan: {
        link:
          process.env.NEXT_PUBLIC_NODE_ENV === "development"
            ? `${process.env.NEXT_PUBLIC_URL}`
            : "",
        priceId: process.env.NEXT_PUBLIC_NODE_ENV === "development" ? "" : "",
      },
    },

    {
      buttonText: "Get Started",
      name: "starter",
      price: "75",
      options: [
        "4 Reports of candidates",
        "Add upto 4 skills",
        "4 Reports of candidates",
      ],
      plan: {
        link:
          process.env.NEXT_PUBLIC_NODE_ENV === "development"
            ? "https://buy.stripe.com/test_14k8wZbYtaYdare000"
            : "https://buy.stripe.com/3csdTc4SXcJtaHu3ce",
        priceId:
          process.env.NEXT_PUBLIC_NODE_ENV === "development"
            ? "price_1QbfpTIbmKDX9zs5CJCWmiQ2"
            : "price_1QrdF5IbmKDX9zs52cPWgvje",
      },
    },
    {
      buttonText: "Get Started",
      name: "growth",
      price: "250",
      options: [
        "4 Reports of candidates",
        "Add upto 4 skills",
        "4 Reports of candidates",
        "Add upto 4 skills",
        "4 Reports of candidates",
      ],
      plan: {
        link:
          process.env.NEXT_PUBLIC_NODE_ENV === "development"
            ? "https://buy.stripe.com/test_eVa3cF7Ideap9nabIJ"
            : "https://buy.stripe.com/6oE5mG7157p93f2289",
        priceId:
          process.env.NEXT_PUBLIC_NODE_ENV === "development"
            ? "price_1QbfrMIbmKDX9zs5Q5sr45a3"
            : "price_1QrdF3IbmKDX9zs5QcypqKeK",
      },
    },
    {
      buttonText: "Get Started",
      name: "enterprise",
      price: "500",
      options: [
        "4 Reports of candidates",
        "Add upto 4 skills",
        "4 Reports of candidates",
        "Add upto 4 skills",
        "4 Reports of candidates",
        "Add upto 4 skills",
      ],
      plan: {
        link:
          process.env.NEXT_PUBLIC_NODE_ENV === "development"
            ? "https://buy.stripe.com/test_3cs00t5A55DT42QbIK"
            : "https://buy.stripe.com/00g7uOfxB7p9cPC000",
        priceId:
          process.env.NEXT_PUBLIC_NODE_ENV === "development"
            ? "price_1QbfsIIbmKDX9zs54maF5Vpa"
            : "price_1QrdEzIbmKDX9zs5O6Rx409r",
      },
    },
  ],
};

export default function PackagesCards({ companyEmail, currentPackage}) {

   const router = useRouter();
   const { id } = router?.query;

   console.log("Current Packkage iss", currentPackage)


  const handleCheckout = async (pack) => {
    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: companyEmail,
          clientId: id, // Pass custom metadata
          priceId: pack.plan.priceId,
        }),
      });

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error("Error redirecting to checkout:", error);
    }
  };

  function packagesNumbers(passedPackage){
      if (passedPackage === "free") {
        return 1;
      } else if (passedPackage === "starter") {
        {
          return 2;
        }
      } else if (passedPackage === "growth") {
        {
          return 3;
        }
      } else if (passedPackage === "enterprise") {
        {
          return 4;
        }
      } 
    
    }

  return (
    <div className={styles.packagesCardWrapper}>
      {packages.availablePackages.map((pack) => (
        <div
          key={pack.name}
          className={`${styles.packageCard} ${styles[pack.name] || ""}`}
        >
          <h3 className={styles.packageHeading}>{pack.name}</h3>
          <p>Everything you need to supercharge your productivity. </p>
          <p className={styles.price}>
            {!isNaN(pack.price) ? (
              <>
                ${pack.price}
                <span>/month</span>
              </>
            ) : (
              pack.price
            )}
          </p>
          <hr />
          <h5>What's included</h5>
          <ul className={styles.packageOptionsWrapper}>
            {pack.options.map((option, index) => (
              <li key={index} className={styles.included}>
                <Image src="/check.svg" alt="Included" width={32} height={32} />
                <span>{option}</span>
              </li>
            ))}
          </ul>
          <button
            onClick={() => handleCheckout(pack)}
            className={`${styles.packageBtn} `}
            disabled={packagesNumbers(pack.name) === 1 || packagesNumbers(pack.name) <= packagesNumbers(currentPackage) }
            style={{backgroundColor: packagesNumbers(pack.name) <= packagesNumbers(currentPackage) ? "grey" : "" }}
          >
            {currentPackage === pack.name ? "Current Package" : pack.buttonText}
          </button>
        </div>
      ))}
    </div>
  );
}
