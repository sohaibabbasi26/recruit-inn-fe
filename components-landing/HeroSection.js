import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import TrustedCandidates from "../components/TrustedCandidates";
// import './landingGlobal.css';
// import './styles.css';

const HeroSection = () => {
  // const { theme } = useTheme();
  return (
    <>
      <div className="w-full h-[87svh] max-xsm:h-[67svh] max-sm:h-[60svh] max-lg:h-[75svh]  flex flex-col items-center">
        <div className="w-100p h-[60%]  max-xsm:h-[5%]  max-sm:h-[35%] max-lg:h-[45%] flex justify-center mt-20">
          <div className="w-100p h-full   max-lg:hidden">
            <div className=" h-[100%] w-[100%] flex ">
              {/* <div className="bg-gradient-to-br from-primary h-[5rem] w-[5rem] relative left-[15.5rem] top-[15rem] rounded-full "></div> */}

              {/* <div className="bg-gradient-to-br from-primary h-[5rem] w-[5rem] relative top-[24rem] left-[13rem] rounded-full"></div> */}

              {/* <div className="bg-gradient-to-br from-[#31CDBA] h-[8rem] w-[5rem] relative left-[25rem] top-[4rem] rounded-full"></div> */}
              {/* <div className="bg-gradient-to-br  from-[#FF0000] h-[3rem] w-[5rem]  left-[13rem] top-[14rem] rounded-full"></div> */}
              <div className="bg-gradient-to-br from-[#FF0000] h-[3rem] w-[5rem] relative left-[10rem] top-[11rem] rounded-full"></div>

              <div
                className={`w-100p h-[100%] relative bg-transparent flex backdrop-blur-[40px]`}
              >
                <div
                  className={`flex gap-3 items-center z-[1] text-neutralDark dark:text-white w-[20rem] h-[4rem] border-2 bg-white border-[#FF0000] left-[10rem] top-[61%]  rounded-2xl self-end mb-28`}
                >
                  <div className="ml-2 px-[0.4rem] py-[0.25rem] bg-white-purple-shade dark:bg-darkPurple overflow-hidden rounded-md">
                    <Image src="/Bitmoji.svg" width={20} height={20} />
                  </div>

                  <div className="flex flex-col me-5">
                    <span className="text-md text-bold">Ethan Parker</span>
                    <span className="text-xs">IOS Developer</span>
                  </div>

                  <div>
                    <p className="text-xs bg-[#FFE6E6] dark:ring-red-900 p-2 px-3 rounded-full flex gap-2 font-medium">
                      Unqualified{" "}
                      <Image src="/Ellipse_red.svg" width={6} height={6} />
                    </p>
                  </div>
                </div>

                {/* <div className="bg-gradient-to-r from-white to-transparent via-20% via-transparent w-80p justify-center flex flex-col space-y-8 mb-[6rem] "> */}
              </div>
            </div>
          </div>

          <div className=" h-full min-w-[40%] w-full z-[2] flex flex-col justify-center  gap-5 sm:w-[80%] md:w-[60%] lg:w-[100%]  max-lg:text-center max-lg:items-center">
            <h1 className="text-dark min-w-fit dark:text-white text-center  md:text-5xl text-3xl font-[1000] w-[100%]">
              Agile recruitment for today’s world of work
            </h1>
            <p className="text-center min-w-fit w-[80%] self-center text-steel dark:text-white  text-md sm:text-sm">
              {" "}
              Revolutionize the way you recruit by leveraging our innovative
              solutions designed to make your hiring more efficient and
              effective
            </p>
          </div>

          {/* <div className=" w-100p h-full"> */}
          <div className="w-100p h-full  max-lg:hidden">
            <div className="  h-[80%] flex flex-row-reverse ">
              {/* <div className="bg-gradient-to-br from-primary h-[5rem] w-[5rem] relative left-[15.5rem] top-[15rem] rounded-full "></div> */}

              {/* <div className="bg-gradient-to-br from-primary h-[5rem] w-[5rem] relative top-[24rem] left-[13rem] rounded-full"></div> */}

              <div className="bg-gradient-to-br from-[#31CDBA] h-[5rem] w-[5rem] relative left-[-18rem] top-[5rem] rounded-full"></div>
              <div
                className={`w-100p h-[100%] relative bg-transparent flex backdrop-blur-[40px]`}
              >
                {/* <div
                    className={`flex gap-3 items-center z-[1] text-neutral-dark dark:text-white w-[13rem] h-[3rem] border-2 ${
                      theme === "dark"
                        ? style["background-gradient"]
                        : "bg-white"
                    } border-primary absolute left-[4rem] top-[39%] rounded-md`}
                  >
                    <div className="ml-2 px-[0.4rem] py-[0.25rem] bg-white-purple-shade dark:bg-darkPurple overflow-hidden rounded-md">
                      <Image src="/Bitmoji.svg" width={20} height={20} />
                    </div>

                    <span className="text-sm">Dwayne Johnson</span>
                  </div> */}

                <div
                  className={`flex gap-3 items-center z-[1] text-neutralDark dark:text-white w-[23rem] h-[4rem] bg-white border-2 border-[#31CDBA] rounded-2xl mt-20`}
                >
                  <div className="ml-2 px-[0.4rem] py-[0.25rem] bg-[#E7FFE0] dark:bg-darkPurple overflow-hidden rounded-md">
                    <Image src="/bitmoji-female.svg" width={20} height={20} />
                  </div>

                  <div className="flex flex-col me-5">
                    <span className="text-md text-bold">Amina Farah</span>
                    <span className="text-xs">Full-Stack Developer</span>
                  </div>

                  <div>
                    <p className="text-xs bg-[#E7FFE0] dark:bg-green-900 p-2 rounded-full flex gap-2 font-medium">
                      Recommended{" "}
                      <Image src="/Ellipse_green.svg" width={6} height={6} />
                    </p>
                  </div>
                </div>

                {/* <div
                    className={`flex gap-3 items-center z-[1] text-neutralDark dark:text-white w-[13rem] h-[3rem] border-2 ${
                      theme === "dark"
                        ? style["background-gradient"]
                        : "bg-white"
                    } border-primary left-[10rem] top-[61%] absolute rounded-md`}
                  >
                    <div className="ml-2 px-[0.4rem] py-[0.25rem] bg-white-purple-shade dark:bg-darkPurple overflow-hidden rounded-md">
                      <Image src="/Bitmoji.svg" width={20} height={20} />
                    </div>

                    <span className="text-sm">Dwayne Johnson</span>
                  </div> */}

                {/* <div className="bg-gradient-to-r from-white to-transparent via-20% via-transparent w-80p justify-center flex flex-col space-y-8 mb-[6rem] "> */}
              </div>
            </div>
          </div>
          {/* </div> */}
        </div>

        <TrustedCandidates />
        <Link href={`${process.env.NEXT_PUBLIC_URL}/client-signup`}>
          <button
            className={`max-md:mx-auto px-3 py-2.5 text-md bg-gradient-to-tr from-btnPurple to-lightPurple rounded-3xl font-semibold w-[15rem] text-white`}
          >
            Get Started today
          </button>
        </Link>
      </div>
    </>
  );
};

export default HeroSection;
