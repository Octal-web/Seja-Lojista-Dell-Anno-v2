import businessModelImage from "@/imgs/content/display/model-img.jpg";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { Text } from "../ui/Text";
import { Title } from "../ui/Title";

gsap.registerPlugin(ScrollTrigger);

const titleLines = [
    "A autonomia de uma loja própria com",
    <>
        a força e o suporte da{" "}
        <span className="whitespace-nowrap">Dell Anno</span>
    </>,
];

export const BusinessModel = () => {
    const sectionRef = useRef(null);
    const contentTitleRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const leftItems = contentTitleRef.current.filter(Boolean);

            const prefersReducedMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)",
            ).matches;

            if (prefersReducedMotion) {
                gsap.set(
                    [...leftItems, document.querySelectorAll(".content-text")],
                    {
                        x: 0,
                        y: 0,
                        opacity: 1,
                    },
                );

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
            id="modelo"
            aria-label="Modelo de loja própria autorizada Dell Anno"
            className="container max-w-large"
        >
            <div className="border-b border-[#EDEDED] mt-28 md:mt-40 xl:mt-52 w-full" />

            <div ref={sectionRef} className=" flex flex-col items-center text-justify md:text-center">
                <Title
                    as="h2"
                    variant="display"
                    weight="light"
                    className="max-w-[1110px] mt-16 lg:mt-24 uppercase text-start md:text-center"
                >
                    {titleLines.map((line, index) => (
                        <span
                            key={index}
                            aria-hidden="true"
                            className="block overflow-hidden pb-1"
                        >
                            <span
                                ref={(element) => {
                                    contentTitleRef.current[index] = element;
                                }}
                                className="block"
                            >
                                {line}
                            </span>
                        </span>
                    ))}
                </Title>

                <Text
                    variant="bodySmall"
                    className="pt-8 lg:pt-15 lg:max-w-[1020px] content-text"
                >
                    O modelo de loja própria autorizada se diferencia do formato de franquia: não há cobrança de royalties ou taxa de franquia.
                </Text>

                <Text
                    variant="bodySmall"
                    className="pt-3 lg:pt-8 lg:max-w-[1138px] content-text"
                >
                    O lojista conta com a estrutura da <span className="whitespace-nowrap">Dell Anno</span> para a implantação e o desenvolvimento da operação, com orientação especializada e ferramentas de apoio, como materiais institucionais, programas de valorização do ponto de venda e iniciativas voltadas ao relacionamento com arquitetos, designers e especificadores.
                </Text>

                <img
                    src={businessModelImage}
                    alt="Ambiente de cozinha planejada Dell Anno"
                    width="1480"
                    height="738"
                    loading="lazy"
                    decoding="async"
                    className="w-full aspect-sqiare md:aspect-[85/41] object-cover object-center mt-24"
                />
            </div>
        </section>
    );
};
