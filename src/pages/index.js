import Head from "next/head";
import { ThemeProvider } from "next-themes";
import { useEffect, useRef, useState } from "react";
import Footer from "../../components-landing/Footer";
import HeroSection from "../../components-landing/HeroSection";
import HowItWorks from "../../components-landing/HowItWorks";
import LandingFAQs from "../../components-landing/LandingFAQs";
import LandingFourth from "../../components-landing/LandingFourth";
import LandingNavbar from "../../components-landing/LandingNavbar";
import LandingThird from "../../components-landing/LandingThird";
import LandingVideo from "../../components/LandingVideo";
import PaymentMethods from "../../components-landing/PaymentMethods";
import RecruitinnsWay from "../../components/RecruitinnsWay";
import styles from "../../components-landing/styles.module.css";
import LandingFifth from "../../components-landing/LandingFifth";

const LandingPage = () => {
  const [mounted, setMounted] = useState(false);
  const LandingThirdRef = useRef(null);
  const howItWorksRef = useRef(null);
  const PaymentMethodsRef = useRef(null);

  const FAQRef = useRef(null);
  const HeroRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const scrollToRef = (ref) =>
    ref.current?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      {/* Add SEO metadata */}
      <Head>
        <title>
          Recruitinn - AI-Powered Recruitment for Smarter Hiring Decisions
        </title>
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
          content="https://app.recruitinn.ai/og-image.png"
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
        <link rel="icon" href="/favicon2.ico" />
      </Head>

      <ThemeProvider attribute="class" defaultTheme="light">
        <main
          className={`${styles.main} bg-white dark:bg-black h-[100%] w-full`}
        >
          <h1 className="hidden">
            Recruitinn - AI-Powered Recruitment for Smarter Hiring Decisions
          </h1>
          <LandingNavbar
            scrollToRef={scrollToRef}
            HeroRef={HeroRef}
            LandingThirdRef={LandingThirdRef}
            howItWorksRef={howItWorksRef}
          />
          <div ref={HeroRef}>
            <HeroSection />
          </div>
          <LandingVideo />
          <div ref={LandingThirdRef}>
            <LandingThird />
          </div>
          <LandingFourth />
          <div ref={howItWorksRef}>
            <HowItWorks />
          </div>
          <div ref={PaymentMethodsRef} className="pt-4">
            <PaymentMethods />
          </div>

          <div ref={FAQRef}>
            <LandingFAQs />
          </div>
          <Footer
            scrollToRef={scrollToRef}
            HeroRef={HeroRef}
            FAQRef={FAQRef}
            howItWorksRef={howItWorksRef}
            PaymentMethodsRef={PaymentMethodsRef}
          />
        </main>
      </ThemeProvider>
    </>
  );
};

export default LandingPage;
