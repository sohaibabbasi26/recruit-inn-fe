import Image from "next/image";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const testimonials = [
  {
    id: 1,
    heading: "Hire an entire team of Developers from us.",
    message:
      "RecruitInn.ai saved us time and helped us find top talent faster with smart automation.",
    author: "Muhammad Ahsan Khan",
    designation: "Founder, SkillBuilder",
    image: "/avt1.png",
  },
  {
    id: 2,
    heading: "Hire an entire team of Developers from us.",
    message:
      "RecruitInn.ai transformed our hiring by speeding up sourcing and enhancing match accuracy with AI.",
    author: "Muhammad Nameer Uddin",
    designation: "Founder, Universal Technologies",
    image: "/avt1.png",
  },
  {
    id: 3,
    heading: "Hire an entire team of Developers from us.",
    message:
      "RecruitInn.ai sped up hiring and improved candidate quality through smart automation.",
    author: "Arshad Iqbal",
    designation: "Country Manager, Tixsee Labs LLC",
    image: "/avt1.png",
  },
  {
    id: 4,
    heading: "Hire an entire team of Developers from us.",
    message:
      "RecruitInn.ai sped up hiring and improved candidate quality through smart automation.",
    author: "Arshad Iqbal",
    designation: "Country Manager, Tixsee Labs LLC",
    image: "/avt1.png",
  },
  {
    id: 5,
    heading: "Hire an entire team of Developers from us.",
    message:
      "RecruitInn.ai sped up hiring and improved candidate quality through smart automation.",
    author: "Arshad Iqbal",
    designation: "Country Manager, Tixsee Labs LLC",
    image: "/avt1.png",
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-5xl font-bold text-gray-900">
          Testimonials
        </h2>
        <p className="text-center text-md text-gray-500 mt-2">
          Don’t take our words for it. Here’s what other have to say about us.
        </p>
        <div className="mt-12 max-w-4xl mx-auto">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={50}
            slidesPerView={3}
            navigation
            pagination={{ clickable: true }}
            //scrollbar={{ draggable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log("slide change")}
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide>
                <div
                  key={testimonial.id}
                  className={`flex flex-col rounded-3xl border border-gray-200 p-6 transition hover:border-purple-600 hover:shadow-2xl-purple`}
                >
                  <h3 className="text-sm text-gray-500">
                    {testimonial.heading}
                  </h3>
                  <p className="mt-4 text-2xl font-bold text-gray-900  leading-relaxed">
                    {testimonial.message}
                  </p>
                  <div className="mt-6  flex items-center">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.author}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                    <div className="ml-4 mt-1">
                      <p className="text-lg text-purple-600 font-bold">
                        {testimonial.author}
                      </p>
                      <p className="text-sm text-gray-500">
                        {testimonial.designation}
                      </p>
                    </div>
                  </div>
                  <div className="absolute bottom-20 right-6 ">
                    <Image
                      src="/quotation.png"
                      alt={testimonial.author}
                      width={40}
                      height={40}
                    />
                  </div>
                  {/* <div className="absolute bottom-6 right-6 text-black text-5xl">
                &#8221;
              </div> */}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
