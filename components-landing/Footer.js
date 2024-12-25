// components/Footer.js

import React from "react";
import Image from "next/image";
// import './styles.css';
import style from "./styles.module.css";
import { useTheme } from "next-themes";

// import './landingGlobal.css';

const Footer = ({
  scrollToRef,
  pricingRef,
  howItWorksRef,
  FAQRef,
  HeroRef,
}) => {
  const { theme } = useTheme();
  return (
    <footer className=" text-black dark:text-white e p-4">
      <div className="px-20 mx-auto max-lg:flex-col flex justify-between items-center mb-8">
        {/* Logo Section */}
        <div
          onClick={() => scrollToRef(HeroRef)}
          className="cursor-pointer w-1/5 max-lg:flex max-lg:flex-col max-lg:items-center"
        >
          <p>Trustpilot widget</p>
        </div>

        {/* Central Sections: Product and Community */}
        <div className="flex flex-grow justify-center items-start space-x-12 max-lg:mt-6">
          {/* Product Section */}
          <div className="text-center">
            <p className="font-poppins text-lg font-bold leading-8">Product</p>
            <div className="text-gray-500 text-sm font-light leading-5 space-y-2">
              <p
                onClick={() => scrollToRef(pricingRef)}
                className="cursor-pointer hover:underline pt-2"
              >
                Packages
              </p>
              <p
                onClick={() => scrollToRef(howItWorksRef)}
                className="cursor-pointer hover:underline"
              >
                How it works
              </p>
              <p
                onClick={() => scrollToRef(FAQRef)}
                className="cursor-pointer hover:underline"
              >
                FAQ
              </p>
            </div>
          </div>

          {/* Community Section */}
          <div className="text-center">
            <p className="font-poppins text-lg font-bold leading-8">
              Community
            </p>
            <div className="text-gray-500 text-sm font-light leading-5 space-y-2">
              <p className="hover:underline pt-2">
                <a
                  href="https://twitter.com/recruitinn"
                  target="blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </a>
              </p>
              <p className="hover:underline">
                <a
                  href="https://www.linkedin.com/company/recruitinn-ai/about"
                  target="blank"
                  rel="noopener noreferrer"
                >
                  Linkedin
                </a>
              </p>
              <p className="hover:underline">
                <a
                  href="https://twitter.com/recruitinn"
                  target="blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Product Hunt Widget Section */}
        <div className="flex-shrink-0 max-sm:mt-8">
          <a
            href="https://www.producthunt.com/products/recruitinn-ai/reviews?utm_source=badge-product_review&utm_medium=badge&utm_souce=badge-recruitinn&#0045;ai"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://api.producthunt.com/widgets/embed-image/v1/product_review.svg?product_id=598081&theme=dark"
              alt="Recruitinn.ai - Revolutionize Your Hiring with us | Product Hunt"
              style={{ width: "250px", height: "54px" }}
              width="250"
              height="54"
            />
          </a>
        </div>
      </div>

      <footer className="flex justify-between items-center px-4 py-2 border-t border-gray-200 bg-white pt-6 pb-6">
        <p className="text-sm text-gray-500">
          © 2024 recruitinn. All rights reserved.
        </p>
        <div className="flex justify-center items-center max-sm:hidden">
          <div className="w-6 h-6">
            <Image
              src="/footerlogo.png"
              alt="recruitinn"
              width={24}
              height={24}
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          {/* Social Media Icons */}
          <a
            href="/twitterx.png"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-800"
          >
            <Image src="/twitterx.png" alt="X" width={24} height={24} />{" "}
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-800"
          >
            <Image src="/instagram.png" alt="X" width={24} height={24} />{" "}
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-800"
          >
            <Image src="/in.png" alt="X" width={24} height={24} />{" "}
          </a>
        </div>
      </footer>
    </footer>
  );
};

export default Footer;
