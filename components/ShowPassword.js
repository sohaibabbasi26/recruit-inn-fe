import styles from "./ShowPassword.module.css";
import Image from "next/image";

function ShowPassword({ pass, setPass }) {
  return (
    <>
      {pass ? (
        <Image
          className={styles.hidePassword}
          src="/eyeHide.svg"
          width={19.64}
          height={18}
          onClick={() => setPass((pass) => !pass)}
        />
      ) : (
        <Image
          className={styles.showPassword}
          src="/eyeShow.svg"
          width={21.33}
          height={16}
          onClick={() => setPass((pass) => !pass)}
        />
      )}
    </>
  );
}

export default ShowPassword;
