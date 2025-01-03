import React from "react";
import styles from "../src/pages/_error.module.css";
import Image from "next/image";
import Button from "./Button";
import { useRouter } from "next/router";

const ErrorPageTestCount = ({ statusCode }) => {
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
          Oops! You cannot give this test, the company conducting this test has ran out of the test count limit.
        </h1>
        <Button onClick={() => router.push("/")}> Back to home </Button>
      </div>
    </div>
  );
};

ErrorPageTestCount.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default ErrorPageTestCount;
