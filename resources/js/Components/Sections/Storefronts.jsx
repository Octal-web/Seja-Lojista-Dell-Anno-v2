import { StorefrontsSlides } from "../StorefrontsSlides";
import { Text } from "../ui/Text";
import { Title } from "../ui/Title";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export const Storefronts = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    toggleActions: "play none none none",
                },
            });

            tl.from(
                ".content-text",
                {
                    y: 40,
                    opacity: 0,
                    duration: 0.9,
                    ease: "power3.out",
                    stagger: 0.15,
                },
                "+=0.05",
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            aria-label="Fachadas das lojas"
            className="container max-w-large pt-24 md:pt-30 xl:pt-36 2xl:pt-48"
        >
            <div ref={sectionRef}>
                <Title
                    id="lojista-form-title"
                    as="h2"
                    variant="display"
                    weight="light"
                    className="uppercase content-text"
                >
                    Arquitetura das lojas
                </Title>

                <Text
                    id="lojista-form-description"
                    as="p"
                    variant="bodySmall"
                    weight="light"
                    className="mt-3 xl:mt-9 mb-14 max-w-[679px] text-justify md:text-start content-text"
                >
                    Espaços que fortalecem a presença da <span className="whitespace-nowrap">Dell Anno</span> nas cidades, ampliam o reconhecimento da marca e traduzem, no ponto de venda, a identidade da marca e sua conexão com o mercado de móveis planejados de alto padrão.
                </Text>

                <StorefrontsSlides />
            </div>
            <div className="border-b border-[#EDEDED] mt-26 md:mt-36 xl:mt-40 2xl:mt-52" />
        </section>
    );
};
