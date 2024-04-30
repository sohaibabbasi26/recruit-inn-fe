import { packages } from "@/util/helpers";
import styles from "./PackagesCards.module.css";
import Image from "next/image";

function PackagesCards() {
  return (
    <div className={styles.packagesCardWrapper}>
      {packages.availablePackages.map((pack) => (
        <div className={styles.packageCard}>
          <h3 className={styles.packageHeading}>{pack.name}</h3>
          <p>Everything you need to supercharge your productivity.</p>
          <span>${pack.price}/month</span>
          <hr />
          <h5>What's included</h5>
          <ul className={styles.packageOptionsWrapper}>
            {packages.availableOptions.map((option) => (
              <li className={`${styles.packageOption}`}>
                <Image src="/CROSS.svg" width={15} height={15} />
                <span> {option}</span>
              </li>
            ))}
          </ul>
          {/* check client's current package button text depends on it! */}
          <button> {pack.buttonText} </button>
        </div>
      ))}
    </div>
  );
}

export default PackagesCards;
