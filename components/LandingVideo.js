import Image from "next/image";


const LandingVideo = () => {

    return(
        <>
            <div className="w-full h-[100%] flex justify-center mb-8">
            <div className="w-90% relative">
    <Image src='/playbtn.svg' className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 max-md:top-[25%]" width={60} height={60} />
    <Image src='/videoimage.png' width={1400} height={1400} />
</div>
            </div>
        </>
    )
}

export default LandingVideo;