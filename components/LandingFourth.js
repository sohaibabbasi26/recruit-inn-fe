import Image from "next/image";

const LandingFourth = () => {

    return (
        <>
            <div className="h-[60vh] w-full flex items-center justify-center">
                <div className="w-90p h-80p rounded-2xl fourth-sec-gradient flex items-center">
                    <div className="w-50p h-80p fade-right-border flex items-center justify-center">
                        <div className="w-80p flex flex-col gap-5 text-white">
                            <h3 className="text-2xl tracking-wide">Discover more with Recruitinn's streamlined process</h3>
                            <p className="text-[0.75rem] text-smallText">Revolutionize your recruitment process with Reccruitinn's AI Assessment saving you valuable
                                hours while ensuring top-notch candidate evaluations.
                            </p>
                            <div className="flex gap-3">
                                <div className="px-7 py-2 rounded-3xl bg-spanBg">
                                    <span className="gradient-text text-2xl font-bold">24h</span>
                                </div>
                                <div className="px-7 py-2 rounded-3xl bg-spanBg">
                                    <span className="gradient-text text-2xl font-bold">48h</span>
                                </div>
                                <div className="px-7 py-2 rounded-3xl bg-spanBg">
                                    <span className="gradient-text text-2xl font-bold">72h</span>
                                </div>
                            </div>

                            <h2 className="text-4xl w-50p font-bold leading-[3rem] gradient-text">20+ Potential Candidates</h2>
                        </div>
                    </div>
                    <div className="w-50p h-80p flex items-start justify-center">
                        <Image src='/clock.png' width={400} height={400} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default LandingFourth;