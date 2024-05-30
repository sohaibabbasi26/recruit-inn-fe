import styles from "./Button.module.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
});

function Button({ onClick, children }) {
  if (onClick)
    return (
      <button
        onClick={onClick}
        className={`${poppins.className} ${styles.btn}`}
      >
        {" "}
        {children}{" "}
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
