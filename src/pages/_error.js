import React from "react";
import styles from "./_error.module.css";
import Image from "next/image";

const ErrorPage = ({ statusCode }) => {
  return (
    // For now, we require this UI to be displayed for every HTTP error
    <div className={styles.errorPage}>
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
      </div>
    </div>
  );
};

ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default ErrorPage;