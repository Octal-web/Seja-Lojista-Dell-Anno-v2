import "swiper/swiper-bundle.css";

import { useRef, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import { storesfrontsSlides } from "@/Data/storesfrontsSlides";

import { SwiperNavigation } from "./SwiperNavigation";

export const StorefrontsSlides = () => {
    const swiperRef = useRef(null);

    const [current, setCurrent] = useState(1);

    const totalSlides = storesfrontsSlides.length;

    const goToPrevSlide = () => {
        swiperRef.current?.slidePrev();
    };

    const goToNextSlide = () => {
        swiperRef.current?.slideNext();
    };

    return (
        <div className="relative min-w-0 flex-1">
            <Swiper
                role="region"
                aria-roledescription="carrossel"
                aria-label="Fachadas das lojas Dell Anno"
                slidesPerView={1}
                spaceBetween={2}
                watchOverflow
                loop={totalSlides > 1}
                onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                    setCurrent(swiper.realIndex + 1);
                }}
                onRealIndexChange={(swiper) => {
                    setCurrent(swiper.realIndex + 1);
                }}
            >
                {storesfrontsSlides.map((item, index) => (
                    <SwiperSlide
                        key={`${item.name}-${index}`}
                        className="!h-auto"
                    >
                        <div className="aspect-square md:aspect-[767/400] overflow-hidden">
                            <img
                                src={item.src}
                                alt={item.alt}
                                width="1091"
                                height="782"
                                loading={index === 0 ? "eager" : "lazy"}
                                decoding="async"
                                className="max-h-[85dvh] h-full w-full object-cover"
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {totalSlides > 1 ? (
                <div className="absolute -top-10 right-0 z-10 lg:-top-20">
                    <SwiperNavigation
                        current={current}
                        total={totalSlides}
                        onPrev={goToPrevSlide}
                        onNext={goToNextSlide}
                    />
                </div>
            ) : null}
        </div>
    );
};