
import Image from "next/image";

const LandingNavbar = () => {

    return (
        <>
            <div className='h-[10vh]  w-full flex justify-center' >
                <div className="w-90p h-full flex justify-between items-center text-white">
                    <div className="flex w-50p gap-20 items-center">
                        <h2 className="text-xl font-bold font-poppins flex gap-3">
                            <Image src="/logoo.svg" height={30} width={30} />
                            recruitinn.ai
                        </h2>

                        <ul className="flex gap-10 ">
                            <li className="text-sm font-semibold">How It Works</li>
                            <li className="text-sm font-semibold">About Us</li>
                        </ul>
                    </div>

                    <div className="w-60p items-center flex justify-end gap-8 ">
                            <span className="text-sm font-semibold">Apply As An Engineer</span>

                            <div className="flex gap-8">
                                <button className="px-10 py-3.5 text-sm bg-darkPurple rounded-3xl font-semibold">Login</button>
                                <button className="px-10 py-3.5 text-sm btn-gradient rounded-3xl font-semibold">Recruit A Talent</button>
                            </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LandingNavbar;