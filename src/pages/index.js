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

import LandingFifth from "../../components-landing/LandingFifth";
import { useRef } from "react";

const LandingPage = () => {
    const LandingThirdRef = useRef(null);
    const howItWorksRef = useRef(null);
    const scrollToRef = (ref) => ref.current?.scrollIntoView({ behavior: 'smooth' });

    return (
        <>
            <div className="bg-black h-[100%] w-full">
                <LandingNavbar scrollToRef={scrollToRef} LandingThirdRef={LandingThirdRef} howItWorksRef={howItWorksRef} />
                <HeroSection />
                <LandingVideo />
                <div ref={LandingThirdRef}><LandingThird /></div>
                <LandingFourth />
                <LandingFifth />
                <div ref={howItWorksRef}><HowItWorks /></div>
                <PaymentMethods />
                <LandingFAQs />
                <Footer />
            </div>
        </>
    )
}

export default LandingPage;