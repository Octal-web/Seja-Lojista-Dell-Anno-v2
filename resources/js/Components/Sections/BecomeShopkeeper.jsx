import { useEffect, useRef } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Text } from "@/Components/ui/Text";
import { Title } from "@/Components/ui/Title";

import becomeShopkeeperImage from "@/imgs/content/display/business-sell.jpg";
import becomeShopkeeperFull from "@/imgs/content/display/banner-full.jpg";
import { LinkButton } from "../ui/LinkButton";

gsap.registerPlugin(ScrollTrigger);

export const BecomeShopkeeper = () => {
    const sectionRef = useRef(null);
    const contentLeftRef = useRef([]);
    const contentRightRef = useRef(null);
    const bannerWrapperRef = useRef(null);
    const bannerImageRef = useRef(null);

    useEffect(() => {
        const context = gsap.context(() => {
            const leftItems = contentLeftRef.current.filter(Boolean);

            const prefersReducedMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)",
            ).matches;

            if (prefersReducedMotion) {
                gsap.set(
                    [
                        ...leftItems,
                        contentRightRef.current,
                        bannerImageRef.current,
                    ],
                    {
                        x: 0,
                        y: 0,
                        opacity: 1,
                        objectPosition: "50% 50%",
                    },
                );

                return;
            }

            const contentTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    toggleActions: "play none none none",
                },
            });

            contentTimeline
                .from(leftItems, {
                    y: 30,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "power3.out",
                })
                .from(
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

        return () => {
            context.revert();
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            aria-labelledby="become-shopkeeper-title"
            id="perfil"
        >
            <div className="container max-w-large">
                <div className="mt-20 w-full border-t border-[#EDEDED] md:mt-24 xl:mt-28 2xl:mt-32" />

                <div className="grid min-h-[355px] grid-cols-1 items-center gap-10 py-20 sm:px-5 md:py-24 lg:grid-cols-2 2xl:py-32">
                    <div>
                        <Title
                            ref={(element) => {
                                contentLeftRef.current[0] = element;
                            }}
                            id="become-shopkeeper-title"
                            as="h2"
                            variant="display"
                            weight="light"
                            className="lg:max-w-[548px] uppercase"
                        >
                            Um novo caminho para quem sabe onde quer chegar
                        </Title>

                        <div
                            ref={(element) => {
                                contentLeftRef.current[1] = element;
                            }}
                            className="pt-12 lg:max-w-[640px] text-justify md:text-start"
                        >
                            <Text weight="light" variant="bodySmall">
                                Ser lojista <span className="whitespace-nowrap">Dell Anno</span> é representar uma marca
                                presente em projetos que traduzem escolhas,
                                estilos de vida e diferentes formas de viver os
                                espaços.
                            </Text>

                            <Text
                                weight="light"
                                variant="bodySmall"
                                className="mt-5"
                            >
                                É também levar essa experiência para a sua
                                região, construindo uma presença comercial
                                alinhada à força, ao design e ao reconhecimento
                                da <span className="whitespace-nowrap">Dell Anno</span>.
                            </Text>
                        </div>
                        <LinkButton
                            href={`${route("Home.index")}#orcamento`}
                            variant="primary"
                            className="!block uppercase mt-10"
                        >
                            Quero ser lojista <span className="whitespace-nowrap">Dell Anno</span>
                        </LinkButton>
                    </div>

                    <div ref={contentRightRef}>
                        <div className="aspect-[74/55] overflow-hidden">
                            <img
                                src={becomeShopkeeperImage}
                                alt="Ambiente de cozinha planejada Dell Anno"
                                width="740"
                                height="550"
                                loading="lazy"
                                decoding="async"
                                className="h-full w-full object-cover object-center"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div
                ref={bannerWrapperRef}
                className="relative aspect-[3/2] w-full overflow-hidden md:aspect-[192/71]"
            >
                <img
                    ref={bannerImageRef}
                    src={becomeShopkeeperFull}
                    alt="Ambiente de adega planejada Dell Anno"
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
