import React from "react";
import styles from "./_error.module.css";
import Image from "next/image";
import Button from "../../components/Button";
import { useRouter } from "next/router";

const ErrorPage = ({ statusCode }) => {
  const router = useRouter();
  return (
    // For now, we require this UI to be displayed for every HTTP error
    <div className={styles.errorPage}>
      <Image
        src="/recruitinn-logo-light.png"
        alt="Recruitin Logo"
        height={26}
        width={184}
        className={styles.recruitinLogo}
      />
      <div className={styles.error}>
        <Image
          alt="503 error image"
          height={260}
          width={260}
          src="/session-expired.png"
        />
        <h1>
          Oops! We're currently undergoing some maintenance. We apologize for
          any inconvenience caused. Thank you for your patience!
        </h1>
        <Button onClick={() => router.push("/")}> Back to home </Button>
      </div>
    </div>
  );
};

ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default ErrorPage;
