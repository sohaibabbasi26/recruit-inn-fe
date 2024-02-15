import Footer from "../../components/Footer";
import HeroSection from "../../components/HeroSection";
import HowItWorks from "../../components/HowItWorks";
import LandingFAQs from "../../components/LandingFAQs";
import LandingFourth from "../../components/LandingFourth";
import LandingNavbar from "../../components/LandingNavbar";
import LandingThird from "../../components/LandingThird";
import LandingVideo from "../../components/LandingVideo";
import PaymentMethods from "../../components/PaymentMethods";
import RecruitinnsWay from "../../components/RecruitinnsWay";

import LandingFifth from "../../components/LandingFifth";
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