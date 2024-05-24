import Image from "next/image";
import styles from "./Logo.module.css";
function Logo() {
  return (
    <div className={styles.logoContainer}>
      {/* <h3>
              <Image src="/logo (3).png" width={logoSize} height={logoSize} />
              recruitinn.ai
            </h3> */}

      <Image
        src="/recruitinn-logo-light.png"
        alt="Recruitin Logo"
        height={26}
        width={184}
      />
    </div>
  );
}

export default Logo;
