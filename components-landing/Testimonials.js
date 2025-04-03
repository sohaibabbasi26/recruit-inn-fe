
import Image from "next/image";
import { Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";



const Testimonials = ({t}) => {
  const testimonials = t("Testimonials.T_content", { returnObjects: true,  });
  const { theme } = useTheme();
  const { i18n } = useTranslation(); // Get i18n instance
  const isRTL = i18n.dir() === "rtl";

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2   dir={isRTL ? "rtl" : "ltr"} className="text-center text-5xl font-bold text-gray-900">
          {t("Testimonials.T_heading")}
        </h2>
        <p  dir={isRTL ? "rtl" : "ltr"} className="text-center text-md text-gray-500 mt-2">
          {t("Testimonials.T_subheading")}
        </p>
        <div className="mt-12 mx-auto max-w-[97%]">
          <Swiper
            modules={[Pagination, Autoplay]} // Use Pagination and Autoplay modules
            spaceBetween={30} // Space between slides
            slidesPerView={1} // Default: 1 slide per view
            autoplay={{
              delay: 3000, // Delay of 3 seconds
              disableOnInteraction: false, // Continue autoplay after user interacts
            }}
            loop={true} // Enable infinite loop
            pagination={{ clickable: true }} // Enable clickable pagination dots
            breakpoints={{
              640: {
                slidesPerView: 1, // 1 column on small screens
              },
              768: {
                slidesPerView: 2, // 2 columns on medium screens
              },
              1024: {
                slidesPerView: 3, // 3 columns on large screens
              },
            }}
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id} className="py-8 rounded-3xl">
                <div className="relative flex flex-col h-[300px] rounded-3xl border border-gray-200 p-6  transition hover:border-purple-600 hover:shadow-2xl-purple">
                  <h3 dir={isRTL ? "rtl" : "ltr"} className="text-sm text-gray-500">
                    {testimonial.heading}
                  </h3>
                  <p  dir={isRTL ? "rtl" : "ltr"} className="mt-4 text-xl 2xl:text-2xl font-bold text-gray-900 leading-relaxed">
                    {testimonial.message}
                  </p>
                  <div className="absolute bottom-5 flex items-center">
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
                  <div className="absolute bottom-20 right-6">
                    <Image
                      src="/quotation.png"
                      alt={testimonial.author}
                      width={40}
                      height={40}
                    />
                  </div>
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
