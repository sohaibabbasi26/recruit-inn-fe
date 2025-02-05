// import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import FeaturesSection from "../../components-landing/FeaturesSection";
import Footer from "../../components-landing/Footer";
import HeroSection from "../../components-landing/HeroSection";
import InterviewSection from "../../components-landing/InterviewSection";
import LandingFAQs from "../../components-landing/LandingFAQs";
import LandingNavbar from "../../components-landing/LandingNavbar";
import LandingThird from "../../components-landing/LandingThird";
import PaymentMethods from "../../components-landing/PaymentMethods";
import RecruitInnProcess from "../../components-landing/RecruitInnProcess";
import styles from "../../components-landing/styles.module.css";
import Testimonials from "../../components-landing/Testimonials";
import LandingVideo from "../../components/LandingVideo";
import { useTranslation } from "react-i18next";

const LandingPage = () => {
  const [mounted, setMounted] = useState(false);
  const LandingThirdRef = useRef(null);
  const testimonialsRef = useRef(null);
  const featuresRef = useRef(null);
  const pricingRef = useRef(null);

  const FAQRef = useRef(null);
  const HeroRef = useRef(null);


  const { t } = useTranslation();
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

      <main className={`${styles.main} bg-white dark:bg-black h-[100%] w-full`}>
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
          t={t}
        />
        <div ref={HeroRef}>
          <HeroSection  t={t}/>
        </div>

        <LandingVideo />
        <div ref={LandingThirdRef}>
          <LandingThird t={t}/>
        </div>
        <InterviewSection t={t} />
        {/* Try this */}
        {/* <LandingFourth /> */}
        <div className="4th">
          <RecruitInnProcess t={t}/>
        </div>
        <div ref={featuresRef}> 
          <FeaturesSection t={t} />
        </div>
        {/* <LandingFourth />
          <div ref={howItWorksRef}>
            <HowItWorks />
          </div>  */}
          <div ref={testimonialsRef}>
         <Testimonials t={t}/>
         </div>
       
        <div ref={pricingRef} className="pt-4">
          <PaymentMethods  t={t}/>
        </div>

        <div ref={FAQRef}>
          <LandingFAQs t={t}/>
        </div>
        <Footer
          scrollToRef={scrollToRef}
          HeroRef={HeroRef}
          FAQRef={FAQRef}
          featuresRef={featuresRef}
          pricingRef={pricingRef}
          howItWorksRef={featuresRef}
          t={t}
        />
      </main>
    </>
  );
};

export default LandingPage;
