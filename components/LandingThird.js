import CardDiv from "./CardDiv";
import TechstackOne from "./TechstackOne";
import TechstackTwo from "./TechstackTwo";

const LandingThird = () => {
    return (
        <>
        <div className="mt-[5%] h-[100vh] w-full flex justify-center max-md:hidden">
            <div className="w-90p flex justify-between items-center gap-5 ">

                <div className="w-[50%] h-90p right-dv-gradient rounded-3xl flex flex-col items-center">
                    <div className="w-80p h-50p flex justify-center items-center relative">
                        <CardDiv className='top-[8rem] right-[14rem]' hoverEffect={false} />
                        <CardDiv className='top-[3rem] right-[5%]' hoverEffect={true} />
                    </div>
                    <div className="w-80p h-50p flex flex-col justify-center">
                        <span className="text-lightPurpleText font-semibold text-lg">
                            TALENTS
                        </span>
                        <h3 className="text-white text-4xl font-semibold mb-[2rem] gradient-text">
                            GET INTO TOUCH WITH WORLD’S BEST ENGINEERS
                        </h3>
                        <p className="text-white">
                            Forge connections with leading engineers for cutting-edge innovation and expertise.
                            This collaboration unlocks visionary solutions, propelling you to the forefront of engineering excellence for unparalleled success.
                        </p>
                    </div>
                </div>

                <div className="w-[50%] h-90p bg-elementGradOne rounded-3xl flex flex-col items-center">
                    <div className="w-[100%] h-50p flex flex-col justify-center items-center relative mb-[1.5rem]">
                        <TechstackOne />
                        <TechstackTwo />
                    </div>

                    <div className="w-80p h-50p flex flex-col justify-center">
                        <span className="text-lightPurpleText font-semibold text-lg">
                            SKILLS
                        </span>
                        <h3 className="text-white text-4xl font-semibold mb-[2rem] gradient-text">
                            IN DEMAND SKILLS ESSENTAL FOR MODERN TECHNOLOGIES
                        </h3>
                        <p className="text-white">
                            Forge connections with leading engineers for cutting-edge innovation and expertise.
                            This collaboration unlocks visionary solutions, propelling you to the forefront of engineering excellence for unparalleled success.
                        </p>
                    </div>
                </div>
            </div>
        </div>

        {/* mobile screen */}

        <div className="mt-[5%] h-[100vh] w-full flex justify-center hidden max-md:block">
        <div className="w-full max-w-screen-xl sm:flex justify-between items-center gap-5">
    {/* Column 1 - Shown below Column 2 on small screens */}
    <div className="w-full sm:w-[50%] h-90p sm:h-full right-dv-gradient rounded-3xl flex flex-col items-center">
      <div className="w-80p h-50p flex justify-center items-center relative">
        <CardDiv className='top-[8rem] right-[14rem]' hoverEffect={false} />
        <CardDiv className='top-[3rem] right-[5%]' hoverEffect={true} />
      </div>

      <div className="w-80p h-50p flex flex-col justify-center">
        <span className="text-lightPurpleText font-semibold text-lg">
          TALENTS
        </span>
        <h3 className="text-white text-4xl font-semibold mb-[2rem] gradient-text">
          GET INTO TOUCH WITH WORLD’S BEST ENGINEERS
        </h3>
        <p className="text-white">
          Forge connections with leading engineers for cutting-edge innovation and expertise.
          This collaboration unlocks visionary solutions, propelling you to the forefront of engineering excellence for unparalleled success.
        </p>
      </div>
    </div>

    {/* Column 2 - Shown next to Column 1 on small screens */}
    <div className="w-full sm:w-[50%] h-90p sm:h-full bg-elementGradOne rounded-3xl flex flex-col items-center mt-5 sm:mt-0">
      <div className="w-[100%] h-50p flex flex-col justify-center items-center relative mb-[1.5rem]">
        <TechstackOne />
        <TechstackTwo />
      </div>

      <div className="w-80p h-50p flex flex-col justify-center">
        <span className="text-lightPurpleText font-semibold text-lg">
          SKILLS
        </span>
        <h3 className="text-white text-4xl font-semibold mb-[2rem] gradient-text">
          IN DEMAND SKILLS ESSENTIAL FOR MODERN TECHNOLOGIES
        </h3>
        <p className="text-white">
          Forge connections with leading engineers for cutting-edge innovation and expertise.
          This collaboration unlocks visionary solutions, propelling you to the forefront of engineering excellence for unparalleled success.
        </p>
      </div>
    </div>
  </div>
</div>

        </>
    )
}

export default LandingThird;