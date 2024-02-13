import CardDiv from "./CardDiv";
import TechstackOne from "./TechstackOne";
import TechstackTwo from "./TechstackTwo";

const LandingThird = () => {

    return (
        <>
            <div className="h-[100vh] w-full flex justify-center">
                <div className="w-90p flex justify-between items-center gap-5 ">
                    <div className="w-[50%] h-90p  right-dv-gradient rounded-3xl flex flex-col items-center">
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
        </>
    )
}

export default LandingThird;