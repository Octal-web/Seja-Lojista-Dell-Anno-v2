import { useEffect, useRef } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Text } from "@/Components/ui/Text";
import { Title } from "@/Components/ui/Title";

import businessImage from "@/imgs/content/display/business-info.jpg";
import { LinkButton } from "../ui/LinkButton";

gsap.registerPlugin(ScrollTrigger);

export const BusinessInfo = () => {
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
            id="mercado"
        >
            <div className="container max-w-large">

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
                            className="lg:max-w-[678px] uppercase text-balance
                            "
                        >
                            O alto padrão movimenta um mercado de € 1,48 trilhão
                        </Title>

                        <div
                            ref={(element) => {
                                contentLeftRef.current[1] = element;
                            }}
                            className="pt-12 lg:max-w-[640px] text-justify md:text-start"
                        >
                            <Text weight="light" variant="bodySmall">
                                Mesmo diante das transformações no comportamento
                                de consumo, o setor permaneceu acima dos níveis
                                pré-pandemia e segue sustentado pela busca por
                                experiências mais significativas, personalizadas
                                e alinhadas aos valores de cada consumidor.
                            </Text>

                            <Text
                                weight="light"
                                variant="bodySmall"
                                className="mt-5"
                            >
                                É nesse universo de escolhas mais criteriosas
                                que marcas com identidade, capacidade de
                                personalização e excelência de produto encontram
                                espaço para construir valor.
                                <span className="block text-xs mt-1">
                                    Fonte: Bain & Company e Altagamma — Luxury
                                    Goods Worldwide Market Study 2024.
                                </span>
                            </Text>
                        </div>

                        <LinkButton href={`${route("Home.index")}#orcamento`} variant="primary" className="!block uppercase mt-7">
                            Faça parte desse mercado com a <span className="whitespace-nowrap">Dell Anno</span>
                        </LinkButton>
                    </div>

                    <div ref={contentRightRef}>
                        <div className="aspect-[74/60] overflow-hidden">
                            <img
                                src={businessImage}
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
        </section>
    );
};
