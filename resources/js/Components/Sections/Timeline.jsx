import { timeline } from "@/Data/timeline";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import { Text } from "@/Components/ui/Text";
import { Title } from "@/Components/ui/Title";
import { LinkButton } from "../ui/LinkButton";
import { withBrandNowrap } from "@/Utils/brandName";

gsap.registerPlugin(ScrollTrigger);

export const Timeline = () => {
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const cardRefs = useRef([]);
    const imageRefs = useRef([]);
    const swiperRef = useRef(null);

    const [currentSlide, setCurrentSlide] = useState(1);
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);

    const totalSlides = timeline.length;

    useEffect(() => {
        const context = gsap.context(() => {
            const cards = cardRefs.current.filter(Boolean);
            const images = imageRefs.current.filter(Boolean);

            const prefersReducedMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)",
            ).matches;

            if (prefersReducedMotion) {
                gsap.set([headingRef.current, ...cards], {
                    y: 0,
                    opacity: 1,
                });

                gsap.set(images, {
                    scale: 1,
                });

                return;
            }

            const timelineAnimation = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 78%",
                    toggleActions: "play none none none",
                },
            });

            timelineAnimation
                .fromTo(
                    headingRef.current,
                    {
                        y: 25,
                        opacity: 0,
                    },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.7,
                        ease: "power2.out",
                    },
                )
                .fromTo(
                    cards,
                    {
                        y: 60,
                        opacity: 0,
                        scale: 0.95,
                    },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 0.9,
                        stagger: 0.12,
                        ease: "power3.out",
                    },
                    "-=0.35",
                )
                .fromTo(
                    images,
                    {
                        scale: 1.08,
                    },
                    {
                        scale: 1,
                        duration: 1.1,
                        stagger: 0.12,
                        ease: "power2.out",
                    },
                    "<",
                );
        }, sectionRef);

        ScrollTrigger.refresh();

        return () => {
            context.revert();
        };
    }, []);

    const updateSwiperState = (swiper) => {
        setCurrentSlide(swiper.realIndex + 1);
        setIsBeginning(swiper.isBeginning);
        setIsEnd(swiper.isEnd);
    };

    const goToPrevSlide = () => {
        swiperRef.current?.slidePrev();
    };

    const goToNextSlide = () => {
        swiperRef.current?.slideNext();
    };

    const formatNumber = (number) => {
        return number.toString().padStart(2, "0");
    };

    return (
        <section
            ref={sectionRef}
            id="diferenciais"
            aria-labelledby="timeline-title"
            className="relative overflow-hidden pt-24 md:pt-32 lg:pt-40"
        >
            <div className="container max-w-large">
                <div className="mb-10 flex flex-col items-center gap-8 text-center md:mb-12 md:text-start xl:flex-row xl:justify-between">
                    <Title
                        ref={headingRef}
                        id="timeline-title"
                        as="h2"
                        variant="display"
                        weight="light"
                        className="uppercase"
                    >
                        Por que abrir uma loja <span className="whitespace-nowrap">Dell Anno</span>?
                    </Title>

                    <LinkButton
                        href={`${route("Home.index")}#orcamento`}
                        variant="primary"
                        className="!block uppercase"
                    >
                        Quero ser <span className="whitespace-nowrap">Dell Anno</span>
                    </LinkButton>
                </div>

                <div className="mb-8 flex items-center">
                    <div className="flex items-center font-secondary text-sm font-light tracking-widest text-gray-400">
                        <button
                            type="button"
                            onClick={goToPrevSlide}
                            disabled={isBeginning}
                            aria-label="Ver motivo anterior"
                            className="mr-4 transition-colors hover:text-gray-600 disabled:cursor-default disabled:opacity-30"
                        >
                            <svg
                                width="12"
                                height="18"
                                viewBox="0 0 12 18"
                                fill="none"
                                aria-hidden="true"
                            >
                                <path
                                    d="M10 2L3 9L10 16"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>

                        <span
                            aria-live="polite"
                            aria-atomic="true"
                            className="mx-3"
                        >
                            {formatNumber(currentSlide)} /{" "}
                            {formatNumber(totalSlides)}
                        </span>

                        <button
                            type="button"
                            onClick={goToNextSlide}
                            disabled={isEnd}
                            aria-label="Ver próximo motivo"
                            className="ml-4 transition-colors hover:text-gray-600 disabled:cursor-default disabled:opacity-30"
                        >
                            <svg
                                width="12"
                                height="18"
                                viewBox="0 0 12 18"
                                fill="none"
                                aria-hidden="true"
                            >
                                <path
                                    d="M2 16L9 9L2 2"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                <Swiper
                    slidesPerView={1.3}
                    spaceBetween={16}
                    grabCursor
                    watchOverflow
                    breakpoints={{
                        500: {
                            slidesPerView: 1.7,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 2.1,
                            spaceBetween: 24,
                        },
                        1024: {
                            slidesPerView: 2.4,
                            spaceBetween: 30,
                        },
                        1440: {
                            slidesPerView: 3.15,
                            spaceBetween: 30,
                        },
                    }}
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper;
                        updateSwiperState(swiper);
                    }}
                    onSlideChange={updateSwiperState}
                    onBreakpoint={updateSwiperState}
                    className="!overflow-visible"
                    role="region"
                    aria-roledescription="carrossel"
                    aria-label="Motivos para abrir uma loja Dell Anno Planejados"
                >
                    {timeline.map((item, index) => (
                        <SwiperSlide
                            key={`${item.title}-${index}`}
                            className="!h-auto"
                        >
                            <article
                                ref={(element) => {
                                    cardRefs.current[index] = element;
                                }}
                                aria-labelledby={`timeline-card-${index}-title`}
                                className="group flex h-full flex-col bg-white"
                            >
                                <div className="aspect-square 2xl:aspect-[4/5] overflow-hidden">
                                    <img
                                        ref={(element) => {
                                            imageRefs.current[index] = element;
                                        }}
                                        src={item.image}
                                        alt={item.imageAlt}
                                        loading="lazy"
                                        decoding="async"
                                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:!scale-105"
                                    />
                                </div>

                                <div className="flex flex-1 flex-col pt-6">
                                    <Title
                                        id={`timeline-card-${index}-title`}
                                        as="h3"
                                        variant="none"
                                        weight="light"
                                        className="text-xl uppercase md:text-2xl lg:text-[30px]"
                                    >
                                        {item.title}

                                        {item.title2 && (
                                            <span className="block">
                                                {item.title2}
                                            </span>
                                        )}
                                    </Title>

                                    <Text
                                        variant="bodySmall"
                                        weight="light"
                                        className="mt-3 max-w-[400px] lg:mt-5 text-justify md:text-start"
                                    >
                                        {withBrandNowrap(item.text)}

                                        {item.text2 && (
                                            <span className="block mt-1.5">
                                                {item.text2}
                                            </span>
                                        )}
                                    </Text>
                                </div>
                            </article>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};
