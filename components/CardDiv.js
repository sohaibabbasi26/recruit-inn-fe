import Image from 'next/image';
import { useState } from 'react';

const CardDiv = ({ className }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div 
            className={`  border-[2px] border-lightPurpleText bg-smallDiv w-[55%] h-70p rounded-3xl text-white font-sans flex flex-col items-center justify-center absolute transition-transform ease-in-out duration-300 transform      ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                zIndex: isHovered ? 30 : 10, 
            }}
        >
            <Image src='/bitmoji.svg' width={80} height={80} />
            <h3 className="text-3xl">
                Dwayne Johnson
            </h3>
            <span className="text-xl text-lightPurpleText">
                Backend-Engineer
            </span>

            <div className="flex gap-2 mt-2">
                <span className="px-4 py-0.5 flex gap-2 items-center bg-zinc-900 rounded-2xl">
                    Recommended <Image src='/greenstar.svg' width={10} height={10} />
                </span>
                <span className="px-4 py-0.5 bg-zinc-900 rounded-2xl">9/10</span>
            </div>
        </div>
    );
};

export default CardDiv;
