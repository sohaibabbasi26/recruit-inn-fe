import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" suppressHydrationWarning>
      <Head />
      {/* <title>RecruitInn Ai</title> */}
      {/* <meta
        name="description"
        content="Recruin in description here"
      /> */}
      <link rel="icon" href="/favicon2.ico" sizes="any" />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
