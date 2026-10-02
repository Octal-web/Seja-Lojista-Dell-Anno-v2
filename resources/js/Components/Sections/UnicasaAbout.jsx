import { useEffect, useRef } from "react";

import { unicasaHighlights } from "@/Data/unicasaHighlights";

import { Text } from "../ui/Text";
import { Title } from "../ui/Title";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { UnicasaImage } from "../UnicasaImage";
import { LinkButton } from "../ui/LinkButton";

gsap.registerPlugin(ScrollTrigger);

const IconBase = ({ children, className = "" }) => {
    return (
        <svg
            width="38"
            height="38"
            viewBox="0 0 38 38"
            fill="none"
            aria-hidden="true"
            focusable="false"
            className={className}
        >
            {children}
        </svg>
    );
};

const FactoryIcon = ({ className = "" }) => {
    return (
        <IconBase className={className}>
            <g transform="translate(1.234 1.234)">
                <path
                    d="M33.662,44.883h.02"
                    transform="translate(-15.896 -19.221)"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                <path
                    d="M44.883,44.883h.02"
                    transform="translate(-19.221 -19.221)"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                <path
                    d="M8.416,40a3.948,3.948,0,0,0,3.948,3.948H40A3.948,3.948,0,0,0,43.948,40V19.273a.987.987,0,0,0-1.518-.833l-8.808,5.614a.987.987,0,0,1-1.518-.833V19.273a.987.987,0,0,0-1.518-.833L21.78,24.054a.987.987,0,0,1-1.52-.833V12.364a3.948,3.948,0,0,0-3.948-3.948H12.364a3.948,3.948,0,0,0-3.948,3.948Z"
                    transform="translate(-8.416 -8.416)"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                <path
                    d="M22.442,44.883h.02"
                    transform="translate(-12.571 -19.221)"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </g>
        </IconBase>
    );
};

const GrowthIcon = ({ className = "" }) => {
    return (
        <IconBase className={className}>
            <path
                d="M36.28 11.21L28.48 3.42L20.69 11.21"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            <path
                d="M28.49 3.42V34.58"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            <path
                d="M20.7 34.58H1.22"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            <path
                d="M20.7 26.79H7.06"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            <path
                d="M20.7 18.99H12.91"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </IconBase>
    );
};

const BriefcaseIcon = ({ className = "" }) => {
    return (
        <IconBase className={className}>
            <g transform="translate(2.906 1.117)">
                <path
                    d="M25.412,50.824V54.4"
                    transform="translate(-12.894 -18.635)"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                <path
                    d="M35.576,50.824V54.4"
                    transform="translate(-15.906 -18.635)"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                <path
                    d="M45.741,50.824V54.4"
                    transform="translate(-18.918 -18.635)"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                <path
                    d="M39.812,50.824H7.624"
                    transform="translate(-7.624 -18.635)"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                <path
                    d="M15.247,50.824V54.4"
                    transform="translate(-9.882 -18.635)"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                <path
                    d="M20.329,30.118V8.659a3.576,3.576,0,0,1,3.576-3.576h7.153a3.576,3.576,0,0,1,3.576,3.576V30.118"
                    transform="translate(-11.388 -5.082)"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                <rect
                    width="28.612"
                    height="17.882"
                    rx="5.082"
                    transform="translate(1.788 7.153)"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </g>
        </IconBase>
    );
};

const GlobeIcon = ({ className = "" }) => {
    return (
        <IconBase className={className}>
            <g transform="translate(1.333 1.561)">
                <circle
                    cx="17.667"
                    cy="17.667"
                    r="17.667"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                <path
                    d="M27.152,5.021a25.618,25.618,0,0,0,0,35.335,25.618,25.618,0,0,0,0-35.335"
                    transform="translate(-9.485 -5.021)"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                <path
                    d="M5.021,30.127H40.356"
                    transform="translate(-5.021 -12.46)"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </g>
        </IconBase>
    );
};

const ChartIcon = ({ className = "" }) => {
    return (
        <IconBase className={className}>
            <g transform="translate(1.543 3.514)">
                <path
                    d="M29.769,39.692V48.42"
                    transform="translate(-12.312 -16.998)"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                <path
                    d="M39.692,36.315v11.1"
                    transform="translate(-15.252 -15.997)"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                <path
                    d="M49.615,26.435V44.492"
                    transform="translate(-18.192 -13.07)"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                <path
                    d="M39.875,7.442,24.782,22.536a.873.873,0,0,1-1.236,0L17.8,16.789a.873.873,0,0,0-1.234,0l-11.6,11.6"
                    transform="translate(-4.961 -7.442)"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                <path
                    d="M9.923,45.8v4.429"
                    transform="translate(-6.432 -18.808)"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                <path
                    d="M19.846,36.358V47.432"
                    transform="translate(-9.372 -16.01)"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </g>
        </IconBase>
    );
};

const iconComponents = {
    factory: FactoryIcon,
    growth: GrowthIcon,
    briefcase: BriefcaseIcon,
    globe: GlobeIcon,
    chart: ChartIcon,
};

export const UnicasaAbout = () => {
    const sectionRef = useRef(null);
    const introRef = useRef(null);
    const textRef = useRef(null);
    const cardRefs = useRef([]);

    useEffect(() => {
        const context = gsap.context(() => {
            const cards = cardRefs.current.filter(Boolean);

            const prefersReducedMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)",
            ).matches;

            if (prefersReducedMotion) {
                gsap.set([introRef.current, textRef.current, ...cards], {
                    x: 0,
                    y: 0,
                    opacity: 1,
                    scale: 1,
                });

                return;
            }

            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 72%",
                    once: true,
                },
            });

            timeline.fromTo(
                introRef.current,
                {
                    x: -35,
                    opacity: 0,
                },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.75,
                    ease: "power2.out",
                },
            );

            timeline.fromTo(
                textRef.current,
                {
                    x: 35,
                    opacity: 0,
                },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.75,
                    ease: "power2.out",
                },
                "-=0.55",
            );

            timeline.fromTo(
                cards,
                {
                    y: 28,
                    opacity: 0,
                    scale: 0.98,
                },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.55,
                    stagger: 0.09,
                    ease: "power2.out",
                },
                "+=0.25",
            );
        }, sectionRef);

        ScrollTrigger.refresh();

        return () => context.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="unicasa"
            aria-labelledby="unicasa-title"
            className="overflow-hidden bg-white pt-20 sm:pt-24 xl:pt-32"
        >
            <div>
                <div className="text-center flex flex-col items-center container max-w-large pb-10">
                    <div ref={introRef} className="opacity-0">
                        <Title
                            id="unicasa-title"
                            variant="none"
                            weight="light"
                            className="mt-10 text-[30px] leading-[1.3] tracking-[-0.035em] text-primary sm:text-[42px] 2xl:text-[45px] uppercase"
                        >
                            A <span className="whitespace-nowrap">Dell Anno</span> faz parte do Grupo Unicasa
                        </Title>
                    </div>

                    <div
                        ref={textRef}
                        className="xl:max-w-[1202px] space-y-2 md:space-y-4 opacity-0 pt-7 lg:pt-10 text-justify md:text-center"
                    >
                        <Text as="p" variant="bodySmall" weight="light">
                            A <span className="whitespace-nowrap">Dell Anno</span> integra o Grupo Unicasa, empresa de
                            capital aberto listada no Novo Mercado da B3, com
                            mais de 40 anos de atuação no setor moveleiro e uma
                            estrutura industrial de alta tecnologia.
                        </Text>

                        <Text as="p" variant="bodySmall" weight="light">
                            Com um parque fabril de mais de 50 mil m² e uma
                            planta robotizada, ela está entre as maiores e mais
                            modernas fabricantes de móveis planejados do mundo,
                            reunindo escala e tecnologia para sustentar a
                            produção de suas marcas.
                        </Text>
                    </div>
                </div>

                <UnicasaImage />

                <div className="container max-w-large">
                    <div className="-mt-5 grid grid-cols-2 gap-5 sm:grid-cols-3 md:-mt-32 lg:grid-cols-5">
                        {unicasaHighlights.map((item, index) => {
                            const Icon = iconComponents[item.icon];

                            const isLastOddItem =
                                index === unicasaHighlights.length - 1 &&
                                unicasaHighlights.length % 2 !== 0;

                            return (
                                <article
                                    ref={(element) => {
                                        cardRefs.current[index] = element;
                                    }}
                                    key={item.id}
                                    aria-labelledby={`unicasa-destaque-${index}-titulo`}
                                    className={`flex min-h-30 w-full flex-col items-center justify-center border-2 border-[#D3D3D3] bg-white px-5 md:px-3 xl:px-4 2xl:px-5 py-7 text-center text-primary opacity-0 sm:min-h-[220px] md:min-h-[270px] lg:min-h-[317px] ${
                                        isLastOddItem
                                            ? "col-span-2 lg:col-span-1"
                                            : ""
                                    }`}
                                >
                                    <Icon className="h-[38px] w-[38px]" />

                                    <Text
                                        id={`unicasa-destaque-${index}-titulo`}
                                        as="p"
                                        variant="none"
                                        weight="light"
                                        role="heading"
                                        aria-level="3"
                                        className="mt-2.5 text-base leading-[1.25] !text-black lg:mt-8 2xl:mt-12 2xl:text-xl"
                                    >
                                        {item.description.map((line) => (
                                            <span key={line} className="block">
                                                {line}
                                            </span>
                                        ))}
                                    </Text>

                                    <Text
                                        as="p"
                                        variant="none"
                                        weight="light"
                                        className="text-xs leading-[1.25] md:text-sm 2xl:text-base"
                                    >
                                        {item.text.map((line) => (
                                            <span key={line} className="block">
                                                {line}
                                            </span>
                                        ))}
                                    </Text>
                                </article>
                            );
                        })}
                    </div>
                </div>

                <LinkButton href={`${route("Home.index")}#orcamento`} variant="primary" className="!block uppercase mx-auto mt-14 xl:mt-20">
                    Quero abrir uma loja autorizada <span className="whitespace-nowrap"> Dell Anno</span>
                </LinkButton>
            </div>
        </section>
    );
};
