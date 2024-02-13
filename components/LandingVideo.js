import Image from "next/image";


const LandingVideo = () => {

    return(
        <>
            <div className="w-full h-[100vh] flex justify-center">
                <div className="w-90% relative">
                    <Image src='/playbtn.svg' className="absolute top-[50%] left-[50%]" width={60} height={60} />
                    <Image src='/videoimage.png' width={1400} height={1400} />
                </div>
            </div>
        </>
    )
}

export default LandingVideo;