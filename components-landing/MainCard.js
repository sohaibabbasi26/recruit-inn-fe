import Image from "next/image";
import "tailwindcss/tailwind.css";

const MainCard = () => {
  return (
    <div className="border-b space-y-3 py-20 border-darkPurple overflow-hidden">
      {/* Flash Message */}
      <div className="flex justify-center">
        <div className="flex items-center rounded-2xl border border-darkPurple bg-white-purple-shade px-4 py-2">
          <div className="mr-2">
            <Image src="/flash.png" alt="Flash Icon" width={20} height={20} />
          </div>
          <span className="text-lightPurpleText text-sm">
            Hire 5x faster Interview and Pass Rate
          </span>
        </div>
      </div>

      {/* Title */}
      <h4 className="text-center text-black dark:text-white text-5xl font-bold">
       Recruitment Pyrocess
      </h4>

      {/* Subtitle */}
      <div className="w-100p flex justify-center !mt-6">
        {" "}
        <p className=" text-center max-xsm:w-90p xsm:w-90p sm:w-70p md:w-60p lg:w-40p ">
          Revolutionize the way you recruit by leveraging our innovative
          solutions designed to make your hiring more efficient and effective{" "}
        </p>
      </div>
    </div>
  );
};

export default MainCard;
