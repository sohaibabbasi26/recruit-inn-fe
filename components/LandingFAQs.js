import Image from "next/image";
import { useState } from "react";

const LandingFAQs = () => {


    
    return (
        <>
            <div className="h-[90vh] w-[100%] flex justify-center text-white items-center flex-col">
                <div className="h-[20%] w-[90%] flex flex-col items-center justify-center">
                    <h2 className="text-4xl font-sans font-semibold">FAQs</h2>
                    <p className="text-sm mt-3 text-smallText">Answers to the most frequently asked questions.</p>


                </div>
                <div className="w-[50%] h-[70%] mt-[3rem]">
                        <ul className="w-[100%] ">
                            <li className="py-4 w-[100%] flex flex-col border-b-[1px] border-darkPurple">
                                <div className=" w-[100%] flex justify-between">
                                    <span className="text-lg tracking-wide font-semibold font-sans">What's recruitinn?</span>
                                    <Image src='/dropdown-white.svg' width={15} height={15} />
                                </div>
                                <p className="text-sm  text-smallText mt-3">We help companies hire world-class engineers through our talent pool of vetted engineers,
                                     micro1 Talent, and our software development agency, microLab. We're also building gpt-vetting,
                                    an AI tool for vetting top talent.</p>
                            </li>
                            <li className="py-4 w-[100%] flex flex-col border-b-[1px] border-darkPurple">
                                <div className=" w-[100%] flex justify-between">
                                    <span className="text-lg tracking-wide font-semibold font-sans">What's recruitinn?</span>
                                    <Image src='/dropdown-white.svg' width={15} height={15} />
                                </div>
                                <p></p>
                            </li>
                            <li className="py-4 w-[100%] flex flex-col border-b-[1px] border-darkPurple">
                                <div className=" w-[100%] flex justify-between">
                                    <span className="text-lg tracking-wide font-semibold font-sans">What's recruitinn?</span>
                                    <Image src='/dropdown-white.svg' width={15} height={15} />
                                </div>
                                <p></p>
                            </li>
                            <li className="py-4 w-[100%] flex flex-col border-b-[1px] border-darkPurple">
                                <div className=" w-[100%] flex justify-between">
                                    <span className="text-lg tracking-wide font-semibold font-sans">What's recruitinn?</span>
                                    <Image src='/dropdown-white.svg' width={15} height={15} />
                                </div>
                                <p></p>
                            </li><li className="py-4 w-[100%] flex flex-col border-b-[1px] border-darkPurple">
                                <div className=" w-[100%] flex justify-between">
                                    <span className="text-lg tracking-wide font-semibold font-sans">What's recruitinn?</span>
                                    <Image src='/dropdown-white.svg' width={15} height={15} />
                                </div>
                                <p></p>
                            </li>
                            <li className="py-4 w-[100%] flex flex-col border-b-[1px] border-darkPurple">
                                <div className=" w-[100%] flex justify-between">
                                    <span className="text-lg tracking-wide font-semibold font-sans">What's recruitinn?</span>
                                    <Image src='/dropdown-white.svg' width={15} height={15} />
                                </div>
                                <p></p>
                            </li>

                        </ul>
                    </div>
                </div>
        </>
    )
}

export default LandingFAQs;