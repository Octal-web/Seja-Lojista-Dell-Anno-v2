import { useEffect, useRef } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Text } from "@/Components/ui/Text";
import { Title } from "@/Components/ui/Title";

import businessExperienceImage from "@/imgs/content/display/business-experience.jpg";
import { LinkButton } from "../ui/LinkButton";

gsap.registerPlugin(ScrollTrigger);

export const BusinessMovement = () => {
    const sectionRef = useRef(null);
    const contentLeftRef = useRef(null);
    const contentRightRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const prefersReducedMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)",
            ).matches;

            if (prefersReducedMotion) {
                gsap.set([...leftItems, contentRightRef.current], {
                    x: 0,
                    y: 0,
                    opacity: 1,
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

            tl.from(contentLeftRef.current, {
                x: 30,
                opacity: 0,
                duration: 0.9,
                ease: "power3.out",
            }).from(
                contentRightRef.current,
                {
                    x: -40,
                    opacity: 0,
                    duration: 0.9,
                    ease: "power3.out",
                },
                "-=0.95",
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="posicionamento"
            ref={sectionRef}
            aria-label="Marca alinhada aos movimentos internacionais de design"
            className="pt-10 md:pt-30"
        >
            <div className="container max-w-large">
                <div className="grid min-h-[355px] grid-cols-1 items-center gap-10 lg:gap-24 lg:grid-cols-2 sm:px-5">
                    <div ref={contentRightRef}>
                        <img
                            src={businessExperienceImage}
                            alt="Ambiente de cozinha planejada Dell Anno"
                            width="740"
                            height="550"
                            loading="lazy"
                            decoding="async"
                            className="w-full lg:w-[740px] lg:h-[550px] object-cover object-center"
                        />
                    </div>
                    <div ref={contentLeftRef} className="mt-auto">
                        <Title
                            id="become-shopkeeper-title"
                            as="h2"
                            variant="display"
                            weight="light"
                            className="lg:max-w-[703px] uppercase"
                        >
                            Uma marca alinhada aos movimentos internacionais de design
                        </Title>

                        <div className="lg:max-w-[685px] pt-7 space-y-6 text-justify md:text-start">
                            <Text weight="light" variant="bodySmall">
                                A <span className="whitespace-nowrap">Dell Anno</span> acompanha as transformações da arquitetura, dos interiores e do comportamento para traduzir referências contemporâneas em possibilidades concretas de projeto.
                            </Text>

                            <Text weight="light" variant="bodySmall">
                                A personalização permite ajustar os produtos milímetro a milímetro em altura, largura e profundidade, ampliando as possibilidades de composição e adaptação a cada espaço. A tecnologia de borda laser cria uma união imperceptível entre a superfície e a borda, valorizando a continuidade visual e o acabamento das peças.
                            </Text>

                            <Text weight="light" variant="bodySmall">
                                Para o lojista, isso significa contar com uma marca capaz de transformar repertório internacional em soluções personalizadas, com tecnologia e atenção ao resultado estético de cada projeto.
                            </Text>
                        </div>

                        <LinkButton href={`${route("Home.index")}#orcamento`} variant="primary" className="!block uppercase mt-7">
                            QUERO TER UMA LOJA AUTORIZADA <span className="whitespace-nowrap">DELL ANNO</span>
                        </LinkButton>
                    </div>
                </div>
            </div>
        </section>
    );
};
