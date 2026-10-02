import { useEffect, useRef } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import unicasaImg from "@/imgs/content/display/unicasa-fabrica.jpg";

gsap.registerPlugin(ScrollTrigger);

export const UnicasaImage = () => {
    const sectionRef = useRef(null);
    const imageRef = useRef(null);

    useEffect(() => {
        const context = gsap.context(() => {
            const prefersReducedMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)",
            ).matches;

            if (prefersReducedMotion) {
                gsap.set(imageRef.current, {
                    objectPosition: "60% 50%",
                });

                return;
            }

            gsap.fromTo(
                imageRef.current,
                {
                    objectPosition: "50% 0%",
                },
                {
                    objectPosition: "50% 60%",
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true,
                    },
                },
            );
        }, sectionRef);

        ScrollTrigger.refresh();

        return () => context.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative w-full overflow-hidden aspect-[16/7] md:aspect-[5/2] xl:aspect-[16/6] max-h-[640px] mt-12"
        >
            <img
                ref={imageRef}
                src={unicasaImg}
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover will-change-[object-position]"
            />
        </section>
    );
};
