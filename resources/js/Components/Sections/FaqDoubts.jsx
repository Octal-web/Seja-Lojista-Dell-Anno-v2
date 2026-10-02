import { useEffect, useRef } from "react";

import { faqDoubts } from "@/Data/faqDoubts";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Doubt } from "../Doubts";
import { Title } from "../ui/Title";

gsap.registerPlugin(ScrollTrigger);

export const FaqDoubts = () => {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const itemRefs = useRef([]);

    useEffect(() => {
        const context = gsap.context(() => {
            const items = itemRefs.current.filter(Boolean);

            const prefersReducedMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)",
            ).matches;

            if (prefersReducedMotion) {
                gsap.set([titleRef.current, ...items], {
                    y: 0,
                    opacity: 1,
                });

                return;
            }

            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                    once: true,
                },
            });

            timeline.fromTo(
                titleRef.current,
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
            );

            timeline.fromTo(
                items,
                {
                    y: 22,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.5,
                    stagger: 0.08,
                    ease: "power2.out",
                },
                "-=0.3",
            );
        }, sectionRef);

        ScrollTrigger.refresh();

        return () => context.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            aria-labelledby="faq-title"
            className="pt-20 sm:pt-30 xl:pt-40 2xl:pt-44 pb-28 xl:pb-40"
        >
            <div className="container max-w-large">
                <Title
                    ref={titleRef}
                    id="faq-title"
                    as="h2"
                    variant="display"
                    weight="light"
                    className="text-start !text-black uppercase"
                >
                    FAQ
                </Title>

                <div
                    role="list"
                    className="mx-auto mt-14 sm:mt-7"
                >
                    {faqDoubts.map((doubt, index) => (
                        <div
                            ref={(element) => {
                                itemRefs.current[index] = element;
                            }}
                            key={doubt.id}
                            role="listitem"
                        >
                            <Doubt index={index} doubt={doubt} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};