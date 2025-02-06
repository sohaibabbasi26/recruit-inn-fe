import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" suppressHydrationWarning>
      <Head>
        <title>
        AI recruitinment | Recruitinn
        </title>
          <link rel="canonical" href="https://app.recruitinn.ai/invited-candidate?position_id=<%= position_id %>&client_id=<%= client_id %>" />


        <meta
          name="description"
          content="Revolutionize your hiring process with Recruitinn's AI-powered recruitment platform. Discover top talent faster, streamline hiring, and make data-driven decisions with ease. Experience the future of recruitment today!"
        />
        <meta
          property="og:title"
          content="Recruitinn - AI-Powered Recruitment for Smarter Hiring Decisions"
        />
        <meta
          property="og:description"
          content="Revolutionize your hiring process with Recruitinn's AI-powered recruitment platform. Discover top talent faster, streamline hiring, and make data-driven decisions with ease. Experience the future of recruitment today!"
        />
        <meta
          property="og:image"
          content="https://app.recruitinn.ai/og-image.jpg"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta
          property="og:image"
          content="https://app.recruitinn.ai/og-image.png"
        />

        <meta
          property="og:image:alt"
          content="Recruitinn - AI-Powered Recruitment Platform"
        />
        <meta property="og:image:type" content="image/png" />

        <meta property="og:url" content="https://app.recruitinn.ai/" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />

        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap"
          rel="stylesheet"
        />

        <link rel="icon" href="/favicon2.ico" />
      </Head>
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
