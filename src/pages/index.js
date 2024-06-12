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
      <ThemeProvider attribute="class" defaultTheme="light">
        <main
          className={`${styles.main} bg-white dark:bg-black h-[100%] w-full`}
        >
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
          <div ref={PaymentMethodsRef}>
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
