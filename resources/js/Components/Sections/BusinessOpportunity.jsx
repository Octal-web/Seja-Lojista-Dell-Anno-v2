import { useEffect, useRef } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Text } from "@/Components/ui/Text";
import { Title } from "@/Components/ui/Title";

import businessOpportunityImage from "@/imgs/content/display/business-opportunity.jpg";
import { LinkButton } from "../ui/LinkButton";

gsap.registerPlugin(ScrollTrigger);

const titleLines = [
    "Uma marca lucrativa",
    "para projetos que",
    "exigem mais",
];

export const BusinessOpportunity = () => {
    const sectionRef = useRef(null);
    const contentLeftRef = useRef([]);
    const contentRightRef = useRef(null);

    const bannerWrapperRef = useRef(null);
    const bannerImageRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const leftItems = contentLeftRef.current.filter(Boolean);

            const prefersReducedMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)",
            ).matches;

            if (prefersReducedMotion) {
                gsap.set([...leftItems, contentRightRef.current], {
                    x: 0,
                    y: 0,
                    opacity: 1,
                });

                gsap.set(bannerImageRef.current, {
                    objectPosition: "50% 50%",
                });

                return;
            }

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    toggleActions: "play none none none",
                },
            });

            tl.from(leftItems, {
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out",
            }).from(
                contentRightRef.current,
                {
                    x: 40,
                    opacity: 0,
                    duration: 0.9,
                    ease: "power3.out",
                },
                "-=0.95",
            );

            gsap.fromTo(
                bannerImageRef.current,
                {
                    objectPosition: "50% 100%",
                },
                {
                    objectPosition: "50% 0%",
                    ease: "none",
                    scrollTrigger: {
                        trigger: bannerWrapperRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true,
                    },
                },
            );
        }, sectionRef);

        ScrollTrigger.refresh();

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            aria-labelledby="business-opportunity-title"
            className="bg-white"
        >
            <div className="container max-w-large">
                <div className="grid min-h-[355px] grid-cols-1 items-center gap-10 pt-20 sm:px-5 md:grid-cols-2 md:pt-24 2xl:pt-32">
                    <div>
                        <Title
                            id="business-opportunity-title"
                            as="h2"
                            variant="display"
                            weight="light"
                            className="lg:max-w-[626px] uppercase"
                        >
                            {titleLines.map((line, index) => (
                                <span
                                    key={line}
                                    aria-hidden="true"
                                    className="block overflow-hidden pb-1"
                                >
                                    <span
                                        ref={(element) => {
                                            contentLeftRef.current[index] =
                                                element;
                                        }}
                                        className="block"
                                    >
                                        {line}
                                    </span>
                                </span>
                            ))}
                        </Title>
                    </div>

                    <div
                        ref={contentRightRef}
                        className="space-y-6 lg:max-w-[640px] text-justify md:text-start"
                    >
                        <Text variant="bodySmall">
                            Ser lojista <span className="whitespace-nowrap">Dell Anno</span> é levar para cada projeto um repertório amplo de possibilidades, em que estética, personalização e precisão encontram espaço para criar.
                        </Text>

                        <Text variant="bodySmall">
                            Com liberdade projetual e recursos para atender diferentes níveis de complexidade, a marca permite explorar soluções que valorizam a arquitetura e a singularidade de cada projeto.
                        </Text>

                    </div>
                </div>
                <div className="flex justify-center">
                <LinkButton href={`${route("Home.index")}#orcamento`} variant="white" size="md" className="!block mt-12 mb-20 md:mb-24 2xl:mb-32">Quero receber uma proposta da <span className="whitespace-nowrap"> Dell Anno</span>
                </LinkButton>
                </div>
            </div>

            <div
                ref={bannerWrapperRef}
                className="relative aspect-[3/2] w-full overflow-hidden md:aspect-[192/71]"
            >
                <img
                    ref={bannerImageRef}
                    src={businessOpportunityImage}
                    alt="Ambiente de cozinha planejada Dell Anno"
                    width="1920"
                    height="1080"
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover object-[50%_100%] will-change-[object-position]"
                />
            </div>
        </section>
    );
};
