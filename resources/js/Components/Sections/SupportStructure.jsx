import { supportStructureData } from "@/Data/supportStructureData";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { Text } from "../ui/Text";
import { Title } from "../ui/Title";
import { withBrandNowrap } from "@/Utils/brandName";

import image from "@/imgs/content/display/differential-detail.jpg";

gsap.registerPlugin(ScrollTrigger);

export const SupportStructure = () => {
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

            tl.from(".content-item", {
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out",
            }).from(
                ".cards",
                {
                    opacity: 0,
                    scale: 0.8,
                    stagger: 0.2,
                    duration: 1,
                    ease: "power3.out",
                },
                "-=0.5",
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);
    return (
        <section
            ref={sectionRef}
            id="suporte"
            aria-labelledby="suporte-estrutura-titulo"
            className="pt-8 md:pt-12 lg:pt-16"
        >
            <div className="container max-w-large">
                <div className="grid lg:grid-cols-2 lg:gap-10 2xl:gap-28 items-center text-start">
                    <div className="mt-auto">
                        <Title
                            id="suporte-estrutura-titulo"
                            variant="none"
                            weight="thin"
                            className="mt-10 text-[30px] leading-[1.3] tracking-[-0.035em]  sm:text-[42px] 2xl:text-[45px] content-item uppercase"
                        >
                            DIFERENCIAIS
                            <span className="ml-2 lg:ml-0 lg:block content-item text-primary">
                                EXCLUSIVOS <span className="whitespace-nowrap">DELL ANNO</span>
                            </span>
                        </Title>

                        <div className="lg:max-w-[615px] text-justify md:text-start">
                            <Text
                                weight="light"
                                variant="bodySmall"
                                className="pt-7 lg:pt-12 content-item"
                            >
                                O lojista conta com acompanhamento em diferentes
                                etapas, desde a implantação da loja até o
                                fortalecimento comercial da unidade no mercado
                                local.
                            </Text>
                            <Text
                                weight="light"
                                variant="bodySmall"
                                className="pt-7 content-item"
                            >
                                A marca oferece orientação para estruturação do
                                ponto de venda, treinamento, apoio comercial,
                                materiais institucionais, direcionamentos de
                                comunicação, programas de valorização da loja e
                                iniciativas para aproximar a unidade de
                                arquitetos, designers e especificadores.
                            </Text>
                        </div>

                        <img
                            className="w-full lg:w-[640px] lg:h-[274px] mt-12"
                            src={image}
                            alt="Closet em tons de marrom"
                        />
                    </div>

                    <ul className="flex flex-col gap-3 mt-10 lg:mt-16 2xl:mt-24">
                        {supportStructureData.map((item) => (
                            <li
                                key={item.title}
                                className="bg-white text-start px-6 2xl:px-8 py-6 border border-[#D3D3D3] cards"
                            >
                                <Text
                                    variant="subtitle"
                                    role="heading"
                                    weight="medium"
                                    aria-level="3"
                                    className="text-primary uppercase"
                                >
                                    {item.title}
                                </Text>

                                <Text variant="bodySmall" className="mt-3 text-justify md:text-start">
                                    {withBrandNowrap(item.text)}
                                </Text>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};
