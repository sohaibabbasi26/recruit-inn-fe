import styles from "./PackagesCards.module.css";
import Image from "next/image";

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
      buttonText: "selected package",
      name: "free",
      price: "0",
      options: ["4 Reports of candidates", "Add upto 4 skills"],
    },
    {
      buttonText: "get started",
      name: "standard",
      price: "49",
      options: [
        "4 Reports of candidates",
        "Add upto 4 skills",
        "4 Reports of candidates",
      ],
    },
    {
      buttonText: "get started",
      name: "pro",
      price: "99",
      options: [
        "4 Reports of candidates",
        "Add upto 4 skills",
        "4 Reports of candidates",
        "Add upto 4 skills",
        "4 Reports of candidates",
      ],
    },
    {
      buttonText: "contact sales",
      name: "enterprise",
      price: "contact us",
      options: [
        "4 Reports of candidates",
        "Add upto 4 skills",
        "4 Reports of candidates",
        "Add upto 4 skills",
        "4 Reports of candidates",
        "Add upto 4 skills",
      ],
    },
  ],
};

function PackagesCards() {
  return (
    <div className={styles.packagesCardWrapper}>
      {packages.availablePackages.map((pack) => (
        <div className={`${styles.packageCard} ${styles[pack.name] || ""}`}>
          <h3 className={styles.packageHeading}>{pack.name}</h3>
          <p>Everything you need to supercharge your productivity.</p>
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
            {packages.availableOptions.map((option, index) => (
              <li
                className={`${
                  packages.availableOptions[index] === pack.options[index]
                    ? styles.included
                    : ""
                }`}
              >
                <Image
                  src={
                    packages.availableOptions[index] === pack.options[index]
                      ? "/check.svg"
                      : "/CROSS.svg"
                  }
                  width={32}
                  height={32}
                />
                <span> {option}</span>
              </li>
            ))}
          </ul>
          {/* check client's current package button text depends on it! */}
          <button className={styles.packageBtn}> {pack.buttonText} </button>
        </div>
      ))}
    </div>
  );
}

export default PackagesCards;
