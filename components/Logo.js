import { useTheme } from "next-themes";
import Image from "next/image";
import logoDark from "../public/recruitinn-logo-dark.png";
import logoLight from "../public/recruitinn-logo-light.png";
import styles from "./Logo.module.css";
function Logo() {
  const { theme } = useTheme();
  const logo = theme === "dark" ? logoDark : logoLight;
  return (
    <div className={styles.logoContainer}>
      <Image
        src={logo}
        alt="Recruitin Logo"
        height="25.5"
        quality={100}
        width="184"
        objectFit
      />
    </div>
  );
}

export default Logo;
