import Image from "next/image";
import styles from "./Button.module.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
});

function Button({ onClick, children, isFor }) {
  if (onClick)
    return (
      <button
        onClick={onClick}
        className={`${poppins.className} ${styles.btn} ${
          isFor === "next" ? styles.next : ""
        }`}
      >
        {" "}
        {children}{" "}
        {isFor === "next" && (
          <Image src="/Forward.svg" width={18} height={18} />
        )}
      </button>
    );
  return (
    <button className={`${poppins.className} ${styles.btn}`}>
      {" "}
      {children}{" "}
    </button>
  );
}

export default Button;
