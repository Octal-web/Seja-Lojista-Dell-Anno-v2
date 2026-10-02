import { testimonials } from "@/Data/testimonials";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { TestimonialsSlides } from "../TestimonialsSlides";
import { Text } from "../ui/Text";
import { Title } from "../ui/Title";

gsap.registerPlugin(ScrollTrigger);

export const Testimonials = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const sectionRef = useRef(null);
    const contentRef = useRef(null);
    const sliderRef = useRef(null);
    const infoRef = useRef(null);

    const activeTestimonial = testimonials[activeIndex] ?? testimonials[0];

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                },
            });

            tl.from(contentRef.current, {
                x: -40,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
            })
                .from(
                    sliderRef.current,
                    {
                        x: 40,
                        opacity: 0,
                        duration: 0.8,
                        ease: "power3.out",
                    },
                    "-=0.55",
                )
                .to(
                    infoRef.current,
                    {
                        scaleX: 0,
                        transformOrigin: "right center",
                        duration: 1,
                        ease: "power2.out",
                    },
                    "+=0.01",
                );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="presenca"
            aria-labelledby="testimonials-title"
            className="pt-20 sm:pt-24 xl:pt-32 2xl:pt-40"
        >
            <div className="container max-w-large">
                <div className="relative grid lg:grid-cols-2">
                    <div ref={contentRef} className="flex flex-col">
                        <div className="pb-12 text-center lg:pb-0 lg:text-start mt-10 sm:mt-16 md:mt-20 2xl:mt-[293px]">
                            <Title
                                id="testimonials-title"
                                variant="display"
                                as="h2"
                                className="uppercase"
                            >
                               Trajetórias de sucesso de lojistas <span className="whitespace-nowrap">Dell Anno</span>
                            </Title>
                            <Text
                                variant="bodySmall"
                                className="pt-3 lg:pt-9 lg:max-w-[528px] text-justify md:text-start"
                            >
                                Empreendedores que encontraram na <span className="whitespace-nowrap">Dell Anno</span> uma oportunidade para abrir novos caminhos, levando para suas regiões uma marca reconhecida e uma experiência de loja à altura de quem valoriza arquitetura e design.
                            </Text>
                        </div>

                        <div
                            role="status"
                            aria-live="polite"
                            aria-atomic="true"
                            className="mt-auto w-full bg-primary px-10 sm:pl-10 lg:pl-[53px]  relative h-32 lg:h-40 flex flex-col justify-center"
                        >
                            <div ref={infoRef} className="pointer-events-none absolute inset-0 z-10 bg-white" aria-hidden="true" />
                            <div
                                aria-hidden="true"
                                className="absolute left-3 top-0 bottom-0 w-3 bg-white"
                            />

                            <Title
                                weight="light"
                                as="h3"
                                variant="none"
                                className="text-white text-xl md:text-2xl xl:text-[32px] uppercase"
                            >
                                {activeTestimonial.name}
                            </Title>

                            <Text
                                variant="bodySmall"
                                weight="light"
                                className="pt-3 text-white"
                            >
                                {activeTestimonial.local}
                            </Text>
                        </div>
                    </div>

                    <div ref={sliderRef}>
                        <TestimonialsSlides
                            testimonials={testimonials}
                            onSlideChange={setActiveIndex}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};
