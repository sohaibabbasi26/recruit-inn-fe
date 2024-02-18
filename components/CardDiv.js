import Image from 'next/image';
import { useState } from 'react';

const CardDiv = ({ className }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div 
            className={`  border-[2px] border-lightPurpleText bg-smallDiv w-[55%] max-md:w-[60%]  max-md:h-[45%] h-70p rounded-3xl text-white font-sans flex flex-col items-center max-md:justify-center justify-center absolute transition-transform ease-in-out duration-300 transform      ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                zIndex: isHovered ? 30 : 10, 
            }}
        >
            <Image className='max-sm:h-[3rem] max-xl:h-[4rem]' src='/Bitmoji.svg' width={80} height={80} />
            <h3 className="max-md:text-[1rem] max-xl:text-[1rem] max-md:font-semibold max-md:font-semibold  text-3xl max-md:text-md">
                Dwayne Johnson
            </h3>
            <span className="text-xl text-lightPurpleText max-md:text-[1rem] max-md:font-semibold">
                Backend-Engineer
            </span>

            <div className="flex max-xl:flex-col max-md:flex-col gap-2 mt-2">
                <span className="px-4 py-0.5 flex  gap-2 items-center  bg-zinc-900 rounded-2xl max-md:text-[0.8rem] max-md:font-semibold">
                    Recommended <Image src='/greenstar.svg' width={10} height={10} />
                </span>
                <span className="px-4 py-0.5 max-xl:flex max-xl:justify-center max-md:flex max-md:justify-center bg-zinc-900 rounded-2xl">9/10</span>
            </div>
        </div>
    );
};

export default CardDiv;
