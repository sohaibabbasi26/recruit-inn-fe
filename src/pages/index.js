// import Head from "next/head";
import { ThemeProvider } from "next-themes";
import { useEffect, useRef, useState } from "react";
import FeaturesSection from "../../components-landing/FeaturesSection";
import Footer from "../../components-landing/Footer";
import HeroSection from "../../components-landing/HeroSection";
import LandingFAQs from "../../components-landing/LandingFAQs";
import LandingNavbar from "../../components-landing/LandingNavbar";
import LandingThird from "../../components-landing/LandingThird";
import LandingThird2 from "../../components-landing/LandingThird2";
import PaymentMethods from "../../components-landing/PaymentMethods";
import styles from "../../components-landing/styles.module.css";
import Testimonials from "../../components-landing/Testimonials";
import RecruitInnProcess from "../../components-landing/RecruitInnProcess";
import LandingVideo from "../../components/LandingVideo";

const LandingPage = () => {
  const [mounted, setMounted] = useState(false);
  const LandingThirdRef = useRef(null);
  const testimonialsRef = useRef(null);
  const featuresRef = useRef(null);
  const pricingRef = useRef(null);

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
      {/* <Head>
        <title>
          Recruitinn - AI-Powered Recruitment for Smarter Hiring Decisions
        </title>
        <meta
          name="description"
          content="Discover how Recruitinn helps you find the best candidates with AI-powered recruitment tools. Learn about our free trial, billing, and unique features."
        />
      </Head> */}

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
            pricingRef={pricingRef}
            LandingThirdRef={LandingThirdRef}
            testimonialsRef={testimonialsRef}
            featuresRef={featuresRef}
          />
          <div ref={HeroRef}>
            <HeroSection />
          </div>

          <LandingVideo />
          <div ref={LandingThirdRef}>
            <LandingThird />
          </div>
          <LandingThird2 />
          {/* Try this */}
          {/* <LandingFourth /> */}
          <div className="4th">
            <RecruitInnProcess />
          </div>
          <div ref={featuresRef}>
            <FeaturesSection />
          </div>
          {/* <LandingFourth />
          <div ref={howItWorksRef}>
            <HowItWorks />
          </div>  */}
          <div>
            <Testimonials />
          </div>
          <div ref={pricingRef} className="pt-4">
            <PaymentMethods />
          </div>

          <div ref={FAQRef}>
            <LandingFAQs />
          </div>
          <Footer
            scrollToRef={scrollToRef}
            HeroRef={HeroRef}
            FAQRef={FAQRef}
            featuresRef={featuresRef}
            pricingRef={pricingRef}
            howItWorksRef={featuresRef}
          />
        </main>
      </ThemeProvider>
    </>
  );
};

export default LandingPage;
