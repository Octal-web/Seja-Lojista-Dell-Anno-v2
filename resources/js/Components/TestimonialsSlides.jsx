import "swiper/swiper-bundle.css";

import { useState } from "react";

import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { SwiperNavigation } from "./SwiperNavigation";

export const TestimonialsSlides = ({ testimonials, onSlideChange }) => {
    const [swiper, setSwiper] = useState(null);
    const [current, setCurrent] = useState(1);

    return (
        <div className="relative min-w-0 flex-1">
            <Swiper
                role="region"
                aria-roledescription="carrossel"
                aria-label="Depoimentos de lojistas Dell Anno"
                modules={[Pagination]}
                slidesPerView={1}
                spaceBetween={2}
                loop={testimonials.length > 1}
                onSwiper={(swiperInstance) => {
                    setSwiper(swiperInstance);
                    onSlideChange(swiperInstance.realIndex);
                }}
                onRealIndexChange={(swiperInstance) => {
                    onSlideChange(swiperInstance.realIndex);
                }}
                onSlideChange={(swiper) => {
                    setCurrent(swiper.realIndex + 1);
                }}
                pagination={{
                    el: ".pagination",
                    clickable: true,
                }}
            >
                {testimonials.map((item, index) => (
                    <SwiperSlide
                        key={`${item.name}-${index}`}
                        className="!w-full"
                    >
                        <img
                            src={item.image}
                            alt={item.name}
                            width="1091"
                            height="782"
                            loading={index === 0 ? "eager" : "lazy"}
                            decoding="async"
                            className="h-[460px] w-full object-cover object-top lg:h-[660px] 2xl:h-[742px]"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

            {testimonials.length > 1 ? (
                <div className="absolute right-1 bottom-[101%] sm:right-10 sm:bottom-[110%] lg:bottom-16 z-20 lg:-left-44 xl:-left-52">
                    <SwiperNavigation
                        className="text-white"
                        current={current}
                        total={testimonials.length}
                        onPrev={() => swiper?.slidePrev()}
                        onNext={() => swiper?.slideNext()}
                    />
                </div>
            ) : null}
        </div>
    );
};
