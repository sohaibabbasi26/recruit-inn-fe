import styles from "./BackButton.module.css";
import Image from "next/image";

function BackButton({ children, onClose }) {
  return (
    <button
      className={styles.backButton}
      onClick={
        onClose ? onClose : () => console.log("please use a back action")
      }
    >
      <span>
        <Image alt="Back arrow" height={35} width={35} src="/backBlack.svg" />
      </span>
      {children}
    </button>
  );
}

export default BackButton;
