// components/Footer.js

import React from 'react';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className=" text-white p-4">
      <div className="px-20 mx-auto flex justify-between items-center">
        <div className="w-1/5">
          {/* Left Section */}
          <p className='font-montserrat text-2xl font-bold leading-7'>recruitinn.ai</p>
          <Image src='/logo 1.svg' width={130} height={130} />
        </div>
        
        <div className="w-3/5 flex justify-center space-x-4">
          {/* Middle Sections */}
          <div className='px-4'>
            <p className='font-poppins text-base font-semibold leading-8'>Product</p>
            <div className='font-dm-sans text-gray-500 text-sm font-light leading-5 py-4'>
                <p className='py-1'>Packages</p>
                <p className='py-1'>Team</p>
                <p className='py-1'>How it works</p>
                <p className='py-1'>FAQ</p>
            </div>
          </div>
          <div className='px-4'>
            <p className='font-poppins text-base font-semibold leading-8'>Company</p>
            <div className='font-dm-sans text-gray-500 text-sm font-light leading-5 py-4'>
                <p className='py-1'>Careers</p>
                <p className='py-1'>Contact</p>
                <p className='py-1'>Privacy Policy</p>
                <p className='py-1'>Terms of Services</p>
            </div>
          </div>
          <div className='px-4'>
            <p className='font-poppins text-base font-semibold leading-8'>Community</p>
            <div className='font-dm-sans text-gray-500 text-sm font-light leading-5 py-4'>
                <p className='py-1'>Community Stories</p>
                <p className='py-1'>Twitter</p>
                <p className='py-1'>Linkedin</p>
                <p className='py-1'>YouTube</p>
            </div>
          </div>
        </div>
        <div className="w-1/5">
          {/* Right Section */}
          <p>Right Section</p>
        </div>
      </div>
      <div className='text-center'>
        <p className='font-dm-sans text-gray-500 text-sm font-light leading-5 py-4'>Copyright © 2024 recruitinn. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;