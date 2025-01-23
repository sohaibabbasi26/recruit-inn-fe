// import Image from "next/image";
// import { Navigation, Pagination } from "swiper/modules";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

// const testimonials = [
//   {
//     id: 1,
//     heading: "Hire an entire team of Developers from us.",
//     message:
//       "RecruitInn.ai saved us time and helped us find top talent faster with smart automation.",
//     author: "Muhammad Ahsan Khan",
//     designation: "Founder, SkillBuilder",
//     image: "/avt1.png",
//   },
//   {
//     id: 2,
//     heading: "Hire an entire team of Developers from us.",
//     message:
//       "RecruitInn.ai transformed our hiring by speeding up sourcing with AI.",
//     author: "Muhammad Nameer Uddin",
//     designation: "Founder, Universal Technologies",
//     image: "/avt1.png",
//   },
//   {
//     id: 3,
//     heading: "Hire an entire team of Developers from us.",
//     message:
//       "We saw incredible results with RecruitInn.ai’s seamless hiring process. It allowed us to focus on evaluating top candidates without the usual hassle.",
//     author: "Arshad Iqbal",
//     designation: "Country Manager, Tixsee Labs LLC",
//     image: "/avt1.png",
//   },
//   {
//     id: 4,
//     heading: "Hire an entire team of Developers from us.",
//     message:
//       "Finding the right people for our team was never this simple. RecruitInn.ai made sure we had the best talent in no time.",
//     author: "Muhammad Ahsan Khan",
//     designation: "Founder, SkillBuilder",
//     image: "/avt1.png",
//   },
//   {
//     id: 5,
//     heading: "Hire an entire team of Developers from us.",
//     message:
//       "With the help of RecruitInn.ai we were able to transform the way we approached hiring. The entire process became faster and more efficient.",
//     author: "Muhammad Nameer Uddin",
//     designation: "Founder, Universal Technologies",
//     image: "/avt1.png",
//   },
// ];

// const Testimonials = () => {
//   return (
//     <section className="py-16 bg-white">
//       <div className="container mx-auto px-4">
//         <h2 className="text-center text-5xl font-bold text-gray-900">
//           Testimonials
//         </h2>
//         <p className="text-center text-md text-gray-500 mt-2">
//           Don’t take our words for it. Here’s what others have to say about us.
//         </p>
//         <div className="mt-12 mx-auto max-w-[97%]">
//           <Swiper
//             modules={[Navigation, Pagination]}
//             spaceBetween={30} // Space between slides
//             slidesPerView={1} // Default to 1 slide per view
//             navigation
//             pagination={{ clickable: true }}

//             breakpoints={{
//               640: {
//                 slidesPerView: 1, // 1 column on small screens
//               },
//               768: {
//                 slidesPerView: 2, // 2 columns on medium screens
//               },
//               1024: {
//                 slidesPerView: 3, // 3 columns on large screens
//               },
//             }}
//           >
//             {testimonials.map((testimonial) => (
//               <SwiperSlide key={testimonial.id}  className="py-8 rounded-3xl " >
//                 <div className="relative flex flex-col rounded-3xl border border-gray-200 p-6  transition hover:border-purple-600 hover:shadow-2xl-purple">
//                   <h3 className="text-sm text-gray-500">{testimonial.heading}</h3>
//                   <p className="mt-4 text-2xl font-bold text-gray-900 leading-relaxed">
//                     {testimonial.message}
//                   </p>
//                   <div className="mt-6 flex items-center">
//                     <Image
//                       src={testimonial.image}
//                       alt={testimonial.author}
//                       width={48}
//                       height={48}
//                       className="rounded-full"
//                     />
//                     <div className="ml-4 mt-1">
//                       <p className="text-lg text-purple-600 font-bold">
//                         {testimonial.author}
//                       </p>
//                       <p className="text-sm text-gray-500">
//                         {testimonial.designation}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="absolute bottom-20 right-6">
//                     <Image
//                       src="/quotation.png"
//                       alt={testimonial.author}
//                       width={40}
//                       height={40}
//                     />
//                   </div>
//                 </div>
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Testimonials;

import Image from "next/image";
import { Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

// const testimonials = [
//   {
//     id: 1,
//     heading: "Hire an entire team of Developers from us.",
//     message:
//       "RecruitInn.ai helped us hire top talent faster with smart automation.",
//     author: "syed Zubair Alam",
//     designation: "Founder, Co-VenTech",
//     image: "/avt1.png",
//   },
//   {
//     id: 2,
//     heading: "Hire an entire team of Developers from us.",
//     message:
//       "RecruitInn.ai transformed our hiring by speeding up sourcing with AI.",
//     author: "Muhammad Nameer Uddin",
//     designation: "Founder, Universal Technologies",
//     image: "/avt1.png",
//   },
//   {
//     id: 3,
//     heading: "Hire an entire team of Developers from us.",
//     message:
//       "RecruitInn.ai sped up hiring and improved candidate quality through smart automation.",
//     author: "Arshad Iqbal",
//     designation: "Country Manager, Tixsee Labs LLC",
//     image: "/avt1.png",
//   },
//   {
//     id: 4,
//     heading: "Hire an entire team of Developers from us.",
//     message:
//       "RecruitInn.ai saved us time and helped us find top talent faster with smart automation.",
//     author: "Muhammad Ahsan Khan",
//     designation: "Founder, SkillBuilder",
//     image: "/avt1.png",
//   },
//   {
//     id: 5,
//     heading: "Hire an entire team of Developers from us.",
//     message:
//      "RecruitInn.ai revolutionized our hiring process, accelerating candidate sourcing through AI.",
//     author: "Muhammad Aqib",
//     designation: "Founder, Well-Tech",
//     image: "/avt1.png",
//   },
// ];

const Testimonials = ({t}) => {
  const testimonials = t("Testimonials.T_content", { returnObjects: true,  });

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-5xl font-bold text-gray-900">
          {t("Testimonials.T_heading")}
        </h2>
        <p className="text-center text-md text-gray-500 mt-2">
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
                  <h3 className="text-sm text-gray-500">
                    {testimonial.heading}
                  </h3>
                  <p className="mt-4 text-2xl font-bold text-gray-900 leading-relaxed">
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
